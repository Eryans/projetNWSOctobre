import { useEffect, useState } from "react";

import * as React from "react";
import DataTable from "../components/DataTable";
import { deleteLoan, getLoans } from "../../actions/loans_actions";
import { getSpecificStuff } from "../../actions/stuffs_actions";
import AsyncDataGetter from "../components/AsyncDataGetter";

export default function Loans({ handleRefresh, refresh }) {
  const [data, setData] = useState();

  const tableContent = (arrayData) =>
    arrayData.map((data) => {
      const loanDate = new Date(data.createdAt);
      const returnDate = new Date(data.returnDate);

      return {
        id: data._id,
        content: [
          {
            name: "Objet Emprunté",
            reactComp: (
              <AsyncDataGetter
                dataId={data.stuffTaken}
                getDataFunc={getSpecificStuff}
                property={"name"}
                component={"div"}
              />
            ),
          },
          {
            name: "Elève",
            reactComp: <p>{data.takenBy}</p>,
          },
          {
            name: "Date d'emprunt",
            reactComp: <p>{loanDate.toLocaleDateString("fr-FR")}</p>,
          },
          {
            name: "Date de retour prévu",
            reactComp: <p>{returnDate.toLocaleDateString("fr-FR")}</p>,
          },
        ],
      };
    });

  useEffect(() => {
    try {
      getLoans().then((res) => {
        setData(res);
      });
    } catch (error) {
      console.error(error);
    }
  }, [refresh]);

  return (
    <>
      <h1>Liste d'emprunt</h1>
      {data ? (
        <DataTable
          read={data.data}
          deleteAction={{ title: "Terminer un emprunt", action: deleteLoan }}
          tableContent={tableContent(data.data)}
          refresh={handleRefresh}
        />
      ) : (
        "Getting data"
      )}
    </>
  );
}
