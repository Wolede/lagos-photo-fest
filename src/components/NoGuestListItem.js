import React from 'react'

const NoGuestListItem = (children) => {

    return (
        <tr style={{
            padding: "1.6rem .8rem 1.6rem .8rem", 
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            display: "block"
            }}>
            There are no guest details yet
        </tr>
    )
}

export default NoGuestListItem;