import React, { useEffect } from 'react';
import { Typography, FormControl, InputLabel, InputAdornment, IconButton, Input, Button, FormHelperText } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box } from '@mui/system';
import { NavLink } from 'react-router-dom';
import useAuthContext from '../../../others/useAuthContext';
import Typewriter from 'typewriter-effect';
import LoadingSpinner from '../../Common/LoadingSpinner/LoadingSpinner';

const SignUp = () => {
    const { signUp, authError, setAuthError, authLoading } = useAuthContext();

    useEffect(() => setAuthError(null), [setAuthError])
    useEffect(() => {
        authError || setValues({ email: '', password: '', showPassword: '' })
    }, [authError])

    const [values, setValues] = React.useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
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
        const { name, email, password, confirmPassword } = values;
        let err;
        email === '' ? err = "Email is required" :
            !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email) ?
                err = "Enter a valid email" :
                password !== confirmPassword ? err = "Password didn't matched" :
                    password.length < 6 ?
                        err = "Password must be bigger than 6 characters" :
                        name === '' ? err = "Name is required" :
                            signUp(name, email, password);
        err && setAuthError(err);
        event.preventDefault();
    }


    return (
        <div className="signUp-container">
            <div className="form-container">
                <Typography variant="h4" >
                    <Typewriter
                        options={{ loop: true }}
                        onInit={(typewriter) => {
                            typewriter.typeString('Create an account')
                                .pauseFor(2500).deleteAll()
                                .typeString('Sign up').pauseFor(2500)
                                .deleteAll()
                                .typeString('Register New Account')
                                .pauseFor(2500)
                                .start();
                        }}
                    />
                </Typography>
                <form onSubmit={handleSubmit} style={{ margin: '20px 0 0' }}>
                    <FormControl sx={{ m: 1 }} color="primary" variant="standard" fullWidth >
                        <InputLabel htmlFor="signUp-name">Name</InputLabel>
                        <Input
                            id="signUp-name"
                            type='text'
                            defaultValue={values.name}
                            required
                            onChange={handleChange('name')} />
                    </FormControl>
                    <FormControl sx={{ m: 1 }} color="primary" variant="standard" fullWidth >
                        <InputLabel htmlFor="signUp-email">Email</InputLabel>
                        <Input
                            id="signUp-email"
                            type='email'
                            defaultValue={values.email}
                            required
                            onChange={handleChange('email')} />
                    </FormControl>
                    <FormControl sx={{ m: 1 }} color="primary" variant="standard" fullWidth >
                        <InputLabel htmlFor="signUp-passwordField">Password</InputLabel>
                        <Input
                            id="signUp-passwordField"
                            type={values.showPassword ? 'text' : 'password'}
                            defaultValue={values.password}
                            required
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
                    <FormControl sx={{ m: 1 }} color="primary" variant="standard" fullWidth >
                        <InputLabel htmlFor="signUp-passwordField">Confirm Password</InputLabel>
                        <Input
                            id="signUp-passwordField2"
                            type={values.showPassword ? 'text' : 'password'}
                            defaultValue={values.confirmPassword}
                            required
                            onChange={handleChange('confirmPassword')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}>
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormHelperText sx={{ color: 'red', mx: 1, textTransform: 'capitalize', height: '15px' }}>{authError && authError}</FormHelperText>

                    <Box sx={{ height: '30px' }}>
                        {authLoading && <LoadingSpinner width="30px" height="30px" />}
                    </Box>

                    <Button variant="contained" size="large" color="primary"
                        type="submit"
                        sx={{ width: '100%', mt: 1.5, mb: 4 }}>Sign Up
                    </Button>
                </form>

                <Box>
                    <Typography sx={{ textAlign: 'center' }}>
                        Already have an account? <NavLink to="/auth/login"
                            style={{ color: 'red' }}>Login</NavLink>
                    </Typography>
                </Box>
            </div>
        </div>
    );
};

export default SignUp;