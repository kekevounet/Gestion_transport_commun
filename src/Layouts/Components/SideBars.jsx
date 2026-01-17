import { BsToggleOn } from "react-icons/bs";
import { BsToggleOff } from "react-icons/bs";
import { GiOpenBook } from "react-icons/gi";
import { AiOutlineSetting } from "react-icons/ai";
import { BsCash } from "react-icons/bs";
import { BiBus } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { MdOutlineDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useDonnee } from "./Donnee";
import { useTheme } from "../Components/theme";
import { useEffect, useState } from "react";

function useIsMoblile()
{
  const [ isMobile, setIsMobile ] = useState(window.innerWidth < 768 );
  // useEffect(()=>
  // {
  //   const handleResize = () => setIsMobile(window.innerWidth < 768);
  //   window.addEventListener('resize', handleResize);
  //   return () => window.removeEventListener('resize', handleResize);
  // })
  useEffect(() => {
  const handleResize = () => setIsMobile(window.innerWidth < 768);
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

  return isMobile;
}

export default function SideBars()
{
  // Déclaration
  const { sideOuvert, setSideOuvert } = useDonnee();
  const isMobile = useIsMoblile();
  const { theme, toggleTheme} = useTheme();
  const sideLinks = [
    {
      label: 'Dashboard',
      icon: <MdOutlineDashboard />,
      lien: ''
    },
    {
      label: 'Bus',
      icon: <BiBus />,
      lien: 'Bus'
    },
    {
      label: 'Chauffeurs',
      icon: <FiUsers />,
      lien: 'Chauffeurs'
    },
    {
      label: 'Finances',
      icon: <BsCash />,
      lien: 'Finances'
    },
    {
      label: 'Pointeur',
      icon: <GiOpenBook />,
      lien: 'Pointeur'
    },
    {
      label: 'Paramètres',
      icon: <AiOutlineSetting />,
      lien: 'Paramètres'
    },
  ]
  const handleClick = () =>
  {
    if(isMobile)
    {
      setSideOuvert(false)
    }
  }

  // Affichage
  return(
    <div className={` h-full duration-300 z-50 ${sideOuvert ? 'fixed top-0 lg:static w-full lg:w-[20%]' : 'w-0' }`}>
      {sideOuvert && <div className="w-full h-full bg-fond-800 text-white flex flex-col justify-center space-y-2 items-center z-40 ">

      {/* Bouclena */}
      {sideLinks.map(( sideLink, index )=>(
        <NavLink
          key={index}
          to={`/${sideLink.lien}`}
          onClick={handleClick}
          className={(({ isActive })=>`w-full h-16 flex mt-20 items-center justify-center group relative z-40 no-underline text-white border-[var(--couleur)] ${isActive ? 'border-r-8' : 'border-none' }`)}
        >
          <span className="text-3xl absolute left-2">{sideLink.icon}</span>
          <span className="text-2xl">{sideLink.label}</span>
          <span className="w-0 h-full bg-[var(--couleur)] group-hover:w-full absolute top-0 right-0 duration-300 -z-10"></span>
        </NavLink>
      ))}
      <section onClick={()=>{toggleTheme(); handleClick()}} className={`w-full lg:hidden h-16 flex mt-20 items-center justify-center group relative z-40 no-underline text-white border-[var(--couleur)]`}>
        <span className="text-3xl absolute left-2 flex items-center">
          {theme === 'clair' ?
            (<BsToggleOff />)
            :
            (<BsToggleOn />)
          }
        </span>
        <span className="text-2xl  flex ">
          {theme === 'clair' ?
            'Clair'
            :
            'Sombre'
          }
        </span>
        <span className="w-0 h-full bg-[var(--couleur)] group-hover:w-full absolute top-0 right-0 duration-300 -z-10"></span>
      </section>

     </div>}
    </div>
  )
}