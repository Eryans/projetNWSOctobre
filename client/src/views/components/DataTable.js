import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  Table,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import ActionsBar from "./ActionsBar";

export default function DataTable({
  read,
  createUpdateForm,
  deleteAction,
  setCreateOrUpdate,
  updateAction,
  tableContent,
  useActionsBar,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = (crtOrUpdt) => {
    // True : Create, false : Update
    if (useActionsBar) setCreateOrUpdate(crtOrUpdt);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <Card>
      {useActionsBar && (
        <ActionsBar
          createUpdateForm={createUpdateForm}
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
      )}
      {!read.length > 0 ? (
        "No data to show"
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {tableContent &&
                  tableContent[0].content.map((data) => {
                    return <TableCell>{data.name}</TableCell>;
                  })}
                {updateAction && (
                  <TableCell sx={{ textAlign: "center" }}>Update</TableCell>
                )}
                {deleteAction && (
                  <TableCell sx={{ textAlign: "center" }}>Delete</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableContent &&
                tableContent.map((action, i) => (
                  <TableRow>
                    {action.content.map((data) => (
                      <TableCell>{data.reactComp}</TableCell>
                    ))}
                    <TableCell>
                      <Button
                        onClick={() => {
                          handleOpen(false);
                          updateAction(action._id);
                        }}
                      >
                        Update
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => deleteAction({ _id: action._id })}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Card>
  );
}
