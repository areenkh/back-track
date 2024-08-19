import React,{ useState }  from 'react';
import UserCard from './UserCard'; // Import UserCard component

const UserList = ({ users }) => {
    const [visibleCount, setVisibleCount] = useState(10); // Start with 10 items

    const showMoreUsers = () => {
        setVisibleCount(prevCount => prevCount + 10); // Show 10 more items
    };

    return (
        <div>
            <div className="user-grid">
                {users.slice(0, visibleCount).map(user => (
                    <UserCard key={user.id} username={user.username} />
                ))}
            </div>
            {visibleCount < users.length && (
                <button onClick={showMoreUsers} className="load-more">Load More</button> // Button to load more items
            )}
        </div>
    );
};

export default UserList;
