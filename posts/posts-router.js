const express = require('express')
const model = require('../data/db.js');
const router = express.Router();


/* GET	/api/posts	
Returns an array of all the post objects contained in the database. */
router.get('/', (req, res) => {
    model.find()
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: 'The posts information could not be retrieved.'
        })
    })

})

/* GET	/api/posts/:id	
Returns the post object with the specified id. */
router.get('/:id', (req, res) => {
    const {id} = req.params;
    model.findById(id)
        .then(post => {
            if (post.length > 0) {
                res.status(200).json(post);
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist." 
                });
            };    
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: 'The post information could not be retrieved.'
            })
        })
})

/* GET	/api/posts/:id/comments	
Returns an array of all the comment objects associated with the post with the specified id. */
router.get('/:id/comments', (req, res) => {
    const {id} = req.params;
    model.findPostComments(id)
        .then(postComments => {
            if (postComments.length > 0) {
                res.status(200).json(postComments);
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not have comments or may not exist." 
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: "The comments information could not be retrieved."
            });
        })
})

/* POST	/api/posts	
Creates a post using the information sent inside the request body.*/
//This runs the 500 error if title or content is missing :/?????
router.post('/', (req, res) => {
    const {title, contents} = req.body
    model.insert(req.body)
        .then(post => {
            if (!title || !contents) {
                res.status(400).json({
                    errorMessage: "Please provide title and contents for the post."
                })
            } else {
                res.status(201).json(post)
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: 'There was an error while saving the post to the database.'
            })
        })
})

/*POST	/api/posts/:id/comments	
Creates a comment for the post with the specified id using information sent inside of the request body. */
router.post('/:id/comments', (req, res) => {
    const {id} = req.params;
    const body = ({...req.body, post_id: id});
    model.insertComment(body)
        .then(comment => {
            if (!model.findById(id)) {
                res.status(400).json({
                    message: "The post with the specified ID does not exist."})
            } else if (!body.text) {
                res.status(400).json({
                    errorMessage:"Please provide text for the comment."
                })
            } else {
                res.status(201).json(comment)
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: "There was an error while saving the comment to the database"
            });
        })
})

/* DELETE	/api/posts/:id	
Removes the post with the specified id and returns the deleted post object. You may need to make additional calls to the database in order to satisfy this requirement. */
router.delete('/:id', (req, res) => {
    model.remove(req.params.id)
        .then(post => {
            if (post) {
            res.status(200).json('Post deleted!');
            } else {
                res.status(404).json({
                    errorMessage: 'The post with the specified ID does not exist.'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: "The post could not be removed."
            });
        });
})

/* PUT	/api/posts/:id	
Updates the post with the specified id using data from the request body. Returns the modified document, NOT the original. */
router.put('/:id', (req, res) => {
    model.update(req.params.id, req.body)
        .then(post => {
            if (req.params.id) {
                if(req.body.title || req.body.contents) {
                    res.status(200).json(post)
                } else {
                    res.status(400).json({
                        errorMessage: "Please provide title and contents for the post."
                    })
                } 
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: "The post information could not be modified."
            });
        })

})

module.exports = router;