import React, { useState, useEffect } from 'react';
import FileUploader from './FileUploader';
import CompareFollows from '../utils/CompareFollows';
import UserCard from './UserCard'; 

function FollowersAnalysis() {
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [nonFollowers, setNonFollowers] = useState([]);
    const [visibleCount, setVisibleCount] = useState(10); // Only show 10 items initially
    const [showResults, setShowResults] = useState(false); // Track if the results should be shown

    const handleFileRead = (dataType, data) => {
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
    };

    useEffect(() => {
        if (followers.length > 0 && following.length > 0) {
            const results = CompareFollows(followers, following);
            setNonFollowers(results);
            setShowResults(true);  // Display results when both datasets are ready
        }
    }, [followers, following]);

    const showMoreUsers = () => {
        setVisibleCount(current => current + 10); // Increment the count to show more users
    };

    const handleGoBack = () => {
        setShowResults(false); // Hide results and show the file uploaders
        setNonFollowers([]);   // Clear the results
        setVisibleCount(10);   // Reset visible count
    };

    return (
        <div>
            {!showResults && (
                <div>
                    <p>Please refer to the README on our <a href="https://github.com/areenkh/back-track">GitHub page</a> for instructions on how to download your Instagram data files.</p>
                    <FileUploader label="Upload Followers JSON" onFileRead={(data) => handleFileRead('followers', data)} />
                    <FileUploader label="Upload Following JSON" onFileRead={(data) => handleFileRead('following', data)} />
                </div>
            )}
            {showResults && nonFollowers.length > 0 && (
                <div>
                    <h2>People not following you back:</h2>
                    <div>
                        {nonFollowers.slice(0, visibleCount).map((username, index) => (
                            <UserCard key={index} username={username} />
                        ))}
                    </div>
                    {visibleCount < nonFollowers.length && (
                        <button onClick={showMoreUsers} className="load-more">Load More</button>
                    )}
                    <button onClick={handleGoBack}>Go Back</button>
                </div>
            )}
        </div>
    );
}

export default FollowersAnalysis;

// import React, { useState, useEffect } from 'react';
// import FileUploader from './FileUploader';
// import CompareFollows from '../utils/CompareFollows';
// import UserCard from './UserCard'; 

// function FollowersAnalysis() {
//     const [followers, setFollowers] = useState([]);
//     const [following, setFollowing] = useState([]);
//     const [nonFollowers, setNonFollowers] = useState([]);
//     const [visibleCount, setVisibleCount] = useState(10); // Only show 10 items initially
//     const [showResults, setShowResults] = useState(false); // Track if the results should be shown

//     const handleFileRead = (dataType, data) => {
//         let processedData;
//         if (dataType === 'followers') {
//             processedData = data.map(item => item.string_list_data.map(user => user.value)).flat();
//             setFollowers(processedData);
//         } else if (dataType === 'following') {
//             processedData = data.relationships_following.map(item => item.string_list_data.map(user => user.value)).flat();
//             setFollowing(processedData);
//         }
//     };

//     useEffect(() => {
//         if (followers.length > 0 && following.length > 0) {
//             const results = CompareFollows(followers, following);
//             setNonFollowers(results);
//             setShowResults(true);  // Trigger display of results
//         }
//     }, [followers, following]);

//     const showMoreUsers = () => {
//         setVisibleCount(current => current + 10); // Increment the count to show more users
//     };

//     const handleGoBack = () => {
//         setShowResults(false); // Hide results and show the file uploaders
//         setNonFollowers([]);   // Clear the results
//         setVisibleCount(10);   // Reset visible count
//     };

//     return (
//         <div className="app">
//             {!showResults ? (
//                 <div>
//                     <p>Please refer to the README on our <a href="https://github.com/areenkh/back-track">GitHub page</a> for instructions on how to download your Instagram data files.</p>
//                     <FileUploader label="Upload Followers JSON" onFileRead={(data) => handleFileRead('followers', data)} />
//                     <FileUploader label="Upload Following JSON" onFileRead={(data) => handleFileRead('following', data)} />
//                 </div>
//             ) : (
//                 <div>
//                     <h2>People not following you back:</h2>
//                     <div>
//                         {nonFollowers.slice(0, visibleCount).map((username, index) => (
//                             <UserCard key={index} username={username} />
//                         ))}
//                     </div>
//                     {visibleCount < nonFollowers.length && (
//                         <button onClick={showMoreUsers} className="load-more">Load More</button>
//                     )}
//                     <button onClick={handleGoBack}>Go Back</button>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default FollowersAnalysis;
