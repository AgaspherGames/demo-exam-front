import React, { useEffect, useState } from "react";
import Container from "../UI/Container";
import Title from "../UI/Title";
import Card from "../UI/Card";
import { useParams } from "react-router-dom";
import SubTitle from "../UI/SubTitle";
import apiService from "../services/apiService";
import GameCard from "../components/GameCard/GameCard";

export default function UserPage() {
  const { username } = useParams();
  const [user, setUser] = useState();

  useEffect(() => {
    apiService.fetchUser(username).then((resp) => setUser(resp.data.data));
  }, []);
  console.log(user);

  if (!user?.username) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <Container>
        <Title className="mb-4">{user.username}</Title>
        <SubTitle className="mb-4">Authored Games</SubTitle>
        <div className="flex flex-col gap-4">
          {
            user.authoredGames.map((game) => (
              <GameCard game={game} author key={game?.slug} />
            ))
          }
        </div>

        <div>
          <SubTitle className="mb-4">Highscores per game</SubTitle>
          <table className="w-48">
            <tbody>
              {user.highscores.map((score, ind) => (
                <tr key={ind}>
                  <td>{score.game.title}</td>
                  <td>{score.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
}
