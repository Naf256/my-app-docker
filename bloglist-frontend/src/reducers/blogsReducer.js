import { createSlice } from '@reduxjs/toolkit'
import blogService from './../services/blogs'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    creating(state, action) {
      return [...state, action.payload]
    },
    liking(state, action) {
      return state.map(blog =>
        blog.id !== action.payload.id
          ? blog
          : { ...blog, likes: blog.likes + 1 }
      )
    },
    deleting(state, action) {
      return state.filter(blog =>
        blog.id !== action.payload
      )
    }
  }
})

export const { setBlogs, creating, liking, deleting } = blogsSlice.actions

export const initialBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (obj) => {
  return async dispatch => {
    const blog = await blogService.create(obj)
    dispatch(creating(blog))
  }
}

export const likeBlog = (obj) => {
  return async dispatch => {
    dispatch(liking(obj))
    await blogService.like({ ...obj, likes: obj.likes + 1 })
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    await blogService.deleteBlog(blog.id)
    dispatch(deleting(blog.id))
  }
}

export default blogsSlice.reducer
