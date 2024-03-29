const routeLinks = {
  homePage: `/home`,
  about: `/about`,
  contact: `/contact`,
  search: ({ searchQuery }: { searchQuery: string }) =>
    `/search?searchQuery=${searchQuery ?? ""}`,
  login: `/login`,
  myList: `/browse/my-list`,
  video: ({ videoId }: { videoId: string }) => `/video/${videoId}`,
  videoPlay: ({ videoId }: { videoId: string }) => `/video/${videoId}/play`,
};

export default routeLinks;
