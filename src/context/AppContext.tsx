import { ReactNode, createContext, useReducer } from "react";
import stringsEn from "@/strings/stringsEn.json";
import { Strings } from "@/types/stringTypes";

export type AppContextType = {};

interface AppAction {
  type: "enableDarkMode";
  payload: boolean;
}

interface AppState {}
const appReducer = (state: AppState, action: AppAction) => {
  const { type, payload } = action;
  switch (type) {
    case "enableDarkMode":
      return {
        ...state,
        darkmode: payload,
      };

    default:
      return state;
  }
};

export const AppContext = createContext<{
  state: AppContextType;
  dispatch: React.Dispatch<AppAction>;
}>({
  state: {},
  dispatch: () => null,
});

export const AppProvider: React.FC<{
  children: ReactNode;
  initialState: AppContextType;
}> = ({ initialState, children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
