import { getActivities, createActivity, getUserRoutines, updateRoutine, addActivityToRoutine, deleteActivityInRoutine, updateActivityInRoutine } from "../api";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditRoutineActivity = (props) => {
    const {myRoutines, setMyRoutines, tokenString, userName} = props
    const params = useParams();
    const [routineNameString, setRoutineNameString] = useState('')
    const [routineGoalString, setRoutineGoalString] = useState('')
    const [routineIsPublic, setRoutineIsPublic] = useState(false)
    const [activities, setActivities] = useState([]);
    const [routineActivities, setRoutineActivities] = useState([])
    const [activityCount, setActivityCount] = useState('')
    const [activityDuration, setActivityDuration] = useState('')
    const [activity, setActivity] = useState('any')
    let filteredRoutines = []
    let filteredActivities = []

    
    const handleRoutines = async () =>{
        const results = await getUserRoutines(userName, tokenString)
        for (let i=0; i<results.length; i++) {
            if (parseInt(results[i].id) === parseInt(params.routineid)) {
                filteredRoutines.push(results[i])
            }
        }
        setMyRoutines(filteredRoutines)

        let filteredRoutineActivities = filteredRoutines[0].activities
        for (let j=0; j<filteredRoutineActivities.length; j++) {
            if (filteredRoutineActivities[j].routineActivityId === parseInt(params.routineactivityid)) {
                filteredActivities.push(filteredRoutineActivities[j])
            }
        }
        setRoutineActivities(filteredActivities)
    }
    
    useEffect(() =>{
        handleRoutines();
    }, []);

    return (
        <div>
                {routineActivities.map((activity) => { 
                    return (<div key={activity.id}>
                    <h1>Activity Name: {activity.name}</h1>
                    <ul>
                        <li>Activity Description: {activity.description}</li>
                        {activity.duration ? <li>Activity Duration: {activity.duration}</li> : null}
                        {activity.count ? <li>Activity Count: {activity.count}</li> : null}
                    </ul>
                    <form 
                        onSubmit={async (event) => {
                            try {
                                event.preventDefault()
                                await updateActivityInRoutine((activityCount ? activityCount : activity.count), (activityDuration ? activityDuration : activity.duration), params.routineactivityid, tokenString)
                                handleRoutines()
                                window.location='/myroutines'
                            } catch (error) {
                                console.error(error)
                            }
                        }}
                        id='editRoutineActivityForm'
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <h1 id='editRoutineActivityLabel'>Edit Activity</h1>
                        <input 
                            id='editRoutineActivityDuration'
                            type='number'
                            placeholder='Activity Duration*'
                            value={activityDuration}
                            onChange={(event) => {setActivityDuration(event.target.value)}}/>
                        <input 
                            id='editRouteinActivityCount'
                            type='number'
                            placeholder='Activity Count*'
                            value={activityCount}
                            onChange={(event) => {setActivityCount(event.target.value)}}/>
                        <button id='editRoutineActivityButton'>Submit Change</button>
                    </form>
                    </div>)
                })}
                </div>)
}

export default EditRoutineActivity;