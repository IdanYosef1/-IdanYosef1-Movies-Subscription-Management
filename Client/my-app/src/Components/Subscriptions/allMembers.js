import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateMembers } from '../../Redux/actions';
import { getAll } from '../../utils';
import MemberComp from './memberComp';
import SubscriptionsPage from './subscriptionsPage';

const urlMembers = 'http://localhost:8000/api/members';

function AllMembers({ match }) {
  //  try catch, email, promise
  const store = useSelector((state) => state.members);
  const dispatch = useDispatch();
  const [showChange, setChange] = useState(false);

  /* Bringing the data to the state and update the members array in redux store
     according to the existence of the id in the url. */
  useEffect(() => {
    async function getMembers() {
      try{
        const data = (await getAll(urlMembers)).data;
        if(match.params.id !== undefined){
          const member = data.filter(member => member._id === match.params.id);
          dispatch(updateMembers(member));
        }
        else{
          dispatch(updateMembers(data));
        }  
      }catch(err){
        console.log(err);
      }
    }
    getMembers();
  },[dispatch, showChange, match.params.id]);

  // Renders the component.
  const updatePage = () => {
    setChange(!showChange);
  }

  const showMembers = store.map((member) => {
    return <MemberComp key={member._id} member={member} update={updatePage} />
 });
  
  return <div>
    <SubscriptionsPage />
    <div className="allMembersCards">
      {showMembers}
    </div>
  </div>;
}

export default AllMembers;