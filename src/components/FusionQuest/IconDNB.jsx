import React, {useEffect} from 'react';

const IconDNB = ({ icon }) => {
    useEffect(() => {
        console.log('IconDNB mounted');
      }, []);
  return (
    <img 
      src={icon} 
      alt="ocean-icon" 
      className="w-full h-full object-contain p-2" 
    />
  );
};

export default IconDNB;