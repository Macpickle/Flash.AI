import { MdDelete } from "react-icons/md";
import { IoMdCreate } from "react-icons/io";
import { Tooltip } from 'react-tooltip';
import { useNavigate } from "react-router-dom";

const Card = ({index, post}) => {
    const navigate = useNavigate();
    const handleCardClick = () => {
        navigate('/quiz/' + post._id);
    };

    return (
        <div className="card doc m-2 d-flex flex-column justify-content-center align-items-center" key={index} style={{ width: '100%', maxWidth: '20dvw', height: 'auto', aspectRatio: '1/1' }} onClick={handleCardClick}>
            <div className="hide d-flex justify-content-end w-100">
                <button className="transparent-button" data-tooltip-id={`edit-tooltip-${index}`} data-tooltip-content="Edit" onClick={(e) => e.stopPropagation()}>
                    <IoMdCreate className="icon" size={30} />
                </button>
                <Tooltip id={`edit-tooltip-${index}`} place="bottom" style={{ fontSize: '0.4em' }} />
                <button className="transparent-button" data-tooltip-id={`delete-tooltip-${index}`} data-tooltip-content="Delete" onClick={(e) => e.stopPropagation()}>
                    <MdDelete className="icon" size={30} />
                </button>
                <Tooltip id={`delete-tooltip-${index}`} place="bottom" style={{ fontSize: '0.4em' }} />
            </div>

            <div className="d-flex flex-column justify-content-center align-items-center flex-grow-1">
                <h5 className="card-title text-center">{post.title}</h5>
                <p className="card-text text-center">{post.createdAt.substring(0, 10)}</p>
            </div>
        </div>
    )
}

export default Card;