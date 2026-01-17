import { createContext, useContext, useEffect, useState } from "react";

const DonneeContext = createContext();

export function DonneeProvider({ children })
{
  // Déclaration
  const [ donneeBus, setDonneeBus ] = useState([]);
  const [ donneeChauffeurs, setDonneeChauffeur ] = useState([]);
  const [ pointage, setPointage ] = useState([]);
  const [ idBus, setIdBus ] = useState(1);
  const [ idChauffeur, setIdChauffeur ] = useState(1);
  const [ sideOuvert, setSideOuvert ] = useState(true)
  const [ parametre, setParametre ] = useState({
    // General
    titre: "Gestion de transports en commun",
    themeCouleur: "#10b981",

    // Finance
    revenuBus: 80000,
    fraisParticipation: 4500,
    droitVisiteTechnique: 100000,
    taxeVoiture: 350000,
    entretien: 20000,
    salaireChauffeur: 250000,

    // Passager
    tarifPassager: 600,
    nombrePassager: 320,
    numeroLigne: 143,
    pointDepart: 'Sinibean-drano',
    terminus: 'Mahamasina'

  });

  useEffect(()=>
  {
    const isMobiles = () =>
    {
      setSideOuvert(window.innerWidth > 768 );
    }
    isMobiles();
    window.addEventListener('resize', isMobiles);
    return () => window.removeEventListener('resize', isMobiles)
  },[])

  const value = { donneeBus, setDonneeBus, idBus, setIdBus,idChauffeur, setIdChauffeur, donneeChauffeurs, setDonneeChauffeur, parametre, setParametre, pointage, setPointage, sideOuvert, setSideOuvert };

  // Affichage
  return(
    <DonneeContext.Provider value={ value }>
      { children }
    </DonneeContext.Provider>
  )
}

export function useDonnee()
{
  return useContext(DonneeContext);
}