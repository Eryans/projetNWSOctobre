
import Container from "../components/Container";
import NavigationBar from "../layout/NavigationBar";
import * as React from "react";

import Loans from "../pages_content/Loans";
import Stuffs from "../pages_content/Stuffs";

export default function Main() {

  return (
    <>
      <NavigationBar />
      <Container>
        <Loans/>
        <Stuffs/>
      </Container>
    </>
  );
}

