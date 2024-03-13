import { css, Global } from "@emotion/react";
import { FC, memo, ReactNode, useContext, useEffect, useState } from "react";
import globalStyles from "@/styles/globalStyles";
import NavBar from "./Nav/NavBar";
import { AppContext } from "@/context/AppContext";
import { match } from "ts-pattern";

const pageContent = css`
  flex: 1 0 auto;
  width: 100%;
  height: 100%;
`;

const pageContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh);
  position: relative;
  background-color: black;
  color: white;
`;

const Layout: FC<{
  children: ReactNode;
}> = memo(({ children }) => {
  const {
    state: { username },
    dispatch,
  } = useContext(AppContext);
  const [state, setState] = useState<"loading" | "loaded">("loading");

  useEffect(() => {
    setState("loading");
    const getLocalStorage = async () => {
      const email = localStorage.getItem("username");
      const localWatchFilms = localStorage.getItem("watchingFilms");
      const localList = localStorage.getItem("myList");

      if (email) {
        dispatch({ type: "login", username: email });
      }
      if (localWatchFilms) {
        dispatch({ type: "addWatchingFilm", ids: localWatchFilms.split(",") });
      }
      if (email) {
        dispatch({ type: "login", username: email });
      }
    };

    getLocalStorage();
    setState("loaded");
  }, []);
  return match(state)
    .with("loading", () => <></>)
    .with("loaded", () => (
      <div css={pageContainer}>
        <Global styles={globalStyles} />
        {username && <NavBar />}

        <div css={pageContent}>{children}</div>
      </div>
    ))
    .otherwise(() => null);
});

Layout.displayName = "Layout";

export default Layout;
