import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
	token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (credentials) => {
	const config = {
		headers: { Authorization: token },
	}
	const response = await axios.post(baseUrl, credentials, config)
	return response.data
}

const like = async (blog) => {
	const config = {
		headers: { Authorization: token }
	}

	const newBlog = {
		...blog,
		user: blog.user.id,
		likes: blog.likes + 1,
	}

	const response = await axios.put(`${baseUrl}/${blog.id}`, newBlog, config)
	return response.data
}

export default { getAll, create, setToken, like }
