const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  email: {
    type: String,
    required: [true, 'Please add a email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
  },
  userImage: {
    type: String,
    require: [false]
  },
  about: {
    type: String,
    require: [false]
  },
  plan: {
    type: mongoose.Schema.Types.ObjectId,
    require: [false],
    ref: 'Plan'
  },
  hasPaid: {
    type: Boolean,
    require: true,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  }
},
{
  timestamps: true,
})

module.exports = mongoose.model('User', userSchema);