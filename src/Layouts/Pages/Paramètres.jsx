import { FaWhatsappSquare } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { CgFacebook } from "react-icons/cg";
import { FaUserAlt } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { AiOutlineUp } from "react-icons/ai";
import { AiOutlineDown } from "react-icons/ai";
import { BsToggleOn } from "react-icons/bs";
import { BsToggleOff } from "react-icons/bs";
import { useTheme } from '../Components/theme';
import { useEffect, useState } from "react";
import { useDonnee } from "../Components/Donnee";
import Swal from "sweetalert2"
export default function Paramètres()
{
  // Etat
  const { theme, toggleTheme } = useTheme();
  const { parametre, setParametre } = useDonnee();
  const  [ showGeneral, setShowGeneral ] = useState(false);
  const  [ showFinance, setShowFinance ] = useState(false);
  const  [ showPassager, setShowPassager ] = useState(false);
  const style =
  theme === "clair"
    ? "bg-fond-100 text-black"
    : "bg-fond-800 text-white";

  const [ formData, setFormData ] = useState(parametre);

  // Comportement
  const handleChange = (e) =>
  {
    const { name, value } = e.target;
    setFormData((prev)=>({
      ...prev,
      [name] : value
    }))
  }

  const handleSubmit = (e) =>
  {
    e.preventDefault();
    setParametre((prev)=>({
      ...prev,
      ...formData
    }))
    Swal.fire(`${formData.titre}`,"Votre paramètre a été sauvegardé avec succès","success")
  }

  useEffect(()=>
  {
    document.title = `${formData.titre}`
  })

  // Affichage
  return(
    <div className="w-full lg:h-full h-screen flex justify-center items-center">

      <form
        onSubmit={handleSubmit}
        className={`w-[98%] lg:w-[70%] p-10 mt-20 shadow-xl space-y-4 duration-500 max-h-[80vh] overflow-auto ${style}`}
      >
        <h2 className="text-4xl font-bold text-center border-b pb-4">
          Paramètres
        </h2>

        {/* Paramètre an le Générale */}

        <section className=" w-full h-full space-y-2 duration-500 transition-transform">

          <div
            className="py-3 text-2xl font-bold cursor-pointer space-x-4 flex items-center italic  text-[var(--couleur)]"
            onClick={()=> setShowGeneral(!showGeneral)}
          >
            <span className="">Information générale</span>
            <span className="">
              {showGeneral ? (<AiOutlineUp />) : (<AiOutlineDown />)}
            </span>
          </div>

          {showGeneral && <div className="grid lg:grid-cols-2 grid-cols-1 grid-rows-4 lg:grid-rows-2 gap-10 w-full h-full duration-500 transition-transform">
            <div className="flex flex-col space-y-3 w-full h-full">
              <span className="">Veuillez entrer le titre de l'application</span>
              <input onChange={handleChange} value={formData.titre} required name="titre" placeholder="Titre de l'application" className={`text-lg p-2 border-b outline-none focus:border-b-2 bg-transparent placeholder:italic  ${theme === 'clair' ? 'border-black' : 'border-white' }`} />
            </div>
            <div className="flex flex-col space-y-3 w-full h-full">
              <span className="">Contact le développeur</span>
              <span className="flex justify-center items-center space-x-5 lg:space-x-8 text-2xl">
                <a href="mailto:niavo.kevin9@gmail.com" className={`no-underline hover:bg-[var(--couleur)] p-3 rounded-full duration-300 ${style}`}><SiGmail /></a>
                <a href="https://niavo.netlify.app" className={`no-underline hover:bg-[var(--couleur)] p-3 rounded-full duration-300 ${style}`}><FaUserAlt /></a>
                <a href="https://web.facebook.com/niavo.kevin" className={`no-underline hover:bg-[var(--couleur)] p-3 rounded-full duration-300 ${style}`}><CgFacebook /></a>
                <a href="https://www.linkedin.com/in/kevin-niavo-39a541286/" className={`no-underline hover:bg-[var(--couleur)] p-3 rounded-full duration-300 ${style}`}><FaLinkedinIn /></a>
                <a href="https://wa.me/0389423351" className={`no-underline hover:bg-[var(--couleur)] p-3 rounded-full duration-300 ${style}`}><FaWhatsappSquare /></a>
              </span>

            </div>
            <div className="flex flex-col space-y-3 w-full h-full">
              <span className="">Vous pouvez choisir un thème pour l'application</span>
              <input onChange={handleChange} value={formData.themeCouleur} type="color" name="themeCouleur" />
            </div>
            <div className="flex flex-col space-y-3 w-full h-full">
              <span className="">Choississez un thème</span>
              <span className="flex items-center justify-between">
                <p className="text-xl">{theme === 'clair' ? 'Clair' : 'Sombre' }</p>
                <p className="text-5xl cursor-pointer" onClick={toggleTheme} >{theme === 'clair' ? (<BsToggleOff />) : (<BsToggleOn />)}</p>
              </span>
            </div>
            </div>}

        </section>

        {/* Paramètre an le Finance */}


         <section className=" w-full h-full space-y-2 duration-500 transition-transform">

          <div
            className="py-3 text-2xl font-bold cursor-pointer space-x-4 flex items-center italic text-[var(--couleur)]"
            onClick={()=> setShowFinance(!showFinance)}
          >
            <span className="">Information à propos du finance</span>
            <span className="">
              {showFinance ? (<AiOutlineUp />) : (<AiOutlineDown />)}
            </span>
          </div>

          {showFinance && <div className="grid grid-cols-1 lg:grid-cols-2 grid-rows-6 lg:grid-rows-3 gap-6 w-full h-full duration-500 transition-transform">
            <div className="flex flex-col space-y-3 w-full h-full">
              <span className="">Veuillez entrer le revenu journalier d'un bus en Ariary</span>
              <input type="number" onChange={handleChange} value={formData.revenuBus} name="revenuBus" required placeholder="Revenu journalier" className={`text-lg p-2 border-b outline-none focus:border-b-2 bg-transparent placeholder:italic  ${theme === 'clair' ? 'border-black' : 'border-white' }`} />
            </div>
            <div className="flex flex-col space-y-3 w-full h-full">
              <span className="">Veuillez taper le frais de participation journalier d'un en Ariary</span>
              <input  type="number" onChange={handleChange} value={formData.fraisParticipation} name="fraisParticipation" required placeholder="Frais de participation journalier" className={`text-lg p-2 border-b outline-none focus:border-b-2 bg-transparent placeholder:italic  ${theme === 'clair' ? 'border-black' : 'border-white' }`} />
            </div>
            <div className="flex flex-col space-y-3 w-full h-full">
              <span className="">Veuillez entrer le droit de visite technique d'un voiture</span>
              <input type="number" onChange={handleChange} value={formData.droitVisiteTechnique} name="droitVisiteTechnique" required placeholder="Salaire chauffeur" className={`text-lg p-2 border-b outline-none focus:border-b-2 bg-transparent placeholder:italic  ${theme === 'clair' ? 'border-black' : 'border-white' }`} />
            </div>
            <div className="flex flex-col space-y-3 w-full h-full">
              <span className="">Veuillez entrer le taxe d'un voiture</span>
              <input type="number" onChange={handleChange} value={formData.taxeVoiture} name="taxeVoiture" required placeholder="Titre de l'application" className={`text-lg p-2 border-b outline-none focus:border-b-2 bg-transparent placeholder:italic  ${theme === 'clair' ? 'border-black' : 'border-white' }`} />
            </div>
            <div className="flex flex-col space-y-3 w-full h-full">
              <span className="">Veuillez taper le prix d'un entretien tous le mois</span>
              <input type="number" onChange={handleChange} value={formData.entretien} name="entretien" required placeholder="Tarif par passager" className={`text-lg p-2 border-b outline-none focus:border-b-2 bg-transparent placeholder:italic  ${theme === 'clair' ? 'border-black' : 'border-white' }`} />
            </div>
            <div className="flex flex-col space-y-3 w-full h-full">
              <span className="">Veuillez entrer le salaire d'un chauffeur</span>
              <input type="number" onChange={handleChange} value={formData.salaireChauffeur} name="salaireChauffeur" required placeholder="Salaire chauffeur" className={`text-lg p-2 border-b outline-none focus:border-b-2 bg-transparent placeholder:italic  ${theme === 'clair' ? 'border-black' : 'border-white' }`} />
            </div>
            </div>}

        </section>

        {/* Paramètre an le Passagera */}


         <section className=" w-full h-full space-y-2 duration-500 transition-transform">

          <div
            className="py-3 text-2xl font-bold cursor-pointer space-x-4 flex items-center italic  text-[var(--couleur)]"
            onClick={()=> setShowPassager(!showPassager)}
          >
            <span className="">Information supplémentaire</span>
            <span className="">
              {showPassager ? (<AiOutlineUp />) : (<AiOutlineDown />)}
            </span>
          </div>

          {showPassager && <div className="grid grid-cols-1 lg:grid-cols-2 grid-rows-1 gap-10 w-full h-full duration-500 transition-transform">
            <div className="flex flex-col space-y-3 w-full h-full">
              <span className="">Veuillez entrer le nombre de passager quotidien</span>
              <input type="number" onChange={handleChange} value={formData.nombrePassager} name="nombrePassager" required placeholder="Nombre de passager quotidien" className={`text-lg p-2 border-b outline-none focus:border-b-2 bg-transparent placeholder:italic  ${theme === 'clair' ? 'border-black' : 'border-white' }`} />
            </div>
            <div className="flex flex-col space-y-3 w-full h-full">
              <span className="">Veuillez entrer le frais bus d'un passager</span>
              <input type="number" onChange={handleChange} value={formData.tarifPassager} name="tarifPassager" required placeholder="Frais bus" className={`text-lg p-2 border-b outline-none focus:border-b-2 bg-transparent placeholder:italic  ${theme === 'clair' ? 'border-black' : 'border-white' }`} />
            </div>
            <div className="flex flex-col space-y-3 w-full h-full">
              <span className="">Numéro de ligne</span>
              <input type="number" onChange={handleChange} value={formData.numeroLigne} name="numeroLigne" required placeholder="Numero du ligne" className={`text-lg p-2 border-b outline-none focus:border-b-2 bg-transparent placeholder:italic  ${theme === 'clair' ? 'border-black' : 'border-white' }`} />
            </div>
            <div className="flex flex-col space-y-3 w-full h-full">
              <span className="">Veuillez entrer le point de départ</span>
              <input type="text" onChange={handleChange} value={formData.pointDepart} name="pointDepart" required placeholder="Point de départ du bus" className={`text-lg p-2 border-b outline-none focus:border-b-2 bg-transparent placeholder:italic  ${theme === 'clair' ? 'border-black' : 'border-white' }`} />
            </div>
            <div className="flex flex-col space-y-3 w-full h-full">
              <span className="">Veuillez entrer le terminus</span>
              <input type="text" onChange={handleChange} value={formData.terminus} name="terminus" required placeholder="Terminus du bus" className={`text-lg p-2 border-b outline-none focus:border-b-2 bg-transparent placeholder:italic  ${theme === 'clair' ? 'border-black' : 'border-white' }`} />
            </div>
            </div>
            }

        </section>



        <button type="submit" className={`w-full p-3 text-xl font-bold bg-[var(--couleur)]`}>
          Acceptez les modifications
        </button>
      </form>
    </div>
  )
}