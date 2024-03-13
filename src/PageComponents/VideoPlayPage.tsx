import PageContainer from "@/components/PageContainer";
import PageMeta from "@/components/PageMeta";
import { css } from "@emotion/react";
import { useContext, useEffect } from "react";
import { AppContext } from "@/context/AppContext";
import { useRouter } from "next/router";
import routeLinks from "@/routeLinks";
import ErrorPageContent from "@/components/ErrorPageContent";
import { NextPage } from "next";
const modal = css`
  margin: 0 auto;

  width: 100vw;
  max-width: 1200px;
  padding: 0 5rem;
  padding-top: 10rem;

  border: 1px solid var(--shadow10);
`;

const videoPlayer = css`
  border-radius: 10px 10px 0px 0px;
  width: 100%;
  height: 600px;
`;

const VideoPage: NextPage = () => {
  const router = useRouter();
  const videoId = router.query.videoId;

  const {
    state: { username },
  } = useContext(AppContext);

  useEffect(() => {
    if (!username) {
      router.push(routeLinks.login);
    }
  }, []);

  if (!videoId) return <ErrorPageContent />;

  return (
    <PageContainer>
      <PageMeta title="Netflix - Home Page" description={"Nhung Nguyen"} />
      <div css={modal}>
        <iframe
          id="ytplayer"
          width="100%"
          css={videoPlayer}
          height="360"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
          frameBorder="0"
        ></iframe>
      </div>
    </PageContainer>
  );
};

export default VideoPage;
