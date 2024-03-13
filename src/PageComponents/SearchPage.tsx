import PageContainer from "@/components/PageContainer";
import PageMeta from "@/components/PageMeta";
import { AppContext } from "@/context/AppContext";
import routeLinks from "@/routeLinks";
import { css } from "@emotion/react";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import colors from "@/value/colors";
import { VideoInfoPreview } from "./HomePage";
import { getPopularVideos, getVideos } from "@/lib/getVideo";
import SectionCardVertical from "@/components/Card/SectionCardVertical";
import { match } from "ts-pattern";

const container = css`
  padding: 10rem 4rem;
  max-width: 1200px;
  width: 100%;
`;
const searchContainer = css`
  background-color: ${colors.gray40};
  gap: 1rem;
  display: flex;
  padding: 0.5rem 1rem;
`;
const icon = css`
  font-size: 2rem;
  color: ${colors.white};
`;
const inputContainer = css`
  color: ${colors.white20};
  background-color: transparent;
  width: 100%;

  height: 3rem /* 48px */;
  min-width: 240px;
  font-size: 1.2rem;
`;

const videoContainer = css`
  padding: 4rem 0;
`;

type SearchPageProps = {
  popularVideos: VideoInfoPreview[];
  searchVideos: VideoInfoPreview[];
  query: any;
};

const SearchPage: NextPage<SearchPageProps> = ({
  popularVideos,
  searchVideos,
  query,
}) => {
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchResults, setSearchResult] = useState<VideoInfoPreview[]>(
    searchVideos ?? [],
  );
  const [loadingState, setLoadingState] = useState<"loading" | "loaded">(
    "loaded",
  );
  const searchQuery = router.query.searchQuery ?? "";
  console.log(query);
  const {
    state: { username },
  } = useContext(AppContext);

  useEffect(() => {
    if (!username) {
      router.push(routeLinks.login);
    }
  }, []);

  const onSearchFormSubmit = useCallback(async (e: any) => {
    e.preventDefault();
    const searchQuery = searchInputRef.current?.value;
    setLoadingState("loading");
    if (searchQuery) {
      const videos = await getVideos(searchQuery);

      if (videos) {
        setSearchResult(videos);
        setInterval(() => setLoadingState("loaded"), 2000);
      }
    }
  }, []);

  return (
    <PageContainer>
      <PageMeta title="Netflix - Home Page" description={"Nhung Nguyen"} />

      <div css={container}>
        <form css={searchContainer} onSubmit={onSearchFormSubmit}>
          <button type="submit">
            <SearchTwoToneIcon css={icon} />
          </button>
          <input
            type="text"
            placeholder="Search for titles, genres or people"
            ref={searchInputRef}
            css={inputContainer}
            defaultValue={searchQuery}
          />
        </form>

        <div css={videoContainer}>
          {match(loadingState)
            .with("loading", () => <div>Loading...</div>)
            .with("loaded", () =>
              searchResults.length > 0 ? (
                <SectionCardVertical
                  videos={searchResults}
                  title="Search Results"
                />
              ) : (
                <SectionCardVertical
                  videos={popularVideos}
                  title="Recommended TV Shows & Movies"
                />
              ),
            )
            .otherwise(() => null)}
        </div>
      </div>
    </PageContainer>
  );
};

export default SearchPage;

export const getServerSideProps: GetServerSideProps<SearchPageProps> = async ({
  query,
}) => {
  const popularVideos = await getPopularVideos();
  const searchVideos = await getVideos(query.searchQuery?.toString() ?? "");

  return {
    props: { popularVideos, searchVideos, query },
  };
};
