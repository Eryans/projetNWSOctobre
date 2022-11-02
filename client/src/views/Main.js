import { useEffect, useState } from "react";
import { getLoans } from "../actions/loans_actions";

export default function Main() {
  const [data, setData] = useState();
  useEffect(() => {
    getLoans().then((res) => setData(res));
  }, []);
  return (
    <>
      <h1>Hello there</h1>
      <div>{data ? data.loans.map(loan => <p>{loan.takenBy}</p>) : ""}</div>
    </>
  );
}
