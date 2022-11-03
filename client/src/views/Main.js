import { useEffect, useState } from "react";
import { getLoans } from "../actions/loans_actions";
import NavigationBar from "./components/NavigationBar";

export default function Main() {
  const [data, setData] = useState();
  useEffect(() => {
    getLoans().then((res) => setData(res));
  }, []);
  return (
    <>
      <NavigationBar />
      <h1>Hello there</h1>
      <div>
        {data
          ? data.loans.map((loan) => {
              console.log(loan);
              return (
                <ul>
                  <li>{loan.takenBy}</li>
                  <li>{loan.createdAt}</li>
                  <li>{loan.returnDate}</li>
                </ul>
              );
            })
          : ""}
      </div>
    </>
  );
}
