
import { createSlice } from '@reduxjs/toolkit'

const notifySlice = createSlice({
  name: 'notify',
  initialState: '',
  reducers: {
    setNotify(state, action) {
      return action.payload
    }
  }
})

export const { setNotify } = notifySlice.actions
export default notifySlice.reducer
