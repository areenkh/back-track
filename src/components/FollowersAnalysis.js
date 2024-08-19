import React, { useState, useEffect } from 'react';
import FileUploader from './FileUploader';
import CompareFollows from '../utils/CompareFollows';
import UserCard from './UserCard'; 

function FollowersAnalysis() {
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [nonFollowers, setNonFollowers] = useState([]);
    const [visibleCount, setVisibleCount] = useState(10); // Only show 10 items initially

    // Assuming 'data' is the parsed JSON from the uploaded file
    const handleFileRead = (dataType, data) => {
        console.log(`${dataType} data loaded:`, data);  // Check the data structure

        let processedData;    
        if (dataType === 'followers') {
            processedData = data.map(item => item.string_list_data.map(user => user.value)).flat();
            setFollowers(processedData);
        } else if (dataType === 'following') {
            if (data.relationships_following && Array.isArray(data.relationships_following)) {
                processedData = data.relationships_following.map(item => item.string_list_data.map(user => user.value)).flat();
                setFollowing(processedData);
            } else {
                console.error(`Following data is not properly formatted`, data);
            }
        }
    
        console.log(`${dataType} processed and set:`, processedData);  // Log processed data
    };

    useEffect(() => {
        if (followers.length > 0 && following.length > 0) {
            const results = CompareFollows(followers, following);
            setNonFollowers(results);
        }
    }, [followers, following]); 

    const showMoreUsers = () => {
        setVisibleCount(current => current + 10); // Increment the count to show more users
    };

    return (
        <div>
            <FileUploader label="Upload Followers JSON" onFileRead={(data) => handleFileRead('followers', data)} />
            <FileUploader label="Upload Following JSON" onFileRead={(data) => handleFileRead('following', data)} />
            {nonFollowers.length > 0 && (
                <div>
                    <h2>People not following you back:</h2>
                    <div>
                        {nonFollowers.slice(0, visibleCount).map((username, index) => (
                            <UserCard key={index} username={username} />
                        ))}
                    </div>
                    {visibleCount < nonFollowers.length && (
                        <button onClick={showMoreUsers} className="load-more">Load More</button> // Button to load more users
                    )}
                </div>
            )}
        </div>
    );
}

export default FollowersAnalysis;
