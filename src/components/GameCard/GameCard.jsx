import React from "react";
import Card from "../../UI/Card";
import SubTitle from "../../UI/SubTitle";
import { Link } from "react-router-dom";

export default function GameCard({ game, author = false }) {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to={`/games/${game.slug}`}>
            <SubTitle>{game.title}</SubTitle>
          </Link>
          <p>{game.author}</p>
        </div>
        {game.scoreCount && <p>Scores submitted {game.scoreCount}</p>}
      </div>
      <div className="flex">
        <img src={game.thumbnail} className="w-1/3" alt="" />
        <div className="w-2/3">{game.description}</div>
      </div>
      {author && (
        <div class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-8 mb-2 w-fit">
          <Link class="text-white" to={`/games/${game.slug}/manage`}>Manage</Link>
        </div>
      )}
    </Card>
  );
}
