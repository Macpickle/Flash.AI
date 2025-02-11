import { IoMdClose } from "react-icons/io";
import { Tooltip } from 'react-tooltip';
import { AxiosPost } from '../util/Axios';
import { useState } from 'react';

function Create({handleView}) {
    const [submit, setSubmit] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // prevent multiple click of button
        e.target.disabled = true;
        const formData = new FormData();
        const file = document.getElementById('fileUpload').files[0];
        formData.append('file', file);
        formData.append('title', document.getElementById('title').value);

        setSubmit(true);

        AxiosPost('/api/upload', formData)
            .then(response => {
                window.location.reload();
            })
            .catch(error => {
                console.error(error);
            });
        
        
    }

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center position-absolute" style={{ height: '90vh', zIndex: '1000' }}>
            <div className="container-fluid p-5 mb-5 text-center" style={{ maxWidth: '750px', width: '100%', position: 'relative' }}>
                <div className="position-absolute top-0 end-0">
                    <button className = "icon-button" onClick={handleView} data-tooltip-id="close-tooltip" data-tooltip-content="Close">
                        <IoMdClose className="icon" size={30} />
                    </button>
                    <Tooltip id="close-tooltip" place="bottom" style={{ fontSize: '0.6em' }} />
                </div>
                <h2 className="title mb-5">Create</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3" style={{ textAlign: 'left' }}>
                        <label className="text d-block" htmlFor="title">Title</label>
                        <input type="text" className="form-control" id="title" placeholder="Enter title" />
                    </div>
                    <div className="form-group mb-3" style={{ textAlign: 'left' }}>
                        <label className="text d-block" htmlFor="fileUpload">Upload File</label>
                        <input type="file" className="form-control" id="fileUpload" />
                    </div>
                    { submit ? <div className="spinner-border" role="status" style={{color: "#FFA07A"}}></div> : 
                        <button type="submit" className="button resize mt-3 w-75">Submit</button>
                    }
                </form>
            </div>
        </div>
    );
}

export default Create;