import { MdDelete } from "react-icons/md";
import { Tooltip } from 'react-tooltip';
import { useNavigate } from "react-router-dom";
import { AxiosDelete } from "../util/Axios";

const Card = ({index, post}) => {
    const navigate = useNavigate();
    const handleCardClick = () => {
        navigate('/quiz/' + post._id);
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        // Delete document
        AxiosDelete(`/api/docs/${post._id}`)
            .then(response => {
                window.location.reload();
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div className="card doc m-2 d-flex flex-column justify-content-center align-items-center" key={index} style={{ width: '100%', maxWidth: '20dvw', height: 'auto', aspectRatio: '1 / 1', minWidth: '150px', minHeight: '150px' }} onClick={handleCardClick}>
            <div className="hide d-flex justify-content-end w-100">
                <Tooltip id={`edit-tooltip-${index}`} place="bottom" style={{ fontSize: '0.4em' }} />
                <button className="transparent-button" data-tooltip-id={`delete-tooltip-${index}`} data-tooltip-content="Delete" onClick={(e) => handleDelete(e)}>
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