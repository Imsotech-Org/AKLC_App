const mongoose = require('mongoose');

const nutritionPlanSchema = mongoose.Schema(
    {
        schedule: {
            type: String,
            required: [true, "Please add a title for Nutrition Plan"],
        },
        overview: {
            type: String,
            require: [true, "Please add a description for Nutrition Plan"]
        },
        client: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
      timestamps: true,
    }
);

module.exports = mongoose.model('NutritionPlan', nutritionPlanSchema);