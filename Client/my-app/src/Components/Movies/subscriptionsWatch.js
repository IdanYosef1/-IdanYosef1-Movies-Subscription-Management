import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAll } from '../../utils';

const urlMembers = 'http://localhost:8000/api/members'; 

function SubscriptionsWatch({ subscriptions }) {
    let store = useSelector((state) => state.permissions);
    const [members, setMembers] = useState([]);

    // Bringing the data to the state.
    useEffect(() => {
            async function getMembers(){
                try{
                    const data = (await getAll(urlMembers)).data;
                    setMembers(data);
                }catch(err){
                    console.log(err);
                }
            }
            getMembers();
            return function cleanup(){
                setMembers([]);
            }
        }
    ,[]);
    
    /* Searching for a member by id and if it exists then the function returns a list of the
       members that subscribed for the movie.*/
    // If the user has permission to view the Subscriptions then the link takes him to the page of the member details.   
    const showMembers = subscriptions.map((obj) => {
        const member = members.find((member) => member._id === obj.memberId);
        if(member){
            const clickMemberName = (store.View_Subscriptions) ? `/subscriptions/${member._id}`: '/movies';
            return <li key={member._id}><Link className='linkSubsMovie' to={clickMemberName}>{member.name}</Link>, {" "}
            {subscriptions[0].movies[0].date.slice(0,10)} </li>;
        }
        return null;
    })

    return  <div className='moviesandSubsWatch'>
                <h4 className='text-center'>Subscriptions watched</h4> 
                <ul>
                    {showMembers}
                </ul>
            </div>;
}

export default SubscriptionsWatch;



   
