import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "./Button";

const Navbar = () => {
  const { query } = useRouter();
  const [search, setSearch] = useState("");
  const router = useRouter();

  const onSubmit = (e) => {
    e.preventDefault();
    router.push(`?query=${search}`);
  };

  useEffect(() => {
    if (query?.query !== undefined) setSearch(query?.query);
  }, [query?.query]);

  return (
    <nav className="mx-auto w-full max-w-7xl mt-4 px-4 sm:px-6 lg:px-12">
      <div className="flex flex-col md:flex-row mt-3 gap-4 md:gap-2">
        <form onSubmit={onSubmit} className="w-full flex justify-between">
          <div className="w-full items-center">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                id="search"
                name="search"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                value={search}
                autoComplete="off"
                className="block w-full rounded-bl-md rounded-tl-md border border-blue-500 py-3 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-blue-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                placeholder="Search image"
                type="text"
              />
            </div>
          </div>
          <Button
            type="submit"
            className=" rounded-br-md rounded-tr-md border border-blue-500 py-2 px-5 leading-5 placeholder-gray-500 focus:border-blue-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
          >
            Search
          </Button>
        </form>
        {search ? (
          <Button
            onClick={() => {
              setSearch("");
              router.push(`/`);
            }}
            className="text-red-500 rounded-md border border-blue-500 py-3 px-4 leading-5 placeholder-gray-500 focus:border-blue-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
          >
            Clear
          </Button>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
