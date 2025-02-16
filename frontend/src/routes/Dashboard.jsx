import { useState } from "react";
import AppNavbar from "@/components/app-navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  List,
  Grid,
  MoreVertical,
  Star,
  ArrowDownNarrowWide,
  ArrowUpNarrowWide,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Docs = [
  {
    id: 1,
    title: "Computational Science Lecture 1",
    createdAt: "2025-02-15",
    tags: ["CS", "Math"],
    summary: "This is a brief summary of Document 1.",
    favorite: true,
  },
  {
    id: 2,
    title: "Discrete Mathematics",
    createdAt: "2024-02-12",
    tags: ["Math"],
    summary:
      "This document covers various mathematical concepts and techniques essential for understanding the foundation of discrete structures and logical reasoning.",
    favorite: false,
  },
  {
    id: 3,
    title: "Systems Programming",
    createdAt: "2025-02-01",
    tags: ["Linux", "CS"],
    summary:
      "An introduction to low-level programming concepts, system calls, and performance optimizations.",
    favorite: false,
  },
  {
    id: 4,
    title: "Dummy",
    createdAt: "2025-03-03",
    tags: ["Random"],
    summary: "Dummy. ",
    favorite: false,
  },
];

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("title-asc");
  const [filterBy, setFilterBy] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [documents, setDocuments] = useState(Docs);

  const toggleFavorite = (id) => {
    setDocuments((prevDocs) =>
      prevDocs.map((doc) =>
        doc.id === id ? { ...doc, favorite: !doc.favorite } : doc,
      ),
    );
  };

  const filteredDocs = documents
    .filter((doc) => {
      const matchesSearch = doc.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesFilter =
        filterBy === "all" ||
        (filterBy === "favourites" && doc.favorite) ||
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
    <>
      <AppNavbar />
      <main className="pt-16 px-4">
        <div className="container mx-auto p-4">
          <div className="flex items-center gap-4 mb-4">
            <Input
              placeholder="Search documents..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Select onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
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
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="favourites">Favourites</SelectItem>
                {documents
                  .flatMap((doc) => doc.tags)
                  .filter((tag, index, self) => self.indexOf(tag) === index)
                  .map((tag) => (
                    <SelectItem key={tag} value={tag}>
                      {tag}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <Button
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
            >
              {viewMode === "grid" ? <List /> : <Grid />}
            </Button>
            <Button>New Document</Button>
          </div>
          <div
            className={
              viewMode === "grid" ? "grid grid-cols-3 gap-4" : "space-y-2"
            }
          >
            {filteredDocs.map((doc) => (
              <Card
                key={doc.id}
                className="p-4 dark:bg-neutral-900 dark:text-gray-100 hover:border-primary hover:scale-105 hover:shadow-lg transition-transform duration-300"
              >
                <CardContent className="flex justify-between items-start gap-2">
                  <div className="w-full">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">{doc.title}</h3>
                      <button
                        onClick={() => toggleFavorite(doc.id)}
                        className="text-yellow-500 hover:text-yellow-400 transition-colors"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            doc.favorite ? "fill-yellow-500" : "stroke-current"
                          }`}
                        />
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {doc.createdAt}
                    </p>
                    <div className="mt-1 space-x-1">
                      {doc.tags.map((tag) => (
                        <span
                          key={tag}
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
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-5 h-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
