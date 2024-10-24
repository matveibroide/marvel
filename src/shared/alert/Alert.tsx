import { Alert, Snackbar, LinearProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import "./alert.scss";

type AlertProps = {
  message: string;
  open: boolean;
  onClose: () => void;
  type: "error" | "warning" | "info" | "success";
};

export const AlertComponent = ({
  message,
  open,
  onClose,
  type = "error",
}: AlertProps) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (open) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) {
            clearInterval(interval);
            return 0;
          }
          return prev - 3;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [open, onClose]);

  const handleSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    onClose();
  };

  return createPortal(
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      open={open}
      autoHideDuration={5000}
      onClose={handleSnackbarClose} 
    >
      <div style={{ width: "100%" }}>
        <Alert severity={type} onClose={handleSnackbarClose}>
          {message}
        </Alert>
        <LinearProgress variant="determinate" value={progress} />
      </div>
    </Snackbar>,
    document.body
  );
};
