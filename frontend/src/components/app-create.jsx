import PropTypes from 'prop-types';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function Create({type, onClose}) {
    return (
        <div className="fixed inset-0 w-full h-full bg-black bg-opacity-80 z-10000 flex justify-center items-center">
            <div className="bg-white p-5 rounded-lg text-center relative dark:bg-neutral-900 dark:text-gray-100 w-96 border border-gray-200 dark:border-gray-700"> 
                <button onClick={onClose} className="absolute top-0 right-2 text-gray-500 hover:text-gray-700 text-2xl">
                    &times;
                </button>
                {type === 'folder' ? (
                    <div>
                        <h2 className="text-xl mb-4">Create New Folder</h2>
                        <Input type="text" placeholder="Folder Name" className="border p-2 rounded w-full mb-4 dark:border-gray-700" />
                        <Button onClick={onClose} className="p-2 rounded">Create</Button>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-xl mb-4">Create New Document</h2>
                        <Input type="text" placeholder="Document Title" className="border p-2 rounded w-full mb-4 dark:border-gray-700" />
                        <Input type="file" className="border p-2 rounded w-full mb-4 dark:border-gray-700" />
                        <Button className="p-2 rounded" variant="animate">Create</Button>
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