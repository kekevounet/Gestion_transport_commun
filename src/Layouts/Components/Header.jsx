import { FaBars } from "react-icons/fa";
import { AiOutlineFileAdd } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { BsFillSunFill } from "react-icons/bs";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { BsFillBusFrontFill } from "react-icons/bs";
import { useTheme } from "./theme";
import { Link, useLocation } from "react-router-dom";
import { useDonnee } from "../Components/Donnee";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Tooltip } from "react-tooltip";
export default function Header()
{
  // Déclaration
  const { theme, toggleTheme } = useTheme();
  const { parametre, sideOuvert, setSideOuvert } = useDonnee();
  const location = useLocation();
  const [ isMobile, setIsMobile ] = useState(false);


  // Comportement
  const handleUserClick = () =>
  {
    Swal.fire(`${parametre.titre}`, 'Ceci est juste pour le design, désolé', 'info')
  }
  useEffect(()=>
  {
    const isMobiles = () =>
    {
      setIsMobile(window.innerWidth < 768 );
    }
    isMobiles();
    window.addEventListener('resize', isMobiles);
    return () => window.removeEventListener('resize', isMobiles)
  },[])

  // Affichage
  return(
    <div className="">
      <div className="w-full h-20 bg-white text-black shadow-md fixed top-0 left-0 flex items-center justify-between lg:px-[2%] px-[2%] z-50">

          <section className="w-[90%] lg:w-1/2 h-full flex items-center space-x-5">
            <span className="text-5xl text-[var(--couleur)] "><BsFillBusFrontFill /></span>
            <span className="lg:text-4xl text-2xl font-[cursive] font-bold">{parametre.titre}</span>
          </section>

        {/* Thème et search */}
        <section className="w-1/2 h-full flex items-center space-x-5 justify-end">

          <input
            type="search"
            name="search"
            id="seach"
            placeholder="Rechercher ..."
            className="hidden lg:block p-2 border border-black rounded-3xl placeholder:px-3 placeholder:italic outline-none focus:outline-2 focus:outline-offset-0 focus:outline-black"
          />

          <span className="text-5xl cursor-pointer hidden lg:block hover:scale-110 duration-150 hover:text-[var(--couleur)]"><BiUserCircle onClick={handleUserClick} /></span>

          <span className="text-5xl cursor-pointer hidden hover:scale-110 duration-150 hover:text-[var(--couleur)] lg:block" onClick={toggleTheme}>
            {theme === 'clair'
              ?
                (<BsFillSunFill />)
              :
                (<BsFillMoonStarsFill />)
            }
          </span>


          {location.pathname === '/Bus' && <Link to="/Bus/Ajout_Bus" data-tooltip-id="AjoutBus" data-tooltip-content='Ajouter un bus' className="text-5xl cursor-pointer hover:scale-110 duration-150 text-black">
            <AiOutlineFileAdd />
          </Link>}

          {location.pathname === '/Chauffeurs' && <Link to="/Chauffeurs/Ajout_Chauffeur" data-tooltip-id="AjoutChauffeur" data-tooltip-content="Ajouter un Chauffeur" className="text-5xl cursor-pointer hover:scale-110 duration-150 text-black">
            <AiOutlineFileAdd />
          </Link>}

          {isMobile && <span className="text-5xl cursor-pointer">
            <FaBars onClick={()=>setSideOuvert(!sideOuvert)}  />
          </span>}

        </section>

      </div>

      <Tooltip className="z-50" place="bottom" id="AjoutBus" />
      <Tooltip className="z-50" place="bottom" id="AjoutChauffeur" />
    </div>
  )
}