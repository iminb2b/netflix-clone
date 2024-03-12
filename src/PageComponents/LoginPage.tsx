import PageContainer from "@/components/PageContainer";
import PageMeta from "@/components/PageMeta";
import routeLinks from "@/routeLinks";
import { css } from "@emotion/react";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback } from "react";

const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  background-color: var(--black);

  background-image: linear-gradient(rgb(0 0 0 / 60%), rgb(0 0 0 / 60%)),
    url("/static/signin-bg.jpeg");
`;
const header = css`
  display: flex;
  justify-content: space-between;
  width: 100%;

  padding-top: 2rem /* 32px */;
  padding-bottom: 2rem /* 32px */;
`;
const main = css`
  width: 100%;
  height: 100vh;
  position: relative;

  display: flex;
  width: 100%;
  height: 100%;

  z-index: 10;
  justify-content: center;
`;
const mainWrapper = css`
  display: flex;
  flex-direction: column;

  padding-bottom: 6rem;
  padding-top: 2rem /* 32px */;
  background-color: var(--black20);

  height: 33.333333%;
  padding-left: 3rem /* 48px */;
  padding-right: 3rem /* 48px */;

  border-radius: 0.375rem /* 6px */;
  min-width: 240px;

  @media (min-width: 768px) {
    margin-top: 2rem /* 128px */;
  }
`;
const signinHeader = css`
  color: var(--white10);
  font-weight: 700;
  font-size: 2rem;
  margin-bottom: 2rem /* 32px */;
`;
const emailInput = css`
  padding-top: 0.5rem /* 8px */;
  padding-bottom: 0.5rem /* 8px */;

  padding-left: 0.5rem /* 8px */;
  padding-right: 0.5rem /* 8px */;

  color: var(--black30);

  width: 100%;
  padding-bottom: 1rem /* 16px */;

  height: 3rem /* 48px */;
  min-width: 240px;
  font-size: 1.2rem;
`;
const userMsg = css`
  margin-top: 0.25rem /* 4px */;
  margin-bottom: 0.25rem /* 4px */;
  color: var(--white20);
`;
const loginBtn = css`
  background-color: var(--red10);

  padding-left: 3rem /* 48px */;
  padding-right: 3rem /* 48px */;
  padding-top: 0.5rem /* 8px */;
  padding-bottom: 0.5rem /* 8px */;

  font-size: 1.25rem /* 20px */;
  line-height: 1.75rem /* 28px */;

  color: var(--white10);
  width: 100%;

  border-radius: 0.375rem /* 6px */;
  margin-top: 1.5rem /* 24px */;
`;

const wrapper = css`
  padding-left: 1rem /* 16px */;
  padding-right: 1rem /* 16px */;
  display: flex;
  padding: 1.25rem /* 20px */;

  @media (min-width: 768px) {
    padding-left: 4rem /* 64px */;
    padding-right: 4rem /* 64px */;
    flex-direction: row;
    align-items: center;
  }
`;

const logoLink = css`
  display: flex;
  font-weight: 500;
  font-size: 1rem;
  align-items: center;
  color: var(--white10);
  margin-bottom: 1rem /* 16px */;

  @media (min-width: 768px) {
    margin-bottom: 0px;
  }
`;

const logoWrapper = css`
  color: var(--red);
  width: 8rem /* 128px */;
`;

const LoginPage: NextPage = () => {
  const router = useRouter();
  const handleLoginWithEmail = useCallback(() => {
    router.push(routeLinks.homePage);
  }, []);
  return (
    <PageContainer>
      <PageMeta title="Netflix - Home Page" description={"Nhung Nguyen"} />
      <div css={container}>
        <header css={header}>
          <div css={wrapper}>
            <Link css={logoLink} href="/">
              <div css={logoWrapper}>
                <Image
                  src="/static/netflix.svg"
                  alt="Netflix logo"
                  width="128"
                  height="34"
                />
              </div>
            </Link>
          </div>
        </header>
        <main css={main}>
          <div css={mainWrapper}>
            <h1 css={signinHeader}>Sign In</h1>

            <input type="email" placeholder="Email address" css={emailInput} />

            <p css={userMsg}></p>
            <button onClick={handleLoginWithEmail} css={loginBtn}>
              Sign In
            </button>
          </div>
        </main>
      </div>
    </PageContainer>
  );
};

export default LoginPage;
