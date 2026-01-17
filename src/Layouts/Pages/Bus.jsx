import { CiWarning } from "react-icons/ci";
import { useTheme } from "../Components/theme"
import { Link } from "react-router-dom";
import { useDonnee } from "../Components/Donnee";
import imgDefaut from "../Assets/imgDefaut.jpg";
export default function Bus()
{
  // Décalation
  const { theme } = useTheme();
  const style = theme === 'clair' ? 'bg-fond-100 text-black' : 'bg-fond-800 text-white';
  const { donneeBus } = useDonnee();

  // Affichage
  return(
  <div className="w-full h-full flex justify-center items-end overflow-auto">
    <div className="w-full lg:h-[91.5vh] h-screen p-[2%] lg:p-[1%] mt-20 lg:mt-0  gap-3 grid grid-cols-1 lg:grid-cols-3">

      {/* Bouclena */}




      {donneeBus.length === 0
        ?
          (<div className="w-full h-full col-span-4 flex items-center justify-center">
            <div className={`w-full lg:w-1/2 h-[40%] lg:h-1/2 shadow-xl bg-red-300 flex flex-col items-center justify-center space-y-5 border-4 border-red-600`}>
              <span className="text-8xl lg:text-9xl text-red-600"><CiWarning /></span>
              <span className="text-4xl lg:text-5xl text-red-600">Aucun bus trouvé</span>
            </div>
          </div>)
        :
        (
            donneeBus.map((Bus)=>
          (
            <Link className={`no-underline w-full h-[45vh] overflow-hidden ${style}`} to={`/Bus/DetailBus/${Bus.id}`} key={Bus.id}>
              {/* Image */}
              <div className="w-full h-[70%] overflow-hidden">
                <img src={Bus?.photoBus ? Bus.photoBus : imgDefaut } alt="" className="object-cover w-full h-full" />
              </div>
              {/* Numéro et statut */}
              <div className="w-full h-[30%] flex flex-col justify-center p-3 space-y-3 text-xl">
                <span className="tracking-wider"><strong>Marque: </strong>{Bus.marque}</span>
                <span className="tracking-wider"><strong>Plaque d'immatriculation: </strong> {Bus.plaque}</span>
              </div>
            </Link>
          ))
          )

      }



    </div>
  </div>
  )
}