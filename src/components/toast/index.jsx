import React, { forwardRef, useCallback } from "react";
import { useSnackbar, SnackbarContent } from "notistack";
/* components */

import { ToastWrap } from "./styled";
import { Alert, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

/* styles */

const Toast = forwardRef((props, ref) => {
  const { closeSnackbar } = useSnackbar();

  const toastMessage = useCallback((message) => ({ __html: message }), []);
  const handleClose = useCallback(() => {
    closeSnackbar();
  }, [closeSnackbar]);

  return (
    <SnackbarContent ref={ref}>
      <ToastWrap duration={props.duration}>
        <Alert
          variant="filled"
          severity={props.message.variant}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleClose}
            >
              <Close fontSize="inherit" />
            </IconButton>
          }
        >
          <p
            data-ta={`elm-toast`}
            dangerouslySetInnerHTML={toastMessage(props.message.text)}
          />
        </Alert>
      </ToastWrap>
    </SnackbarContent>
  );
});
Toast.displayName = `Toast`;

export default Toast;
