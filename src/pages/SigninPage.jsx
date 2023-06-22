import React, { useEffect, useState } from "react";
import Container from "../UI/Container";
import SubTitle from "../UI/SubTitle";
import Title from "../UI/Title";
import GameCard from "../components/GameCard/GameCard";
import apiService from "../services/apiService";
import { useStore } from "../services/store";
import { useNavigate } from "react-router-dom";
import localStorageService from "../services/localStorageService";

export default function SigninPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { user, setUser } = { ...useStore((state) => state) };
  const navigate = useNavigate();

  function signin() {
    apiService.signin({ username, password }).then((resp) => {
      localStorageService.saveUser({
        token: resp.data.token,
        username: resp.data.username,
      });
      setUser({ token: resp.data.token, username: resp.data.username });
      navigate("/");
    });
  }
  function signup() {
    apiService.signup({ username, password }).then((resp) => {
      localStorageService.saveUser({
        token: resp.data.token,
        username: resp.data.username,
      });
      setUser({ token: resp.data.token, username: resp.data.username });
      navigate("/");
    });
  }

  console.log(user);

  return (
    <div class="bg-white py-6 sm:py-8 lg:py-12">
      <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
        <h2 class="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">
          Login
        </h2>

        <div class="mx-auto max-w-lg rounded-lg border">
          <div class="flex flex-col gap-4 p-4 md:p-8">
            <div>
              <label class="mb-2 inline-block text-sm text-gray-800 sm:text-base">
                Username
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                name="username"
                class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              />
            </div>

            <div>
              <label class="mb-2 inline-block text-sm text-gray-800 sm:text-base">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                type="password"
                class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              />
            </div>

            <button
              class="block rounded-lg bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base"
              onClick={() => {
                signin();
              }}
            >
              Sign in
            </button>
            <button
              class="block rounded-lg bg-blue-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-blue-700 focus-visible:ring active:bg-blue-600 md:text-base"
              onClick={() => {
                signup();
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
