import React, { useContext, useRef, useState } from "react";
import {
  TransitionGroup,
  Transition as ReactTransition,
} from "react-transition-group";
import gsap from "gsap";
import Flip from "gsap/dist/Flip";
import { AppContext } from "../../services/context";

gsap.registerPlugin(Flip);

interface Props {
  children: React.ReactNode;
  location: string;
}

const Transition = ({ children, location }: Props) => {
  const { flipState } = useContext(AppContext);

  const parentNode = useRef(null);
  const pN = gsap.utils.selector(parentNode);
  const completeCall = (target: any, parent: any) => {
    gsap.set(target, { clearProps: "position, width" });
    parent && gsap.set(parent, { clearProps: "overflow" });
  };

  const onEnterHandler = (node: any) => {
    gsap.killTweensOf(node);
    // Set initial position and styles
    gsap.set(node, {
      position: "absolute",
      left: 0,
      x: 100,
      autoAlpha: 0,
    });
    gsap.set(parentNode.current, { overflow: "hidden" });
    // Create the animation for the incoming component
    Flip.from(flipState, {
      duration: 4,
      targets: pN("album-con"),
      onEnter: (target) =>
        gsap.fromTo(target, { opacity: 0, duration: 3 }, { opacity: 1 }),
    });
  };

  const onExitHandler = (node: any) => {
    gsap.killTweensOf(node);
    // Create the animation for the incoming component
    gsap.to(pN(".album-link-container"), {
      duration: 1,
      autoAlpha: 0,
      y: 100,
      stagger: 0.3,
    });
  };

  return (
    <div ref={parentNode}>
      <TransitionGroup style={{ position: "relative" }}>
        <ReactTransition
          key={location}
          timeout={2000}
          onEnter={onEnterHandler}
          onExit={onExitHandler}
        >
          {children}
        </ReactTransition>
      </TransitionGroup>
    </div>
  );
};
export default Transition;
