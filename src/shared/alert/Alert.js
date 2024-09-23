import { Alert, Snackbar, LinearProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export const AlertComponent = ({ message, open, onClose }) => {
  const [progress, setProgress] = useState(100);
  const [isOpen, setIsOpen] = useState(false);

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

  return createPortal(
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      open={open}
      autoHideDuration={5000}
      onClose={onClose}
    >
      <div style={{ width: "100%" }}>
        <Alert severity="error" onClose={onClose}>
          {message}
        </Alert>
        <LinearProgress variant="determinate" value={progress} />
      </div>
    </Snackbar>,
    document.body
  );
};
