const mongoose = require('mongoose');

const nutritionPlanSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please add a title for Nutrition Plan"],
        },
        description: {
            true: String,
            require: [true, "Please add a description for Nutrition Plan"]
        }
    },
    {
      timestamps: true,
    }
);

module.exports = mongoose.model('NutritionPlan', nutritionPlanSchema);