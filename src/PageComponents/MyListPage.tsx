import PageContainer from "@/components/PageContainer";
import PageMeta from "@/components/PageMeta";
import { getYoutubeVideoById } from "@/lib/getVideo";
import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/AppContext";
import { useRouter } from "next/router";
import routeLinks from "@/routeLinks";
import SectionCard from "@/components/Card/SectionCard";
import { css } from "@emotion/react";
import { VideoInfoPreview } from "./HomePage";

const container = css`
  padding: 10rem 0;
  height: 100%;
  width: 100%;
`;

const MyListPage: NextPage = () => {
  const router = useRouter();
  const {
    state: { username, watchingFilms, myList },
    dispatch,
  } = useContext(AppContext);
  const [films, setFilms] = useState<VideoInfoPreview[]>([]);
  const [likedList, setLikedList] = useState<VideoInfoPreview[]>([]);
  const [state, setState] = useState<"loading" | "loaded">("loading");

  useEffect(() => {
    if (!username) {
      router.push(routeLinks.login);
    }
    const getVideos = async () => {
      const [videos, list] = await Promise.all([
        getYoutubeVideoById(watchingFilms.join(",")),
        getYoutubeVideoById(myList.join(",")),
      ]);

      if (videos) {
        setFilms(videos);
      }
      if (list) {
        setLikedList(list);
      }
    };
    if (watchingFilms) {
      getVideos();
    }
  }, []);

  return (
    <PageContainer>
      <PageMeta title="Netflix - Home Page" description={"Nhung Nguyen"} />
      <div css={container}>
        <SectionCard videos={films} size="small" title="My List" />
        <SectionCard
          videos={likedList}
          size="small"
          title="Continue Watching"
        />
      </div>
    </PageContainer>
  );
};

export default MyListPage;
