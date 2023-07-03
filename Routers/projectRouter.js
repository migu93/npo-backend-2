const Router = require('express');
const router = new Router();
const ProjectController = require('../Controllers/ProjectController');
const multer = require('multer');
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const upload = multer({
    limits: {
        fileSize: 4 * 1024 * 1024, // limit file size to 4MB
    },
});

router.get('/projects', ProjectController.getProjects);
router.get('/projects/:id', ProjectController.getProject);
router.post('/projects', ProjectController.createProject);
router.put('/projects/:id', ProjectController.updateProject);
router.delete('/projects/:id', ProjectController.deleteProject);

router.post('/projects-create', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'contentImages', maxCount: 20 }]), authMiddleware, roleMiddleware(['admin']), ProjectController.createProject);

module.exports = router;