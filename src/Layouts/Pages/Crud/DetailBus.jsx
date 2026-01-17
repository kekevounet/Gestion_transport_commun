import { GiReturnArrow } from "react-icons/gi";
import { BiTrash } from "react-icons/bi";
import { BiEdit } from "react-icons/bi";
import { useTheme } from "../../Components/theme";
import { useDonnee } from "../../Components/Donnee";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import imgDefaut from "../../Assets/imgDefaut.jpg";
export default function DetailBus()
{
  // Déclaration
  const { donneeBus, setDonneeBus, donneeChauffeurs, parametre } = useDonnee();
  const { theme } = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();

  // Comportement
  const bus = donneeBus.find((Bus)=> Bus.id === parseInt(id));
    // Miezaka manao page d'erreur
  if (!bus) {
    return null;
  }

  const chauffeur = bus.chauffeurId
  ? donneeChauffeurs.find(c => c.id === bus.chauffeurId)
  : null;


  const handleDelete = (id) =>
  {
    Swal.fire({
      title: "Gestion des transports",
      icon: 'warning',
      text: "Voulez-vous bien le supprimer ? ",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#c42f2f',
      confirmButtonText: 'Oui, je le supprime',
      cancelButtonText: 'annuler'
    }).then((result)=>{
      if(result.isConfirmed)
      {
        setDonneeBus(donneeBus.filter((Bus)=> Bus.id !== id));
        navigate('/Bus');
        Swal.fire({
          title: "Gestion des transports",
          icon: 'success',
          text: "Un bus a été supprimer",
        });
      }
    })
  }

  const ifWithChauffeur = !chauffeur ? (<span className="text-red-500">En arrêt</span>) : (<span className="text-green-500">En marche</span>);




  // Affichage
  return(
    <div className="w-full h-full flex justify-center items-end">
      <div className="w-full lg:h-[91.5vh] h-[150vh] overflow-auto flex items-center justify-center">

          <section className={`w-[80%] h-[90%] grid grid-cols-1 lg:mt-0 mt-20 lg:grid-cols-2 grid-rows-2 gap-6 relative group`}>

            {/* Image */}
            <div className="w-full h-[30vh] lg:h-full">
              <img src={bus?.photoBus ? bus.photoBus : imgDefaut } alt="" className="w-full h-full object-cover" />
            </div>

            {/* Information sur bus */}
            <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-3">
              <section className={`w-full  h-[15vh] lg:h-full flex justify-center items-center flex-col space-y-5  ${theme ==='clair' ? 'bg-fond-100' : 'bg-fond-800' }`}>
                <span className="text-lg lg:text-2xl text-center">Marque du voiture</span>
                <span className="text-xl lg:text-3xl font-bold text-center">{bus.marque}</span>
              </section>
              <section className={`w-full h-[15vh] lg:h-full flex justify-center items-center flex-col space-y-5 ${theme ==='clair' ? 'bg-fond-100' : 'bg-fond-800' }`}>
                <span className="text-lg lg:text-2xl text-center">Plaque d'immatriculation</span>
                <span className="text-xl lg:text-3xl font-bold text-center">{bus.plaque}</span>
              </section>
              <section className={`w-full h-[15vh] lg:h-full flex justify-center items-center flex-col space-y-5 ${theme ==='clair' ? 'bg-fond-100' : 'bg-fond-800' }`}>
                <span className="text-lg: lg:text-2xl text-center">Capacité maximale</span>
                <span className="text-xl lg:text-3xl font-bold text-center">{bus.capacite} Places</span>
              </section>
              <section className={`w-full h-[15vh] lg:h-full flex justify-center items-center flex-col space-y-5 ${theme ==='clair' ? 'bg-fond-100' : 'bg-fond-800' }`}>
                <span className="text-lg lg:text-2xl text-center">Carburant journalier</span>
                <span className="text-xl lg:text-3xl font-bold text-center">{bus.carburant} Ar</span>
              </section>
            </div>

            {/* Information sur Chauffeur et receveur */}
            <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-3">
              <section className={`w-full h-full flex justify-center items-center flex-col space-y-5 ${theme ==='clair' ? 'bg-fond-100' : 'bg-fond-800' }`}>
                <span className="text-lg lg:text-2xl text-center">Chauffeur</span>
                <span className="text-xl lg:text-3xl font-bold text-center">{chauffeur?.nomChauffeur || 'Aucun chauffeur'}</span>
              </section>
              <section className={`w-full h-[15vh] lg:h-full flex justify-center items-center flex-col space-y-5 ${theme ==='clair' ? 'bg-fond-100' : 'bg-fond-800' }`}>
                <span className="text-lg lg:text-2xl text-center">Numero du chauffeur </span>
                <span className="text-xl lg:text-3xl font-bold text-center">{chauffeur?.numeroChauffeur || 'Aucun numéro'}</span>
              </section>
              <section className={`w-full h-[15vh] lg:h-full flex justify-center items-center flex-col space-y-5 ${theme ==='clair' ? 'bg-fond-100' : 'bg-fond-800' }`}>
                <span className="text-lg lg:text-2xl text-center">Versement journalier</span>
                <span className="text-xl lg:text-3xl font-bold text-center">{bus.versement} Ar</span>
              </section>
              <section className={`w-full h-[15vh] lg:h-full flex justify-center items-center flex-col space-y-5 ${theme ==='clair' ? 'bg-fond-100' : 'bg-fond-800' }`}>
                <span className="text-lg lg:text-2xl text-center">Propriétaire du bus</span>
                <span className="text-xl lg:text-3xl font-bold text-center">{bus.proprietaire}</span>
              </section>
            </div>

            {/* Imagess */}
            <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-3">
              <section className={`w-full h-[15vh] lg:h-full flex justify-center items-center flex-col space-y-5 ${theme ==='clair' ? 'bg-fond-100' : 'bg-fond-800' }`}>
                <span className="text-lg lg:text-2xl text-center">Status</span>
                <span className="text-xl lg:text-3xl font-bold text-center">{ifWithChauffeur}</span>
              </section>
              <section className={`w-full h-[15vh] lg:h-full flex justify-center items-center flex-col space-y-5 ${theme ==='clair' ? 'bg-fond-100' : 'bg-fond-800' }`}>
                <span className="text-lg lg:text-2xl text-center">Ligne</span>
                <span className="text-xl lg:text-3xl font-bold text-center">{parametre.numeroLigne}</span>
              </section>
              <section className={`w-full h-[15vh] lg:h-full col-span-2 flex justify-center items-center flex-col space-y-5 ${theme ==='clair' ? 'bg-fond-100' : 'bg-fond-800' }`}>
                <span className="text-lg lg:text-2xl text-center">Actions</span>
                <span className="flex space-x-7 text-3xl lg:text-5xl">
                  <Link to="/Bus" className="text-green-600 no-underline cursor-pointer"><GiReturnArrow className="duration-300 hover:text-green-400" /></Link>
                  <Link to={`/Bus/Modification_Bus/${bus.id}`} className="text-blue-600 no-underline cursor-pointer"><BiEdit className="duration-300 hover:text-blue-400" /></Link>
                  <span className="text-red-600 no-underline cursor-pointer"><BiTrash className="duration-300 hover:text-red-400" onClick={()=>handleDelete(bus.id)} /></span>
                </span>
              </section>
            </div>

            {/* RUD */}
            {/* <div className="h-0 w-20 bg-pink-500 -right-[20%] absolute duration-500 group-hover:h-full"></div> */}

          </section>
      </div>
    </div>
  )
}