import { css, Global } from "@emotion/react";
import { FC, memo, ReactNode } from "react";
import Header from "./Header";
import globalStyles from "@/styles/globalStyles";
import NavBar from "./Nav/NavBar";

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
  return (
    <div css={pageContainer}>
      <Global styles={globalStyles} />
      <NavBar username="Min" />

      <div css={pageContent}>{children}</div>

      {/* <Footer /> */}
    </div>
  );
});

Layout.displayName = "Layout";

export default Layout;
