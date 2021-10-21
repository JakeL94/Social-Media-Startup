const {Schema, model, Types} = require('mongoose');

const ReactionModel = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId
      },
      reactionBody: {
        type: String,
        required: true,
        maxlength: 280
      },
      username: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
      },
    },
    {
      toJSON: {
        getters: true
      },
      id: false
    }
  );

const ThoughtModel = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280
    },
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    //   get: (createdAtVal) => dateFormat(createdAtVal)
    // },
    username: {
      type: String,
      required: true
    },
    userFriends:[ReactionModel],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

ThoughtModel.virtual('reactions').get(function() {
  return this.userFriends.length;
});

const Thought = model('Thought', ThoughtModel);

module.exports = Thought;