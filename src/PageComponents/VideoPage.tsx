import PageContainer from "@/components/PageContainer";
import PageMeta from "@/components/PageMeta";
import { getPopularVideos, getYoutubeVideoById } from "@/lib/getVideo";
import { css } from "@emotion/react";
import { NextPage } from "next";
import colors from "@/value/colors";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/AppContext";
import { useRouter } from "next/router";
import routeLinks from "@/routeLinks";
import ErrorPageContent from "@/components/ErrorPageContent";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Link from "next/link";
import VideoInfo from "@/components/VideoPage/VideoInfo";
import RelatedVideoList from "@/components/VideoPage/RelatedVideoList";
import Image from "next/image";
import { match } from "ts-pattern";
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
  channelTitle: string;
  description: string;
  id: string;
  imgUrl: string;
  publishTime: string;
  statistics: { viewCount: number };
  title: string;
};

const VideoPage: NextPage = () => {
  const router = useRouter();
  const {
    state: {
      username,
      videos: { popularVideos },
    },
    dispatch,
  } = useContext(AppContext);

  const [relatedVideos, setRelatedVideos] = useState(popularVideos);
  const [video, setVideo] = useState<VideoPageProps>();
  const [loadingState, setLoadingState] = useState<"loading" | "loaded">(
    "loading",
  );
  useEffect(() => {
    if (!username) {
      router.push(routeLinks.login);
    }
    const getVideo = async () => {
      const videos = await getYoutubeVideoById(
        router.query.videoId?.toString() ?? "",
      );

      setVideo(videos[0]);
      dispatch({ type: "addWatchingFilm", ids: [videos[0].id] });
    };

    const getNewVideos = async () => {
      if (popularVideos.length === 0) {
        const newVideos = await getPopularVideos();

        setRelatedVideos(newVideos);
      }
    };

    getVideo();
    getNewVideos();
    setLoadingState("loaded");
  }, []);

  if (!video) return <ErrorPageContent />;

  return (
    <PageContainer>
      <PageMeta title="Netflix - Home Page" description={"Nhung Nguyen"} />
      {match(loadingState)
        .with("loading", () => <div css={modal}></div>)
        .with("loaded", () => (
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
        ))
        .otherwise(() => (
          <></>
        ))}
    </PageContainer>
  );
};

export default VideoPage;
