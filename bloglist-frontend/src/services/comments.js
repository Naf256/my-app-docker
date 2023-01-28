import axios from 'axios'
const baseUrl = '/api/comments'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (id, message) => {
  console.log(message)
  const response = await axios.post(`${baseUrl}/${id}`, { comment: message })
  console.log(response.data)
  return response.data
}

export default { getAll, create }

