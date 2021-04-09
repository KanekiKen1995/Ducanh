import React from "react";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogActions = (props) => {
  const { handleClose, open, children, title, handleUpdate, isUpdate } = props;
  const { t } = useTranslation();
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      fullScreen={window.innerWidth <= 960}
      disableBackdropClick={true}
      disableEscapeKeyDown={true}
      TransitionComponent={Transition}
    >
      <MuiDialogTitle
        disableTypography
        style={{ display: "flex", padding: 0, alignItems: "center" }}
      >
        <IconButton aria-label="close" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" style={{ margin: "auto" }}>
          {title}
        </Typography>

        {isUpdate && (
          <div
            onClick={handleUpdate}
            style={{
              // position: "absolute",
              right: "10px",
              zIndex: 2,
            }}
          >
            <div className={"modal-action-edit-address"}>
              {t("dialog.Done")}
            </div>
          </div>
        )}
      </MuiDialogTitle>
      <MuiDialogContent dividers={true} className={'custom-dialog-address'} >{children}</MuiDialogContent>
    </Dialog>
  );
};
export default DialogActions;
