var express = require('express')
var formidable = require('express-formidable')
var fs = require('fs')

var app = express()

app.use(express.static('public'))
app.use(formidable())

app.get('/get-posts', function(request, response) {
  fs.readFile(__dirname + '/data/posts.json', function(error, data) {
    if (error) {
      console.log('Error reading posts.json: ' + error)
      response.status(500)
      response.send(error)
    } else {
      response.send(data)
    }
  })
})

app.post('/create-post', function(request, response) {
  var now = Date.now()
  var newPost = {
    content: request.fields.blogpost,
    mood: request.fields.mood,
    timestamp: now
  }

  fs.readFile(__dirname + '/data/posts.json', function(error, data) {
    if (error) {
      console.log('Error reading posts.json: ' + error)
      response.status(500)
      response.send(error)
    } else {
      var posts = JSON.parse(data)
      posts.blogposts.push(newPost)
      var updatedData = JSON.stringify(posts)

      fs.writeFile(__dirname + '/data/posts.json', updatedData, function(
        error
      ) {
        if (error) {
          console.log('Error writing posts.json: ' + error)
          response.status(500)
          response.send(error)
        } else {
          response.send(newPost)
        }
      })
    }
  })
})

app.delete('/delete-post/:id', function(request, response) {
  var id = request.params.id

  fs.readFile(__dirname + '/data/posts.json', function(error, data) {
    if (error) {
      console.log('Error reading posts.json: ' + error)
      response.status(500)
      response.send(error)
    } else {
      var posts = JSON.parse(data)
      var blogposts = posts.blogposts
      posts.blogposts = blogposts.filter(post => String(post.timestamp) !== id)
      var updatedData = JSON.stringify(posts)

      fs.writeFile(__dirname + '/data/posts.json', updatedData, function(
        error
      ) {
        if (error) {
          console.log('Error writing posts.json: ' + error)
          response.status(500)
          response.send(error)
        } else {
          response.status(200)
          response.send({ success: true })
        }
      })
    }
  })
})

app.listen(8080, function() {
  console.log('Server has started listening on port 8080.')
})
