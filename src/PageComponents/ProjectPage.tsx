import PageContainer from "@/components/PageContent";
import { NextPage } from "next";
import PageMeta from "@/components/PageMeta";
import { useRouter } from "next/router";
import ErrorPageContent from "@/components/ErrorPageContent";
import { css } from "@emotion/react";
import { contentContainer } from "@/styles/generalStyles";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { projectInfos } from "@/value/projectsInfo";
import Link from "next/link";
import colors from "@/value/colors";
import buttonStyles from "@/styles/buttonStyles";

const container = css`
  width: 100%;
  display: flex;
  justify-content: center;
  min-height: calc(100vh - 5rem);
  padding: 2rem 0;
`;

const contentWrapper = css`
  ${contentContainer}

  gap: 2rem;

  width: 100%;
`;

const infoContainer = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
  padding: 3rem 0;

  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const image = css`
  width: 100%;
`;

const title = css`
  font-size: clamp(2rem, 5vw, 4rem);
  margin-top: 3rem;
`;

const toolList = css`
  list-style-type: none;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;
const infoContentContainer = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const detailsContainer = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 90%;
`;

const mediumText = css`
  font-weight: 600;
`;

const description = css`
  line-height: 1.5;
`;

const toolItem = ({ darkmode }: { darkmode: boolean }) => css`
  color: ${darkmode ? colors.green : colors.purple};
  padding: 0.5rem;
`;

const linkContainer = css`
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
`;

const ProjectPage: NextPage = () => {
  const router = useRouter();
  const {
    state: { darkmode },
  } = useContext(AppContext);

  const slug = router.query.slug;

  const project = projectInfos.filter((project) => project.slug === slug)[0];

  if (!project) return <ErrorPageContent />;

  return (
    <PageContainer>
      <PageMeta title="Min - Projects Page" description={"Nhung Nguyen"} />
      <div css={container}>
        <div css={contentWrapper}>
          <img src={project.img} css={image} />
          <h1 css={title}>{project.title}</h1>

          <div css={infoContainer}>
            <div css={infoContentContainer}>
              <div css={detailsContainer}>
                {project.objectives && <h3 css={mediumText}>Objectives:</h3>}
                <p css={description}>{project.objectives}</p>
              </div>
              <div css={detailsContainer}>
                <h3 css={mediumText}>Description:</h3>
                <p css={description}>{project.description}</p>
              </div>
            </div>
            <div css={infoContentContainer}>
              <h3 css={mediumText}>Tools</h3>
              <ul css={toolList}>
                {project.tool.map((item, index) => (
                  <li key={index} css={toolItem({ darkmode })}>
                    {item}
                  </li>
                ))}
              </ul>
              {project.features.length > 0 && (
                <h3 css={mediumText}>Features</h3>
              )}
              <ul css={toolList}>
                {project.features.map((item, index) => (
                  <li key={index} css={toolItem({ darkmode })}>
                    {item}
                  </li>
                ))}
              </ul>
              <div css={linkContainer}>
                <Link
                  href={project.link}
                  css={buttonStyles({ darkmode })}
                  target="_blank"
                >
                  Website
                </Link>
                {project.sourceCode && (
                  <Link
                    href={project.sourceCode}
                    target="_blank"
                    css={buttonStyles({ darkmode })}
                  >
                    Source Code
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default ProjectPage;
