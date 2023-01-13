import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import { useResultContext } from "../contexts/ResultContextProvider";
import { Loading } from "./Loading";

export const Results = () => {
  const { results, isLoading, getResults, searchTerm } = useResultContext();
  const location = useLocation();

  useEffect(() => {
    if (searchTerm) {
      if (location.pathname === "/search") {
        getResults(`/organicResults?query=${searchTerm}`);
      } else {
        console.log(searchTerm);
        getResults(`${location.pathname}?query=${searchTerm}&num=40`);
      }
    }
  }, [searchTerm, location.pathname]);

  if (isLoading) return <Loading />;
  switch (location.pathname) {
    case "/search":
      return (
        <div className="flex flex-wrap justify-between space-y-6 sm:px-56">
          {results?.organic_results?.map(({ link, title }, index) => (
            <div key={index} className="md:w-2/5 w-full">
              <a href={link} target="_blank" rel="noreferrer">
                <p className="text-sm">
                  {link.length > 30 ? link.substring(0, 30) : link}
                </p>
                <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
                  {title}
                </p>
              </a>
            </div>
          ))}
        </div>
      );
    case "/images":
      return (
        <div className="flex flex-wrap justify-center items-center">
          {results?.image_results?.map(({ image, link, title }, index) => (
            <a
              href={link}
              className="sm:p-3 p-5"
              key={index}
              target="_blank"
              rel="norefferer"
            >
              <img src={image} alt={title} loading="lazy" />
              <p className="w-36 break-words text-sm mt-2">{title}</p>
            </a>
          ))}
        </div>
      );
    case "/news":
      return (
        <div className="flex flex-wrap justify-between space-y-6 sm:px-56 items-center">
          {results?.news_results?.map(
            ({ imgSrc, source, snippet, rank, title }) => (
              <div key={rank} className="md:w-2/5 w-full">
                <a
                  href={imgSrc}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  <p className="text-lg dark:text-blue-300 text-blue-700">
                    {title}
                  </p>
                </a>
                <div className="gap-4">
                  <p className="text-md dark:text-blue-200 text-blue-500 mt-2">
                    {snippet}
                  </p>
                  <p className="text-18 dark:text-blue-100 text-blue-400 mt-3">
                    {source}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      );
    case "/videos":
      return (
        <div className="flex flex-wrap">
          {results?.video_results?.map((link, index) => (
            <div key={index} className="p-2">
              <ReactPlayer url={link} controls width="355px" height="200px" />
            </div>
          ))}
        </div>
      );

    default:
      return "ERROR!";
  }
};
