import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, removeDocument, favouriteDocument } from "./DocumentSlice";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip } from "react-tooltip";
import { Star, MoreVertical } from "lucide-react";
import { toast } from "sonner";
import PropTypes from "prop-types";

const Document = ({ viewMode }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const documents = useSelector((state) => state.documents);

  useEffect(() => {
    if (!documents || (documents && documents.length === 0))
      dispatch(fetchData());
  }, [dispatch, documents]);

  const handleButtonClick = (e) => {
    e.stopPropagation();
  };

  if (!documents || (documents && documents.length === 0)) {
    return (
      <div className="flex flex-col items-center justify-center h-[500px]">
        <h1 className="text-4xl font-bold animate-shimmer bg-clip-text text-transparent bg-[linear-gradient(110deg,rgb(255,231,113)_45%,#ffffff_50%,rgb(255,231,113)_55%)] bg-[length:250%_100%]">
          No documents found!
        </h1>
        <p className="text-gray-400 dark:text-gray-500 mt-2 flex flex-row items-center gap-2">
          Create documents by clicking the{" "}
          <span className="text-primary">Create New</span> button
        </p>
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 gap-4 ${viewMode === "grid" ? "md:grid-cols-2 lg:grid-cols-3" : "flex flex-col"} animate-reveal z-0`}
    >
      {documents &&
        documents.map((doc) => (
          <Card
            key={doc.id}
            className="p-4 dark:bg-neutral-900 dark:text-gray-100 hover:border-primary hover:shadow-lg transition-transform duration-300 cursor-pointer z-1"
            onClick={() => navigate(`/quiz`, { state: { id: doc.id } })}
          >
            <CardContent className="flex justify-between items-start p-0 flex-col">
              <div className="w-full flex flex-row justify-end gap-3">
                <Tooltip id="favorite" />
                <button
                  className="text-yellow-500 hover:text-yellow-400 transition-colors p-0"
                  data-tooltip-id="favorite"
                  data-tooltip-content="Toggle favorite"
                  onClick={(e) => {
                    handleButtonClick(e);
                    dispatch(favouriteDocument(doc.id));
                  }}
                >
                  <Star
                    className={`w-5 h-5 ${
                      doc.favourite ? "fill-yellow-500" : "stroke-current"
                    }`}
                  />
                </button>

                <Tooltip id="more" />
                <button
                  className="text-yellow-500 hover:text-yellow-400 transition-colors p-0"
                  data-tooltip-id="more"
                  data-tooltip-content="More options"
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <MoreVertical className="w-5 h-5" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={(e) => {
                          handleButtonClick(e);
                        }}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          handleButtonClick(e);
                          dispatch(removeDocument(doc.id));
                          toast.success("Document deleted successfully");
                        }}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </button>
              </div>

              <div className="w-full">
                <h3 className="text-lg font-semibold">{doc.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {doc.createdAt}
                </p>
                <div className="mt-1 space-x-1 w-full flex flex-wrap">
                  {doc.tags &&
                    doc.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded mb-1"
                      >
                        {tag}
                      </span>
                    ))}
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">
                  {doc.summary}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );
};

Document.propTypes = {
  viewMode: PropTypes.string,
};

export default Document;
