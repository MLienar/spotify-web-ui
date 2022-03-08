import { createContext, useContext, useState, useCallback } from "react";

export const AppContext = createContext();

export function AppWrapper({ children }) {
  const [token, setToken] = useState(null);
  const [albumPos, setAlbumPos] = useState({});
  const [albumGotClicked, setAlbumGotClicked] = useState(false);
  return (
    <AppContext.Provider
      value={{
        state: {
          token: token,
        },

        setToken,
        albumGotClicked,
        setAlbumGotClicked,
        albumPos,
        setAlbumPos,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
