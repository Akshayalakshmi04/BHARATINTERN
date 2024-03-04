const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb://localhost:27017/blogDB', { useNewUrlParser: true, useUnifiedTopology: true });

const Post = mongoose.model('Post', { title: String, content: String });

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.render('index', { posts });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/new', (req, res) => {
    res.render('newpost');
});
app.post('/new', async (req, res) => {
    const { title, content } = req.body;
    try {
        await Post.create({ title, content });
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
