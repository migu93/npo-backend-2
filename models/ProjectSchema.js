const { Schema, model } = require('mongoose');

const ProjectSchema = new Schema({
    title: String,
    description: String,
    content: [
        {
            type: { type: String },
            text: Schema.Types.Mixed,
            url: String,
            alt: String
        }
    ],
    imageUrl: String,
    date: String
});

module.exports = model('Project', ProjectSchema);
