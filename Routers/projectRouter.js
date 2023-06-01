const Router = require('express');
const router = new Router();
const ProjectController = require('../Controllers/ProjectController');

router.get('/projects', ProjectController.getProjects);
router.get('/projects/:id', ProjectController.getProject);
router.post('/projects', ProjectController.createProject);
router.put('/projects/:id', ProjectController.updateProject);
router.delete('/projects/:id', ProjectController.deleteProject);

module.exports = router;