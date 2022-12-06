import { useEffect, useState } from "react";
import * as React from "react";
import DataTable from "../components/DataTable";
import { deleteLoan, getLoans } from "../../actions/loans_actions";
import { getSpecificStuff } from "../../actions/stuffs_actions";
import AsyncDataGetter from "../components/AsyncDataGetter";
import { getSpecificStudent } from "../../actions/student_actions";

export default function Loans({ handleRefresh, refresh }) {
  const [data, setData] = useState();

  const tableContent = (arrayData) =>
    arrayData.map((data) => {
      const loanDate = new Date(data.createdAt);
      const returnDate = new Date(data.returnDate);
      const isExpired = () => {
        return Date.now() > returnDate.getTime() ? "expired" : "";
      };
      return {
        id: data._id,
        content: [
          {
            name: "Objets Empruntés",
            reactComp: (
              <AsyncDataGetter
                attribute={{ className: isExpired() }}
                dataId={data.stuffTaken}
                getDataFunc={getSpecificStuff}
                property={"name"}
                component={"div"}
              />
            ),
          },
          {
            name: "Elèves",
            reactComp: (
              <div>
                {/* Ah yes double http request for a name, shit's not clean yo, future jules needs to fix the component to handle array of properties*/}
                <AsyncDataGetter
                  attribute={{ className: isExpired() }}
                  dataId={data.takenBy}
                  getDataFunc={getSpecificStudent}
                  property={"nom"}
                  component={"span"}
                />{" "}
                &nbsp;
                <AsyncDataGetter
                  attribute={{ className: isExpired() }}
                  dataId={data.takenBy}
                  getDataFunc={getSpecificStudent}
                  property={"prenom"}
                  component={"span"}
                />
              </div>
            ),
          },
          {
            name: "Date d'emprunt",
            reactComp: (
              <p className={isExpired()}>
                {loanDate.toLocaleDateString("fr-FR")}
              </p>
            ),
          },
          {
            name: "Date de retour prévu",
            reactComp: (
              <p className={isExpired()}>
                {returnDate.toLocaleDateString("fr-FR")}
              </p>
            ),
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
