import PageContainer from "@/components/PageContainer";
import PageMeta from "@/components/PageMeta";
import { css } from "@emotion/react";
import { NextPage } from "next";
import { useRouter } from "next/router";

const modal = css`
  position: absolute;
  /** centers modal **/
  left: 0;
  right: 0;
  margin: 0 auto;

  width: 800px;
  bottom: 40px;
  background-color: var(--black40);
  top: 10%;

  outline: none;
  border-radius: 10px;
  border: 1px solid var(--shadow10);

  @media (min-width: 1024px) {
    top: 10%;
    bottom: 40px;
    width: 50%;
  }
`;
const overlay = css`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const borderBoxShadow = css`
  -webkit-box-shadow: 0 3px 7px var(--shadow20);
  -moz-box-shadow: 0 3px 7px var(--shadow20);
  box-shadow: 0 3px 7px var(--shadow20);
  -webkit-background-clip: padding-box;
  -moz-background-clip: padding-box;
  background-clip: padding-box;
  opacity: 1;
  background: linear-gradient(to top, var(--black10), transparent 50%);
`;

const videoPlayer = css`
  border-radius: 10px 10px 0px 0px;
  composes: borderBoxShadow;
`;

const modalBody = css`
  padding: 0 3rem;
`;
const modalBodyContent = css`
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  column-gap: 2em;
`;
const col1 = css`
  max-height: 50vh /* 208px */;
  overflow-y: hidden;
  overflow-y: scroll;
`;
const publishTimeLabel = css`
  font-size: 1.125rem /* 18px */;
  line-height: 1.75rem /* 28px */;
  margin-top: 1.5rem /* 24px */;
  margin-bottom: 0.5rem /* 8px */;
  color: var(--green10);
`;
const text = css`
  font-size: 1.125rem /* 18px */;
  line-height: 1.75rem /* 28px */;
  color: var(--white10);
`;
const descriptionLabel = css`
  margin-bottom: 0.5rem /* 8px */;
  margin-top: 0.75rem /* 12px */;
`;
const col2 = css`
  color: var(--white10);
  line-height: 1.75rem /* 28px */;
  display: flex;
  flex-direction: column;
`;
const subText = css`
  font-size: 0.875rem /* 14px */;
  line-height: 1.25rem /* 20px */;
  margin-left: 0px;
  overflow-wrap: break-word;
`;
const subTextWrapper = css`
  ${subText}
  margin-top: 1.5rem /* 24px */;
`;
const textColor = css`
  color: var(--gray10);
`;
const channelTitleLabel = css`
  color: var(--white30);
  margin: 0px;
`;

const likeDislikeBtnWrapper = css`
  display: flex;
  margin-bottom: 0.75rem /* 12px */;
  position: absolute;
  top: 35%;
  padding-left: 1rem /* 48px */;
`;
const btnWrapper = css`
  border-color: var(--white10);
  border-style: solid;
  border-width: 2px;
  background-color: var(--gray40);
  border-radius: 9999px;
  padding: 0.5rem /* 8px */;
  display: flex;
  justify-content: center;
`;
const likeBtnWrapper = css`
  margin-right: 0.5rem /* 8px */;
`;

const VideoPage: NextPage = () => {
  const router = useRouter();

  const video = {
    title: "Hi cute dog",
    publishTime: "1990-01-01",
    description:
      "A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that A big red is super cute, can he get any bigger? A big red A big red dog that is super cute, can he get any bigger? A big red A big red dog that is super cute, can he get any bigger?",
    channelTitle: "Paramount Pictures",
    viewCount: 10000,
  };

  const { title, publishTime, description, channelTitle, viewCount } = video;

  return (
    <PageContainer>
      <PageMeta title="Netflix - Home Page" description={"Nhung Nguyen"} />
      <div css={modal}>
        <iframe
          id="ytplayer"
          width="100%"
          css={videoPlayer}
          height="360"
          src={`https://www.youtube.com/embed/4zH5iYM4wJo?autoplay=0&origin=http://example.com&controls=0&rel=1`}
          frameBorder="0"
        ></iframe>

        <div css={modalBody}>
          <div css={modalBodyContent}>
            <div css={col1}>
              <p css={publishTimeLabel}>{publishTime}</p>
              <p css={text}>{title}</p>
              <p css={descriptionLabel}>{description}</p>
            </div>
            <div css={col2}>
              <p css={subTextWrapper}>
                <span css={textColor}>Cast: </span>
                <span css={channelTitleLabel}>{channelTitle}</span>
              </p>
              <p css={subTextWrapper}>
                <span css={textColor}>View Count: </span>
                <span css={channelTitleLabel}>{viewCount}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default VideoPage;
