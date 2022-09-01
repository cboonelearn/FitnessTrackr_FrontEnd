import { createRoutine, getUserRoutines, getUserData, getRoutines } from "../api";
import React, { useEffect, useState } from "react";

const MyRoutinesDraft = (props) => {
    const { userData, setUserData, tokenString, routines, myRoutines, setMyRoutines } = props
    // const [myRoutines, setMyRoutines] = useState([]);
    const [routineNameString, setRoutineNameString] = useState('')
    const [routineGoalString, setRoutineGoalString] = useState('')
    const [routineIsPublic, setRoutineIsPublic] = useState(true)
    console.log('userData:', userData);
    console.log('tokenString:', tokenString);
    console.log('myRoutines:', myRoutines);

    // const handleMyRoutines = async () => {
    //     const results = await getUserRoutines(userData, tokenString)
    //     // const results = await getRoutines()
    //     setMyRoutines(results)
    //     console.log('handleMyRoutines:', results);
    // }

    // const handleMyRoutines = () =>{
    //     getUserRoutines(userData, tokenString)
    //     .then(results => {
    //         setMyRoutines(results)
    //         console.log(results)   //REMOVE THIS LATER
    //     });
    // }
    useEffect(() =>{
        async function handleMyRoutines() {
            let response = await getUserRoutines(userData, tokenString)
            setMyRoutines(response)
        }
        
        const myData = async () => {
            const response = await getUserData(localStorage.getItem('token'))
            const result = await response.username
            setUserData(result)
        }
        myData()
        handleMyRoutines();
    }, []);

    return ( 
        <div className="Routines">
            <h1>Routines</h1>
            {/* <button id='createRoutineButton' onClick={(event) => {
                    event.preventDefault()
                    document.getElementById('createRoutineForm').classList.toggle('hidden')
                }}>
                Create Routine
            </button> */}
            <form 
                onSubmit={async (event) => {
                    try {
                        event.preventDefault()
                        await createRoutine(routineNameString, routineGoalString, routineIsPublic, tokenString)
                        // handleMyRoutines()
                    } catch (error) {
                        console.error(error)
                    }
                }}
                id='createRoutineForm'
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <h1 id='newRoutineLabel'>New Routine</h1>
                <input 
                    id='newRoutineName'
                    type='text'
                    required
                    placeholder='Routine Name*'
                    value={routineNameString}
                    onChange={(event) => {setRoutineNameString(event.target.value)}}/>
                <input 
                    id='newRoutineGoal'
                    type='text'
                    required
                    placeholder='Routine Goal*'
                    value={routineGoalString}
                    onChange={(event) => {setRoutineGoalString(event.target.value)}}/>
                <div id='isPublicDiv'>Is Public? <input id='newRoutineIsPublic' type='checkbox'  
                onChange={(event) => {
                    setRoutineIsPublic(event.target.checked)
                }}></input></div>
                <button id='createRoutineButton'>Create Routine</button>
                
            </form>
            {myRoutines.map((routine) =>{ return (<div key={routine.id}>
                <h2>Routine Name: {routine.name}</h2>
                <p>Goal: {routine.goal}</p>
                <p>Creator: {routine.creatorName}</p>
                <p>Included Activities:</p>
                {routine.activities.map((activity) => { return (<div key={activity.id}>
                    <ul>
                    <li>Activity Name: {activity.name}</li>
                        <ul>
                            <li>Activity Description: {activity.description}</li>
                            {activity.duration ? <li>Activity Duration: {activity.duration}</li> : null}
                            {activity.count ? <li>Activity Count: {activity.count}</li> : null}
                        </ul>
                    </ul>
                    </div>)
                })}
                </div>)
            })
        }
        </div>
     );
}

export default MyRoutinesDraft;