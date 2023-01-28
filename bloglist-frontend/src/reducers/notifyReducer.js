
import { createSlice } from '@reduxjs/toolkit'

const notifySlice = createSlice({
  name: 'notify',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      return action.payload
    }
  }
})

export const { setNotification } = notifySlice.actions

export const setNotify = (message) => {
  return async dispatch => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(setNotification(''))
    }, 5000)
  }
}
export default notifySlice.reducer
