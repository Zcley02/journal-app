import Swal from 'sweetalert2';

import { fileUpload } from '../helpers/fileUpload'
import { db } from '../firebase/firebaseConfig'
import { loadNotes } from '../helpers/loadNotes';
import { types } from '../types/types';

export const startNewNote = () => {

    return async(dispatch, getState) => {
        
        const { uid } = getState().auth;

        const newNote = {
            title: "",
            body: "",
            date: new Date().getTime()
        }

        try {
            
           const doc = await db.collection(`${uid}/journal/notes`).add(newNote);
           
           dispatch( activeNote(doc.id, newNote) );
           dispatch( addNewNote(doc.id, newNote) );
            
            console.log("nose")

        } catch (error) {   
            console.log(error);
        }

    }

}

export const updateNote = (note) => {
    
    return async(dispatch, getState) => {

        const {uid} = getState().auth;

        if( !note.url ){
            delete note.url;
        }

        console.log(note.title)

        const noteToFirestore = {...note};
        delete noteToFirestore.id;

        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);
        dispatch(refreshNote(note.id, noteToFirestore));

        console.log("Con exito");

    }

}

export const startDeleteNote = (id) => {

    return async (dispatch, getState) => {

        const {uid} = getState().auth;

        await db.doc(`${uid}/journal/notes/${id}`).delete();
        dispatch( deleteNote(id) );
        Swal.fire('Deleted', 'Eliminado', 'success');

    }

}

export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id
})

export const refreshNote = (id, note) => ({
    type: types.notesUpdated,
    payload: {
        id,
        note: {
            id, ...note
        }
    }
})

export const startLoadingNotes = (uid) => {

    return async (dispatch) => {
        const notes = await loadNotes(uid);

        dispatch( setNotes(notes) );
    }

}

export const startUploadFile = (file) => {

    return async (dispatch, getState) => {
        
        const {active:note} = getState().notes;

        Swal.fire({
            title: 'Uploading',
            text: 'Please wait...',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        });


        const fileUrl = await fileUpload(file);
        note.url = fileUrl;

        dispatch(updateNote(note));

        Swal.close();


    }

}

export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
})

export const addNewNote = (id, note) => ({
    type: types.notesAddNew,
    payload: {id, ...note}
})

export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {id, ...note}
})

export const logoutNotes = () => ({
    type: types.notesLogoutCleaning
})