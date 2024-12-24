"use client";

import { SearchFile } from "@/actions/dashboard/search";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useDebounce } from "use-debounce";
import React, { useEffect, useState, useCallback } from "react";
import SearchResults from "./search-results";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const HeaderSearch = () => {
  const [query, setQuery] = useState<string>(""); // Track user input
  const [debouncedQuery] = useDebounce(query, 300); // Debounce user input
  const [searchResults, setSearchResults] = useState<[] | null>(null); // Track search results
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query") || "";

  // Avoid recreating `handleSearch` on every render
  const handleSearch = useCallback(async () => {
    try {
      if (!debouncedQuery) {
        router.push(path.replace(searchParams.toString(), ""));
        setSearchResults(null);
        return;
      }
      const searchResults = await SearchFile({ query: debouncedQuery });
      if (searchResults.status === 200) {
        setSearchResults(searchResults?.data);
      }
    } catch (error) {
      console.error(`Error searching for files: ${error}`);
    }
  }, [debouncedQuery]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  useEffect(() => {
    if (!searchQuery) {
      setQuery("");
    }
  }, [searchQuery]);

  return (
    <div className="relative flex items-start gap-x-[10px] h-[52px] w-[90%] lg:w-[482px] rounded-[30px] p-[16px] shadow-lg shadow-[#5968B20F] border">
      <Image
        src={"/icons/search.svg"}
        alt="Search Icon"
        height={15}
        width={16}
        className="h-auto"
      />
      <Input
        type="text"
        placeholder="Search"
        value={query}
        className="border-none shadow-none p-0 shad-no-focus placeholder:text-light-200 outline-none ring-offset-transparent focus:ring-transparent focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 h-[20px] text-backgroundGrayDark font-[family-name:var(--font-poppins-semibold)] text-sm leading-5 focus:text-backgroundGrayLight focus:font-[600] focus:placeholder:font-[400] focus:placeholder:text-backgroundGrayDark"
        onChange={(e) => setQuery(e.target.value)} // Update query state
      />
      {searchResults && searchResults?.length > 0 && (
        <SearchResults
          searchResults={searchResults}
          setSearchResults={setSearchResults}
          query={query}
          key={Math.random()}
        />
      )}
    </div>
  );
};

export default HeaderSearch;
