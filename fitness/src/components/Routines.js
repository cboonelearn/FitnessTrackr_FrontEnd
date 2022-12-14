import { getRoutines } from "../api";
import React, { useEffect, useState } from "react";
import "./Routines.css"

const Routines = (props) => {
    const {routines, setRoutines} = props;
    const handleRoutines = () =>{
        getRoutines()
        .then(results => {
            setRoutines(results)
        });
    }
    useEffect(() =>{
        handleRoutines();
    }, []);

    return ( 
        <div className="Routines">
            <h1>Routines</h1>
            {routines.map((routine) =>{ return (<div className="routine-cards" key={routine.id}>
                <h2>Routine Name: {routine.name}</h2>
                <p>Goal: {routine.goal}</p>
                <p>Creator: {routine.creatorName}</p>
                <p>Included Activities:</p>
                {routine.activities.map((activity) => { return (<div className="activity-cards" key={activity.id}>
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
            })}
        </div>
     );
}

export default Routines;