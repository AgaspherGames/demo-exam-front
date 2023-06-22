import http from "../utils/http";
import localStorageService from "./localStorageService";

function fetchGames(params) {
  return http.get("/games", {
    params,
  });
}
function fetchGame(slug) {
  return http.get("/games/" + slug);
}
function fetchUser(username) {
  return http.get("/users/" + username);
}
function fetchScores(slug) {
  return http.get("/games/" + slug + "/scores");
}
function sendScore(slug, score) {
  const { token } = localStorageService.loadUser();
  if (token) {
    return http.post(
      "/games/" + slug + "/scores",
      { score },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } else return { message: "no token" };
}
function signin(data) {
  return http.post("/auth/signin", data);
}
function signup(data) {
  return http.post("/auth/signup", data);
}
function signout() {
  return http.post(
    "/auth/signout",
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorageService.loadUser().token}`,
      },
    }
  );
}
function updateGame(slug, info) {
  return http.put(
    "/games/" + slug,
    { ...info },
    {
      headers: {
        Authorization: `Bearer ${localStorageService.loadUser().token}`,
      },
    }
  );
}
function deleteGame(slug) {
  return http.delete("/games/" + slug, {
    headers: {
      Authorization: `Bearer ${localStorageService.loadUser().token}`,
    },
  });
}

export default {
  fetchGames,
  fetchGame,
  fetchScores,
  fetchUser,
  sendScore,
  updateGame,
  deleteGame,
  signin,
  signup,
  signout,
};
