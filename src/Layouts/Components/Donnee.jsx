import { createContext, useContext, useEffect, useState } from "react";

const DonneeContext = createContext();

export function DonneeProvider({ children })
{
  // Déclaration
  const [ donneeBus, setDonneeBus ] = useState(() =>
  {
    const savedDonneeBus = localStorage.getItem('busSaved');
    return savedDonneeBus ? JSON.parse(savedDonneeBus) : []
  });
  const [ donneeChauffeurs, setDonneeChauffeur ] = useState(()=>
  {
    const savedChauffeurs = localStorage.getItem('chauffeursSaved');
    return savedChauffeurs ? JSON.parse(savedChauffeurs) : []
  });
  const [ pointage, setPointage ] = useState(()=>
  {
    const savedPointage = localStorage.getItem('pointageSaved');
    return savedPointage ? JSON.parse(savedPointage) : []
  });
  const [ idBus, setIdBus ] = useState(() =>
  {
    const savedIdBus = localStorage.getItem('idBusSaved');
    return savedIdBus ? JSON.parse(savedIdBus) : 1
  });
  const [ idChauffeur, setIdChauffeur ] = useState(() =>
  {
    const savedIdChauffeur = localStorage.getItem('idChauffeurSaved');
    return savedIdChauffeur ? JSON.parse(savedIdChauffeur) : 1
  });
  const [ sideOuvert, setSideOuvert ] = useState(true)
  const [ parametre, setParametre ] = useState(() =>
  {
    const savedParametre = localStorage.getItem('parametre');
    return savedParametre ? JSON.parse(savedParametre) :
    {
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
    }
  });

  useEffect(()=>
  {
    const isMobiles = () =>
    {
      setSideOuvert(window.innerWidth > 768 );
    }
    isMobiles();
    window.addEventListener('resize', isMobiles);

    // ajout des données
    localStorage.setItem('busSaved', JSON.stringify(donneeBus));
    localStorage.setItem('chauffeursSaved', JSON.stringify(donneeChauffeurs));
    localStorage.setItem('pointageSaved', JSON.stringify(pointage));
    localStorage.setItem('idBusSaved', JSON.stringify(idBus));
    localStorage.setItem('idChauffeurSaved', JSON.stringify(idChauffeur));
    localStorage.setItem('parametre', JSON.stringify(parametre));


    return () => window.removeEventListener('resize', isMobiles);
  },[ donneeBus, donneeChauffeurs, pointage, idBus, idChauffeur, parametre ])

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