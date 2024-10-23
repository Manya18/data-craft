const Router = require('express');
const router = new Router();
const projectController = require('../controller/project.controller');

router.get('/project/:id', projectController.getProject);
router.post('/project', projectController.createProject);
router.get('/projects', projectController.getProjects);

module.exports = router;