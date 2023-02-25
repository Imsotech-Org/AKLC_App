const mongoose = require('mongoose');

const workoutPlanSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            require: [true, "Please add user"],
            ref: 'User'
        },
        title: {
            type: String,
            required: [true, "Please add a title for Work Plan"],
        },
        description: {
            type: String,
            require: [true, "Please add a description for Work Plan"]
        }
    },
    {
      timestamps: true,
    }
);

module.exports = mongoose.model('WorkoutPlan', workoutPlanSchema);