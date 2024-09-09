import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import validator from 'validator';

import { useForm } from '../../hooks/useForm';
import { startRegisterWithEmailAndPassword } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch();

    const [ values, handleInputChange ] = useForm({
        name: "",
        email: "",
        password: "",
        password2: ""
    });

    const { name, email, password, password2 } = values;

    const handleRegister = (e) => {
        e.preventDefault();

        if(isFormValid){
            dispatch(startRegisterWithEmailAndPassword(email, password, name));
        }

    }

    const isFormValid = () => {

        if( name.trim().length === 0 ){

            return false;
        } else if(!validator.isEmail(email)){
            return false;
        } else if( password !== password2 || password.length < 5 ){
            return false;
        }

        return true;

    }

    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form onSubmit={handleRegister}>

                <input 
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    onChange={handleInputChange}
                    value={name}
                />

                <input 
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    onChange={handleInputChange}
                    value={email}
                />

                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    onChange={handleInputChange}
                    value={password}
                />

                <input 
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    onChange={handleInputChange}
                    value={password2}
                />


                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>

               

                <Link 
                    to="/auth/login"
                    className="link"
                >
                    Already registered?
                </Link>

            </form>
        </>
    )
}
