// External imports
import React from 'react';
import { FaPause, FaPlay, FaRedo } from 'react-icons/fa';

// Internal imports
import './ControlButtons.css';

const ControlButtons = (props) => {
  const { isOn, showButtons, pauseMap, startMap, resetMap } = props;
  
  return (
    <div className='choropleth-buttons'>
      {showButtons && isOn && 
        <div 
          onClick={() => pauseMap()}
        >
          <FaPause className={'btn-control'}/>
        </div>
      }
      {showButtons && !isOn && 
        <div 
          onClick={() => startMap()}
        >
          <FaPlay className={'btn-control btn-play'}/>
        </div>
      }
      {!showButtons &&
        <div 
          onClick={() => resetMap()}
        >
          <FaRedo className={'btn-control'}/>
        </div>
      }
    </div>
  );
};

export default ControlButtons;