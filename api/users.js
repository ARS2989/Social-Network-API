const router = require('express').Router();
const { User } = require('../models');

// GET all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find()
      .populate('thoughts')
      .populate('friends');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single user by its _id and populated thought and friend data
router.get('/users/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate('thoughts')
      .populate('friends');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a new user
router.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;

const userId = 'your_user_id_here';
const updateUserUrl = `/api/users/${userId}`;

const updatedUserData = {
  // Provide updated user data here
};

fetch(updateUserUrl, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(updatedUserData),
})
  .then(response => response.json())
  .then(data => {
    console.log('User updated:', data);
  })
  .catch(error => {
    console.error('Error updating user:', error);
  });

  const userId = 'user_id_here';
const friendId = 'friend_id_here';
const addFriendUrl = `/api/users/${userId}/friends/${friendId}`;

fetch(addFriendUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then(response => response.json())
  .then(data => {
    console.log('Friend added:', data);
  })
  .catch(error => {
    console.error('Error adding friend:', error);
  });

  const userId = 'user_id_here';
const friendId = 'friend_id_here';
const removeFriendUrl = `/api/users/${userId}/friends/${friendId}`;

fetch(removeFriendUrl, {
  method: 'DELETE',
})
  .then(response => response.json())
  .then(data => {
    console.log('Friend removed:', data);
  })
  .catch(error => {
    console.error('Error removing friend:', error);
  });
