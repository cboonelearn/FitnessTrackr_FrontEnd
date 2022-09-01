import { getRoutines, getUserData, getUserRoutines, createRoutine, deleteRoutine } from "../api";
import React, { useEffect, useState } from "react";

const MyRoutines = (props) => {
    const {myRoutines, setMyRoutines, userData, tokenString, userName} = props;
    const [routineNameString, setRoutineNameString] = useState('')
    const [routineGoalString, setRoutineGoalString] = useState('')
    const [routineIsPublic, setRoutineIsPublic] = useState(false)

    // ;(async () => {
    //     const username = await getUserData(tokenString)
    //     console.log('Testing username:', username);
    // })()
    
    const handleRoutines = () =>{
        // getRoutines()
        getUserRoutines(userName, tokenString)
        .then(results => {
            setMyRoutines(results)
            console.log(results)
        });
    }
    
    useEffect(() =>{
        handleRoutines();
    }, []);

    return ( 
        <div className="Routines">
            <h1>Routines</h1>
            <form 
                onSubmit={async (event) => {
                    try {
                        event.preventDefault()
                        await createRoutine(routineNameString, routineGoalString, routineIsPublic, tokenString)
                        handleRoutines()
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
                <button id='deleteRoutineButton' onClick={async (event) => {
                    event.preventDefault()
                    await deleteRoutine(routine.id, tokenString) 
                    handleRoutines()
                    }}>
                    DELETE
                </button>
                </div>)
            })}
        </div>
     );
}

export default MyRoutines;