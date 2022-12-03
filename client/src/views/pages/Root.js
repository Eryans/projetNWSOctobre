import ContainerCenter from "../components/ContainerCenter";
import NavigationBar from "../layout/NavigationBar";

export default function Root() {
  return (
    <>
      <NavigationBar />
      <ContainerCenter>
        <div className={"centerText"}>
          <h1>Hello there !</h1>
          <p>Bienvenue sur le gestionnaire de matériel fictif de la NWS</p>
          <p>
            Vous pouvez y accèder en cliquant sur le lien "Emprunts et matériel" de la barre de
            navigation
          </p>
        </div>
      </ContainerCenter>
    </>
  );
}
