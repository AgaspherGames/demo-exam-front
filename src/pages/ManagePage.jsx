import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import apiService from "../services/apiService";
import Card from "../UI/Card";
import SubTitle from "../UI/SubTitle";
import Container from "../UI/Container";
import Title from "../UI/Title";
import http from "../utils/http";
import localStorageService from "../services/localStorageService";
import { useStore } from "../services/store";

export default function ManagePage() {
  const { slug } = useParams();
  const [game, setGame] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const username = useStore((state) => state.user.username);

  const [file, setFile] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    apiService.fetchGame(slug).then((resp) => setGame(resp.data));
  }, []);

  useEffect(() => {
    setTitle(game?.title ?? "");
    setDescription(game?.description ?? "");

    console.log('username', username);
    if (username != game?.author && game?.title) {
      navigate(-1);
    }
    if (!username) {
      navigate(-1);
    }
  }, [game]);

  function upload(e) {
    const formData = new FormData();

    formData.append("zipfile", e.target.files[0]);
    http.post("/games/game-3/upload", formData, {
      headers: {
        Authorization: `Bearer ${localStorageService.loadUser().token}`,
      },
    });
  }

  if (!game?.title) return <div>Loading...</div>;

  return (
    <Container>
      <Title className="mb-4">Manage Game</Title>
      <Card>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 relative">
            <SubTitle>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </SubTitle>
            {title != game.title && (
              <button
                onClick={() => {
                  apiService.updateGame(slug, { title });
                }}
                className="absolute -top-8 bg-gray-100 text-black px-1 py-0.5"
              >
                save
              </button>
            )}
          </div>
          {!!game.scoreCount && <p>Scores submitted {game.scoreCount}</p>}
        </div>
        <div className="flex">
          <img src={game.thumbnail} className="w-1/3" alt="" />
          <div className="w-2/3 relative">
            <textarea
              name=""
              className="w-full"
              rows={"10"}
              id=""
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            {description != game.description && (
              <button
                onClick={() => {
                  apiService.updateGame(slug, { description });
                }}
                className="absolute left-0 -top-8 bg-gray-100 text-black px-1 py-0.5"
              >
                save
              </button>
            )}
          </div>
        </div>
      </Card>
      <form>
        <button
          type="button"
          class="relative text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4 mr-2 mb-2"
        >
          Upload new version
          <input
            name="zipfile"
            className="absolute opacity-0 inset-0"
            type="file"
            onChange={upload}
          />
        </button>
      </form>
      <button
        onClick={() => {
          if (confirm("Really???")) {
            apiService.deleteGame(slug);
          }
        }}
        type="button"
        class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
      >
        Delete
      </button>
    </Container>
  );
}
