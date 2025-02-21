import PropTypes from "prop-types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AxiosRequest from "@/utils/Axios";
import { useState } from "react";

function Create({ type, onClose }) {
  const [submitted, setSubmitted] = useState(false);

  const handleCreate = (e) => {
    e.preventDefault();
    e.target.disabled = true;
    setSubmitted(true);

    if (type === "folder") {
      // create folder
    } if (type === "document") {
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
          console.log(response.data);
          setSubmitted(false);
          onClose();
        })
        .catch((error) => {
          console.log(error.response.data.message);
        }
      );
    } else {
      return;
    }
  };

  return (
    <div
      className="fixed inset-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center"
      onClick={onClose}
      style={{ zIndex: 1000 }}
    >
      <div
        className="bg-white p-5 rounded-lg text-center relative dark:bg-neutral-900 dark:text-neutral-100 w-96 border border-input"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-0 right-2 text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>
        {type === "folder" ? (
          <div>
            <form onSubmit={handleCreate}>
              <h2 className="text-xl mb-4">Create New Folder</h2>
              <Input
                type="text"
                placeholder="Folder Name"
                className="border p-2 rounded w-full mb-4 dark:border-neutral-700"
              />
              <Button className="p-2 rounded">
                Create
              </Button>
            </form>
          </div>
        ) : (
          <div>
            <form onSubmit={handleCreate}>
              <h2 className="text-xl mb-4">Create New Document</h2>
              <Input
                type="text"
                placeholder="Document Title"
                className="border p-2 rounded w-full mb-4 dark:border-neutral-700" 
              />
              <Input
                type="file"
                className="border p-2 rounded w-full mb-4 dark:border-neutral-700"
              />

              {submitted ? (
                <span className="loader"></span>
              ) : (
                <Button className="p-2 rounded" variant="animate">
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
