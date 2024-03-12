const routeLinks = {
  homePage: `/home`,
  about: `/about`,
  contact: `/contact`,
  projects: `/projects`,
  myList: `/browse/my-list`,
  video: ({ videoId }: { videoId: string }) => `/video/${videoId}`,
};

export default routeLinks;
