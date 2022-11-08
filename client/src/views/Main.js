import { useEffect, useState } from "react";
import { deleteLoan, getLoans, makeLoan, updateLoan } from "../actions/loans_actions";
import Container from "./components/Container";
import NavigationBar from "./layout/NavigationBar";
import * as React from "react";
import DataTable from "./components/DataTable";
import { useForm } from "react-hook-form";

export default function Main() {
  const [data, setData] = useState();
  useEffect(() => {
    try {
      getLoans().then((res) => setData(res));
      deleteLoan().then(res => console.log(res))
    } catch (error) {
      console.error(error);
    }
  }, []);
  return (
    <>
      <NavigationBar />
      <Container>
        <h1>Liste d'emprunts</h1>

        {data ? (
          <DataTable
            read={data.loans}
            createUpdateForm={<LoanForm create={makeLoan} />}
            deleteAction={deleteLoan}
            updateAction={updateLoan}
          />
        ) : (
          "Getting data"
        )}
      </Container>
    </>
  );
}

function LoanForm({create}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    create(data);
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
