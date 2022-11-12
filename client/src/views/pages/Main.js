import Container from "../components/Container";
import NavigationBar from "../layout/NavigationBar";
import { useState } from "react";
import Loans from "../pages_content/Loans";
import Stuffs from "../pages_content/Stuffs";

export default function Main() {
  const [refreshValue, setRefreshValue] = useState();
  const handleRefresh = () => {
    console.log("refreshing");
    setRefreshValue({});
  };

  return (
    <>
      <NavigationBar />
      <Container>
        <Loans refresh={refreshValue} handleRefresh={handleRefresh} />
        <Stuffs refresh={refreshValue} handleRefresh={handleRefresh} />
      </Container>
    </>
  );
}
