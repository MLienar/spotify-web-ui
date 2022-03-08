import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../services/context";
import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
}

const transition = {
  duration: 1,
  ease: [0.43, 0.13, 0.23, 0.96],
};

type Position = {
  width: number;
  height: number;
};

export default function AlbumContainer({ children }: Props) {
  const value = useContext(AppContext);
  const [initial, setInitial] = useState<Position | undefined>(undefined);

  useEffect(() => {
    if (value.albumPos.bottom) {
      let previousPos = {
        width: value.albumPos.width,
        height: value.albumPos.height,
        y: value.albumPos.width,
      };
      setInitial(previousPos);
    }
  }, []);

  const onAlbumClick = (e: any) => {
    const rect = e.currentTarget.getBoundingClientRect();
    value.setAlbumPos(rect);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -10 }}
      className="album-container"
      onClick={onAlbumClick}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
