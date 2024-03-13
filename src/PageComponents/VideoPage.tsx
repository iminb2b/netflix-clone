import PageContainer from "@/components/PageContainer";
import PageMeta from "@/components/PageMeta";
import { getYoutubeVideoById } from "@/lib/getVideo";
import { css } from "@emotion/react";
import { GetServerSideProps, NextPage } from "next";
import colors from "@/value/colors";
import { useContext, useEffect } from "react";
import { AppContext } from "@/context/AppContext";
import { useRouter } from "next/router";
import routeLinks from "@/routeLinks";
import ErrorPageContent from "@/components/ErrorPageContent";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Link from "next/link";

const modal = css`
  position: absolute;
  /** centers modal **/
  left: 0;
  right: 0;
  margin: 0 auto;

  max-width: 1000px;
  width: 90vw;
  bottom: 40px;
  background-color: ${colors.black40};
  top: 10%;

  outline: none;
  border-radius: 10px;
  border: 1px solid var(--shadow10);

  @media (min-width: 1024px) {
    top: 10%;
    bottom: 40px;
    width: 50%;
  }
`;
const overlay = css`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const borderBoxShadow = css`
  -webkit-box-shadow: 0 3px 7px var(--shadow20);
  -moz-box-shadow: 0 3px 7px var(--shadow20);
  box-shadow: 0 3px 7px var(--shadow20);
  -webkit-background-clip: padding-box;
  -moz-background-clip: padding-box;
  background-clip: padding-box;
  opacity: 1;
  background: linear-gradient(to top, ${colors.black10}, transparent 50%);
`;

const videoPlayer = css`
  border-radius: 10px 10px 0px 0px;
  composes: borderBoxShadow;
`;

const modalBody = css`
  padding: 0 3rem;
  display: flex;
  flex-direction: column;
`;
const modalBodyContent = css`
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  column-gap: 2em;
`;
const col1 = css`
  max-height: 50vh /* 208px */;
  overflow-y: hidden;
  overflow-y: scroll;
`;
const publishTimeLabel = css`
  font-size: 1.125rem /* 18px */;
  line-height: 1.75rem /* 28px */;
  margin-top: 1.5rem /* 24px */;
  margin-bottom: 0.5rem /* 8px */;
  color: ${colors.green10};
`;
const text = css`
  font-size: 1.125rem /* 18px */;
  line-height: 1.75rem /* 28px */;
  color: ${colors.white10};
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

const playButton = css`
  padding: 1rem;
  background-color: ${colors.white20};
  color: ${colors.black};
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  transition: all 0.3s ease-in-out;
  gap: 0.5rem;
  :hover {
    background-color: ${colors.white30};
  }
`;
const btnWrapper = css`
  border-color: ${colors.white10};
  border-style: solid;
  border-width: 2px;
  background-color: ${colors.gray40};
  border-radius: 9999px;
  padding: 0.5rem /* 8px */;
  display: flex;
  justify-content: center;
`;
const likeBtnWrapper = css`
  margin-right: 0.5rem /* 8px */;
`;

type VideoPageProps = {
  video: {
    channelTitle: string;
    description: string;
    id: string;
    imgUrl: string;
    publishTime: string;
    statistics: { viewCount: number };
    title: string;
  };
};

const VideoPage: NextPage<VideoPageProps> = ({ video }) => {
  const router = useRouter();
  const {
    state: { username },
  } = useContext(AppContext);

  useEffect(() => {
    if (!username) {
      router.push(routeLinks.login);
    }
  }, []);

  if (!video) return <ErrorPageContent />;

  return (
    <PageContainer>
      <PageMeta title="Netflix - Home Page" description={"Nhung Nguyen"} />
      <div css={modal}>
        <iframe
          id="ytplayer"
          width="100%"
          css={videoPlayer}
          height="360"
          src={`https://www.youtube.com/embed/${video.id}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
          frameBorder="0"
        ></iframe>

        <div css={modalBody}>
          <div css={modalBodyContent}>
            <div css={col1}>
              <p css={publishTimeLabel}>{video.publishTime}</p>
              <p css={text}>{video.title}</p>
              <p css={descriptionLabel}>{video.description}</p>
            </div>
            <div css={col2}>
              <p css={subTextWrapper}>
                <span css={textColor}>Cast: </span>
                <span css={channelTitleLabel}>{video.channelTitle}</span>
              </p>
              <p css={subTextWrapper}>
                <span css={textColor}>View Count: </span>
                <span css={channelTitleLabel}>
                  {video.statistics.viewCount}
                </span>
              </p>
            </div>
          </div>

          <Link
            aria-lable="Play Video"
            css={playButton}
            href={routeLinks.video({ videoId: video.id })}
          >
            <PlayArrowIcon />
            Play
          </Link>
        </div>
      </div>
    </PageContainer>
  );
};

export default VideoPage;

export const getServerSideProps: GetServerSideProps<VideoPageProps> = async ({
  query,
}) => {
  const id = query.videoId?.toString() ?? "4zH5iYM4wJo";
  const videos = await getYoutubeVideoById(id);

  return {
    props: { video: videos[0] ?? null },
  };
};
