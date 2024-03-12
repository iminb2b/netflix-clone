import Link from "next/link";
import { FC } from "react";
import { css } from "@emotion/react";
import { NavInfo } from "./NavList";
import buttonStyles from "@/styles/buttonStyles";

const link = css`
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    &::after {
      content: "";
      position: absolute;
      bottom: -4px;
      height: 2px;
      width: 80%;
      left: 10%;
    }
  }
`;

const activeLink = css`
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -4px;
    height: 2px;
    width: 80%;
    left: 10%;
  }
`;

const NavListItem: FC<{
  item: NavInfo;
  isActive: boolean;
}> = ({ item, isActive }) => {
  if (item.isButtonLink)
    return (
      <Link href={item.url} css={buttonStyles}>
        {item.name}
      </Link>
    );

  return (
    <Link href={item.url} css={isActive ? activeLink : link}>
      {item.name}
    </Link>
  );
};

export default NavListItem;
