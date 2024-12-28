"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";

interface IReduxStoreProviderProps {
  children: React.ReactNode;
}

const ReduxStoreProvider: React.FC<IReduxStoreProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxStoreProvider;
