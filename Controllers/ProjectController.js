const Project = require('../models/ProjectSchema');

class ProjectController {
    async getProjects(req, res) {
        try {
            const projects = await Project.find({});
            res.json(projects);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getProject(req, res) {
        try {
            const project = await Project.findById(req.params.id);
            res.json(project);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async createProject(req, res) {
        try {
            const { title, description, content } = req.body;

            const imageData = req.files.image ? {
                data: req.files.image[0].buffer,
                contentType: req.files.image[0].mimetype
            } : null;

            const contentData = content.map((item, index) => ({
                ...item,
                image: req.files.contentImages && req.files.contentImages[index] ? {
                    data: req.files.contentImages[index].buffer,
                    contentType: req.files.contentImages[index].mimetype
                } : null
            }));

            const project = new Project({ title, description, content: contentData, image: imageData });
            await project.save();
            res.json({ message: 'Проект создан', project });
        } catch (e) {
            console.log(e)
            res.status(500).json(e);
        }
    }



    async updateProject(req, res) {
        try {
            const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.json({ message: 'Проект обновлён', project });
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async deleteProject(req, res) {
        try {
            await Project.findByIdAndRemove(req.params.id);
            res.json({ message: 'Проект удалён' });
        } catch (e) {
            res.status(500).json(e);
        }
    }
}

module.exports = new ProjectController();
