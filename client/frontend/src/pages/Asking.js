import React from 'react';
import Form from '../components/Form';
import Advices from '../components/Advices'; 

export default function Asking() {
  const [showAdvices, setShowAdvices] = React.useState(false); 

  const handleFormSubmit = () => {
    setShowAdvices(true); 
  };

  return (
    <div>
   
     {showAdvices ? <Advices /> : <Form onSubmit={handleFormSubmit} />} 
    </div>
  );
}




import React from 'react'
import Form from '../components/Form'

function Asking() {
  return (
    <div>
      <Form/>
    </div>
  )
}

export default Asking
