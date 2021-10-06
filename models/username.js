const {Schema, model} = require('mongoose');

const UserModel = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true 
    },
    userEmail: {
      type: String,
      unique: true,
      required: true,
      // match valid email
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

const user = model('User', UserModel);

module.exports = User;