import PageContainer from "@/components/PageContainer";
import PageMeta from "@/components/PageMeta";
import { getPopularVideos, getYoutubeVideoById } from "@/lib/getVideo";
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
import VideoInfo from "@/components/VideoPage/VideoInfo";
import { VideoInfoPreview } from "./HomePage";
import RelatedVideoList from "@/components/VideoPage/RelatedVideoList";
import Image from "next/image";
const modal = css`
  margin: 0 auto;

  max-width: 1200px;
  width: 90vw;
  padding: 0 5rem;
  padding-top: 8rem;

  border: 1px solid var(--shadow10);

  @media (min-width: 1024px) {
    width: 60%;
  }
`;

const videoPlayer = css`
  border-radius: 10px 10px 0px 0px;
  height: 500px;
  width: 100%;
  object-fit: cover;
`;

const modalBody = css`
  display: flex;
  flex-direction: column;
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

  relatedVideos: VideoInfoPreview[];
};

const VideoPage: NextPage<VideoPageProps> = ({ video, relatedVideos }) => {
  const router = useRouter();
  const {
    state: { username },
    dispatch,
  } = useContext(AppContext);

  useEffect(() => {
    if (!username) {
      router.push(routeLinks.login);
    }

    dispatch({ type: "addWatchingFilm", ids: [video.id] });
  }, []);

  if (!video) return <ErrorPageContent />;

  return (
    <PageContainer>
      <PageMeta title="Netflix - Home Page" description={"Nhung Nguyen"} />
      <div css={modal}>
        <Image
          src={video.imgUrl}
          alt={video.title}
          css={videoPlayer}
          width={800}
          height={600}
        />

        <div css={modalBody}>
          <VideoInfo video={video} />

          <Link
            aria-lable="Play Video"
            css={playButton}
            href={routeLinks.videoPlay({ videoId: video.id })}
          >
            <PlayArrowIcon />
            Play
          </Link>

          <RelatedVideoList videos={relatedVideos} />
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

  const relatedVideos = await getPopularVideos();

  return {
    props: { video: videos[0] ?? null, relatedVideos },
  };
};
