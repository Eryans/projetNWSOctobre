import ContainerCenter from "../components/ContainerCenter";
import NavigationBar from "../layout/NavigationBar";

export default function Root() {
  return (
    <>
      <NavigationBar />
      <ContainerCenter>
        <h1>Hello there !</h1>
        <p>Bienvenue sur le gestionnaire de matériel fictif de la NWS</p>
        <p>Vous pouvez y accèder en cliquant sur le lien "Main" de la barre de navigation</p>
      </ContainerCenter>
    </>
  );
}
