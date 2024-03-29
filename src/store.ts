import { createContext } from "react";

const initialState = {
  first: "Jack",
  last: "Herrington",
};

export type UserState = typeof initialState;

export const context = createContext<typeof initialState>(initialState);

export default context;
