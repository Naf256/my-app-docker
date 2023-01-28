import { configureStore } from '@reduxjs/toolkit'
import blogsReducer from './reducers/blogsReducer'
import userReducer from './reducers/userReducer'
import notifyReducer from './reducers/notifyReducer'
import commentsReducer from './reducers/commentsReducer'

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    user: userReducer,
    notify: notifyReducer,
    comments: commentsReducer
  }
})

export default store
