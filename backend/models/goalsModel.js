const mongoose = require('mongoose');

const goalsSchema = mongoose.Schema(
    {
        client: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        goalPeriod: {
            type: String,
            required: [true, "Please select a period for this goal"],
        },
        goalDescription: {
            type: String,
            require: [true, "Please add a description for the goal"]
        },
    },
    {
      timestamps: true,
    }
);

module.exports = mongoose.model('Goals', goalsSchema);