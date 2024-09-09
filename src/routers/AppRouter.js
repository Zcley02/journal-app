import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from 'react-router-dom';
import { firebase } from '../firebase/firebaseConfig'
import { useDispatch } from 'react-redux';

import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { PrivateRoute } from './PrivateRoute';
import { login } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(() => {
        
        firebase.auth().onAuthStateChanged(async(user) => {
            if(user?.uid){
                
                dispatch(login(user.uid, user.displayName));

                dispatch( startLoadingNotes(user.uid) );

                setIsLoggedIn(true);
                setChecking(false);

            }else{
                setIsLoggedIn(false);
            }

            setChecking(false);

        });

    }, [dispatch, setChecking, setIsLoggedIn])
    

    if ( checking ) {
        return (
            <h1>Wait...</h1>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        isAuthenticated={ isLoggedIn }
                        path="/auth"
                        component={ AuthRouter }
                    />

                    <PrivateRoute
                        exact
                        isAuthenticated={ isLoggedIn }
                        path="/"
                        component={ JournalScreen }
                    />

                    <Redirect to="/auth/login" />


                </Switch>
            </div>
        </Router>
    )
}
