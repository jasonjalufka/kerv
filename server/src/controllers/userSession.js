const UserSession = require('../models/userSession');
const Menu = require('../controllers/menu');
exports.verify = (req, res) => {
    //doo validation....
    console.log('requesttoken: ', req.body)
    return UserSession.find({
        _id: req.body.token,
        isDeleted: false
    })
        .then(session => {
            console.log('session: ', session)
            return {
                verified: true,
                id: session[0].userId
            }
        })
        .catch(err => {
            console.log("Error: ", err);
        })
    // check the req.body.token in DB (find)
    // check isDeleted value..

}
