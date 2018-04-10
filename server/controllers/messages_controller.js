let messages = [];
let id = 0;

module.exports = {
  create: ( req, res ) => {
    const { text, time } = req.body;
    // STEP 11a: Here we are adding new messages
    //  to a users session
    const {user} = req.session;

    messages.push({ id, text, time });
    // STEP 11b: 
    user.messages.push({ id, text, time });
    id++;
    res.status(200).send( messages );
  },

  read: ( req, res ) => {
    res.status(200).send( messages );
  },

  update: ( req, res ) => {
    const { text } = req.body;
    // STEP 12a: Update method is modified to use id off the request query.
    // req.params.id changed to req.query.id
    const updateID = req.query.id;
    const messageIndex = messages.findIndex( message => message.id == updateID );
    let message = messages[ messageIndex ];

    messages[ messageIndex ] = {
      id: message.id,
      text: text || message.text,
      time: message.time
    };

    res.status(200).send( messages );
  },

  delete: ( req, res ) => {
    // STEP 12b: Delete method is modified to use id off the request query.
    // req.params.id changed to req.query.id
    const deleteID = req.query.id;
    messageIndex = messages.findIndex( message => message.id == deleteID );
    messages.splice(messageIndex, 1);
    res.status(200).send( messages );
  }
};