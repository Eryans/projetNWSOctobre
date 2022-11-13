import { useState } from "react";
import ContainerCenter from "../components/ContainerCenter";
import NavigationBar from "../layout/NavigationBar";
import Students from "../pages_content/Students";

export default function Other() {
  const [refreshValue, setRefreshValue] = useState();
  const handleRefresh = () => {
    console.log("refreshing");
    setRefreshValue({});
  };

  return (
    <>
      <NavigationBar />
      <ContainerCenter>
        <Students refresh={refreshValue} handleRefresh={handleRefresh} />
      </ContainerCenter>
    </>
  );
}
