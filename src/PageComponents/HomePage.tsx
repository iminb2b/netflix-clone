import PageContainer from "@/components/PageContainer";
import { GetServerSideProps, NextPage } from "next";
import PageMeta from "@/components/PageMeta";
import Banner from "@/components/HomePage/Banner";
import SectionCard from "@/components/Card/SectionCard";
import { css } from "@emotion/react";
import { getPopularVideos, getVideos } from "@/lib/getVideo";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/AppContext";
import routeLinks from "@/routeLinks";

const sectionCardWrapper = css`
  margin-top: 1rem;
  width: 100%;
`;

export type VideoInfo = {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      };
      medium: {
        url: string;
        width: number;
        height: number;
      };
      high: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: string;
  };
};
export type VideoInfoPreview = {
  title: string;
  imgUrl: string;
  description: string;
  id: string;
};

type HomePageProps = {};
const HomePage: NextPage<HomePageProps> = ({}) => {
  const router = useRouter();
  const {
    state: { username },
    dispatch,
  } = useContext(AppContext);
  const [videos, setVideos] = useState<{
    disneyVideos: VideoInfoPreview[];
    productivityVideos: VideoInfoPreview[];
    travelVideos: VideoInfoPreview[];
    popularVideos: VideoInfoPreview[];
  }>({
    disneyVideos: [],
    productivityVideos: [],
    travelVideos: [],
    popularVideos: [],
  });

  useEffect(() => {
    if (!username) {
      router.push(routeLinks.login);
    }

    const getYoutubeVideos = async () => {
      const disneyVideos = await getVideos("disney trailer");
      const productivityVideos = await getVideos("Lee Chang Sub");

      const travelVideos = await getVideos("indie music");
      const popularVideos = await getPopularVideos();

      const videos = {
        disneyVideos,
        productivityVideos,
        travelVideos,
        popularVideos,
      };
      dispatch({ type: "addVideos", videos });
      setVideos(videos);
    };

    getYoutubeVideos();
  }, []);

  const popular = videos.productivityVideos[0];
  return (
    <PageContainer>
      <PageMeta title="Netflix - Home Page" description={"Nhung Nguyen"} />

      {username && (
        <>
          {popular && (
            <Banner
              title={popular?.title ?? "Clifford the red dog"}
              subTitle={popular?.description ?? "Clifford the red dog"}
              imgUrl={popular?.imgUrl ?? "/static/clifford.webp"}
              id={popular?.id ?? "4zH5iYM4wJo"}
            />
          )}

          <div css={sectionCardWrapper}>
            {videos.disneyVideos && (
              <SectionCard
                size="medium"
                videos={videos.disneyVideos}
                title={"Disney"}
              />
            )}
            {videos.productivityVideos && (
              <SectionCard
                size="small"
                videos={videos.productivityVideos}
                title={"Productivity"}
              />
            )}
            {videos.travelVideos && (
              <SectionCard
                size="large"
                videos={videos.travelVideos}
                title={"Travel"}
              />
            )}

            {videos.popularVideos && (
              <SectionCard
                title="Popular"
                videos={videos.popularVideos}
                size="small"
              />
            )}
          </div>
        </>
      )}
    </PageContainer>
  );
};

export default HomePage;
