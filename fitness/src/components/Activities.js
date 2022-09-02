import { getActivities, createActivity } from "../api";
import React, { useEffect, useState } from "react";

const Activites = (props) => {
    const { tokenString } = props
    const [activites, setActivites] = useState([]);
    const [activityNameString, setActivityNameString] = useState('')
    const [activityDescriptionString, setActivityDescriptionString] = useState('')
    const handleActivites = () =>{
        getActivities()
        .then(results => {
            setActivites(results)
            console.log(results)
        });
    }
    useEffect(() =>{
        handleActivites();
    }, []);
    
    return ( 
        <div className="Activites">
            <h1>Activites</h1>
            <form 
                onSubmit={async (event) => {
                    try {
                        event.preventDefault()
                        await createActivity(activityNameString, activityDescriptionString, tokenString)
                        handleActivites()
                    } catch (error) {
                        console.error(error)
                    }
                }}
                id='createActivityForm'
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <h1 id='newActivityLabel'>New Activity</h1>
                <input 
                    id='newActivityName'
                    type='text'
                    required
                    placeholder='Activity Name*'
                    value={activityNameString}
                    onChange={(event) => {setActivityNameString(event.target.value)}}/>
                <input 
                    id='newActivityDescription'
                    type='text'
                    required
                    placeholder='Activity Description*'
                    value={activityDescriptionString}
                    onChange={(event) => {setActivityDescriptionString(event.target.value)}}/>
                <button id='createActivityButton'>Create Activity</button>
                
            </form>
            {activites.map((activity) =>{ return (<div key={activity.id}>
                <h2>{activity.name}</h2>
                <p>{activity.description}</p>
                </div>)
            })}
        </div>
     );
}

export default Activites;