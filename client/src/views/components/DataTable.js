import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Card,
  Table,
  Button,
} from "@mui/material";
import * as React from "react";
import ActionsBar from "./ActionsBar";

export default function DataTable({
  read,
  create,
  createUpdateForm,
  deleteAction,
  updateAction
}) {
  console.log(read);
  const keyCondition = (key) =>
    key !== "_id" && key !== "__v" && key !== "updatedAt";
  return (
    <Card>
      <ActionsBar create={create} createUpdateForm={createUpdateForm} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {Object.keys(read[0]).map((key) =>
                keyCondition(key) ? (
                  <TableCell sx={{textAlign:'center'}}>{key}</TableCell>
                ) : (
                  <TableCell></TableCell>
                )
              )}
              <TableCell sx={{textAlign:'center'}}>Update</TableCell>
              <TableCell sx={{textAlign:'center'}}>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {read.map((data) => (
              <TableRow>
                {Object.keys(data).map((key) =>
                  keyCondition(key) ? (
                    <TableCell sx={{textAlign:'center'}}>{data[key]}</TableCell>
                  ) : (
                    <TableCell></TableCell>
                  )
                )}
                <TableCell>
                  <Button onClick={() => updateAction({_id: data._id})}>Update</Button>
                </TableCell>
                <TableCell>
                  <Button onClick={() => deleteAction({_id: data._id})}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
