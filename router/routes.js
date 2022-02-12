const express = require('express')
const router = express.Router()

const {
    getSpacecraft,
    postSpacecraft,
    putSpacecraft,
    deleteSpacecraft,
    searchSpacecraft,
} = require('../controller/spacecraft')

const {
    getAstronaut,
    postAstronaut,
    putAstronaut,
    deleteAstronaut,
} = require('../controller/astronaut')

//route pentru spacecraft
router.get('/getSpacecraft', getSpacecraft);
router.post('/postSpacecraft', postSpacecraft);
router.put('/putSpacecraft/:id' , putSpacecraft);
router.delete('/deleteSpacecraft/:id' , deleteSpacecraft);
router.get('/searchSpacecraft', searchSpacecraft);

//route pentru astronaut
router.get('/getAstronaut', getAstronaut);
router.post('/postAstronaut', postAstronaut);
router.put('/putAstronaut/:id' , putAstronaut);
router.delete('/deleteAstronaut/:id' , deleteAstronaut);

// default path
router.get('/', (req, res) => {
    res.status(200).send('Hello world!')
})

module.exports = router;
