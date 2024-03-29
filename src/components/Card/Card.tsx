import { css } from "@emotion/react";
import Image from "next/image";
import { FC, memo } from "react";
import { motion } from "framer-motion";
import { Button, useDialogStore } from "@ariakit/react";
import VideoPreviewModal from "../VideoPage/AddToMyList";
import { VideoInfoPreview } from "@/PageComponents/HomePage";
import Link from "next/link";
import routeLinks from "@/routeLinks";

const imgMotionWrapper = css`
  position: relative;
  display: inline-block;

  &:hover {
    z-index: 99;
  }
`;
const smItem = css`
  ${imgMotionWrapper}
  position: relative;
  width: 300px;
  min-width: 300px;
  height: 170px;
  min-height: 170px;
`;

const mdItem = css`
  ${imgMotionWrapper}

  position: relative;
  width: 158px;
  min-width: 158px;
  height: 280px;
  min-height: 280px;
`;

const lgItem = css`
  ${imgMotionWrapper}

  position: relative;
  width: 218px;
  min-width: 218px;
  height: 434px;
  min-height: 434px;
`;

const container = css`
  margin-right: 0.25rem /* 4px */;
  cursor: pointer;
`;

const cardImg = css`
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;

  border-radius: 0.375rem /* 6px */;
  object-fit: cover;

  object-position: center;
  display: block;

  max-width: 100%;

  :hover {
    z-index: 50;
  }
`;

const imgPlaceHolder =
  "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1340&q=80";
const Card: FC<{
  id?: number;
  video: VideoInfoPreview;
  size: "small" | "medium" | "large";
}> = memo(({ size = "medium", video, id = 0 }) => {
  const classMap = {
    large: lgItem,
    medium: mdItem,
    small: smItem,
  };
  const scale = id === 0 ? { scaleY: 1.1 } : { scale: 1.1 };
  return (
    <>
      <Link href={routeLinks.video({ videoId: video.id })} css={container}>
        <motion.div css={classMap[size]} whileHover={{ ...scale }}>
          <Image
            src={video.imgUrl}
            alt="image"
            fill
            sizes="600px 100%"
            css={cardImg}
          />
        </motion.div>
      </Link>
    </>
  );
});

export default Card;
