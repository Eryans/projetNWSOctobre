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
import { useState } from "react";
import ActionsBar from "./ActionsBar";

export default function DataTable({
  read,
  createUpdateForm,
  deleteAction,
  setCreateOrUpdate,
  setSelectedObjId,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = (crtOrUpdt) => {
    // True : Create, false : Update
    setCreateOrUpdate(crtOrUpdt);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const keyCondition = (key) =>
    key !== "_id" && key !== "__v" && key !== "updatedAt";
  return (
    <Card>
      <ActionsBar
        createUpdateForm={createUpdateForm}
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {Object.keys(read[0]).map((key, i) =>
                keyCondition(key) ? (
                  <TableCell key={i} sx={{ textAlign: "center" }}>
                    {key}
                  </TableCell>
                ) : (
                  <TableCell key={i}></TableCell>
                )
              )}
              <TableCell sx={{ textAlign: "center" }}>Update</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {read.map((data, i) => (
              <TableRow key={i}>
                {Object.keys(data).map((key, i) =>
                  keyCondition(key) ? (
                    <TableCell key={i} sx={{ textAlign: "center" }}>
                      {data[key]}
                    </TableCell>
                  ) : (
                    <TableCell key={i}></TableCell>
                  )
                )}
                <TableCell>
                  <Button
                    onClick={() => {
                      handleOpen(false);
                      setSelectedObjId(data._id);
                    }}
                  >
                    Update
                  </Button>
                </TableCell>
                <TableCell>
                  <Button onClick={() => deleteAction({ _id: data._id })}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
