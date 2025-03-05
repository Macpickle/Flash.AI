import PropTypes from "prop-types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AxiosRequest from "@/utils/Axios";
import { useState, useEffect } from "react";
import { Tooltip } from 'react-tooltip'
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addDocument } from "@/app/Documents/DocumentSlice";

function Create({ type, onClose }) {
  const dispatch = useDispatch();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleCreate = (e) => {
    e.preventDefault();
    e.target.disabled = true;

    const title = e.target[0].value;
    if (!title) {
      setError("Title cannot be empty!");
      e.target[0].classList.add("border-red-300", "dark:border-red-700");
      e.target.disabled = false;
      return;
    }

    setSubmitted(true);

    if (type === "Folder") {
      // create folder
    } if (type === "Document") {
      // create document
      const formData = new FormData();
      const file = e.target[1].files[0];
      const title = e.target[0];
      formData.append("file", file);
      formData.append("title", title.value);

      AxiosRequest({
        url: "/api/upload",
        method: "post",
        data: formData,
      })
        .then((response) => {
          setSubmitted(false);
          e.target.reset();
          e.target.disabled = false;

          // Add document to redux store
          dispatch(addDocument(response.data.doc));
          onClose(true);
        })
        .catch((error) => {
          handleError(error);
          setSubmitted(false);
        }
      );
    } else {
      return;
    }
  };

  const handleError = (error) => {
    if (error.response) {
      const message = error.response.data.message;

      if (message === "Unsupported file type") {
        const supportedTypes = error.response.data.supportedTypes;
        setError(`${message}. Supported types are: ${supportedTypes.join(", ")}`);
      }

      if (message === "No file uploaded") {
        setError("No file uploaded");
        document.querySelector("input[type='file']").classList.add("border-red-300", "dark:border-red-700");
      }

      if (message === "Failed to generate flash cards") {
        setError("Failed to generate flash cards");
      }


    } else {
      setError();
    }
  };


  // Redirect to dashboard if not already there
  useEffect(() => {
    if (location.pathname !== "/dashboard") {
      navigate("/dashboard");
    }
  });

  return (
    <div
      className="fixed inset-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center animate-fade"
      onClick={() => onClose(false)}
      style={{ zIndex: 1000 }}
    >
      <div
        className="bg-white p-5 rounded-lg text-center relative dark:bg-neutral-900 dark:text-neutral-100 w-96 border border-input"
        onClick={(e) => e.stopPropagation()}
      >
        <Tooltip id = "close" />
        <button
          onClick={() => onClose(false)}
          className="absolute top-0 right-2 text-gray-500 hover:text-gray-700 text-2xl"
          data-tooltip-id="close"
          data-tooltip-content="Close"
        >
          &times;
        </button>

        <div className="mb-4">
          <h1 className="text-2xl font-bold">
            {type === "folder" ? "Create Folder" : "Create Document"}
          </h1>
          <p className="text-sm text-gray-500 dark:text-neutral-400">
            {type === "folder"
              ? "Create a new folder to store your documents"
              : "Create a new document to store your files"}
          </p>

          <p className="text-red-500 text-sm">{error}</p>
        </div>

        {type === "Folder" ? (
          <div>
            <form onSubmit={handleCreate}>
              <Input
                type="text"
                placeholder="Folder Name"
                className="border p-2 rounded w-full mb-4 dark:border-neutral-700"
                onFocus={(e) => e.target.classList.remove("border-red-300", "dark:border-red-700")}
              />
              <Button className="p-2 rounded w-full">
                Create
              </Button>
            </form>
          </div>
        ) : (
          <div>
            <form onSubmit={handleCreate}>
              <Input
                type="text"
                placeholder="Document Title"
                className="border p-2 rounded w-full mb-4 dark:border-neutral-700" 
                onFocus={(e) => e.target.classList.remove("border-red-300", "dark:border-red-700")}
              />
              <Input
                type="file"
                className="border p-2 rounded w-full mb-4 dark:border-neutral-700"
                onFocus={(e) => e.target.classList.remove("border-red-300", "dark:border-red-700")}
              />

              {submitted ? (
                <span className="loader"></span>
              ) : (
                <Button className="p-2 rounded w-full">
                  Create
                </Button>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

Create.propTypes = {
  type: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Create;
