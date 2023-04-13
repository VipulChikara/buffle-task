const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// create a mongodb connection
mongoose.connect('mongodb://localhost/user-details', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));

// define a user schema and model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  country: String,
  createdAt: { type: Date, default: Date.now },
});
const User = mongoose.model('User', userSchema);

// create an express app
const app = express();

app.use(cors());

// use the body-parser middleware to parse JSON request bodies
app.use(express.json());

// define a POST endpoint to save user details
app.post('/api/user-details', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while saving user details' });
  }
});

// define a GET endpoint to get all user details
app.get('/api/user-details', async (req, res) => {
  try {
    const userDetails = await User.find();
    res.json(userDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while getting user details' });
  }
});

// start the Express app on port 8080
app.listen(8080, () => {
  console.log('Server started on port 8080');
});
