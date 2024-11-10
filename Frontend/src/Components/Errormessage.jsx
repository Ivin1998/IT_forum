import React from 'react';
import { Alert } from 'react-bootstrap';

const Errormessage = ({variant="info", children}) => {
  return (
   <Alert variant={variant} style={{fontSize:20, width:'25rem',fontWeight:'bold'}}>
      {children}
    </Alert>
  )
}

export default Errormessage;
