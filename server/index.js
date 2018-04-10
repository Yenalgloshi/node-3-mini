const express = require('express');
const bodyParser = require('body-parser');
const mc = require('./controllers/messages_controller');
// STEP 1: create session variable and require express-session
const session = require('express-session');
require('dotenv').config()
// STEP 4: create createInitialSession variable and require 
const createInitialSession = require( `${__dirname}/middlewares/session.js` );
// STEP 8: Create filter variable and require
const filter = require(`${__dirname}/controllers/messages_controller`);

const app = express();

app.use( bodyParser.json() );
app.use( express.static( `${__dirname}/../build` ) );

// STEP 2: Configure app to use session.
// This is where the session is configured,
// it's invoked with an object where the values
// are defined
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 10000
    }
}))

// STEP 5: Add middleware that captures req, res, next
// and then calls the createInitialSession function with
// req, res, next as arguments.
app.use((req, res, next) => createInitialSession(req, res, next));


// STEP 10: Add middleware that captures req, res, next
// and then checks if the method of the req is POST or PUT.
// Call the filter function with req, res, next as arguments,
// otherwise just invoke next.
app.use( ( req, res, next ) => {
    const {method} = req;
    if ( method === "POST" || method === "PUT" ) {
      filter( req, res, next );
    } 
    else {
      next();
    }
  });

app.post( "/api/messages", mc.create );
app.get( "/api/messages", mc.read );
app.put( "/api/messages", mc.update );
app.delete( "/api/messages", mc.delete );
// STEP 13: Create a GET endpoint at /api/messages/history 
//  that calls the history method from the messages controller.
app.get( "/api/messages/history", mc.history );

const port = process.env.PORT || 3000
app.listen( port, () => { console.log(`Server listening on port ${port}.`); } );