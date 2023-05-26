const Vacancy = require('../models/Vacancy');

const VacanciesController = {
    createVacancy: async (req, res) => {
        try {
            const vacancyData = req.body;
            const vacancy = new Vacancy(vacancyData);
            const savedVacancy = await vacancy.save();

            res.status(201).json(savedVacancy);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    deleteVacancy: async (req, res) => {
        try {
            const { id } = req.params;
            const vacancy = await Vacancy.findByIdAndDelete(id);

            if (!vacancy) {
                return res.status(404).json({ message: 'Вакансия не найдена' });
            }

            res.status(200).json({ message: 'Вакансия успешно удалена' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateVacancy: async (req, res) => {
        const { id } = req.params;
        const newVacancyData = req.body;

        try {
            const updatedVacancy = await Vacancy.findByIdAndUpdate(id, newVacancyData, { new: true });

            if (!updatedVacancy) {
                return res.status(404).json({ message: 'Vacancy not found' });
            }

            res.status(200).json(updatedVacancy);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getAllVacancies: async (req, res) => {
        try {
            const vacancies = await Vacancy.find(); // Fetches all vacancies
            res.status(200).json(vacancies);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = VacanciesController;
