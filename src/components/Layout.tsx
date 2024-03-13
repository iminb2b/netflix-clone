import { css, Global } from "@emotion/react";
import { FC, memo, ReactNode, useContext, useEffect } from "react";
import globalStyles from "@/styles/globalStyles";
import NavBar from "./Nav/NavBar";
import { AppContext } from "@/context/AppContext";

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

  useEffect(() => {
    const getLocalStorage = async () => {
      const email = localStorage.getItem("username");
      if (email) {
        dispatch({ type: "login", username: email });
      }
    };

    getLocalStorage();
  }, []);
  return (
    <div css={pageContainer}>
      <Global styles={globalStyles} />
      {username && <NavBar />}

      <div css={pageContent}>{children}</div>
    </div>
  );
});

Layout.displayName = "Layout";

export default Layout;
