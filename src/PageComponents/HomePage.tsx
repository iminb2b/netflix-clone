import PageContainer from "@/components/PageContainer";
import { GetServerSideProps, NextPage } from "next";
import PageMeta from "@/components/PageMeta";
import NavBar from "@/components/Nav/NavBar";
import Banner from "@/components/HomePage/Banner";
import SectionCard from "@/components/Card/SectionCard";
import { css } from "@emotion/react";
import { getPopularVideos, getVideos } from "@/lib/getVideo";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
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
  id: string;
};

type HomePageProps = {
  disneyVideos: VideoInfoPreview[];
  productivityVideos: VideoInfoPreview[];
  travelVideos: VideoInfoPreview[];
  popularVideos: VideoInfoPreview[];
};
const HomePage: NextPage<HomePageProps> = ({
  disneyVideos,
  productivityVideos,
  travelVideos,
  popularVideos,
}) => {
  const router = useRouter();
  const {
    state: { username },
  } = useContext(AppContext);

  useEffect(() => {
    if (!username) {
      router.push(routeLinks.login);
    }
  }, []);

  const popular = popularVideos[0];
  return (
    <PageContainer>
      <PageMeta title="Netflix - Home Page" description={"Nhung Nguyen"} />

      <NavBar />
      <Banner
        title={popular?.title ?? "Clifford the red dog"}
        subTitle="a very cute dog"
        imgUrl={popular?.imgUrl ?? "/static/clifford.webp"}
        id={popular?.id ?? "4zH5iYM4wJo"}
      />

      <div css={sectionCardWrapper}>
        {disneyVideos && (
          <SectionCard size="medium" videos={disneyVideos} title={"Disney"} />
        )}
        {productivityVideos && (
          <SectionCard
            size="small"
            videos={productivityVideos}
            title={"Productivity"}
          />
        )}
        {travelVideos && (
          <SectionCard size="large" videos={travelVideos} title={"Travel"} />
        )}

        {popularVideos && (
          <SectionCard title="Popular" videos={popularVideos} size="small" />
        )}
      </div>
    </PageContainer>
  );
};

export default HomePage;

export const getServerSideProps: GetServerSideProps<
  HomePageProps
> = async () => {
  const disneyVideos = await getVideos("disney trailer");
  const productivityVideos = await getVideos("Lee Chang Sub");

  const travelVideos = await getVideos("indie music");
  const popularVideos = await getPopularVideos();

  return {
    props: { disneyVideos, productivityVideos, travelVideos, popularVideos },
  };
};
