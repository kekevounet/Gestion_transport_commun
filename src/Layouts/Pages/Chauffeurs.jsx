import { BsFillTrashFill } from "react-icons/bs";
import { useTheme } from "../Components/theme"
import { useDonnee } from "../Components/Donnee";
import { CiWarning } from "react-icons/ci";
import Swal from "sweetalert2";
import imgDefaut from "../Assets/imgDefaut.jpg";

  // Déclaration
export default function ChaufRecev()
{
  // Décalation
  const { theme } = useTheme();
  const style = theme === 'clair' ? 'bg-fond-100 text-black' : 'bg-fond-800 text-white';
  const { donneeChauffeurs, setDonneeChauffeur, parametre } = useDonnee();
  const handleDelete = (id) =>
  {
    Swal.fire({
      title: `${parametre.titre}`,
      text: 'Voulez-vous bien le supprimer ?',
      icon:'warning',
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui, je le supprime',
      confirmButtonColor: '#c42f2f',
    }).then((result) =>{
      if(result.isConfirmed)
      {
        setDonneeChauffeur(donneeChauffeurs.filter(s => s.id !== id));
        Swal.fire({
          title: "Gestion des transports",
          icon: 'success',
          text: "Un bus a été supprimer",
        });
      }
    })
  }



  // Affichage
  return(
  <div className="w-full h-full flex justify-center items-end overflow-auto">
    <div className="w-full lg:h-[91.5vh] h-screen p-[2%] lg:p-[1%] mt-20 lg:mt-0  gap-3 grid grid-cols-1 lg:grid-cols-3">

      {/* Bouclena */}


      {donneeChauffeurs.length === 0
        ?
          (<div className="w-full h-full col-span-4 flex items-center justify-center">
            <div className={`w-full lg:w-1/2 h-[40%] lg:h-1/2 shadow-xl bg-red-300 flex flex-col items-center justify-center space-y-5 border-4 border-red-600`}>
              <span className="text-8xl lg:text-9xl text-red-600"><CiWarning /></span>
              <span className="text-4xl lg:text-5xl text-red-600">Aucun bus trouvé</span>
            </div>
          </div>)
        :
        (
          donneeChauffeurs.map((donnee)=>
          (
            <div className={`w-full h-[45vh] no-underline overflow-hidden ${style}`} key={donnee.id}>
          {/* Image */}
          <div className="w-full h-[70%] overflow-hidden">
            <img src={donnee?.photoChauffeur ? donnee.photoChauffeur : imgDefaut } alt="" className="object-cover w-full h-full" />
          </div>

          {/* Numéro et statut */}
          <div className="w-full h-[30%] flex flex-col justify-center p-3 space-y-2 text-xl">
            <span className=""><strong className="mr-2">Chauffeur:</strong>{donnee.nomChauffeur}</span>
            <span className=""><strong className="mr-2">Numero de téléphone:</strong> {donnee.numeroChauffeur}</span>
            <span className="text-red-600 flex items-center w-auto cursor-pointer" onClick={() =>handleDelete(donnee.id)}><BsFillTrashFill className="text-red-400 duration-150 cursor-pointer mr-2" /> Supprimer</span>
            {/* <span className=""><strong className="mr-2">Status</strong> {donnee.busId ? "oui" : "non"}</span> */}
          </div>
        </div>
          ))
         )

      }


    </div>
  </div>
  )
}