import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
const PopupDialog = (props) => {
  const {
    title,
    children,
    open,
    setOpen,
    onSubmit,
    onClose,
    onDel = false,
    btnMsg = "등록",
    optionClass = "optionClass",
    isBtn = true,
  } = props;
  return (
    <Dialog
      open={open}
      onClose={(_, reason) => {
        if (reason !== `backdropClick`) {
          setOpen(false);
          onClose();
        }
      }}
      aria-labelledby="confirm-dialog"
      className={`cpnt_dialog_page ${optionClass}`}
      disableEscapeKeyDown
    >
      <DialogTitle>
        {title}
        <IconButton
          aria-label="close"
          onClick={() => {
            setOpen(false);
            onClose();
          }}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>

      {isBtn && (
        <DialogActions className="cpnt_btns">
          {onDel && (
            <button
              className="bt mg-ra"
              type="button"
              onClick={() => {
                onDel(false);
              }}
            >
              삭제
            </button>
          )}
          <button
            className="bt"
            type="button"
            onClick={() => {
              setOpen(false);
            }}
          >
            취소
          </button>
          <button
            className="bt sb"
            type="button"
            onClick={() => {
              onSubmit();
            }}
          >
            {btnMsg}
          </button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default PopupDialog;
