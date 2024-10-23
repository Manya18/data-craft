const Router = require('express');
const router = new Router();
const personController = require('../controller/person.controller');

router.post('/registrate', personController.registratePerson);
router.get('/authorize', personController.authorizePerson);
router.get('/logout', personController.logOutPerson);

module.exports = router;