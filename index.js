const express = require('express');
const model = require('./data/db.js');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send(`
        <h2>Hello 🤗! This server is runnning ✨</h2> 
    `)
})

/* GET	/api/posts	
Returns an array of all the post objects contained in the database. */
server.get('/api/posts', (req, res) => {

})

/* GET	/api/posts/:id	
Returns the post object with the specified id. */
server.get('/api/post/:id', (req, res) => {

})

/* GET	/api/posts/:id/comments	
Returns an array of all the comment objects associated with the post with the specified id. */
server.get('/api/post/:id/comments', (req, res) => {

})

/* POST	/api/posts	
Creates a post using the information sent inside the request body.*/
server.post('/api/posts', (req, res) => {

})

/*POST	/api/posts/:id/comments	
Creates a comment for the post with the specified id using information sent inside of the request body. */
server.post('/api/posts/:id/comments', (req, res) => {

})

/* DELETE	/api/posts/:id	
Removes the post with the specified id and returns the deleted post object. You may need to make additional calls to the database in order to satisfy this requirement. */
server.delete('/api/posts/:id', (req, res) => {

})

/* PUT	/api/posts/:id	
Updates the post with the specified id using data from the request body. Returns the modified document, NOT the original. */
server.put('/api/posts/:id', (req, res) => {
    
})


const PORT = 5000;
server.listen(PORT, () => {
    console.log(`*** Hello, I am listening on port ${PORT} ***`)
})
