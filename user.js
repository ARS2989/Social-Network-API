const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address']
  },
  thoughts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Thought'
    }
  ],
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});

userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const User = mongoose.model('User', userSchema);

module.exports = User;

const { DataTypes, Model } = require('sequelize');
const sequelize = require('./your-sequelize-instance'); // Initialize Sequelize instance

class User extends Model {}

User.init({
  // ...user attributes
}, {
  sequelize,
  modelName: 'User',
});

// Define association to Thoughts
User.hasMany(Thought, {
  onDelete: 'CASCADE', // Cascade delete thoughts when a user is deleted
});
Thought Model:
Define the Thought model with a belongsTo association to the User model. This establishes the relationship in the opposite direction and isn't directly related to cascading delete, but it's required to set up the association.
javascript
Copy code
class Thought extends Model {}

Thought.init({
  // ...thought attributes
}, {
  sequelize,
  modelName: 'Thought',
});

// Define association to User
Thought.belongsTo(User);
Delete User:
When you delete a user, Sequelize will automatically delete the associated thoughts due to the cascading delete setup in the User model.
javascript
Copy code
const deleteUser = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      console.log('User not found.');
      return;
    }

    // Delete the user (and associated thoughts due to cascading delete)
    await user.destroy();

    console.log('User and associated thoughts deleted successfully.');
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};

// Call the function with the user's ID to delete the user and their thoughts
deleteUser('user_id_here');
//With this setup, when you delete a user, Sequelize will automatically delete all associated thoughts as well. Make sure to adjust the code snippets according to your actual models and setup.


const deleteUser = async (userId) => {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        console.log('User not found.');
        return;
      }
  
      // Delete the user (and associated thoughts due to cascading delete)
      await user.destroy();
  
      console.log('User and associated thoughts deleted successfully.');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  
  // Call the function with the user's ID to delete the user and their thoughts
  deleteUser('user_id_here');

