/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useRef, useState } from "react";
import bookPng from "../assets/book.png";
import lwsSVG from "../assets/lws-logo-en.svg";
import starSVG from "../assets/star.svg";
import bellIconSVG from "../assets/test.svg";
import "../styles/output.css";
import useDebounce, { BookData } from "./utlils";

export const Header = () => {
  const [inputText, setInputText] = useState("");
  const BtnRef = useRef();
  // eslint-disable-next-line no-unused-vars
  const [originalData, setOriginalData] = useState([...BookData]);
  const [data, setData] = useState([...BookData]);
  const [sortOption, setSortOption] = useState("");

  const handleSortChange = (e) => {
    const sortBy = e.target.value;

    const sortOptions = {
      name_asc: (a, b) => a.name.localeCompare(b.name),
      name_desc: (a, b) => b.name.localeCompare(a.name),
      year_asc: (a, b) => a.publishYear - b.publishYear,
      year_desc: (a, b) => b.publishYear - a.publishYear,
    };

    if (sortOptions[sortBy]) {
      setSortOption(sortBy);
      let res = data.sort(sortOptions[sortBy]);
      setData(res);
    }
  };

  const handleSearchFunctionality = (search) => {
    if (!search) {
      alert("Insert your required book name");
      setData(originalData);
      return;
    }

    const modifiedData = originalData?.filter(
      (item) =>
        item?.name.split(" ").join("").toLocaleLowerCase() ===
        search.toLocaleLowerCase()
    );

    if (!modifiedData?.length) {
      setData(originalData);
      setInputText("");
      return alert("No book available");
    }
    setData(modifiedData);
  };

  const debounce = useDebounce();

  console.log("originalData", originalData);
  console.log("data", data);

  return (
    <body className="relative font-[Manrope] before:fixed before:left-0 before:top-0 before:-z-10 before:h-[435px] before:w-full before:rounded-bl-3xl before:bg-[#EAE6D7] max-md:px-4 lg:text-lg before:lg:rounded-bl-[79px]">
      <nav className="py-6 ">
        <div className="container mx-auto flex items-center justify-between gap-x-6 max-w-7xl">
          <a href="/">
            <img
              className="max-w-[100px] md:max-w-[165px]"
              src={lwsSVG}
              alt="Lws"
            />
          </a>
          <img src={bellIconSVG} alt="bellIconSVG" />
        </div>
      </nav>

      <main className="my-10 lg:my-14">
        <header className="mb-8 lg:mb-10 mx-auto max-w-7xl">
          <div className="mx-auto flex items-end justify-between max-md:max-w-[95%] max-md:flex-col max-md:items-start max-md:space-y-4">
            <div>
              <h6 className="mb-2 text-base lg:text-xl">Trending on 2021</h6>
              <h2 className="mb-6 font-['Playfair_Display'] text-3xl font-bold lg:text-4xl">
                Trending Books of the Year
              </h2>

              <form>
                <div className="flex">
                  <div className="relative w-full overflow-hidden rounded-lg border-2 border-[#1C4336] text-[#1C4336] md:min-w-[380px] lg:min-w-[440px]">
                    <input
                      type="search"
                      value={inputText}
                      id="search-dropdown"
                      className="z-20 block w-full bg-white px-4 py-2.5 pr-10 text-[#1C4336] placeholder:text-[#1C4336] focus:outline-none"
                      placeholder="Search Book"
                      required
                      onChange={(e) => {
                        setInputText(e.target.value);
                        debounce(() => {
                          handleSearchFunctionality(e.target.value);
                        }, 1000);
                      }}
                    />
                    <div className="absolute right-0 top-0 flex h-full items-center">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleSearchFunctionality(inputText);
                        }}
                        type="submit"
                        className="mr-1.5 flex items-center space-x-1.5 rounded-md rounded-e-lg bg-[#1C4336] px-4 py-2.5 text-sm text-white"
                      >
                        <svg
                          className="h-[14px] w-[14px]"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                          />
                        </svg>
                        <span>Search</span>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="flex items-stretch space-x-3">
              <select
                className="cursor-pointer rounded-md border px-4 py-2 text-center text-gray-600"
                name="sortBy"
                id="sortBy"
                value={sortOption}
                onChange={handleSortChange}
              >
                <option value="">Sort</option>
                <option value="name_asc">Name (A-Z)</option>
                <option value="name_desc">Name (Z-A)</option>
                <option value="year_asc">Publication Year (Oldest)</option>
                <option value="year_desc">Publication Year (Newest)</option>
              </select>
            </div>
          </div>
        </header>

        <div className="container mx-auto grid grid-cols-1 gap-8 max-w-7xl md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.isArray(data) &&
            data.length > 0 &&
            data?.map((item, index) => (
              <tr key={item?.id}>
                <td>
                  <div className="space-y-3">
                    <div className="flex items-center justify-center rounded-md border border-[#324251]/30 bg-white p-4">
                      <img
                        className="max-w-[144px]"
                        src={bookPng}
                        alt="book name"
                      />
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-lg font-bold lg:text-xl">
                        {item?.name}--- {item?.publishYear}
                      </h4>
                      <p className="text-xs lg:text-sm">
                        By : <span>{item?.publisherName}</span>
                      </p>
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-bold lg:text-xl">
                          ${item?.price}
                        </h4>

                        <div className="flex items-center space-x-1">
                          <img src={starSVG} />
                          <img src={starSVG} />
                          <img src={starSVG} />
                          <img src={starSVG} />
                          <span className="text-xs lg:text-sm">
                            ({item?.rate} Star)
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-xs lg:text-sm">
                        <button
                          ref={BtnRef}
                          className="flex min-w-[132px] items-center justify-center gap-1 rounded-md bg-[#1C4336] py-1.5 text-white transition-all hover:opacity-80 lg:py-1.5"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-5 w-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                            />
                          </svg>
                          Add to Cart
                        </button>

                        <button
                          className="flex min-w-[132px] items-center justify-center gap-1 rounded-md bg-[#1C4336]/[14%] py-1.5 text-[#1C4336] transition-all  hover:bg-[#1C4336]/[24%] lg:py-1.5"
                          onClick={() => {
                            const modifyPrevData = data?.map((data) => {
                              if (data?.id === item?.id) {
                                return {
                                  ...data,
                                  isFavorite: !data?.isFavorite,
                                };
                              }

                              return data;
                            });
                            setData(modifyPrevData);
                            const prevOriginalData = [...originalData];
                            const modifyOriginalData = prevOriginalData?.map(
                              (data) => {
                                if (data?.id === item?.id) {
                                  return {
                                    ...data,
                                    isFavorite: !data?.isFavorite,
                                  };
                                }

                                return data;
                              }
                            );
                            setOriginalData(modifyOriginalData);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-5 w-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                            />
                          </svg>
                          {item?.isFavorite ? "Unfavorite" : "Favorite"}
                        </button>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
        </div>
      </main>

      <footer className="py-6 md:py-8">
        <div className="container mx-auto">
          <p className="text-center text-sm lg:text-base">
            Copyright ©2023 | All rights reserved by Learn with Sumit
          </p>
        </div>
      </footer>
    </body>
  );
};
