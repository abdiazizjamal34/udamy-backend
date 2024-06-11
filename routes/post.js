const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const upload = require('../middleware/upload');

// Create a new post
router.post('/', upload, async (req, res) => {
    const { title, content, category, price } = req.body;
    let photoPath = null;
    let videoPaths = [];

    if (req.files) {
        if (req.files.photo) {
            photoPath = req.files.photo[0].path;
        }
        if (req.files.videos) {
            videoPaths = req.files.videos.map(file => file.path);
        }
    }

    const post = new Post({ title, content, category, price, photo: photoPath, videos: videoPaths });
    try {
        await post.save();
        res.status(201).send(post);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Read all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.send(posts);
        console.log('posts', posts);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Read posts by category
router.get('/category/:category', async (req, res) => {
    try {
        const posts = await Post.find({ category: req.params.category });
        if (!posts || posts.length === 0) {
            return res.status(404).send('Posts not found');
        }
        res.send(posts);
        console.log('posts', posts);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Read a single post by ID
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).send('Post not found');
        }
        res.send(post);
        console.log('post', post)
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a post by ID
router.put('/:id', upload, async (req, res) => {
    const { title, content, category, price } = req.body;
    let photoPath = null;
    let videoPaths = [];

    if (req.files) {
        if (req.files.photo) {
            photoPath = req.files.photo[0].path;
        }
        if (req.files.videos) {
            videoPaths = req.files.videos.map(file => file.path);
        }
    }

    try {
        const post = await Post.findByIdAndUpdate(req.params.id, { title, content, category, price, photo: photoPath, videos: videoPaths }, { new: true });
        if (!post) {
            return res.status(404).send('Post not found');
        }
        res.send(post);
        console.log('post', post)
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a post by ID
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).send('Post not found');
        }
        res.send('Post deleted');
        console.log('post', post)
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
