import { Controller, useFormContext } from "react-hook-form";
import React, { useEffect, useRef, useState } from "react";
export default function SearchBar() {
  const { register, control } = useFormContext();
  const inputRef = useRef(null);

  return (
    <>
    
      <label
        htmlFor="name"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-4  left-0 flex pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <Controller
          name="name"
          control={control}
          render={({ field }) => {
            return (
              <input
              ref={inputRef}
                {...field}
                className="block w-20 sm:w-28 p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search a recipe..."
              />
            );
          }}
        />
      </div>
   
    </>
  );
}
