import React from 'react'

const GuestListItem = ({ guest: { firstname, lastname, email } }) => {

    console.log(firstname);

    return (
        <tr>
            <td>{`${firstname} ${lastname}`}</td>
            <td>{email}</td>
            <td>LP-001</td>
            <td>
                <span class="secondary small-button">View Passport</span>
            </td>
        </tr>
    )
}

export default GuestListItem;