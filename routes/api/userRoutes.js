const router = require('express').Router();
const {
  getUser,
  getSingleUser,
  createUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/user');

// /api/User
router.route('/').get(getUser).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser);

// /api/users/:userId/friends
router.route('/:userId/friends').post(addFriend);

// /api/users/:userId/friends/:assignmentId
router.route('/:userId/friends/:friendsId').delete(removeFriend);

module.exports = router;
