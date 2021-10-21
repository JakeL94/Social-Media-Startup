const { Thought } = require('../models');

const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find()
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch( err => {
      console.log(err);
      res.status(400).json(err);
    });
  },

  getThoughtByID(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'Thought unable to be retreived' });
        // return;
      }
      res.json(dbThoughtData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
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
    Thought.findOneAndUpdate({ _id: params.thoughtId }, body, {new:true})
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
    Thought.findOneAndDelete({ _id: params.thoughtId }, {new:true})
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ mesage:'Cannot think the current thought'});
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },

  addReaction({params}, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, {$addToSet: {userReactions: params.reactionId}}, {new: true})
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message:'No reaction found'});
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },

  removeReaction({params}, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, {$pull: {userReactions: params.reactionId}}, {new: true})
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message:'No reaction found'});
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  }
}


module.exports = thoughtController;