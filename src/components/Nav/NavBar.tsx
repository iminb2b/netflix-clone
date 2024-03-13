import routeLinks from "@/routeLinks";
import colors from "@/value/colors";
import { css } from "@emotion/react";
import Link from "next/link";
import { FC, memo, useContext } from "react";
import NavBarDropdown from "./NavBarDropdown";
import Image from "next/image";
import { AppContext } from "@/context/AppContext";
import SearchBox from "./SearchBox";

const container = css`
  color: ${colors.white10};
  position: fixed;
  top: 0px;
  background-image: linear-gradient(to bottom, var(--gradient-stops));

  --gradient-from: ${colors.black};
  --gradient-stops: var(--gradient-from), var(--gradient-to, rgba(0, 0, 0, 0));
  width: 100%;
  z-index: 50;
`;
const wrapper = css`
  padding-left: 1rem /* 16px */;
  padding-right: 1rem /* 16px */;
  display: flex;
  padding: 1.25rem /* 20px */;

  @media (min-width: 768px) {
    padding-left: 4rem /* 64px */;
    padding-right: 4rem /* 64px */;
    flex-direction: row;
    align-items: center;
  }
`;
const logoLink = css`
  display: flex;
  font-weight: 500;
  font-size: 1rem;
  align-items: center;
  color: ${colors.white10};
  margin-bottom: 1rem /* 16px */;
  @media (min-width: 768px) {
    margin-bottom: 0px;
  }
`;

const searchContainer = css`
  flex: 1;
`;
const logoWrapper = css`
  color: ${colors.red};
  width: 8rem /* 128px */;
`;
const navItems = css`
  display: flex;
  flex-direction: row;
  width: 50%;
  margin-left: 1.5rem /* 24px */;
  font-size: 0.875rem /* 14px */;
  font-size: 1rem;

  line-height: 1.25rem /* 20px */;
  list-style: none;
  @media (min-width: 768px) {
    margin-left: 3rem /* 48px */;
  }
`;
const navItem = css`
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  margin-right: 0.75rem /* 12px */;
  @media (min-width: 768px) {
    margin-right: 1.25rem /* 20px */;
  }
`;
const navItem2 = css`
  cursor: pointer;
`;
const navContainer = css`
  display: flex;
  align-items: flex-start;
  margin-left: 2rem;
`;
const NavBar: FC = memo(() => {
  const {
    state: { username },
  } = useContext(AppContext);
  return (
    <div css={container}>
      <div css={wrapper}>
        <div css={logoLink}>
          <Link
            href={routeLinks.homePage}
            aria-label="Home Page"
            css={logoWrapper}
          >
            <Image
              src="/static/netflix.svg"
              alt="Netflix"
              height="100"
              width={100}
            />
          </Link>
        </div>
        {username && (
          <>
            <ul css={navItems}>
              <Link href={routeLinks.homePage} aria-label="Home Page">
                <li css={navItem}>Home</li>
              </Link>
              <Link href={routeLinks.myList} aria-label="My List">
                <li css={navItem2}>My List</li>
              </Link>
            </ul>
            <div css={searchContainer}>
              <SearchBox />
            </div>
            <div css={navContainer}>
              <NavBarDropdown username={username} />
            </div>
          </>
        )}
      </div>
    </div>
  );
});

export default NavBar;
