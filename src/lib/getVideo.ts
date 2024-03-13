import videoData from "../data/videos.json";

export const getCommonVideos = async (url: string) => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

  try {
    const BASE_URL = "youtube.googleapis.com/youtube/v3";
    const response = await fetch(
      `https://${BASE_URL}/${url}&maxResults=25&key=${YOUTUBE_API_KEY}`,
    );

    const data = await response.json();

    if (data?.error) {
      console.error("Youtube API error", data.error);
      return [];
    }

    return data?.items.map(
      (item: {
        id: { videoId: any };
        snippet: {
          thumbnails: { high: { url: any } };
          title: string;
          description: string;
          publishedAt: string;
          channelTitle: string;
        };
        statistics: {
          viewCount: number;
        };
      }) => {
        const id = item.id?.videoId || item.id;
        const snippet = item.snippet;
        return {
          title: snippet?.title,
          imgUrl: item.snippet.thumbnails.high.url,
          id,
          description: snippet.description,
          publishTime: snippet.publishedAt,
          channelTitle: snippet.channelTitle,
          statistics: item.statistics
            ? { viewCount: item.statistics.viewCount ?? 0 }
            : { viewCount: 0 },
        };
      },
    );
  } catch (error) {
    console.error("Something went wrong with video library", error);
    return [];
  }
};

export const getVideos = (searchQuery: string) => {
  const URL = `search?part=snippet&q=${searchQuery}&type=video`;
  return getCommonVideos(URL);
};

export const getPopularVideos = () => {
  const URL =
    "videos?part=statistics%2Csnippet%2CcontentDetails&chart=mostPopular&regionCode=US";

  return getCommonVideos(URL);
};

export const getYoutubeVideoById = (videoId: string) => {
  const URL = `videos?part=statistics%2Csnippet%2CcontentDetails&id=${videoId}`;

  return getCommonVideos(URL);
};
