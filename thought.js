const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => formatDate(timestamp) // Implement the date formatting function
  },
  username: {
    type: String,
    required: true
  },
  reactions: [reactionSchema]
});

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;


class Thought extends Model {}

Thought.init({
  // ...thought attributes
}, {
  sequelize,
  modelName: 'Thought',
});

// Define association to User
Thought.belongsTo(User);

const thoughtId = 'thought_id_here';
const createReactionUrl = `/api/thoughts/${thoughtId}/reactions`;

const newReactionData = {
  emoji: '❤️', // Replace with the desired emoji
  timestamp: new Date(), // Generate current timestamp
  // ...other reaction properties
};

fetch(createReactionUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(newReactionData),
})
  .then(response => response.json())
  .then(createdReaction => {
    console.log('New reaction created with timestamp:', createdReaction);
  })
  .catch(error => {
    console.error('Error creating new reaction:', error);
  });
