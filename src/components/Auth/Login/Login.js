import React, { useEffect } from 'react';
import { Typography, FormControl, InputLabel, InputAdornment, IconButton, Input, Button, FormHelperText } from '@mui/material';
import "./Login.css";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box } from '@mui/system';
import { NavLink } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import useAuthContext from '../../../others/useAuthContext';


const Login = () => {
    const { loginEmail, authError, setAuthError } = useAuthContext();

    useEffect(() => setAuthError(null), [setAuthError])
    useEffect(() => {
        authError && setValues({ email: '', password: '', showPassword: '' })
    }, [authError])

    const [values, setValues] = React.useState({
        email: '',
        password: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleSubmit = (event) => {
        const { email, password } = values;
        let err = null;
        email === '' ? err = "Email is required" :
            !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email) ?
                err = "Enter a valid email" :
                password === '' ? err = "Password is required" :
                    loginEmail(email, password);
        err && setAuthError(err);
        event.preventDefault();
    }

    return (
        <div className="login-container">
            <div className="form-container">
                <Typography variant="h3" >
                    <Typewriter
                        options={{ loop: true }}
                        onInit={(typewriter) => {
                            typewriter.typeString('Login')
                                .pauseFor(2500)
                                .deleteAll()
                                .start();
                        }}
                    />
                </Typography>
                <form style={{ margin: '20px 0 0' }} onSubmit={handleSubmit}>
                    <FormControl sx={{ m: 1 }} color="primary" variant="standard" fullWidth >
                        <InputLabel htmlFor="login-email">Email</InputLabel>
                        <Input
                            id="login-email"
                            type='email'
                            defaultValue={values.email}
                            onChange={handleChange('email')} />
                    </FormControl>
                    <FormControl sx={{ m: 1 }} color="primary" variant="standard" fullWidth >
                        <InputLabel htmlFor="login-passwordField">Password</InputLabel>
                        <Input
                            id="login-passwordField"
                            type={values.showPassword ? 'text' : 'password'}
                            defaultValue={values.password}
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>

                    <FormHelperText sx={{ color: 'red', mx: 1, textTransform: 'capitalize' }}>{authError && authError}</FormHelperText>

                    <Box><Typography sx={{ textAlign: 'right' }}>Forgot Password</Typography></Box>


                    <Button variant="contained" size="large" color="primary" type="submit"
                        sx={{ width: '100%', margin: '30px 0' }}>Login
                    </Button>

                </form>
                <Box>
                    <Typography sx={{ textAlign: 'center' }}>
                        Don't have account? <NavLink to="/auth/signup"
                            style={{ color: 'red' }}>
                            Create account</NavLink>
                    </Typography>
                </Box>
            </div>
        </div>
    );
};

export default Login;