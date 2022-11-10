import { useEffect, useState } from "react";
import {
  deleteLoan,
  getLoans,
  makeLoan,
  updateLoan,
} from "../../actions/loans_actions";
import Container from "../components/Container";
import NavigationBar from "../layout/NavigationBar";
import * as React from "react";
import DataTable from "../components/DataTable";
import { useForm } from "react-hook-form";

export default function Loans() {
  const [data, setData] = useState();
  const [createOrUpdate, setCreateOrUpdate] = useState("");
  const [selectedObjId, setSelectedObjId] = useState("");

  const customActions = [
    { name: "nameTest", reactComp: <h1>test</h1> },
    { name: "nameTest2", reactComp: <h1>test2</h1> },
  ];

  useEffect(() => {
    try {
      getLoans().then((res) => {console.log(res);setData(res)});
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <>
      <h1>Liste d'emprunts</h1>

      {data ? (
        <DataTable
          read={data.data}
          createUpdateForm={
            <LoanForm
              create={makeLoan}
              update={updateLoan}
              objId={selectedObjId}
            />
          }
          deleteAction={deleteLoan}
          updateAction={setSelectedObjId}
          customActions={customActions}
        />
      ) : (
        "Getting data"
      )}
    </>
  );
}

function LoanForm({ create, update, objId }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    update({ _id: objId, data: data });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <input defaultValue="test" {...register("example")} />

        {/* include validation with required or other standard HTML validation rules */}
        <input {...register("exampleRequired", { required: true })} />
        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}

        <input type="submit" />
      </form>
    </>
  );
}
