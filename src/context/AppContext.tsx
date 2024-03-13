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
      ids: string[];
    }
  | {
      type: "addMyList";
      ids: string[];
    };

export type AppState = {
  username: string | null;
  watchingFilms: string[];
  myList: string[];
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
      const films = [...state.watchingFilms, ...action.ids];

      const filmSet = new Set(films);

      const newFilmList = Array.from(filmSet);

      localStorage.setItem("watchingFilms", newFilmList.join(","));
      return {
        ...state,
        watchingFilms: newFilmList,
      };

    case "addMyList":
      const list = [...state.myList, action.ids[0]];

      const set = new Set(list);

      const newList = Array.from(set);

      localStorage.setItem("myList", newList.join(","));
      return {
        ...state,
        myList: newList,
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
    myList: [],
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
