import { FC, useEffect } from "react";
import { css } from "@emotion/react";
import routeLinks from "@/routeLinks";
import NavListItem from "./NavListItem";
import { useRouter } from "next/router";
import { Dialog, DialogStore } from "@ariakit/react/dialog";
import colors from "@/value/colors";

const container = css`
  display: flex;
  top: 4.5rem;
  left: 5%;
  border-radius: 2rem;
  background-color: ${colors.white};
  position: fixed;
  z-index: 10;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  padding: 7rem 3rem;
  box-shadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px;";

  width: 90%;
  color: ${colors.textPrimary};

  @media screen and (min-width: 720px) {
    display: none;
  }
`;

export type NavInfo = {
  name: string;
  url: string;
  isButtonLink: boolean;
};

const NavListMobile: FC<{
  dialogStore: DialogStore;
}> = ({ dialogStore }) => {
  const router = useRouter();

  const navListInfo: NavInfo[] = [
    {
      name: "About",
      url: routeLinks.about,
      isButtonLink: false,
    },
    {
      name: "Work",
      isButtonLink: false,
      url: routeLinks.projects,
    },
    {
      name: "Contact",
      isButtonLink: true,
      url: routeLinks.contact,
    },
  ];

  useEffect(() => {
    const onRouteChangeStart = () => {
      dialogStore.hide();
    };

    router.events.on("routeChangeStart", onRouteChangeStart);

    return () => {
      router.events.off("routeChangeStart", onRouteChangeStart);
    };
  }, [dialogStore, router.events]);

  return (
    <Dialog css={container} modal store={dialogStore}>
      {navListInfo.map((item, index) => (
        <NavListItem
          item={item}
          key={index}
          isActive={router.asPath === item.url}
        />
      ))}
    </Dialog>
  );
};

export default NavListMobile;
