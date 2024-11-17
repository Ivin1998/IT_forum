import React from 'react';
import randomColor from 'randomcolor';

const AuthorIcon = ({name}) => {
    
    var color = randomColor({ 
        luminosity: 'light',
        format: 'rgb'});
        
    const Iconstyle ={
        display:'inline-block',
        backgroundColor:color,
        borderRadius:'10px',
        padding: '0.25rem',
        fontWeight:'bold',
        fontSize:'0.65rem',
        marginLeft:'1.5rem'
    }
    
  return (
    <div style={Iconstyle}>
      {name}
    </div>
  )
}

export default AuthorIcon;
