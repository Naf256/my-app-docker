const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const { PORT, MONGODB_URI } = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')

logger.info('connecting to MongoDB', MONGODB_URI)

mongoose.connect(MONGODB_URI)
	.then(() => logger.info('connected to MongoDB'))
	.catch(error => {
		logger.error('error connecting to MongoDB', error.message)
	})

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/users', usersRouter)
app.use('/api/blogs', middleware.userExtractor, blogsRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
