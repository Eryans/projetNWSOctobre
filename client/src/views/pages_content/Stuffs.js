import { useEffect, useState } from "react";

import * as React from "react";
import DataTable from "../components/DataTable";
import { useForm } from "react-hook-form";
import {
  deleteStuff,
  getStuffs,
  makeStuff,
  updateStuff,
} from "../../actions/stuffs_actions";
import { Button } from "@mui/material";

export default function Stuffs() {
  const [data, setData] = useState();
  const [createOrUpdate, setCreateOrUpdate] = useState("");
  const [selectedObjId, setSelectedObjId] = useState("");

  const tableContent = (arrayData) =>
    arrayData.map((data) => ({
      id: data._id,
      content: [
        {
          name: <h1>Nom</h1>,
          reactComp: <p>{data.name}</p>,
        },
        {
          name: "Type",
          reactComp: <p>{data.type}</p>,
        },
        {
          name: "Disponible",
          reactComp: <p>{data.loaned ? "non" : "oui"}</p>,
        },
        {
          name: "Et si j'osais sortir mon gros",
          reactComp: <Button onClick={() => console.log(data)}>BOUTON</Button>,
        },
        { name: "nameTest2", reactComp: <Button>test2</Button> },
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
  }, []);

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
            />
          }
          useActionsBar={true}
          deleteAction={deleteStuff}
          setCreateOrUpdate={setCreateOrUpdate}
          updateAction={setSelectedObjId}
          tableContent={tableContent(data.data)}
        />
      ) : (
        "Getting data"
      )}
      {data && console.log(tableContent(data.data))}
    </>
  );
}

function StuffForm({ create, update, createOrUpdate, objId }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    createOrUpdate ? create(data) : update({ _id: objId, data: data });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="name"
          type="text"
          defaultValue="Nom"
          {...register("name", { required: true })}
        />

        <input
          name="type"
          type="text"
          defaultValue="Type"
          {...register("type")}
        />
        <input
          type="text"
          name="state"
          defaultValue="Etat"
          {...register("state")}
        />
        {/* errors will return when field validation fails  */}
        {errors.name && <span>This field is required</span>}

        <input type="submit" />
      </form>
    </>
  );
}
