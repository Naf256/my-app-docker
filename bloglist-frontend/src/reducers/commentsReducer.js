import { createSlice } from '@reduxjs/toolkit'
import commentService from '../services/comments'

const commentSlice = createSlice({
  name: 'comments',
  initialState: [],
  reducers: {
    setComments(state, action) {
      return action.payload
    },
    creating(state, action) {
      return [...state, action.payload]
    }
  }
})

export const { setComments, creating } = commentSlice.actions

export const initialComments = () => {
  return async dispatch => {
    const comments = await commentService.getAll()
    dispatch(setComments(comments))
  }
}

export const createComment = (id, message) => {
  return async dispatch => {
    const comment = await commentService.create(id, message)
    dispatch(creating(comment))
  }
}

export default commentSlice.reducer
