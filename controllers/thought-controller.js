const { Thought } = require('../models');

const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find({})
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch( err => {
      console.log(err);
      res.status(400).json(err);
    });
  },

  getThoughtByID({params}, res) {
    Thought.findOne({ _id: params.id })
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'Thought unable to be retreived' });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  },

  createNewThought({body}, res) {
    Thought.create(body)
      .then(dbUserData => 
        res.json(dbUserData))
      .catch(err => 
        res.status(400).json(err));
  },

  updateThought({params, body}, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {new:true})
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ mesage:'Thought could not be translated'});
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },

  deleteThought({params}, res) {
    Thought.findOneAndDelete({ _id: params.id }, body, {new:true})
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ mesage:'Cannot fetch the current thought'});
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },

  addReaction({params}, res) {

  },

  removeReaction({params}, res) {

  }
}

module.exports = thoughtController;