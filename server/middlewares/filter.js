// STEP 6: create array with censored words
const notAllowed = [ 'poo', 'butt', 'shit', 'piss', 'hell' ];

// STEP 7: this will export a function with
// req, res, next parameters
module.exports = (req, res, next) => {
    while ( notAllowed.find( word => req.body.text.includes(word) ) ) {
        const badWord = notAllowed.find( word => req.body.text.includes(word) );
        req.body.text = req.body.text.replace( badWord, '*'.repeat( badWord.length ) );
    }
    next()  
}