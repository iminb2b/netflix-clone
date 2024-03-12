import colors from "@/value/colors";
import { css } from "@emotion/react";
import { FC, memo, useCallback } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
const container = css`
  width: 100%;
  height: 80vh;
  position: relative;
`;

const leftWrapper = css`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
`;

const left = css`
  display: flex;
  justify-content: flex-start;
  padding-left: 4rem;
  padding-right: 4rem;
  height: 100%;

  flex-direction: column;
  margin-top: 6rem;

  @media (min-width: 768px) {
    width: 40%;
  }
`;

const nseriesWrapper = css`
  display: flex;
`;

const firstLetter = css`
  font-size: 3.75rem;
  line-height: 1;
  color: ${colors.red};
  font-weight: 800;
`;

const series = css`
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: ${colors.gray20};
  align-self: center;
`;

const titleLabel = css`
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 800;
  color: ${colors.white10};
  -webkit-text-stroke: 2px black;

  @media (min-width: 1024px) {
    font-size: 3.75rem;
    line-height: 1;
  }
`;

const subTitleLabel = css`
  font-size: 1.125rem;
  line-height: 1.75rem;
  color: var(--white10);
  -webkit-text-stroke: 1px gray;

  @media (min-width: 1024px) {
    font-size: 1.5rem;
    line-height: 2rem;
  }
`;

const playBtnWrapper = css`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const playText = css`
  color: rgb(31, 41, 55);
  font-weight: 600;
  font-size: 1.125rem;
  line-height: 1.75rem;
  padding-left: 0.25rem;
  text-align: center;

  @media (min-width: 1024px) {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }
`;

const bannerImg = ({ imgUrl }: { imgUrl: string }) => css`
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0px;
  background-image: linear-gradient(to top, black);
  background-image: url(${imgUrl});
  background-size: cover;
  background-position: "50% 50%";
`;

const btnWithIcon = css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  margin-top: 1.25rem;

  border-radius: 0.5rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;

  background-color: ${colors.white10};
  width: 8rem;
`;

const icon = css`
  height: 2rem;
  width: 2rem;
`;

const Banner: FC<{
  imgUrl: string;
  subTitle: string;
  title: string;
}> = memo(({ imgUrl, subTitle, title }) => {
  const handleOnPlay = useCallback(() => {
    console.log("handleOnPlay");
  }, []);
  return (
    <div css={container}>
      <div css={leftWrapper}>
        <div css={left}>
          <div css={nseriesWrapper}>
            <p css={firstLetter}>N</p>
            <p css={series}>S E R I E S</p>
          </div>
          <h3 css={titleLabel}>{title}</h3>
          <h3 css={subTitleLabel}>{subTitle}</h3>

          <div css={playBtnWrapper}>
            <button css={btnWithIcon} onClick={handleOnPlay}>
              <PlayArrowIcon css={icon} />
              <span css={playText}>Play</span>
            </button>
          </div>
        </div>
      </div>
      <div css={bannerImg({ imgUrl })}></div>
    </div>
  );
});

export default Banner;
