import React from 'react';
// Assuming the Hourglass component is available in the 'react-loading-spinners' library
import { Hourglass } from 'react-loader-spinner';

const HourglassLoader = () => {
  return (
    <div  style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}>
      
      <Hourglass
        visible={true}
        height="200"
        width="200"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={['#306cce', '#72a1ed']}
      />
    </div>
  );
};

export default HourglassLoader;
