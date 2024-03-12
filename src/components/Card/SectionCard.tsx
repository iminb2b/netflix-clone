import { FC, memo } from "react";
import Card from "./Card";
import { css } from "@emotion/react";
import colors from "@/value/colors";
import { VideoInfo, VideoInfoPreview } from "@/PageComponents/HomePage";

const container = css`
  color: var(--blue20);
  background-color: ${colors.black};
  padding-left: 1rem /* 16px */;
  padding-right: 1rem /* 16px */;
  width: 100%;

  @media (min-width: 768px) {
    padding-left: 4rem /* 64px */;
    padding-right: 4rem /* 64px */;
  }
`;
const titleLabel = css`
  color: var(--white10);
  font-weight: 700;
  font-size: 2rem;
`;
const cardWrapper = css`
  display: flex;
  padding-top: 1.7rem;
  padding-bottom: 1.5rem;
  margin-top: 1.5rem /* 24px */;
  margin-right: 0.75rem /* 12px */;
  overflow-x: scroll;
  overflow-y: hidden;
  width: 100%;
`;
const wrap = css`
  flex-wrap: wrap;
`;
const mb3 = css`
  margin-bottom: 3rem /* 48px */;
`;
const mb2 = css`
  margin-bottom: 2rem /* 32px */;
`;

const SectionCard: FC<{
  title: string;
  size: "large" | "medium" | "small";
  videos: VideoInfoPreview[];
}> = memo(({ title, size, videos }) => {
  return (
    <section css={container}>
      <h2 css={titleLabel}>{title}</h2>
      <div css={cardWrapper}>
        {videos.map((video, index) => (
          <Card imgUrl={video.imgUrl} size={size} id={0} key={index} />
        ))}
      </div>
    </section>
  );
});

export default SectionCard;
