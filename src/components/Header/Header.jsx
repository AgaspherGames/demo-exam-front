import React from "react";
import HeaderLink from "./HeaderLink";
import { useStore } from "../../services/store";
import apiService from "../../services/apiService";
import localStorageService from "../../services/localStorageService";

export default function Header() {
  const {user, setUser} = useStore((state) => state);

  return (
    <div class="bg-white lg:pb-12">
      <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
        <header class="flex items-center justify-between py-4 md:py-8">
          <a
            href="/"
            class="text-black-800 inline-flex items-center gap-2.5 text-2xl font-bold md:text-3xl"
            aria-label="logo"
          >
            WORLDSKILLS: GAMES
          </a>
          {user ? (
            <div className="flex gap-4">
              <HeaderLink to={`/users/${user.username}`}>
                {user.username}
              </HeaderLink>
              <HeaderLink onClick={() => {	
                apiService.signout();
                localStorageService.clearUser()
                setUser(null)

               }}>Logout</HeaderLink>
            </div>
          ) : (
            <HeaderLink to="signin">SignIn/SignUp</HeaderLink>
          )}
        </header>
      </div>
    </div>
  );
}
