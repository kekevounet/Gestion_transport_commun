import { useEffect } from "react";
import { useDonnee } from "./Donnee"
export default function Couleur({ children })
{
  // Déclaration
  const { parametre } = useDonnee();

  // Comportement
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--couleur",
      parametre.themeCouleur
    );

  }, [parametre.themeCouleur]);

  // Affichage
  return<>{ children }</>
}