import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import TrashIcon from "@heroicons/react/24/solid/TrashIcon";
import {
  Button,
  Card,
  InputAdornment,
  OutlinedInput,
  SvgIcon,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";
import { useAuth } from "src/hooks/use-auth";

export const CustomersSearch = ({ customersSelection }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { getUsers, deleteUser } = useAuth();
  let debounceTimer;

  const debounce = (callback, time) => {
    window.clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(callback, time);
  };

  const search = (e) => {
    debounce(() => {
      if (e.target.value === "") {
        getUsers();
      } else {
        getUsers(e.target.value);
      }
    }, 500);
  };
  const handleDelete = () => {
    customersSelection.selected.map(async (each) => {
      await deleteUser(each);
    });
    handleClose()
  };
  return (
    <Card sx={{ p: 2 }}>
      <Stack direction="row" justifyContent="space-between" spacing={4}>
        <OutlinedInput
          fullWidth
          onChange={search}
          placeholder="Search User"
          startAdornment={
            <InputAdornment position="start">
              <SvgIcon color="action" fontSize="small">
                <MagnifyingGlassIcon />
              </SvgIcon>
            </InputAdornment>
          }
          sx={{ maxWidth: 500 }}
        />

        <div>
          {customersSelection.selected.length > 0 && (
            <Button
              onClick={handleOpen}
              startIcon={
                <SvgIcon fontSize="small">
                  <TrashIcon />
                </SvgIcon>
              }
              variant="contained"
              color="error"
              className="dropdown-item discard"
              data-bs-toggle="modal"
              data-bs-target="#exampleModals"
            >
              Delete
            </Button>
          )}
        </div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Are you sure you want to delete this user?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Note: If you delete an Job Poster their jobs will be deleted as well
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={handleDelete} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </Card>
  );
};
