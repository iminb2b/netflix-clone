import { VideoInfoPreview } from "@/PageComponents/HomePage";
import { css } from "@emotion/react";
import { FC, memo } from "react";
import colors from "@/value/colors";
import Card from "../Card/Card";

const container = css`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: ease-in-out 0.3s;
  padding: 3rem 0;
  width: 100%;

  ul {
    display: flex;
    gap: 1rem;
    padding: 2rem 0;
  }
`;

const titleLabel = css`
  color: ${colors.white10};
  font-weight: 700;
  font-size: 2rem;
`;

const RelatedVideoList: FC<{ videos: VideoInfoPreview[] }> = memo(
  ({ videos }) => {
    const list = videos.slice(0, 3);
    return (
      <div css={container}>
        <h2 css={titleLabel}>Related Videos</h2>
        <ul>
          {list.map((video, index) => (
            <Card video={video} size="large" key={index} />
          ))}
        </ul>
      </div>
    );
  },
);

export default RelatedVideoList;
