import { configureStore } from '@reduxjs/toolkit'
import blogsReducer from './reducers/blogsReducer'
import userReducer from './reducers/userReducer'
import notifyReducer from './reducers/notifyReducer'

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    user: userReducer,
    notify: notifyReducer,
  }
})

export default store
