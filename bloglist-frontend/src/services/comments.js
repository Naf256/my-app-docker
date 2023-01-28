import axios from 'axios'
const baseUrl = '/api/comments'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (id, message) => {
  const response = await axios.post(`${baseUrl}/${id}`, message)
  return response.data
}

export default { getAll, create }

