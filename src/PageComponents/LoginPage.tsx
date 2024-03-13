import PageContainer from "@/components/PageContainer";
import PageMeta from "@/components/PageMeta";
import { AppContext } from "@/context/AppContext";
import routeLinks from "@/routeLinks";
import colors from "@/value/colors";
import { css } from "@emotion/react";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useContext, useEffect, useRef, useState } from "react";

const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  width: 100%;
  background-color: ${colors.black};

  background-image: linear-gradient(rgb(0 0 0 / 60%), rgb(0 0 0 / 60%)),
    url("/static/signin-bg.jpeg");
`;
const header = css`
  display: flex;
  justify-content: space-between;
  width: 100%;

  padding-top: 2rem;
  padding-bottom: 2rem;
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
  background-color: ${colors.black20};

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
  color: ${colors.white10};
  font-weight: 700;
  font-size: 2rem;
  margin-bottom: 2rem /* 32px */;
`;
const emailInput = css`
  padding-top: 0.5rem /* 8px */;
  padding-bottom: 0.5rem /* 8px */;

  padding-left: 0.5rem /* 8px */;
  padding-right: 0.5rem /* 8px */;

  color: ${colors.black30};

  width: 100%;
  padding-bottom: 1rem /* 16px */;

  height: 3rem /* 48px */;
  min-width: 240px;
  font-size: 1.2rem;

  background-color: ${colors.white10};
`;
const userMsg = css`
  margin-top: 0.25rem /* 4px */;
  margin-bottom: 0.25rem /* 4px */;
  color: ${colors.white20};
`;
const loginBtn = css`
  background-color: ${colors.red10};

  padding-left: 3rem /* 48px */;
  padding-right: 3rem /* 48px */;
  padding-top: 0.5rem /* 8px */;
  padding-bottom: 0.5rem /* 8px */;

  font-size: 1.25rem /* 20px */;
  line-height: 1.75rem /* 28px */;

  color: ${colors.white10};
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
  color: ${colors.white10};
  margin-bottom: 1rem /* 16px */;

  @media (min-width: 768px) {
    margin-bottom: 0px;
  }
`;

const logoWrapper = css`
  color: ${colors.red};
  width: 8rem /* 128px */;
`;

const LoginPage: NextPage = () => {
  const router = useRouter();
  const { dispatch } = useContext(AppContext);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const {
    state: { username },
  } = useContext(AppContext);

  useEffect(() => {
    if (username) {
      router.push(routeLinks.homePage);
    }
  }, []);

  const handleLoginWithEmail = useCallback(async (e: any) => {
    e.preventDefault();
    const email = emailInputRef.current?.value;
    localStorage.setItem("username", emailInputRef.current?.value ?? "");
    if (email) {
      dispatch({ type: "login", username: email });
    }

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
        {/* <form css={main} onSubmit={handleLoginWithEmail}>
          <div css={mainWrapper}>
            <h1 css={signinHeader}>Sign In</h1>

            <input
              ref={emailInputRef}
              type="email"
              placeholder="Email address"
              css={emailInput}
            />

            <p css={userMsg}></p>
            <button css={loginBtn} type="submit">
              Sign In
            </button>
          </div>
        </form> */}
      </div>
    </PageContainer>
  );
};

export default LoginPage;
