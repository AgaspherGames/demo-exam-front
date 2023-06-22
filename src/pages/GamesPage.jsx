import React, { useEffect, useState } from "react";
import Container from "../UI/Container";
import SubTitle from "../UI/SubTitle";
import Title from "../UI/Title";
import GameCard from "../components/GameCard/GameCard";
import apiService from "../services/apiService";

export default function GamesPage() {
  const [sortBy, setSortBy] = useState("title");
  const [sortDir, setSortDir] = useState("asc");

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const [games, setGames] = useState([]);

  useEffect(() => {
    apiService
      .fetchGames({
        size: 2,
        sortBy,
        sortDir,
        page,
      })
      .then((resp) => {
        setGames(resp.data);
        setPages(Math.ceil(resp.data.totalElements / resp.data.size));
      });
  }, [sortBy, sortDir, page]);

  return (
    <div>
      <Container>
        <div className="flex items-center justify-between">
          <SubTitle>{games.totalElements} Games available</SubTitle>
          <div>
            <button
              class={` ${
                sortBy == "title"
                  ? "text-gray-100 bg-gray-500"
                  : "text-gray-100 bg-gray-400"
              } text-lg font-semibold py-2 px-3 rounded-l-md transition duration-100  hover:bg-gray-300 hover:text-gray-600`}
              onClick={() => {
                setSortBy("title");
              }}
            >
              Title
            </button>
            <button
              class={` ${
                sortBy == "popular"
                  ? "text-gray-100 bg-gray-500"
                  : "text-gray-100 bg-gray-400"
              } text-lg font-semibold  py-2 px-3 transition duration-100 border-x border-gray-500 hover:bg-gray-300 hover:text-gray-600`}
              onClick={() => {
                setSortBy("popular");
              }}
            >
              Popularity
            </button>
            <button
              class={` ${
                sortBy == "uploaddate"
                  ? "text-gray-100 bg-gray-500"
                  : "text-gray-100 bg-gray-400"
              } text-lg font-semibold  py-2 px-3 rounded-r-md transition duration-100  hover:bg-gray-300 hover:text-gray-600`}
              onClick={() => {
                setSortBy("uploaddate");
              }}
            >
              Upload Date
            </button>
          </div>
          <div>
            <button
              class={` ${
                sortDir == "asc"
                  ? "text-gray-100 bg-gray-500"
                  : "text-gray-100 bg-gray-400"
              } text-lg font-semibold py-2 px-3 rounded-l-md transition duration-100  hover:bg-gray-300 hover:text-gray-600`}
              onClick={() => {
                setSortDir("asc");
              }}
            >
              Asc
            </button>
            <button
              class={` ${
                sortDir == "desc"
                  ? "text-gray-100 bg-gray-500"
                  : "text-gray-100 bg-gray-400"
              } text-lg font-semibold  py-2 px-3 rounded-r-md border-l border-gray-500 transition duration-100  hover:bg-gray-300 hover:text-gray-600`}
              onClick={() => {
                setSortDir("desc");
              }}
            >
              Desc
            </button>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-4">
          {games?.content?.map((game) => (
            <GameCard game={game} key={game.slug} />
          ))}
        </div>

        <ul class="inline-flex mt-4 justify-center w-full">
          {Array(pages)
            .fill("")
            .map((_, ind) => {
              return (
                <li key={ind}>
                  <button
                    class="px-3 py-2 text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                    onClick={() => {
                      setPage(ind + 1);
                    }}
                  >
                    {ind + 1}
                  </button>
                </li>
              );
            })}
        </ul>
      </Container>
    </div>
  );
}
