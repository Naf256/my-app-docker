require('express-async-errors')
const Blog = require('../models/blog')
const Comment = require('../models/comment')
const commentRouter = require('express').Router()

commentRouter.get('/', async (request, response) => {
  const comments = await Comment.find({})

  response.json(comments)
})

commentRouter.post('/:id', async (request, response) => {
  const body = request.body
	const blog = await Blog.findById(request.params.id)
   
  const comment = new Comment({
    comment: body.comment,
    blog: blog._id
  })

  const savedComment = await comment.save()
  return response.status(201).json(savedComment)
})

module.exports = commentRouter
