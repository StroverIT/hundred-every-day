export enum Themes {
  default = "default",
  white = "white",
  whiteTransparent = "whiteTransparent",
}

export type ModalHookProps = {
  children: React.ReactNode;
  closeModalHandler: () => void;
  theme?: Themes;
  isFullScreen?: boolean;
  isModalOpen: boolean | string | undefined | null;
  createButton?: JSX.Element;
  headerClassName?: string;
};
