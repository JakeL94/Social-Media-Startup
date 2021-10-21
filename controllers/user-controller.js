const { User } = require('../models');

const userController = {
  // works
  getAllUsers(req, res) {
    User.find()
      .then(dbUserData => res.json(dbUserData))
      .catch( err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  getUserByID(req, res) {
    User.findOne({ _id: req.params.userId })
    .populate('userThoughts')
    .populate('userFriends')
    .select('-__v')
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'User not found' });
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // works
  createNewUser({body}, res) {
    User.create(body)
      .then(dbUserData => 
        res.json(dbUserData))
      .catch(err => 
        res.status(400).json(err));
  },

  updateUser({params, body}, res) {
    User.findOneAndUpdate({ _id: params.userId }, body, {new: true})
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ mesage:'Unable to find User'});
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },

  deleteUser({params}, res) {
    User.findOneAndDelete({ _id: params.userId })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message:'Sorry User does not exist'});
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
  },

  addFriend({params}, res) {
    User.findOneAndUpdate({ _id: params.userId }, {$addToSet: {userFriends: params.friendId}}, {new: true})
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message:'Wrong User'});
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },

  removeFriend({params}, res) {
    User.findOneAndUpdate({ _id: params.userId }, {$pull: {userFriends: params.friendId}}, {new: true})
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message:'Wrong User'});
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  }
}

module.exports = userController;