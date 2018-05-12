var express = require('express')
var fs = require('fs')
const path = require('path')

var app = express()

app.use(express.static('public'))

app.get('/get-posts', function(request, response) {
  fs.readFile(__dirname + '/data/posts.json', function(error, data) {
    if (error) {
      console.log('Error reading posts.json: ' + error)
      response.status(500)
      response.send(error)
    } else {
      response.send(data.toString())
    }
  })
})

app.listen(8080, function() {
  console.log('Server has started listening on port 8080.')
})
