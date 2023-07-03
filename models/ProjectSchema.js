const { Schema, model } = require('mongoose');

const ProjectSchema = new Schema({
    title: String,
        description: String,
    content: [
        {
            type: { type: String },
            text: Schema.Types.Mixed,
            image: {
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
    date: Date
});


module.exports = model('Project', ProjectSchema);
