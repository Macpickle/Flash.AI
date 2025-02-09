import { MdDelete } from "react-icons/md";
import { IoMdCreate } from "react-icons/io";
import { Tooltip } from 'react-tooltip';

const Card = (index) => {
    return (
        <div className="card doc m-2 d-flex flex-column justify-content-center align-items-center" key={index} style={{ width: '100%', maxWidth: '20dvw', height: 'auto', aspectRatio: '1/1' }}>
            <div className="hide d-flex justify-content-end w-100">
                <button className="transparent-button" data-tooltip-id={`edit-tooltip-${index}`} data-tooltip-content="Edit">
                    <IoMdCreate className="icon" size={30} />
                </button>
                <Tooltip id={`edit-tooltip-${index}`} place="bottom" style={{ fontSize: '0.4em' }} />
                <button className="transparent-button" data-tooltip-id={`delete-tooltip-${index}`} data-tooltip-content="Delete">
                    <MdDelete className="icon" size={30} />
                </button>
                <Tooltip id={`delete-tooltip-${index}`} place="bottom" style={{ fontSize: '0.4em' }} />
            </div>

            <div className="d-flex flex-column justify-content-center align-items-center flex-grow-1">
                <h5 className="card-title text-center">Sample Title</h5>
                <p className="card-text text-center">01/01/2023</p>
            </div>
        </div>
    )
}

export default Card;