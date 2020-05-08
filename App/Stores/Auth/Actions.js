import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
    setId: ['id']
})

export const AuthTypes = Types
export default Creators
