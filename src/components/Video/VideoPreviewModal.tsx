import { VideoInfoPreview } from "@/PageComponents/HomePage";
import { Dialog, DialogDismiss, DialogStore } from "@ariakit/react";
import { css } from "@emotion/react";
import { FC, memo } from "react";

const dialog = css`
  position: fixed;
  z-index: 50;

  top: 0;
  left: 0;
  height: 100%;
`;

const VideoPreviewModal: FC<{ store: DialogStore; video: VideoInfoPreview }> =
  memo(({ store, video }) => {
    return (
      <Dialog
        store={store}
        backdrop={<div className="backdrop" />}
        css={dialog}
      >
        <div>
          <DialogDismiss className="button">OK</DialogDismiss>
        </div>
      </Dialog>
    );
  });

export default VideoPreviewModal;
