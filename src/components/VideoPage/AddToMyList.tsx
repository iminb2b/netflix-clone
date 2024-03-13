import { VideoInfoPreview } from "@/PageComponents/HomePage";
import { css } from "@emotion/react";
import { FC, memo, useCallback, useContext, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import colors from "@/value/colors";
import { AppContext } from "@/context/AppContext";
import CheckIcon from "@mui/icons-material/Check";
const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: ease-in-out 0.3s;
  padding: 1rem;
  :hover {
    background-color: ${colors.black10};
  }
`;

const icon = css`
  color: ${colors.white10};
  font-size: 2rem;
`;

const text = css`
  color: ${colors.gray10};
`;

const AddToMyList: FC<{ video: VideoInfoPreview }> = memo(({ video }) => {
  const {
    state: { myList },
    dispatch,
  } = useContext(AppContext);
  const [added, setAdded] = useState<boolean>(myList.includes(video.id));

  const onClick = useCallback(() => {
    dispatch({ type: "addMyList", ids: [video.id] });
    setAdded(true);
  }, []);

  return (
    <button css={container} onClick={onClick}>
      {added ? <CheckIcon css={icon} /> : <AddIcon css={icon} />}
      <span css={text}> My List</span>
    </button>
  );
});

export default AddToMyList;
