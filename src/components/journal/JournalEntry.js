import React from 'react'
import { useDispatch } from 'react-redux'
import { activeNote } from '../../actions/notes';

export const JournalEntry = ({
    id,
    title,
    body,
    date,
    url
}) => {

    const dispatch = useDispatch();

    const handleActiveNote = () => {
        
        dispatch( activeNote(id, {
            title, body, date, url
        }) );
    }

    return (
        <div 
            className="journal__entry pointer"
            onClick={handleActiveNote}
        >
            {
                (url) &&
                    <div 
                        className="journal__entry-picture"
                        style={{
                            backgroundSize: 'cover',
                            backgroundImage: `url(${url})`
                        }}
                    ></div>

            }

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    {title}
                </p>
                <p className="journal__entry-content">
                    {body}
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>Monday</span>
                <h4>28</h4>
            </div>

        </div>
    )
}
