import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { updateRoutine, getUserRoutines, getActivities, addActivityToRoutine, deleteActivityInRoutine } from "../api";

const EditRoutine = (props) => {
    const {myRoutines, setMyRoutines, tokenString, userName} = props
    const params = useParams();
    const [routineNameString, setRoutineNameString] = useState('')
    const [routineGoalString, setRoutineGoalString] = useState('')
    const [routineIsPublic, setRoutineIsPublic] = useState(false)
    const [activities, setActivities] = useState([]);
    const [activityCountString, setActivityCountString] = useState('')
    const [activityDurationString, setActivityDurationString] = useState('')
    const [activity, setActivity] = useState('any')
    
    const handleRoutines = async () =>{
        const results = await getUserRoutines(userName, tokenString)
        let filteredResults = []
        for (let i=0; i<results.length; i++) {
            if (parseInt(results[i].id) === parseInt(params.routineid)) {
                filteredResults.push(results[i])
            }
        }
        setMyRoutines(filteredResults)
    }
    
    useEffect(() =>{
        handleRoutines();
    }, []);

    const handleActivities = () =>{
        getActivities()
        .then(results => {
            setActivities(results)
        });
    }

    useEffect(() =>{
        handleActivities();
    }, []);

    return (
        <div>
            
            
            {myRoutines.map((routine) => { return (<div key={routine.id}>
                <h2>Routine Name: {routine.name}</h2>
                <p>Goal: {routine.goal}</p>
                <form 
                    onSubmit={async (event) => {
                        try {
                            event.preventDefault()
                            await updateRoutine((routineNameString ? routineNameString : routine.name), (routineGoalString ? routineGoalString : routine.goal), routineIsPublic, params.routineid, tokenString)
                            window.location='/myroutines'
                        } catch (error) {
                            console.error(error)
                        }
                    }}
                    id='editRoutineForm'
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <h1 id='editRoutineLabel'>Edit Routine</h1>
                    <input 
                        id='editRoutineName'
                        type='text'
                        placeholder='Routine Name*'
                        value={routineNameString}
                        onChange={(event) => {setRoutineNameString(event.target.value)}}/>
                    <input 
                        id='newRoutineGoal'
                        type='text'
                        placeholder='Routine Goal*'
                        value={routineGoalString}
                        onChange={(event) => {setRoutineGoalString(event.target.value)}}/>
                    <div id='isPublicDiv'>Is Public? <input id='newRoutineIsPublic' type='checkbox'  
                    onChange={(event) => {
                        setRoutineIsPublic(event.target.checked)
                    }}></input></div>
                    <button id='createRoutineButton'>Submit Change</button>
                </form>
{/* ACTIVITIES FORM STARTS HERE */}
                <form id="addActivityForm" onSubmit={async (event) => {
                    event.preventDefault();
                    let filteredActivity = activities.filter(o=>Object.values(o).includes(activity))
                    let filteredActivityId = filteredActivity[0].id;
                    try {
                        await addActivityToRoutine(filteredActivityId, parseInt(activityCountString), parseInt(activityDurationString), routine.id, tokenString)
                        handleActivities()
                        handleRoutines()
                        // window.location='/myroutines'
                    } catch (errorObject) {
                    console.error(errorObject);
                    };
                }}>
                    <fieldset>
                    <label htmlFor="select-activity">Activity <span className="activity-count">({ activities.length })</span></label>
                    <select 
                        name="activity"
                        id="select-activity"
                        value={activity} 
                        onChange={(event) => {setActivity(event.target.value)}}
                        >
                        <option value="any">Any</option>
                        {activities.map((activity, index) => {
                        return <option key={ index } value={ activity.name }>{ activity.name }</option>
                        })}
                    </select>
                    </fieldset>
                    
                    <fieldset>
                    <label htmlFor="count">Count</label>
                    <input 
                        id="addActivitiesCount" 
                        type="number" 
                        placeholder="Enter Count" 
                        value={activityCountString} 
                        onChange={(event) => {setActivityCountString(event.target.value)}}
                        />
                    </fieldset>
                    
                    <fieldset>
                    <label htmlFor="duration">Duration</label>
                    <input 
                        id="addActivitiesDuration" 
                        type="number" 
                        placeholder="Enter Duration" 
                        value={activityDurationString} 
                        onChange={(event) => {setActivityDurationString(event.target.value)}}
                        />
                    </fieldset>
                    <button>Add Activity</button>
                </form>
{/* ACTIVITIES FORM ENDS HERE */}
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
                    <button style={{margin: '5px'}} id='editActivityButton' onClick={async (event) => {
                    event.preventDefault()
                    window.location=`${activity.routineId}/editroutineactivity/${activity.routineActivityId}`
                    }}>
                    EDIT ACTIVITY
                </button>
                <button style={{margin: '5px'}} id='deleteActivityButton' onClick={async (event) => {
                    event.preventDefault()
                    await deleteActivityInRoutine(activity.routineActivityId, tokenString) 
                    handleActivities()
                    handleRoutines()
                    }}>
                    DELETE ACTIVITY
                </button>
                    </div>)
                })}
                </div>)
            })}
        </div>
    )
}

export default EditRoutine;