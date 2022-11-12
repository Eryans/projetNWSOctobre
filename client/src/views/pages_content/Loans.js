import { useEffect, useState } from "react";

import * as React from "react";
import DataTable from "../components/DataTable";
import { deleteLoan, getLoans, makeLoan } from "../../actions/loans_actions";
import { getSpecificStuff } from "../../actions/stuffs_actions";
import AsyncDataGetter from "../components/AsyncDataGetter";

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

export default function Loans({ handleRefresh, refresh }) {
  const [data, setData] = useState();

  const tableContent = (arrayData) =>
    arrayData.map((data) => {
      return {
        id: data._id,
        content: [
          {
            name: 'Objet Emprunté',
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
            name: 'Elève',
            reactComp:(<p>{data.takenBy}</p>)
          }
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
      <h1>Liste de materiel</h1>
      {data ? (
        <DataTable
          read={data.data}
          deleteAction={deleteLoan}
          tableContent={tableContent(data.data)}
          refresh={handleRefresh}
        />
      ) : (
        "Getting data"
      )}
    </>
  );
}

