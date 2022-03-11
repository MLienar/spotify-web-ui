import React, { useState, useContext, useEffect, useRef } from "react";

interface Props {
  children: React.ReactNode;
  additionalClass: string;
}

export default function AlbumContainer({ children, additionalClass }: Props) {
  const [newClass, setNewClass] = useState("");

  return <div className={additionalClass}>{children}</div>;
}
