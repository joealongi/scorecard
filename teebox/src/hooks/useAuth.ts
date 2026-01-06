import * as React from "react";

import { AuthenticationContext } from "../context/AuthenticationProvider";

export const useAuth = () => {
  const context = React.useContext(AuthenticationContext);
  if (!context) {
    console.error("useAuth must be used within an AuthenticationProvider");
  }
  return context;
};
