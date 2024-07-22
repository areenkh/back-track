// function CompareFollows(followersData, followingData) {
//     // Extract usernames from followers data
//     const followersUsernames = followersData.map(entry => {
//         return entry.string_list_data.map(user => user.value).flat();
//     }).flat();

//     // Extract usernames from following data
//     const followingUsernames = followingData.relationships_following.map(entry => {
//         return entry.string_list_data.map(user => user.value).flat();
//     }).flat();

//     // Create sets for comparison
//     const followersSet = new Set(followersUsernames);
//     // const followingSet = new Set(followingUsernames);

//     // // Find usernames that are in the 'following' set but not in the 'followers' set
//     // const notFollowingBack = [...followingSet].filter(user => !followersSet.has(user));
//     const notFollowingBack = followingUsernames.filter(username => !followersSet.has(username));


//     return notFollowingBack;
// }

// function CompareFollows(followers, following) {
//     // Extract usernames from followers data
//     const followersUsernames = followers.map(item => 
//         item.string_list_data.map(user => user.value)
//     ).flat();

//     // Extract usernames from following data
//     const followingUsernames = following.map(item => 
//         item.string_list_data.map(user => user.value)
//     ).flat();

//     // Create sets for comparison
//     const followersSet = new Set(followersUsernames);
//     const notFollowingBack = followingUsernames.filter(user => !followersSet.has(user));

//     return notFollowingBack;
// }

function CompareFollows(followers, following) {
    console.log('Comparing followers:', followers);
    console.log('Comparing following:', following);

    const followersSet = new Set(followers);
    const followingsArray = Array.from(new Set(following));  // Convert Set back to Array
    const notFollowingBack = followingsArray.filter(user => !followersSet.has(user));
    
    console.log('Not following back:', notFollowingBack);
    return notFollowingBack;
}

export default CompareFollows;
