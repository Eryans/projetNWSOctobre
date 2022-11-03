import { Link } from "react-router-dom";

export default function NavigationBar() {
  return (
    <>
      <div>
        <Link to={"/"}>Acceuil</Link>
        <Link to={"/main"}>Main</Link>
      </div>
    </>
  );
}
