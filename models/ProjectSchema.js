const { Schema, model } = require('mongoose');

const ProjectSchema = new Schema({
    title: String,
    description: String,
    content: [
        {
            type: { type: String },
            text: Schema.Types.Mixed,
            imageData: {
                data: Buffer,
                contentType: String
            },
            alt: String
        }
    ],
    image: {
        data: Buffer,
        contentType: String
    },
    date: { type: Date, default: Date.now }
});

module.exports = model('Project', ProjectSchema);
