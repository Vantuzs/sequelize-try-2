import React, {useState,useEffect} from 'react';
import { getUsers } from '../../api';
import UserCard from './UserCard';
import UserCardModal from './UserCardModal';
import AddUserFromModal from './AddUserFromModal';


const UserList = () => {
    const [users,setUsers] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [error,setError] = useState(null);
    const [page,setPage] = useState(1);
    const [selectedUser,setSelectedUser] = useState(null);
    const [isModalOpen,setIsModelOpen] = useState(false); // Мoдалка просмотра инфы конекретного пользователя
    const [isModalAddOpen,setIsModalAddOpen] = useState(false); // Модалка добавления пользователя

    const loadUsers = (pageNumber) =>{
        getUsers(pageNumber)
        .then((data)=>{
            setUsers(data)
        })
        .catch((error)=>{
            setError(error)
        })
        .finally(()=>{
            setIsLoading(false)
        })
    }

    useEffect(()=>{
        loadUsers(page)
    },[page])
    
    const renderUsers = ()=>{
        return users.map((user)=><UserCard 
        user={user} 
        key={user.id} 
        onClick={()=>{
            setSelectedUser(user);
            setIsModelOpen(true);
        }}/>)
    }
    // console.log(renderUsers());

    const prevBtnHandler = ()=>{
        if(page >1){
            setPage(page-1)
        }
    }

    const nextBtnHandler  = ()=>{
        if(users.length === 5){
            setPage(page+1)
        }
    }

    return (
        <>
            <h1>User List</h1>
            <button onClick={()=>setIsModalAddOpen(true)}>Add user</button>

            <section className='card-container'>
                {isLoading === false? users.length> 0? renderUsers():<h2 className='error'>Users not found</h2>:isLoading && <h2 className='loading'>Loading....</h2>}
                {error&&<h2>{error.message}</h2>}
            </section>   
            <div>
                <button onClick={prevBtnHandler} disabled={page===1}>Previous page</button>
                <button onClick={nextBtnHandler} disabled={users.length <5}>Next page</button>
            </div>

            <UserCardModal 
            isModalOpen={isModalOpen} 
            setIsModelOpen={setIsModelOpen} 
            selectedUser={selectedUser}
            />
            <AddUserFromModal
            isModalOpen={isModalAddOpen}
            setIsModalOpen={setIsModalAddOpen}
            />
        </>
    );
}

export default UserList;
