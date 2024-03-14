import { useState, useRef } from 'react';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import { downloadImage } from '../utils';
import download from '../assets/download.png'

const Cards = ({ _id, name, description, image }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const target = useRef(null);

  const handleCardClick = () => {
    setShowTooltip(!showTooltip); // Toggle the tooltip when the card is clicked
  };

  return (
    <div className="rounded-xl group relative shadow-card card" onClick={(handleCardClick)}>
      <img
        className="w-full h-auto object-cover rounded-xl"
        src={image}
        alt=""
        ref={target}
        // onMouseEnter={() => setShowTooltip(true)}
        // onMouseLeave={() => setShowTooltip(false)}
      />
      <Overlay target={target.current} show={showTooltip} placement="top">
        {(props) => (
          <Tooltip id="overlay-example" {...props}>
            <p className="text-white text-md overflow-y-auto prompt">{description}</p>
            <div className="mt-3 flex justify-between items-center gap-2">
              <div className='w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold'>
                {name[0]}
              </div>
              <button type='button' onClick={() => downloadImage(_id, image)} className='outline-none bg-transparent border-none'>
                <img src={download} alt="download" className='w-6 h-6 object-contains invert' />
              </button>
            </div>
          </Tooltip>
        )}
      </Overlay>
    </div>
  );
};

export default Cards;
