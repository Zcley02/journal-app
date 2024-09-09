import { firebase, googleAuthProvider } from '../firebase/firebaseConfig'
import { types } from '../types/types';

export const starLoginWithGoogle = () => {
    return ( dispatch ) => {
        firebase.auth().signInWithPopup( googleAuthProvider )
            .then(({user}) => {
                console.log(user);
                dispatch(
                    login(user.uid, user.displayName )
                )
            });
    }
}


export const startLogiWithEmailAndPassword = (email, password) => {
    return (dispatch) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then( ({user}) => {
                dispatch(
                    login(user.uid, user.displayName )
                )
            })
    }
}

export const startRegisterWithEmailAndPassword = (email, password, name) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then( async({ user }) => {
                console.log(user);
                await user.updateProfile({ displayName: name });

                dispatch(login(user.uid, user.displayName));
            })
            .catch( e => {
                console.log(e);
            });
    }
}

export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid: uid,
        name: displayName
    }
});


export const startLogout = () => {
    return async (dispatch) => {
        await firebase.auth().signOut();
        dispatch(logout());

    }
}


export const logout = () => ({
    type: types.logout
})