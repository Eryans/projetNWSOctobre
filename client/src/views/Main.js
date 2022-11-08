import { useEffect, useState } from "react";
import { getLoans } from "../actions/loans_actions";
import NavigationBar from "./components/NavigationBar";

export default function Main() {
  const [data, setData] = useState();
  useEffect(() => {
    try {
      getLoans().then((res) => setData(res));
    } catch (error) {
      console.error(error);
    }
  }, []);
  return (
    <>
      <NavigationBar />
      <h1>Liste d'emprunts</h1>

      {data ? <DataDable arrayToTreat={data.loans} /> : "Getting data"}
    </>
  );
}

const DataDable = ({ arrayToTreat }) => {
  return (
    <table>
      <thead>
        <tr>
          {Object.keys(arrayToTreat[0]).map((key) => {
            return key !== "_id" && key !== "__v" ? <th>{key}</th> : "";
          })}
        </tr>
      </thead>
      <tbody>
        {arrayToTreat.map((data) => (
          <tr>
            {Object.keys(data).map((key) =>
              key !== "_id" && key !== "__v" ? <td>{data[key]}</td> : ""
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
