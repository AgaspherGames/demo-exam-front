import React, { useEffect, useState } from "react";
import Container from "../UI/Container";
import Title from "../UI/Title";
import Card from "../UI/Card";
import { useParams } from "react-router-dom";
import SubTitle from "../UI/SubTitle";
import apiService from "../services/apiService";

export default function GamePage() {
  const { slug } = useParams();
  const [game, setGame] = useState();
  const [scores, setScores] = useState([]);

  const [interval, setinterval] = useState();

  function onMessage(e) {
    if (e.data.event_type == "game_run_end") {
      apiService.sendScore(slug, e.data.score);
    }
  }

  useEffect(() => {
    apiService.fetchGame(slug).then((resp) => setGame(resp.data));
    apiService.fetchScores(slug).then((resp) => setScores(resp.data.scores));

    window.addEventListener("message", onMessage);

    setinterval(
      setInterval(() => {
        apiService
          .fetchScores(slug)
          .then((resp) => setScores(resp.data.scores));
      }, 5000)
    );
    return () => {
      window.removeEventListener("message", onMessage);
      clearInterval(interval);
    };
  }, []);

  if (!game?.title) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <Container>
        <Title className="mb-4">{game.title}</Title>
        <Card>
          <iframe className="w-full" height={300} src={game.gamePath}></iframe>
        </Card>
        <div className="flex gap-8">
          <div className="w-1/2">
            <SubTitle>Top Leaderboard</SubTitle>
            <table className="w-full">
              <tbody>
                {scores?.map((score, ind) => (
                  <tr key={score.username}>
                    <td># {ind+1} {score.username}</td>
                    <td>{score.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <SubTitle>Scores Count {game.scoreCount}</SubTitle>
          </div>
          <div className="w-1/2">{game.description}</div>
        </div>
      </Container>
    </div>
  );
}
