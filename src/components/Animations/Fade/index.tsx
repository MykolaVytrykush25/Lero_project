import { CSSProperties, ReactNode } from "react";
import { Transition, TransitionStatus } from "react-transition-group";

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out, height ${duration}ms ease-in-out`,
  width: "100%",
  opacity: 0,
  overflow: "hidden",
};

const transitionStyles: Partial<Record<TransitionStatus, CSSProperties>> = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

type TFadeProps = {
  open: boolean;
  timeout?: number;
  children: ReactNode;
};

const Fade: React.FC<TFadeProps> = ({ open, timeout, children }) => (
  <Transition in={open} timeout={timeout || duration} unmountOnExit>
    {(state) => (
      <div
        style={{
          ...defaultStyle,
          ...(transitionStyles[state] || {}),
        }}
      >
        {children}
      </div>
    )}
  </Transition>
);

export default Fade;
