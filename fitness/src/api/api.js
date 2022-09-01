

export const getActivities = async () =>{
    try{
        const request = await fetch('http://fitnesstrac-kr.herokuapp.com/api/activities');
        const response = await request.json();
        return response;
    } catch(error){
        console.error(error);
    }
    }
