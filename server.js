const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const posts = []; // In-memory array to store posts

app.get('', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.get('/posts', (req, res) => {
    res.json(posts);
});

app.post('/posts', (req, res) => {
    const { title, description, author } = req.body;
    if (!title || !description || !author) {
        return res.status(400).json({ message: 'Please provide title, description, and author.' });
    }

    const newPost = { id: posts.length + 1, title, description, author };
    posts.push(newPost);
    res.status(201).json(newPost);
});

app.put('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = posts.findIndex(post => post.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'Post not found' });
    }

    const { title, description, author } = req.body;
    if (!title || !description || !author) {
        return res.status(400).json({ message: 'Please provide title, description, and author.' });
    }

    posts[index] = { id, title, description, author };
    res.json(posts[index]);
});

app.delete('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = posts.findIndex(post => post.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'Post not found' });
    }

    posts.splice(index, 1);
    res.json({ message: 'Post deleted' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
