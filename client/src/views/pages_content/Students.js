import { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import { useForm } from "react-hook-form";
import {  Box, Button, TextField } from "@mui/material";
import {
  getSpecificStudent,
  getStudents,
  deleteStudent,
  makeStudent,
  updateStudent,
} from "../../actions/student_actions";

export default function Student({ handleRefresh, refresh }) {
  const [data, setData] = useState();
  const [createOrUpdate, setCreateOrUpdate] = useState("");
  const [selectedObjId, setSelectedObjId] = useState("");
  const [openCrOrUptForm, setOpenCrOrUptForm] = useState(false);
  const handleCloseCrOrUptForm = () => setOpenCrOrUptForm(false);

  const tableContent = (arrayData) =>
    arrayData.map((data) => ({
      id: data._id,
      content: [
        {
          name: "Id",
          reactComp: <p>{data.id}</p>,
        },{
          name: "Nom",
          reactComp: <p>{data.nom}</p>,
        },
        {
          name: "Email",
          reactComp: <p>{data.mail}</p>,
        },
      ],
    }));

  useEffect(() => {
    try {
      getStudents().then((res) => {
        setData(res);
      });
    } catch (error) {
      console.error(error);
    }
  }, [refresh]);

  return (
    <>
      <h1>Liste d'étudiant</h1>
      {data ? (
        <DataTable
          read={data.data}
          createUpdateForm={
            <StuffForm
              createOrUpdate={createOrUpdate}
              refresh={handleRefresh}
              handleClose={handleCloseCrOrUptForm}
            />
          }
          open={openCrOrUptForm}
          setOpen={setOpenCrOrUptForm}
          handleClose={handleCloseCrOrUptForm}
          tableContent={tableContent(data.data)}
          refresh={handleRefresh}
        />
      ) : (
        "Getting data"
      )}
    </>
  );
}

function StuffForm({
  create,
  update,
  createOrUpdate,
  objId,
  refresh,
  handleClose,
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [defaultValue, setDefaultValue] = useState();
  const [awaitResponse, setAwaitResponse] = useState(false);

  const onSubmit = (data) => {
    setAwaitResponse(true);
    createOrUpdate
      ? create(data).then((res) => {
          refresh();
          setAwaitResponse(false);
        })
      : update({ _id: objId, data: data }).then((res) => {
          refresh();
          setAwaitResponse(false);
        });
    handleClose();
  };
  useEffect(() => {
    if (!createOrUpdate) {
      getSpecificStudent(objId).then((res) => {
        setDefaultValue(res.data);
      });
    } else {
      setDefaultValue({});
    }
  }, [createOrUpdate, objId]);
  return (
    <>
      {
        // Wait for DefaultValue as to not render Form before thus making defaultValue empty when using the form as update
        defaultValue && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: ".5em" }}>
              <TextField
                name="name"
                type="text"
                placeholder="Nom"
                defaultValue={defaultValue ? defaultValue.name : "Nom"}
                {...register("name", { required: true })}
              />
              <TextField
                name="email"
                type="email"
                placeholder="email"
                defaultValue={defaultValue ? defaultValue.email : "Email"}
                {...register("email", { required: true })}
              />
              {errors.name && <span>This field is required</span>}
              {errors.email && <span>This field is required</span>}
              <Button
                disabled={awaitResponse}
                variant="contained"
                type="submit"
              >
                Sauvegarder
              </Button>
            </Box>
          </form>
        )
      }
    </>
  );
}

