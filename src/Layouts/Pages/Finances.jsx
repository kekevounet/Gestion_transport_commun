import { useTheme } from '../Components/theme';
import { useDonnee } from '../Components/Donnee';
export default function Finances()
{
  // Déclaration
  const { theme } = useTheme();
  const { parametre, donneeBus, donneeChauffeurs } = useDonnee();
  const style = theme === 'clair' ? 'bg-fond-100 text-black' : 'bg-fond-800 text-white';
  const finances = [
    { titre: "Revenu journalier d'un bus", valeur: parametre.revenuBus },
    { titre: "Frais journalier pour coopérative", valeur: parametre.fraisParticipation },
    { titre: "Droit de visite technique d'un bus", valeur: parametre.droitVisiteTechnique },
    { titre: "Taxe d'un voiture", valeur: parametre.taxeVoiture },
    { titre: "Prix d'entretien d'un bus", valeur: parametre.entretien },
    { titre: "Salaire d'un chauffeur", valeur: parametre.salaireChauffeur },
    { titre: "Frais bus d'un passager", valeur: parametre.tarifPassager },
  ];
  const charges =
    parametre.entretien +
    parametre.salaireChauffeur +
    parametre.taxeVoiture;
  const benefice = parametre.revenuBus * 30 - charges;


  const totals = [
    { titre: "Bénéfice estimé pour le propriétaire du voiture en un mois", valeur: benefice },
    { titre: "Total revenu pour la coopérative pour un mois", valeur: Number(parametre.fraisParticipation) * donneeBus.length * 30 },
    { titre: "Total des salaires des chauffeurs par mois", valeur: Number(parametre.salaireChauffeur) * donneeChauffeurs.length  },
    { titre: "Total dépenses pour entretien par mois", valeur: Number(parametre.entretien) * donneeBus.length },
    { titre: "Total argent accumulé en fonction des passagers en un jour", valeur: Number(parametre.nombrePassager) * Number(parametre.tarifPassager) },
  ]


  // Affichage
  return(
    <div className={`w-full h-full flex justify-center items-end`}>
      <div className="w-full lg:h-[91.5vh] h-[130vh] p-[2%] lg:p-[1%] flex flex-col items-center overflow-auto ">

        <div className={`w-full h-2/4 lg:p-10 gap-2 lg:gap-3 duration-500 grid grid-cols-2 lg:grid-cols-4 grid-rows-4 lg:grid-rows-2 lg:mt-0 mt-20`}>

        {/* Bouclena */}
          {finances.map((finance, index)=>(
            <div className={`w-full h-full flex items-center justify-center flex-col space-y-4 duration-150 hover:scale-105 hover:shadow-xl ${style}`} key={index}>
              <span className="text-lg lg:text-2xl text-center">{finance.titre}</span>
              <span className="text-xl lg:text-3xl text-center">{finance.valeur} Ar</span>
            </div>
          ))}
            <div className={`w-full h-full flex items-center justify-center flex-col space-y-4 duration-150 hover:scale-105 hover:shadow-xl ${style}`}>
              <span className="text-lg lg:text-2xl text-center">Nombre de passager quotidien</span>
              <span className="text-xl lg:text-3xl text-center">{parametre.nombrePassager} Pers </span>
            </div>

        </div>

        <div className={`w-full h-2/4 lg:mt-0 mt-10 lg:p-10 gap-3 duration-500 space-y-4 `}>

            {/* Bouclena */}
            {totals.map((total, index)=>(
              <div key={index}  className={`w-full h-auto space-x-3 p-4 flex items-center justify-between overflow-hidden text-sm lg:text-xl relative group ${style}`}>
                <div className={`w-[80%] lg:w-[60%] text-center border-r ${theme === 'clair' ? 'border-black' : 'border-white' }`}>{total.titre}</div>
                <div className="w-[20%] lg:w-[40%] text-center overflow-auto">{total.valeur} Ar</div>
              </div>
            ))}

        </div>


      </div>
    </div>
  )
}