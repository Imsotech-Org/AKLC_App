const mongoose = require('mongoose');

const programsSchema = mongoose.Schema({
    programImage: {
        type: String,
        require: [true, "Please add image to program"]
    },
    title: {
        type: String,
        required: [true, 'Please add a title to program'],
    },
    price: {
        type: Number,
        require: [true, "Please add price to program"],
    },
    secondPrice: {
        type: Number,
        require: [true, "Please add price to program"],
    },
    description: {
        type: String,
        required: [true, 'Please add a description to program'],
    },
    firstTopics: String,
    moreTopics: {
        type: Boolean,
        require: [true, 'Please add a value if the product has more topics'],
    },
    longTopics: String
},{
    timestamps: true
})

module.exports = mongoose.model('Program', programsSchema);