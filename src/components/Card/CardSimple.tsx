import { css } from "@emotion/react";
import Image from "next/image";
import { FC, memo } from "react";
import Link from "next/link";
import routeLinks from "@/routeLinks";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import colors from "@/value/colors";

const mdItem = css`
  position: relative;
  max-width: 100%;
  width: 300px;
  min-width: 300px;
  height: 170px;
  min-height: 170px;
`;

const container = css`
  width: 100%;

  display: flex;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  padding: 1rem;

  :hover {
    background-color: ${colors.gray40};
  }
`;

const cardImg = css`
  border-radius: 0.375rem /* 6px */;
  object-fit: cover;

  object-position: center;
  display: block;
`;

const infoContainer = css`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;
const name = css`
  color: ${colors.white};
  font-size: 1.25rem;
`;
const icon = css`
  font-size: 2.25rem;
  color: ${colors.white};
`;

const imgPlaceHolder =
  "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1340&q=80";
const CardSimple: FC<{
  videoId: string;
  title: string;
  imgUrl: string;
}> = memo(({ imgUrl = imgPlaceHolder, videoId, title }) => {
  return (
    <Link href={routeLinks.video({ videoId })} css={container}>
      <div css={mdItem}>
        <Image src={imgUrl} alt="image" fill sizes="600px 100%" css={cardImg} />
      </div>
      <div css={infoContainer}>
        <div css={name}>{title}</div>
        <PlayCircleOutlineIcon css={icon} />
      </div>
    </Link>
  );
});

export default CardSimple;
