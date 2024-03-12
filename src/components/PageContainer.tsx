import { css } from "@emotion/react";
import { FC, memo, ReactNode } from "react";

const pageWrapper = css`
  display: flex;
  flex: 1 0 auto;
  flex-flow: column wrap;
  padding: 0;
  position: relative;
  width: 100%;
  min-height: calc(100vh - 5rem);
`;

const PageContainer: FC<{ children: ReactNode }> = memo(
  ({ children, ...remainingProps }) => (
    <div css={pageWrapper} {...remainingProps}>
      {children}
    </div>
  ),
);

PageContainer.displayName = "PageContainer";

export default PageContainer;
