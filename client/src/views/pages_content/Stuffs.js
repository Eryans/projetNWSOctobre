import { useEffect, useState } from "react";

import DataTable from "../components/DataTable";
import { useForm } from "react-hook-form";
import {
  deleteStuff,
  getSpecificStuff,
  getStuffs,
  makeStuff,
  updateStuff,
} from "../../actions/stuffs_actions";
import { Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { makeLoan } from "../../actions/loans_actions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Stuffs({ handleRefresh, refresh }) {
  const [data, setData] = useState();
  const [createOrUpdate, setCreateOrUpdate] = useState("");
  const [selectedObjId, setSelectedObjId] = useState("");
  const [open, setOpen] = useState(false);
  const [awaitResponse, setAwaitResponse] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [student, setStudent] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setErrorMessage("");
  };
  const handleChange = (event) => {
    setStudent(event.target.value);
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setAwaitResponse(true);
    // Passing the id here because its not correctly updated when passes to an hidden input
    data.stuffTaken = selectedObjId;
    makeLoan(data).then((res) => {
      if (res.success) {
        setSelectedObjId("");
        handleRefresh();
        handleClose();
      } else {
        setErrorMessage(res.message);
      }
      setAwaitResponse(false);
    });
  };

  const tableContent = (arrayData) =>
    arrayData.map((data) => ({
      id: data._id,
      content: [
        {
          name: "Nom",
          reactComp: <p>{data.name}</p>,
        },
        {
          name: "Type",
          reactComp: <p>{data.type}</p>,
        },
        {
          name: "Etat",
          reactComp: <p>{data.state}</p>,
        },
        {
          name: "Disponible",
          reactComp: <p>{data.loaned ? "non" : "oui"}</p>,
        },
        {
          name: "Emprunter",
          reactComp: (
            <Button
              disabled={data.loaned}
              onClick={() => {
                setSelectedObjId(data._id);
                handleOpen();
              }}
            >
              Emprunter
            </Button>
          ),
        },
      ],
    }));

  useEffect(() => {
    try {
      getStuffs().then((res) => {
        setData(res);
      });
    } catch (error) {
      console.error(error);
    }
  }, [refresh]);

  return (
    <>
      <h1>Liste de materiel</h1>
      {data ? (
        <DataTable
          read={data.data}
          createUpdateForm={
            <StuffForm
              create={makeStuff}
              update={updateStuff}
              createOrUpdate={createOrUpdate}
              objId={selectedObjId}
              refresh={handleRefresh}
            />
          }
          useActionsBar={true}
          deleteAction={{ titleHead: "Supprimer un objet",title:"Supprimer", action: deleteStuff }}
          setCreateOrUpdate={setCreateOrUpdate}
          updateAction={setSelectedObjId}
          tableContent={tableContent(data.data)}
          refresh={handleRefresh}
        />
      ) : (
        "Getting data"
      )}
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {console.log(selectedObjId)}
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputLabel>Elève</InputLabel>
              <Select
                name="takenBy"
                type="text"
                defaultValue={"Kévin Vivier"}
                onChange={handleChange}
                {...register("takenBy", { required: true })}
              >
                <MenuItem value="Kévin Vivier">Kévin Viver</MenuItem>
                <MenuItem value="Edgar Lesieur">Edgar Lesieur</MenuItem>
                <MenuItem value="Lucien Barré">Lucien Barré</MenuItem>
                <MenuItem value="Aurégan Le Cleuziat">Aurégan Le Cleuziat</MenuItem>
                <MenuItem value="Camille Leclert">Camille Leclert</MenuItem>
                <MenuItem value="Jules Noir--Vermeulen">
                  Jules Noir--Vermeulen
                </MenuItem>
                <MenuItem value="Théa Delille">Théa Delille</MenuItem>
              </Select>
              <InputLabel >Jours d'emprunt souhaité</InputLabel>
              <TextField
                name="nbrOfDays"
                type="number"
                defaultValue={"7"}
                {...register("nbrOfDays", { required: true })}
              />
              <Button
                type="submit"
                variant="contained"
                disabled={awaitResponse}
              >
                Emprunter
              </Button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
          </Box>
        </Modal>
      </div>
    </>
  );
}

function StuffForm({ create, update, createOrUpdate, objId, refresh }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [defaultValue, setDefaultValue] = useState({});
  const onSubmit = (data) => {
    createOrUpdate
      ? create(data).then((res) => refresh())
      : update({ _id: objId, data: data }).then((res) => refresh());
  };
  useEffect(() => {
    if (!createOrUpdate) {
      getSpecificStuff(objId).then((res) => {
        setDefaultValue(res.data);
      });
    }
  }, [createOrUpdate, objId]);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="name"
          type="text"
          placeholder="Nom"
          defaultValue={defaultValue ? defaultValue.name : "Nom"}
          {...register("name", { required: true })}
        />

        <input
          name="type"
          type="text"
          placeholder="Type"
          defaultValue={defaultValue ? defaultValue.type : "Type"}
          {...register("type", { required: true })}
        />
        <input
          name="state"
          type="text"
          placeholder="State"
          defaultValue={defaultValue ? defaultValue.state : "Etat"}
          {...register("state", { required: true })}
        />
        {errors.name && <span>This field is required</span>}
        {errors.type && <span>This field is required</span>}

        <input type="submit" />
      </form>
    </>
  );
}
