import React from 'react';
import { stringToColor } from '../utils/colorUtils'; // Import the color utility

const UserCard = ({ username }) => {
    const avatarStyle = {
        backgroundColor: stringToColor(username), // Set background color using the username
        color: 'white', // Set text color to white for contrast
        display: 'inline-block',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        textAlign: 'center',
        lineHeight: '40px', // Center the text vertically
    };

    return (
        <div className="user-card">
            <div style={avatarStyle}>{username[0].toUpperCase()}</div> {/* Display the first letter as avatar */}
            <div className="username">{username}</div>
            <button className="follow-btn">Follow</button>
        </div>
    );
};

export default UserCard;
