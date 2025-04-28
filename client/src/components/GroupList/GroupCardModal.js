import React from 'react';
import Modal from 'react-modal';
import { createGroupImage } from '../../api';
import { Formik,Form, Field } from 'formik';

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
    const {selectedGroup,setIsModelOpen,isModalOpen,loadGroups} = props
    // console.log(selectedGroup);

    return (
        <Modal 
        isOpen={isModalOpen} 
        onRequestClose={()=>setIsModelOpen(false)} 
        style={customStyles}
        >
                {selectedGroup && (
                    <div>
                        <img src={selectedGroup.imagePath?`http://localhost:5000/${selectedGroup.imagePath}`:`https://robohash.org/${selectedGroup.name}?set=set2`} alt={selectedGroup.name}></img>
                        <div>Set new IMG: </div>
                        <Formik
                         initialValues={{groupAvatar: []}}
                         onSubmit={async(values,actions)=>{
                            const {setSubmitting} = actions;

                            const formData = new FormData();
                            values.groupAvatar.forEach((currentFile)=>{
                                formData.append('groupAvatar',currentFile)
                            });

                            try {
                                const serverResponse = await createGroupImage(formData,selectedGroup.id);
                                console.log(serverResponse);
                                props.setIsModelOpen(false);
                                await props.loadGroups()
                            } catch (error) {
                                console.error(error);
                            } finally{
                                setSubmitting(false)
                            }
                         }}>
                            {({setFieldValue,isSubmitting})=>
                                <Form>
                                    <input 
                                    type='file' 
                                    name='groupAvatar'
                                    accept='image/*'
                                    onChange={(event)=>{
                                        const fiels = [...event.target.files];
                                        setFieldValue('groupAvatar',fiels)
                                    }}/>
                                    <button type='submit' disabled={isSubmitting}>Upload image</button>
                                </Form>
                            }
                        </Formik>
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
