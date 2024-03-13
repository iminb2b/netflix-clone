import { VideoInfoPreview } from "@/PageComponents/HomePage";
import { css } from "@emotion/react";
import { FC, memo } from "react";
import AddIcon from "@mui/icons-material/Add";
import colors from "@/value/colors";
import AddToMyList from "./AddToMyList";

const modalBodyContent = css`
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  column-gap: 2em;
  padding: 2rem 0;
`;
const col1 = css``;
const publishTimeLabel = css`
  font-size: 1.125rem /* 18px */;
  line-height: 1.75rem /* 28px */;
  margin-top: 1.5rem /* 24px */;
  margin-bottom: 0.5rem /* 8px */;
  color: ${colors.green10};
`;
const text = css`
  font-size: 2rem /* 18px */;
  line-height: 1.75rem /* 28px */;
  color: ${colors.white10};
  font-weight: 700;
`;
const descriptionLabel = css`
  margin-bottom: 0.5rem /* 8px */;
  margin-top: 0.75rem /* 12px */;
`;
const col2 = css`
  color: ${colors.white10};
  line-height: 1.75rem /* 28px */;
  display: flex;
  flex-direction: column;
`;
const subText = css`
  font-size: 0.875rem /* 14px */;
  line-height: 1.25rem /* 20px */;
  margin-left: 0px;
  overflow-wrap: break-word;
`;

const subTextWrapper = css`
  ${subText}
  margin-top: 1.5rem /* 24px */;
`;
const textColor = css`
  color: ${colors.gray10};
`;
const channelTitleLabel = css`
  color: ${colors.white30};
  margin: 0px;
`;
const functionsContainer = css`
  display: flex;
  gap: 1rem;
  padding: 2rem;
`;

const VideoInfo: FC<{
  video: {
    channelTitle: string;
    description: string;
    id: string;
    imgUrl: string;
    publishTime: string;
    statistics: { viewCount: number };
    title: string;
  };
}> = memo(({ video }) => {
  const date = new Date(video.publishTime).getFullYear();

  return (
    <div css={modalBodyContent}>
      <div css={col1}>
        <p css={text}>{video.title}</p>
        <p css={publishTimeLabel}>{date}</p>
        <p css={descriptionLabel}>{video.description}</p>

        <div css={functionsContainer}>
          <AddToMyList video={video} />
        </div>
      </div>
      <div css={col2}>
        <p css={subTextWrapper}>
          <span css={textColor}>Cast: </span>
          <span css={channelTitleLabel}>{video.channelTitle}</span>
        </p>
        <p css={subTextWrapper}>
          <span css={textColor}>View Count: </span>
          <span css={channelTitleLabel}>{video.statistics.viewCount}</span>
        </p>
      </div>
    </div>
  );
});

export default VideoInfo;
