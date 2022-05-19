import { useCallback } from "react";
import { useSnackbar } from "notistack";

export const useToast = () => {
  const { enqueueSnackbar } = useSnackbar();

  const showToast = useCallback(
    (message, type) => {
      enqueueSnackbar({
        text: message,
        variant: type,
      });
    },
    [enqueueSnackbar]
  );

  return { showToast };
};
