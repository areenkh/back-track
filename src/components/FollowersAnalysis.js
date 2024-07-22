import React, { useState, useEffect } from 'react';
import FileUploader from './FileUploader';
import CompareFollows from '../utils/CompareFollows';

function FollowersAnalysis() {
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [nonFollowers, setNonFollowers] = useState([]);

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

    // useEffect(() => {
    //     console.log('Current Followers:', followers);
    //     console.log('Current Following:', following);
    //     if (followers.length > 0 && following.length > 0) {
    //         console.log('Both followers and following data available');
    //         const results = CompareFollows(followers, following);
    //         console.log('Not following back:', results);
    //         setNonFollowers(results);
    //     }
    //     // console.log("heyyyyyy")
    // }, [followers, following]);  // Ensures it runs when either state changes
    
    useEffect(() => {
        if (followers.length > 0 && following.length > 0) {
            const results = CompareFollows(followers, following);
            setNonFollowers(results);
        }
    }, [followers, following]); 

    return (
        <div>
            <FileUploader label="Upload Followers JSON" onFileRead={(data) => handleFileRead('followers', data)} />
            <FileUploader label="Upload Following JSON" onFileRead={(data) => handleFileRead('following', data)} />
            {nonFollowers.length > 0 && (
                <div>
                    <h2>People not following you back:</h2>
                    <ul>
                    {nonFollowers.map((user, index) => {
                        console.log("Rendering user not following back:", user);  // Debug each rendered user
                        return <li key={index}>{user}</li>;
                    })}
                </ul>
                </div>
            )}
        </div>
    );
}

export default FollowersAnalysis;
