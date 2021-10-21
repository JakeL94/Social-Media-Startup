const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtByID,
    createNewThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

router
.route('/')
.get(getAllThoughts)
.post(createNewThought);

router
.route('/:thoughtId')
.get(getThoughtByID)
.put(updateThought)
.delete(deleteThought);

router
.route('/:thoughtId/reactions')
.post(addReaction);

router
.route('/:thoughtId/reactions/:reactionId')
.delete(removeReaction);

module.exports = router;