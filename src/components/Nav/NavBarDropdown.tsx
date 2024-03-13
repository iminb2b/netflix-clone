import { FC, memo, useCallback, useContext } from "react";
import {
  MenuProvider,
  MenuButton,
  MenuButtonArrow,
  Menu,
  MenuItem,
} from "@ariakit/react";
import { css } from "@emotion/react";
import colors from "@/value/colors";
import { AppContext } from "@/context/AppContext";
import { useRouter } from "next/router";
import routeLinks from "@/routeLinks";

const usernameBtn = css`
  display: flex;
  align-items: center;
  overflow: hidden;
  color: ${colors.white};
`;

const navDropdown = css`
  background-color: ${colors.black50};
  border-width: 1px;
  color: ${colors.white};
  border-radius: 0.25rem /* 4px */;
  border-color: ${colors.blue};

  /* box-shadow: var(-- shadow30, 0 0 #0000), var(--ring-shadow, 0 0 #0000),
    var(--shadow30); */
`;
const linkName = css`
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
  display: block;
  padding: 0.5rem /* 8px */;
  padding-right: 0.5rem /* 8px */;

  font-size: 1rem /* 16px */;
  line-height: 1.25rem /* 20px */;
  border-radius: 0.25rem /* 4px */;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const NavBarDropdown: FC<{ username: string }> = memo(({ username }) => {
  const { dispatch } = useContext(AppContext);
  const router = useRouter();
  const onSignOutClick = useCallback(() => {
    dispatch({ type: "logout" });
    router.push(routeLinks.login);
  }, []);
  return (
    <MenuProvider>
      <MenuButton className="button" css={usernameBtn}>
        {username}
        <MenuButtonArrow />
      </MenuButton>
      <Menu gutter={8} className="menu" css={navDropdown}>
        <MenuItem css={linkName} className="menu-item" onClick={onSignOutClick}>
          Sign Out
        </MenuItem>
      </Menu>
    </MenuProvider>
  );
});

export default NavBarDropdown;
