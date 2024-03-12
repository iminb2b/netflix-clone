import Link from "next/link";
import { FC } from "react";
import { css } from "@emotion/react";
import colors from "@/value/colors";
import routeLinks from "@/routeLinks";

const logo = css`
  font-size: 2rem;
  font-weight: 700;
  transition: all 0.3s ease;

  &:hover {
    color: ${colors.purple};
  }
`;

const Logo: FC = () => {
  return (
    <Link href={routeLinks.homePage} css={logo}>
      min.
    </Link>
  );
};

export default Logo;
