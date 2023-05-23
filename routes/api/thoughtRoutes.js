const router = require('express').Router();

const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction
} = require('../../controllers/thoughts');

// /api/Thought
router.route('/').get(getThoughts).post(createThought);


// /api/Thought/:ThoughtId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought)
  .post(addReaction)
  .delete(deleteReaction);


module.exports = router;
