const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

// Schema to create user model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trimmed: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // validate:{
      //   isEmail: true,
      //! }, mongoose versin look up
    },
    thoughts:[
      {type:Schema.types.ObjectId, 
        ref: 'Thought'}],
    friends: [{
      type:Schema.types.ObjectId,
      ref: 'User'
    }]
    },
  {
    toJSON: {
      virtual: true
    },
    id: false
  }
);

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  }
);

const User = model('user', userSchema);

module.exports = User;
