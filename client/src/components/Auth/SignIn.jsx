import React, { useState } from 'react'
import { Paper, Box, TextField, InputLabel, Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logIn } from '../../reducers/userReducer'

const SignIn = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    //const {loading, user} = useSelector((state) => state.user)


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userLogin = () => {
        dispatch(logIn(formData))
        navigate('/')
    }

    return (
        <Paper>
            <form onSubmit={userLogin}>
                <Box>
                    <InputLabel>Username</InputLabel>
                    <TextField name={'username'}
                        value={formData.username}
                        placeholder='UserName'
                        onChange={({ target }) => setFormData({ ...formData, username: target.value })} />
                </Box>
                <Box>
                    <InputLabel>Password:</InputLabel>
                    <TextField name='password' type='password'
                        value={formData.password}
                        onChange={({ target }) => setFormData({ ...formData, password: target.value })} />
                </Box>
                <Box>
                    <Button type='submit' variant='contained' color='primary'>Iniciar Sesion</Button>
                </Box>
            </form>
        </Paper>
    )
}

export default SignIn