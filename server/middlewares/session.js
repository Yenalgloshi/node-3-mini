// STEP 3: this will export a function with
// req, res, next parameters
module.exports = (req, res, next) => {
    const {session, method} = req
    if(!req.session.user){    // this checks for user properties;
        req.session.user = {  //  if not, add user properties
            messages: []
        }
    }
    next()
}