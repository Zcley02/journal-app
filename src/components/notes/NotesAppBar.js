import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startUploadFile, updateNote } from '../../actions/notes';

export const NotesAppBar = () => {

    const { active:note } = useSelector(state => state.notes);
    const dispatch = useDispatch();

    const handleUpdateNote = () => {
        dispatch( updateNote(note) );
    }

    const handleBtnFile = () => {
        document.querySelector('#fileSelector').click();
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if(file){
            dispatch( startUploadFile(file) );
        }
    }

    return (
        <div className="notes__appbar">
            <span>28 de agosto 2020</span>

            <div>
                <input 
                    id="fileSelector"
                    type="file"
                    name="file"
                    style={{display: 'none'}}
                    onChange={ handleFileChange }
                />

                <button 
                    className="btn"
                    onClick={handleBtnFile}
                >
                    Picture
                </button>

                <button 
                    className="btn"
                    onClick={handleUpdateNote}
                >
                    Save
                </button>
            </div>
        </div>
    )
}
