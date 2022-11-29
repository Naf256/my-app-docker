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

	const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
	return response.data
}

const deleteBlog = async (id) => {
	const config = {
		headers: { Authorization: token }
	}

	const response = await axios.delete(`${baseUrl}/${id}`, config)
	return response.data
}

export default { getAll, create, setToken, like, deleteBlog }
