require('express-async-errors')
const User = require('../models/user')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})

	response.json(blogs)
})


blogsRouter.post('/', async (request, response) => {
	const token = request.token
	const user = request.user
	const body = request.body

	const decodedToken = jwt.verify(token, process.env.SECRET)

	if (!(token && decodedToken.id)) {
		return response.status(401).json({
			error: 'token missing or invalid'
		})
	}

	if (body.title && body.url) {
		const blog = new Blog({
			title: body.title,
			author: body.author,
			url: body.url,
			likes: body.likes
				? body.likes
				: 0,
			user: user._id
		})

		const savedBlog = await blog.save()
		user.blogs = user.blogs.concat(savedBlog._id)
		await user.save()

		response.status(201).json(savedBlog)
	} else {
		return response.status(400).end()	
	}

})

blogsRouter.delete('/:id', async (request, response) => {
	const token = request.token
	const user = request.user
	const decodedToken = jwt.verify(token, process.env.SECRET) 

	if (!(token && decodedToken.id)) {
		return response.status(401).send({
			error: 'token is invalid or missing'
		})
	}
	const blog = await Blog.findById(request.params.id)

	if (blog.user.toString() === user.id.toString()) {
		await Blog.deleteOne({_id: request.params.id })
		response.status(204).end()
	} else {
		request.status(401).send({
			error: 'you are not authorized to delete the blog'
		})
	}
})

blogsRouter.put('/:id', async (request, response) =>  {
	const blog = request.body
	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })

	return response.json(updatedBlog)
})
module.exports = blogsRouter
