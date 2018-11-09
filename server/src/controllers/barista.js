const Barista = require('../models/barista');
const Menu = require('./menu');

exports.login = (req, res) => {
    console.log("inside barista controller with request", req.body);
    Barista.findOne({name: req.body.user, password: req.body.password})
    .then(user => {
        if(user)
            Menu.get(req, res);
        else
            res.sendStatus(401);
    })
    .catch(err => {
        console.log('error finding user..', err)
        res.sendStatus(401)
    })
};

exports.addUser= () =>{
    let baristaKorra = new Barista({name: 'korra', password: 'cwunchies'})
    baristaKorra.save()
    .then(korra => {
        console.log('saved korra', korra)
    })
    .catch(err => {
        console.log('couldnt save korra', err)
    })

    let baristaSamuel = new Barista({name: 'samuel', password: 'catnip'})
    baristaSamuel.save()
    .then(sam =>{
        console.log('saved sam', sam)
    })
    .catch(err => {
        console.log('couldnt save sam: ', err)
    })
}