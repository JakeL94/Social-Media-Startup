const { User } = require('../models');

const userController = {
  getAllUser(req, res) {
    User.find({})
      .then(dbUserData => res.json(dbUserData))
      .catch( err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  getUserByID({params}, res) {
    User.findOne({ _id: params.id })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'User not found' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  createNewUser({body}, res) {
    User.Create(body)
      .then(dbUserData => 
        res.json(dbUserData))
      .catch(err => 
        res.status(400).json(err));
  },

  updateUser({params, body}, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {new: true})
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
    User.findOneAndDelete({ _id: params.id })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message:'Sorry User does not exist'});
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
  },

  addFriend({params, body}, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {new: true})
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ mesage:'Wrong User'});
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },

  removeFriend({params}, res) {

  }
}

module.exports = userController;