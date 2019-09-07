import React from 'react'

const NoGuestListItem = ({info}) => {

    return (
        <tr style={{
            padding: "1.6rem .8rem 1.6rem .8rem", 
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            display: "block"
            }}>
            {info}
        </tr>
    )
}

export default NoGuestListItem;