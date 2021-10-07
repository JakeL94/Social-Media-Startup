const {Schema, model} = require('mongoose');

const UserModel = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true 
    },
    userEmail: {
      type: String,
      unique: true,
      required: true,
      // regex for emails from week 17 https://gist.github.com/JakeL94/e4bc55ad3adfe22fb918e0d7ab1aaf08
      match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
    },
    userThoughts:[
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    userFriends:[
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

UserModel.virtual('friends').get(function() {
  return this.friends.length;
});

const User = model('User', UserModel);

module.exports = User;