export const BASE_URL = 'http://fitnesstrac-kr.herokuapp.com/api/'

// LogIn helper function by setting localStorage token
export const logIn = (token, username) => {
    // setToken(true)
    localStorage.setItem('token', token)
    localStorage.setItem('username', username)
}

// LogOut helper function by clearing localStorage token
export const logOut = () => {
    localStorage.setItem('token', null)
    localStorage.setItem('username', null)
}

// Helper function for making the request headers
export const makeHeaders = (tokenString) => {
    let headers = {}
    if (tokenString!=='null' && tokenString!==null) {
        headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + tokenString.slice(1, -1)
        }
        return headers
    }    
}

// Register new user
export async function registerNewUser(username, password) {
    return fetch(`${BASE_URL}users/register`, {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        username: username,
        password: password
    })
    }).then(response => response.json())
    .then(result => {
        console.log('registerNewUser', result);  // REMOVE THIS LATER
        return(result)
    })
    .catch(console.error)
}

// User login
export async function logInUser(username, password) {
    return fetch(`${BASE_URL}users/login`, {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        username: username,
        password: password
    })
    }).then(response => response.json())
    .then(result => {
        console.log('logInUser', result);  // REMOVE THIS LATER
        return(result)
    })
    .catch(console.error);
}

// Get user data
export async function getUserData(tokenString) {
    let headers = makeHeaders(tokenString)
    return fetch(`${BASE_URL}users/me`, {
        headers: headers,
    }).then(response => response.json())
    .then(result => {
        console.log('getUserData', result);   //REMOVE THIS LATER
        return(result)
    })
    .catch(console.error);
}

// Get user routines
export async function getUserRoutines(username, tokenString) {
    let headers = makeHeaders(tokenString)
    return fetch(`${BASE_URL}users/${username}/routines`, {
        headers: headers,
    }).then(response => response.json())
    .then(result => {
        console.log('getUserRoutines:', result);   //REMOVE THIS LATER
        return(result)
    })
    .catch(console.error);
}

// Get activities
export const getActivities = async () =>{
    try{
        const request = await fetch(`${ BASE_URL }activities`);
        const response = await request.json();
        return response;
    } catch(error){
        console.error(error);
    }
}

// Post new activity (Requires a logged-in user)
export async function createActivity(activityName, activityDescription, tokenString) {
    let headers = makeHeaders(tokenString)
    return fetch(`${BASE_URL}activities`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            name: activityName,
            description: activityDescription
        })
    }).then(response => response.json())
    .then(result => {
        console.log('createActivity:', result);   //REMOVE THIS LATER
        if (result.error) {
            alert("This Activity Already Exists")
        }
        return(result)
    })
    .catch(console.error);
} 

// Patch (update) activity (requires a logged-in user)
export async function updateActivity(activityName, activityDescription, activityId) {
    return fetch(`${BASE_URL}activities/${activityId}`, {
        method: "PATCH",
        body: JSON.stringify({
            name: activityName,
            description: activityDescription
        })
    }).then(response => response.json())
    .then(result => {
        console.log('updateActivity:', result);   //REMOVE THIS LATER
        return(result)
    })
    .catch(console.error);
}

// Get routines with activity
export async function getRoutinesWithActivity(activityId) {
    return fetch(`${BASE_URL}activities/${activityId}/routines`, {
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response => response.json())
    .then(result => {
        console.log('getRoutinesWithActivity:', result);   //REMOVE THIS LATER
        return(result)
    })
    .catch(console.error);
}

// Get all routines
export async function getRoutines() {
    return fetch(`${BASE_URL}routines`, {
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response => response.json())
    .then(result => {
        console.log('getRoutines:', result);   //REMOVE THIS LATER
        return(result)
    })
    .catch(console.error);
}

// Post new routine (requires a logged-in user)
export async function createRoutine(routineName, routineGoal, routineIsPublic = null, tokenString) {
    let headers = makeHeaders(tokenString)
    return fetch(`${BASE_URL}routines`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            name: routineName,
            goal: routineGoal,
            isPublic: routineIsPublic
        })
    }).then(response => response.json())
    .then(result => {
        console.log('createRoutine:', result);   //REMOVE THIS LATER
        return(result)
    })
    .catch(console.error);
}

// Patch (update) routine (requires a logged-in user that also is the owner of the routine)
export async function updateRoutine(routineName, routineGoal, routineIsPublic = null, routineId, tokenString) {
    let headers = makeHeaders(tokenString)
    return fetch(`${BASE_URL}routines/${routineId}`, {
        method: "PATCH",
        headers: headers,
        body: JSON.stringify({
            name: routineName,
            goal: routineGoal,
            isPublic: routineIsPublic
        })
    }).then(response => response.json())
    .then(result => {
        console.log('updateRoutine:', result);   //REMOVE THIS LATER
        return(result)
    })
    .catch(console.error);
}

// Delete routine (requires a logged-in user that also is the onwer of the routine)
export async function deleteRoutine(routineId, tokenString) {
    let headers = makeHeaders(tokenString)
    return fetch(`${BASE_URL}routines/${routineId}`, {
        method: "DELETE",
        headers: headers
    }).then(response => response.json())
    .then(result => {
        console.log('deleteRoutine:', result);
        return(result)
    })
    .catch(console.error);
}

// Post (add) an activity to a routine
export async function addActivityToRoutine(activityId, activityCount, activityDuration, routineId) {
    return fetch(`${BASE_URL}routines/${routineId}/activities`, {
        method: "POST",
        body: JSON.stringify({
            activityId: activityId,
            count: activityCount,
            duration: activityDuration
        })
    }).then(response => response.json())
    .then(result => {
        console.log('addActivityToRoutine:', result);    //REMOVE THIS LATER
        return(result)
    })
    .catch(console.error);
}

// Patch (update) an activity attached to a routine (requires a logged-in user that is also the owner of the routine)
export async function updateActivityInRoutine(activityCount, activityDuration, routineActivityId, tokenString) {
    let headers = makeHeaders(tokenString)
    return fetch(`${BASE_URL}routine_activities/${routineActivityId}`, {
        method: "PATCH",
        headers: headers,
        body: JSON.stringify({
            count: activityCount,
            duration: activityDuration
        })
    }).then(response => response.json())
    .then(result => {
        console.log('updateActivityInRoutine:', result);    //REMOVE THIS LATER
        return(result)
    })
    .catch(console.error);
}

// Delete activity from a routine (requires a logged-in user that is also the owner of the routine)
export async function deleteActivityInRoutine(routineActivityId, tokenString) {
    let headers = makeHeaders(tokenString)
    return fetch(`${BASE_URL}routine_activities/${routineActivityId}`, {
        method: "DELETE",
        headers: headers
    }).then(response => response.json())
    .then(result => {
        console.log('deleteActivityInRoutine:', result);
        return(result)
    })
    .catch(console.error)
}