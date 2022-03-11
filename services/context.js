import { createContext, useContext, useState, useCallback } from "react";
import gsap from "gsap";

export const AppContext = createContext();

export function AppWrapper({ children }) {
  const [token, setToken] = useState(null);
  const [animateAlbum, setAnimateAlbum] = useState(true);
  const [albumGotClicked, setAlbumGotClicked] = useState(false);
  const [timeline, setTimeline] = useState(() =>
    gsap.timeline({ paused: true })
  );

  return (
    <AppContext.Provider
      value={{
        state: {
          token: token,
        },
        setToken,
        albumGotClicked,
        setAlbumGotClicked,
        animateAlbum,
        setAnimateAlbum,
        timeline,
        setTimeline,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
