import { Paper, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function NavigationBar() {
  const buttonSx = { padding: 0 };
  return (
    <>
      <Paper sx={{ padding: ".5em", display: "flex", gap: "1em" }}>
        <Button sx={buttonSx}>
          <Link to={"/"}>Accueil</Link>
        </Button>
        <Button sx={buttonSx}>
          <Link to={"/main"}>Emprunts et matériel</Link>
        </Button>
        <Button sx={buttonSx}>
          <Link to={"/other"}>Autres</Link>
        </Button>
      </Paper>
    </>
  );
}
