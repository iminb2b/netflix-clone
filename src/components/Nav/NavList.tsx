import { FC } from "react";
import { css } from "@emotion/react";
import routeLinks from "@/routeLinks";
import NavListItem from "./NavListItem";
import { useRouter } from "next/router";

const container = css`
  display: flex;
  gap: 2rem;
  height: 100%;
  align-items: center;

  @media screen and (max-width: 720px) {
    display: none;
  }
`;

export type NavInfo = {
  name: string;
  url: string;
  isButtonLink: boolean;
};

const NavList: FC = () => {
  const router = useRouter();

  const navListInfo: NavInfo[] = [
    {
      name: "About",
      url: routeLinks.about,
      isButtonLink: false,
    },
    {
      name: "Work",
      isButtonLink: false,
      url: routeLinks.projects,
    },
    {
      name: "Contact",
      isButtonLink: true,
      url: routeLinks.contact,
    },
  ];

  return (
    <div css={container}>
      {navListInfo.map((item, index) => (
        <NavListItem
          item={item}
          key={index}
          isActive={router.asPath === item.url}
        />
      ))}
    </div>
  );
};

export default NavList;
