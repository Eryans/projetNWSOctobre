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
import ActionsBar from "./ActionsBar";

export default function DataTable({
  read,
  createUpdateForm,
  deleteAction,
  setCreateOrUpdate,
  updateAction,
  tableContent,
  useActionsBar,
  refresh,
  open,
  setOpen,
  handleClose,
}) {
  // const [open, setOpen] = useState(false);
  const handleOpen = (crtOrUpdt) => {
    // True : Create, false : Update
    if (useActionsBar) setCreateOrUpdate(crtOrUpdt);
    setOpen(true);
  };
  // const handleClose = () => setOpen(false);

  return (
    <Card sx={{ overflowX: "auto", maxWidth: "100%" }}>
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
                  tableContent[0].content.map((data, i) => {
                    return (
                      <TableCell key={"DataHead" + i}>{data.name}</TableCell>
                    );
                  })}
                {updateAction && (
                  <TableCell sx={{ textAlign: "center" }}>Update</TableCell>
                )}
                {deleteAction && (
                  <TableCell sx={{ textAlign: "center" }}>
                    {deleteAction.titleHead}
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableContent &&
                tableContent.map((action, i) => {
                  return (
                    <TableRow key={"DataRow" + i}>
                      {action.content.map((data, i) => (
                        <TableCell key={"DataContent" + i}>
                          {data.reactComp}
                        </TableCell>
                      ))}
                      {updateAction && (
                        <TableCell>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              handleOpen(false);
                              updateAction(action.id);
                            }}
                          >
                            Update
                          </Button>
                        </TableCell>
                      )}
                      {deleteAction && (
                        <TableCell>
                          <Button
                            color="error"
                            variant="contained"
                            onClick={() => {
                              deleteAction
                                .action({ _id: action.id })
                                .then((res) => refresh());
                            }}
                          >
                            {deleteAction.title}
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Card>
  );
}
