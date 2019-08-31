import React from 'react'

const GuestListItem = ({ guest: { uid, first_name, last_name, email, guest_id }, onClick }) => {

    return (
        <tr>
            <td>{`${first_name} ${last_name}`}</td>
            <td>{email}</td>
            <td>{guest_id}</td>
            <td>
                <span
                    data-id={uid} 
                    className="secondary small-button"
                    onClick={ e => onClick(e.target)}>View Passport</span>
            </td>
        </tr>
    )
}

export default GuestListItem;