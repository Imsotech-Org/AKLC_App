const mongoose = require('mongoose');

const ageSchema = mongoose.Schema(
    {
        client: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        chronologicalAge: {
            type: String,
            required: [true, "Please add chronological age"],
        },
        biologicalAge: {
            type: String,
            require: [true, "Please add biological age"]
        },
    },
    {
      timestamps: true,
    }
);

module.exports = mongoose.model('Age', ageSchema);