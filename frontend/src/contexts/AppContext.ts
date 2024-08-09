import React from "react";

export type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

export type AppContext = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean;
};

export const AppContext = React.createContext<AppContext | undefined>(
  undefined
);
