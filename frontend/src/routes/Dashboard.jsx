import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PropTypes from "prop-types";
import { Tooltip } from 'react-tooltip'
import Document from "@/app/Documents/Document";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  List,
  Grid,
  ArrowDownNarrowWide,
  ArrowUpNarrowWide,
  Plus,
} from "lucide-react";

// items for create dropdown
const createItems = [
  { name: "Document", type: "document" },
  { name: "Folder", type: "folder" },
];

export default function Dashboard({ handleCreate }) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("title-asc");
  const [filterBy, setFilterBy] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [documents, setDocuments] = useState([]);

  // toggle favorite
  const toggleFavorite = (id) => {
    setDocuments((prevDocs) =>
      prevDocs.map((doc) =>
        doc.id === id ? { ...doc, favourite: !doc.favourite } : doc,
      ),
    );
  };

  // filter and sort documents
  const filteredDocs = documents
    .filter((doc) => {
      const matchesSearch = doc.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesFilter =
        filterBy === "all" ||
        (filterBy === "favourites" && doc.favourite) ||
        doc.tags.includes(filterBy);

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortBy === "title-asc") return a.title.localeCompare(b.title);
      if (sortBy === "title-desc") return b.title.localeCompare(a.title);
      if (sortBy === "createdAt-asc")
        return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === "createdAt-desc")
        return new Date(b.createdAt) - new Date(a.createdAt);
    });

  return (
    <div className={`flex w-screen h-screen overflow-x-hidden`}>
      <main className="flex-1 overflow-x-hidden">
        <div className="container mx-auto p-4">
          <div className="flex items-center gap-4 mb-4 flex-wrap">
            <Input
              placeholder="Search documents..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 w-full sm:w-40 md:w-60"
            />
            <Select onValueChange={setSortBy}> 
              <Tooltip id="sort" />
              <SelectTrigger className="w-full sm:w-40 md:w-60" data-tooltip-id="sort" data-tooltip-content="Sort by"> 
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title-asc">Title A-z</SelectItem>
                <SelectItem value="title-desc">Title Z-a</SelectItem>
                <SelectItem value="createdAt-asc">
                  Date
                  <ArrowUpNarrowWide className="ml-1 h-4 w-4 mr-1 inline-block" />
                </SelectItem>
                <SelectItem value="createdAt-desc">
                  Date
                  <ArrowDownNarrowWide className="ml-1 h-4 w-4 mr-1 inline-block" />
                </SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={setFilterBy}>
              <Tooltip id="filter" />
              <SelectTrigger className="w-full sm:w-40 md:w-60" data-tooltip-id="filter" data-tooltip-content="Filter by">
                <SelectValue placeholder="Filter"/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="favourites">Favourites</SelectItem>
                {documents
                  .flatMap((doc) => doc.tags)
                  .filter((tag, index, self) => self.indexOf(tag) === index)
                  .map((tag, index) => (
                    <SelectItem key={`${tag}-${index}`} value={tag}>
                      {tag}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <Tooltip id="grid-view" />
            <Button
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              data-tooltip-id="grid-view"
              data-tooltip-content="Toggle view"
            >
              {viewMode === "grid" ? <List /> : <Grid />}
            </Button>
            <DropdownMenu>
              <Tooltip id="create" />
              <DropdownMenuTrigger asChild>
                <Button 
                  data-tooltip-id="create" 
                  data-tooltip-content="Create new"
                  variant="outline"
                >
                  Create New
                  <Plus className="w-4 h-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {createItems.map((createItem) => (
                  <DropdownMenuItem
                    key={createItem.name}
                    onSelect={() => handleCreate(createItem.type)}
                    className="hover:bg-neutral-800 cursor-pointer"
                  >
                    {createItem.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
                : "space-y-2"
            }
          >
            <Document/>

          </div>
        </div>
      </main>
    </div>
  );
}

Dashboard.propTypes = {
  handleCreate: PropTypes.func.isRequired,
};
