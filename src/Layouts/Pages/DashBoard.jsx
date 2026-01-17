import { useTheme } from "../Components/theme";
import { useDonnee } from "../Components/Donnee";
import { Bar, BarChart, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Link } from "react-router-dom";
import { Tooltip as ReactTooltip } from "react-tooltip"
export default function DashBoard()
{
  // Déclaration
  const { theme } = useTheme();
  const style = theme === 'clair' ? 'bg-fond-100 text-black' : 'bg-fond-800 text-white';
  const { donneeBus, donneeChauffeurs, parametre }= useDonnee();
  const charges =
    parametre.entretien +
    parametre.salaireChauffeur +
    parametre.taxeVoiture;
  const benefice = parametre.revenuBus * 30 - charges;

  const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444"];

  const data = [
    { name: 'Nombre total de bus', value: donneeBus.length },
    { name: 'Nombre total de chauffeurs', value : donneeChauffeurs.length }
  ];

  const data1 = [
    { name: 'Bénéfice estimé', valeur: benefice},
    { name: "Revenu pour la coopérative", valeur:Number(parametre.fraisParticipation) * donneeBus.length * 30 },
    { name: "Salaire chauffeurs", valeur: Number(parametre.salaireChauffeur) * donneeChauffeurs.length},
    { name: 'Dépenses entretien',  valeur: Number(parametre.entretien) * donneeBus.length},
  ]

  // Affichage
  return(
    <div className="w-full h-full flex justify-center items-end">
      <div className="w-full lg:h-[91.5vh] h-[270vh]  lg:flex-row flex-col flex justify-between mt-24 lg:mt-0 p-[2%] lg:p-[1%] gap-3 overflow-auto">

        {/* Gauche */}
        <section className="w-full lg:w-[40%] h-[30%] lg:h-full flex flex-col justify-between gap-3">
          <div className={`w-full h-[40%] flex flex-col justify-center p-[2%] text-2xl lg:text-3xl space-y-5 ${style}`}>

            <div className="text-4xl font-[cursive] font-bold">{parametre.titre}</div>

            <div className="flex items-center space-x-3">
              <span className="font-bold">Ligne:</span>
              <span className="">{parametre.numeroLigne}</span>
            </div>

            <div className="flex items-center space-x-3">
              <span className="font-bold">Départ:</span>
              <span className="">{parametre.pointDepart}</span>
            </div>

            <div className="flex items-center space-x-3">
              <span className="font-bold">Terminus:</span>
              <span className="">{parametre.terminus}</span>
            </div>

          </div>
          <div className={`w-full h-[60%] flex items-center jusitfy-center ${style}`}>
            <ResponsiveContainer width="90%" height="80%">
              <PieChart>
                <Pie
                  data={data}
                  label={({ value }) => `(${value})` }
                  cx="50%"
                  cy="50%"
                >
                  {data.map((_,index)=>(
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Droite */}
        <section className="w-full lg:w-[60%] h-[70%] lg:h-full flex flex-col justify-between gap-3">

          {/* MIzara telo */}
          <div className="w-full  lg:h-[20%] lg:flex-row flex-col flex justify-between gap-3 py-[0%]">
            <Link to="/Bus" data-tooltip-id="bus-tooltip" data-tooltip-content="Voir tous les voitures" className={`w-full h-[20vh] no-underline lg:h-full flex justify-center items-center flex-col space-y-5 ${style}`}>
              <span className="text-2xl">Nombre de voitures</span>
              <span className="text-3xl font-bold">{donneeBus.length}</span>
            </Link>
            <ReactTooltip id="bus-tooltip" className="z-50" place="bottom" />
            <Link to="/Chauffeurs" data-tooltip-id="chauffeur-tooltip" data-tooltip-content="Voir tous les chauffeurs" className={`no-underline w-full h-[20vh] lg:h-full flex justify-center items-center flex-col space-y-5 ${style}`}>
              <span className="text-2xl">Nombre de chauffeurs</span>
              <span className="text-3xl font-bold">{donneeChauffeurs.length}</span>
            </Link>
            <ReactTooltip id="chauffeur-tooltip" className="z-50" place="bottom" />
            <div className={`w-full h-[20vh] lg:h-full flex justify-center items-center flex-col space-y-5 ${style}`}>
              <span className="text-2xl">Tarif d'un passager</span>
              <span className="text-3xl font-bold">{parametre.tarifPassager} Ar</span>
            </div>
          </div>

          <div className="w-full lg:h-[20%] flex lg:flex-row flex-col justify-between gap-3">
            <div className={`w-full h-[20vh] lg:h-full flex justify-center items-center flex-col space-y-5 ${style}`}>
              <span className="text-2xl">Total dépenses</span>
              <span className="text-3xl font-bold">{charges} Ar</span>
            </div>
            <div className={`w-full h-[20vh] lg:h-full flex justify-center items-center flex-col space-y-5 ${style}`}>
              <span className="text-2xl">Total bénéfices estimé</span>
              <span className="text-3xl font-bold">{benefice} Ar</span>
            </div>
          </div>

          {/* un connue haha */}
          <div className={`w-full h-[40%] lg:h-[60%] flex items-center jusitfy-center ${style}`}>
            <ResponsiveContainer>
              <BarChart data={data1}>
                <XAxis dataKey="name" />
                <YAxis />
                <Bar dataKey="valeur" fill="var(--couleur)" />
                <Tooltip />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

      </div>
    </div>
  )
}