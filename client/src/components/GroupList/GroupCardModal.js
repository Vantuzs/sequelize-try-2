import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };


const GroupCardModal = (props) => {
    const {selectedGroup,setIsModelOpen,isModalOpen} = props
    console.log(selectedGroup);

    return (
        <Modal 
        isOpen={isModalOpen} 
        onRequestClose={()=>setIsModelOpen(false)} 
        style={customStyles}
        >
                {selectedGroup && (
                    <div>
                        <img src={selectedGroup.imagePath?`http://localhost:5000/${selectedGroup.imagePath}`:`https://robohash.org/${selectedGroup.name}?set=set2`} alt={selectedGroup.name}></img>
                        <h1>Name: {selectedGroup.name}</h1>
                        <p>Description: {selectedGroup.description}</p>
                        <p>Created at:{selectedGroup.createdAt}</p>
                        <p>Updated at: {selectedGroup.updatedAt}</p>

                        <button onClick={()=>setIsModelOpen(false)}>Close</button>
                    </div>
                )}
            </Modal>
    );
}

export default GroupCardModal;
