import React, { useEffect, useState } from "react";

const EditRoutine = ({tokenString}) => {
    const [routineNameString, setRoutineNameString] = useState('')
    const [routineGoalString, setRoutineGoalString] = useState('')
    const [routineIsPublic, setRoutineIsPublic] = useState(false)

    return (
        <form 
                onSubmit={async (event) => {
                    try {
                        event.preventDefault()
                        // await createRoutine(routineNameString, routineGoalString, routineIsPublic, tokenString)
                        // handleRoutines()
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
    )
}

export default EditRoutine;