const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 1,
      minlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
    type: String,
    required: true,
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      virtual: true
    },
    id: false
  }
);

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
}
);

module.exports = thoughtSchema;
