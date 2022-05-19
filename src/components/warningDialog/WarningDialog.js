import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const WarningDialog = (props) => {
  const { title, children, open, setOpen } = props;
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="confirm-dialog"
      className="cpnt_dialog_confirm warning"
    >
      <DialogTitle id="confirm-dialog">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions className="cpnt_btns df-f">
        <button className="bt sb" type="button" onClick={() => setOpen(false)}>{`확인`}</button>
      </DialogActions>
    </Dialog>
  );
};

export default WarningDialog;
