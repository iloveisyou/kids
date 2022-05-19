import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const ConfirmDialog = (props) => {
  const { title, children, open, setOpen, onConfirm } = props;
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="confirm-dialog"
      className="cpnt_dialog_confirm"
    >
      <DialogTitle id="confirm-dialog">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions className="cpnt_btns df-f">
        <button className="bt" type="button" onClick={() => setOpen(false)}>취소</button>
        <button className="bt sb" type="button"
          onClick={() => {
            setOpen(false);
            onConfirm();
          }}
        >
          확인</button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
