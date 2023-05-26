const mongoose = require('mongoose');

const VacancySchema = new mongoose.Schema({
    title: { type: String, required: true },
    salary: {
        min: { type: Number, required: true },
        max: { type: Number, required: true }
    },
    requirements: { type: String, required: true },
    responsibilities: { type: [String], required: true },
    description: { type: String, required: false },
});

const Vacancy = mongoose.model('Vacancy', VacancySchema);

module.exports = Vacancy;
