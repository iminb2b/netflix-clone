import { FC, memo } from "react";
import Card from "./Card";
import { css } from "@emotion/react";
import colors from "@/value/colors";
import { VideoInfoPreview } from "@/PageComponents/HomePage";
import CardSimple from "./CardSimple";

const container = css`
  color: ${colors.blue20};
  background-color: ${colors.black};
  width: 100%;
`;
const titleLabel = css`
  color: ${colors.white10};
  font-weight: 700;
  font-size: 2rem;
`;
const cardWrapper = css`
  display: flex;
  flex-direction: column;
  padding-top: 1.7rem;
  padding-bottom: 1.5rem;
  margin-top: 1.5rem /* 24px */;
  margin-right: 0.75rem /* 12px */;
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

const SectionCardVertical: FC<{
  title: string;
  videos: VideoInfoPreview[];
}> = memo(({ title, videos }) => {
  return (
    <section css={container}>
      <h2 css={titleLabel}>{title}</h2>
      <div css={cardWrapper}>
        {videos.map((video, index) => (
          <CardSimple
            imgUrl={video.imgUrl}
            key={index}
            videoId={video.id}
            title={video.title}
          />
        ))}
      </div>
    </section>
  );
});

export default SectionCardVertical;
