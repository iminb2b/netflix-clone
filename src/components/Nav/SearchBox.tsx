import { FC, memo, useCallback, useRef } from "react";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import { css } from "@emotion/react";
import colors from "@/value/colors";
import { useRouter } from "next/router";
import routeLinks from "@/routeLinks";

const searchContainer = css`
  background-color: ${colors.gray40};
  gap: 1rem;
  display: flex;
  padding: 0.5rem 1rem;
  flex: 1;
  min-width: 5rem;
`;
const icon = css`
  font-size: 2rem;
  color: ${colors.white};
  cursor: pointer;
`;
const inputContainer = css`
  color: ${colors.white20};
  background-color: transparent;
  width: 100%;

  height: 3rem /* 48px */;
  min-width: 240px;
  font-size: 1.2rem;
  text-overflow: ellipsis;
`;

const SearchBox: FC = memo(() => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const onSearchFormSubmit = useCallback(async (e: any) => {
    e.preventDefault();
    const searchQuery = searchInputRef.current?.value ?? "";

    router.push(routeLinks.search({ searchQuery }));
  }, []);
  return (
    <></>
    // <form css={searchContainer} onSubmit={onSearchFormSubmit}>
    //   <input
    //     type="text"
    //     placeholder="Search..."
    //     ref={searchInputRef}
    //     css={inputContainer}
    //   />
    //   <button type="submit">
    //     <SearchTwoToneIcon css={icon} />
    //   </button>
    // </form>
  );
});

export default SearchBox;
