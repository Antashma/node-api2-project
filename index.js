const server = require('./server.js')



const PORT = 5000;
server.listen(PORT, () => {
    console.log(`*** Hello, I am listening on port ${PORT} ***`)
})
