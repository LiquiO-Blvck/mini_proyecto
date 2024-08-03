import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'
import { TGimnasio } from '../../../types/gimnasio/TGimnasio.type'

export type GimnasiosState = {
  gimnasio: TGimnasio | null
}

const initialState: GimnasiosState = {
  gimnasio: null as TGimnasio | null
}

const userSlice = createSlice({
    name: `${SLICE_BASE_NAME}`,
    initialState,
    reducers: {
      setGimnasio(state, action: PayloadAction<TGimnasio>) {
        state.gimnasio = action.payload
      }
    },
})

export const { setGimnasio } = userSlice.actions
export default userSlice.reducer