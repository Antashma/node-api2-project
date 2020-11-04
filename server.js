const express = require('express');
const postsRouter = require('./posts/posts-router.js')
const server = express();



server.use(express.json());
server.use('/api/post', postsRouter)

server.get('/', (req, res) => {
    res.send(`
        <h2>Hello 🤗! This server is runnning ✨</h2> 
    `)
})

module.exports = server;