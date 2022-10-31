const User = require('../models/user')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
	jest.setTimeout(10000)
	await User.deleteMany({})
	helper.initialUsers.map(async (u) => {
		const passwordHash = await bcrypt.hash(u.password, 10)
		const user = new User({
			username: u.username,
			name: u.name,
			passwordHash: passwordHash
		})

		await user.save()
	})
	
})

test('username must be unique', async () => {
	const usersAtStart = await helper.usersInDb()
	
	const newone = {
		username: 'fahim', 
		name: 'holaamigos',
		password: 'thisisme'
	}
	
	const result = await api
		.post('/api/users')
		.send(newone)
		.expect(401)
		.expect('Content-Type', /application\/json/)
		
	expect(result.body.error).toContain('username is taken')

	const usersAtEnd = await helper.usersInDb()
	expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
}, 30000)

test('password should be more than 3 characters', async () => {
	const usersAtStart = await helper.usersInDb()
	
	const newone = {
		username: 'onekbhalo', 
		name: 'holaamigos',
		password: 'am'
	}
	
	const result = await api
		.post('/api/users')
		.send(newone)
		.expect(401)
		.expect('Content-Type', /application\/json/)

	expect(result.body.error).toContain('password is too short')

	const usersAtEnd = await helper.usersInDb()

	expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
}, 30000)

afterAll(() => {
	mongoose.connection.close()
})
