import React, {useState,useEffect} from 'react';
import { getGroups } from '../../api';
import GroupCard from './GroupCard';
import GroupCardModal from './GroupCardModal';

const GroupList = () => {
    const [groups,setGroups] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [error,setError] = useState(null);
    const [selectedGroup,setSelectedGroup] = useState(null);
    const [isModalOpen,setIsModelOpen] = useState(false); // Модалка инфы
    const [isModalAddOpen,setIsModalAddOpen] = useState(false); // Модалка добавления групы
    
    const loadGroups = ()=>{
        getGroups()
        .then((data)=>{setGroups(data)})
        .catch((error)=>{setError(error)})
        .finally(()=>{setIsLoading(false)})
    }
    
    useEffect(()=>{
        loadGroups();
    },[]);

    const renderGroups = ()=>{
        return groups.map((group)=><GroupCard 
        group={group} 
        key={group.id} 
        onClick={()=>{
            setSelectedGroup(group);
            setIsModelOpen(true);
        }}/>)
    }

    return (
        <>
            <h1>Group List</h1>
            <section className='card-container'>
            {isLoading === false? groups.length> 0? renderGroups():<h2 className='error'>Groups not found</h2>:isLoading && <h2 className='loading'>Loading....</h2>}
            {error&&<h2>{error.message}</h2>}
            </section>


            <GroupCardModal 
            isModalOpen={isModalOpen} 
            setIsModelOpen={setIsModelOpen} 
            selectedGroup={selectedGroup}/>
        </>
    );
}

export default GroupList;
