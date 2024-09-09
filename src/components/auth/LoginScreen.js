import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { starLoginWithGoogle, startLogiWithEmailAndPassword } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';


export const LoginScreen = () => {


    const dispatch = useDispatch();
    const [values, handleInputChange] = useForm({
        email: "",
        password: ""
    });

    const { email, password } = values;

    const handleGoogleLogin = () => {

        dispatch( starLoginWithGoogle() );

    }

    const handleLoginEmailAndPassword = (e) => {
        e.preventDefault();

        dispatch(startLogiWithEmailAndPassword(email, password));
    }

    return (
        <>
            <h3 className="auth__title">Login</h3>

            <form onSubmit={handleLoginEmailAndPassword}> 

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


                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                >
                    Login
                </button>

                
                <div className="auth__social-networks">
                    <p>Login with social networks</p>

                    <div 
                        className="google-btn"
                        onClick={handleGoogleLogin}
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link 
                    to="/auth/register"
                    className="link"
                >
                    Create new account    
                </Link>

            </form>
        </>
    )
}
