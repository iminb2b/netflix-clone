import { stringify } from "querystring";
import { ReactNode, createContext, useReducer } from "react";

type AppAction =
  | {
      type: "login";
      username: string;
    }
  | {
      type: "logout";
    }
  | {
      type: "addWatchingFilm";
      id: string;
    };

export type AppState = {
  username: string | null;
  watchingFilms: string[];
};

const appReducer = (state: AppState, action: AppAction) => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        username: action.username,
      };

    case "logout":
      localStorage.setItem("username", "");
      return {
        ...state,
        username: null,
      };

    case "addWatchingFilm":
      const films = [...state.watchingFilms, action.id];

      localStorage.setItem("watchingFilms", films.toString());
      return {
        ...state,
        watchingFilms: films,
      };

    default:
      return state;
  }
};

export const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}>({
  state: {
    username: null,
    watchingFilms: [],
  },
  dispatch: () => null,
});

export const AppProvider: React.FC<{
  children: ReactNode;
  initialState: AppState;
}> = ({ initialState, children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
