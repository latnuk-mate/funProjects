const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
      userId:{
        type: String,
        required: true
      },
      userName:{
        type:String,
        required: true
      },
    displayName:{
      type: String,
      required: true
    },
    ProfileUrl:{
      type: String,
      required: true
    },
    Image:{
      type:String
    },
    createdAt:{
      type:Date,
      default: Date.now
    }
});


module.exports = mongoose.model('GitClient', clientSchema);