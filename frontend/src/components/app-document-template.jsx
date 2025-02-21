import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip } from 'react-tooltip'
import { Star, MoreVertical } from "lucide-react";
import PropTypes from "prop-types";

function DocTemplate({doc, toggleFavorite}) {
  return (
    <Card
    className="p-4 dark:bg-neutral-900 dark:text-gray-100 hover:border-primary hover:shadow-lg transition-transform duration-300"
    >
    <CardContent className="flex justify-between items-start p-0 flex-col">
      <div className="w-full flex flex-row justify-end gap-3">
      <Tooltip id="favorite" />
      <button
        onClick={() => toggleFavorite(doc.id)}
        className="text-yellow-500 hover:text-yellow-400 transition-colors p-0"
        data-tooltip-id="favorite"
        data-tooltip-content="Toggle favorite"
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
         <DropdownMenuItem>Edit</DropdownMenuItem>
         <DropdownMenuItem>Delete</DropdownMenuItem>
       </DropdownMenuContent>
      </DropdownMenu>
      </button>
    </div>

      <div className="w-full">
      <h3 className="text-lg font-semibold">{doc.title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {doc.createdAt}
      </p>
      <div className="mt-1 space-x-1">
        {doc.tags && doc.tags.map((tag, index) => (
        <span
          key={index}
          className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded"
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
  );
}

DocTemplate.propTypes = {
  doc: PropTypes.object.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
};

export default DocTemplate;