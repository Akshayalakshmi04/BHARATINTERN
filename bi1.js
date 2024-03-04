const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/registrationDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

// Create a model
const User = mongoose.model('User', userSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/register', (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  newUser.save((err) => {
    if (err) {
      console.log(err);
      res.send('Error occurred while registering user.');
    } else {
      res.send('User registered successfully!');
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
