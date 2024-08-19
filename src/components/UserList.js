import React from 'react';
import UserCard from './UserCard'; // Import UserCard component

const UserList = ({ users }) => {
    return (
        <div className="user-grid">
            {users.map(user => (
                <UserCard key={user.id} username={user.username} />
            ))}
        </div>
    );
};

export default UserList;
