"use client";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "next/navigation";

const DashboardSort = () => {
  const router = useRouter();
  const pathname = usePathname();
  const sortOptions = [
    { id: 1, label: "Date created (newest)", value: "date_created_desc" },
    { id: 2, label: "Created Date (oldest)", value: "date_created_asc" },
    { id: 3, label: "Name (A-Z)", value: "name_asc" },
    { id: 4, label: "Name (Z-A)", value: "name_desc" },
    { id: 5, label: "Size (Highest)", value: "size_desc" },
    { id: 6, label: "Size (Lowest)", value: "size_asc" },
  ];
  return (
    <Select onValueChange={(value) => router.push(`${pathname}?sort=${value}`)}>
      <SelectTrigger className="sm:w-[200px] w-full">
        <SelectValue
          className="text-sm font-medium text-backgroundGrayLight"
          placeholder="Date created (newest)"
        />
      </SelectTrigger>
      <SelectContent className="!border-none !outline-none !ring-0">
        <SelectGroup>
          {sortOptions?.map((option) => (
            <SelectItem
              className="text-sm font-medium text-backgroundGrayLight"
              key={option.id}
              value={option.value}
            >
              {option?.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default DashboardSort;
