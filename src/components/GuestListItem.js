import React from 'react'

const GuestListItem = ({ guests }) => {

    console.log(guests);

    return (
        <tr>
            <td>
                FName LName
            </td>
            <td>
                fname.lname@gmail.com
            </td>
            <td>
                LP-001
            </td>
            <td>
                <span class="secondary small-button">View Passport</span>
            </td>
        </tr>
    )
}

export default GuestListItem;