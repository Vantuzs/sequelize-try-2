import React from 'react';
import './style.css'

const GroupCard = (props) => {
    const {group: {name,description},onClick} = props

    return (
        <article className='card-wrapper' onClick={onClick}> 
          <h1>{name}</h1>
          <p>{description?description:'Description isn`t specified'}</p>
        </article>
    );
}

export default GroupCard;
