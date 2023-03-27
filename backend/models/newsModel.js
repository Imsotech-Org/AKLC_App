const mongoose = require('mongoose');

const newsSchema = mongoose.Schema({
    newsImage: {
        type: String,
        //required: [true, "Please add a image name for News"],
    },
    title: {
        type: String,
        required: [true, "Please add a title for News"],
    },
    description: {
        type: String,
        required: [true, "Please add a title for News"],
    },
},
{
    timestamps: true,
}
);

module.exports = mongoose.model('News', newsSchema);