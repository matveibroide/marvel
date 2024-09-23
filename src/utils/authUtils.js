import { Alert } from "@mui/material";

export const checkAuthentication = (isAuthenticated, callback) => {
  if (isAuthenticated) {
    callback();
    return true
  } else {
    return false;
  }
};
