// Making a user model reference

const mongoose = require('mongoose');

let StorySchema = new mongoose.Schema({
  title:{
    type: String,
    trim: true,
   required:true
  },
  body:{
    type: String,
    require:true
  },
    status: {
      type: String,
      default: 'public',
	enum: ['public', 'private']
    },
    user: [{
      type: mongoose.Schema.Types.ObjectId,
      ref:'User'
    }],
  createdAt:{
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Story', StorySchema);
