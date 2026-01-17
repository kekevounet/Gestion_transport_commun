import { useTheme } from "./Layouts/Components/theme";
import SideBars from "./Layouts/Components/SideBars";
import DashBoard from "./Layouts/Pages/DashBoard";
import Header from "./Layouts/Components/Header";
import Bus from "./Layouts/Pages/Bus";
import { Routes, Route } from 'react-router-dom';
import AjoutBus from "./Layouts/Pages/Crud/AjoutBus";
import Chauffeurs from "./Layouts/Pages/Chauffeurs";
import AjoutChauffeur from "./Layouts/Pages/Crud/AjoutChauffeur.jsx";
import Finances from "./Layouts/Pages/Finances.jsx";
import DetailBus from "./Layouts/Pages/Crud/DetailBus.jsx";
import ModificationBus from "./Layouts/Pages/Crud/ModificationBus.jsx";
import Paramètres from "./Layouts/Pages/Paramètres.jsx";
import Pointeur from "./Layouts/Pages/Pointeur.jsx";
export default function App()
{
  const { theme } = useTheme();
  return(
    <div className={`w-full lg:h-screen h-max  flex  selection:text-[var(--couleur)] selection:bg-stone-200 duration-300 ${theme === 'clair' ? 'bg-fond-400 text-black' : 'bg-fond-900 text-white'}`}>
      <SideBars />
      <Header />
      <Routes>
        {/* Pages */}
        <Route path="/" element={ <DashBoard /> } />
        <Route path="/Bus" element={ <Bus /> } />
        <Route path="/Chauffeurs" element={ <Chauffeurs /> } />
        <Route path="/Finances" element={ <Finances /> } />
        <Route path="/Paramètres" element={ <Paramètres /> } />
        <Route path="/Pointeur" element={ <Pointeur /> } />

        {/* Ajout */}
        <Route path="Bus/Ajout_Bus" element={ <AjoutBus /> } />
        <Route path="/Chauffeurs/Ajout_Chauffeur" element={ <AjoutChauffeur /> } />

        {/* Read */}
        <Route path="/Bus/DetailBus/:id" element={ <DetailBus/> } />

        {/* Update */}
        <Route path="/Bus/Modification_Bus/:id" element={ <ModificationBus /> } />

      </Routes>
    </div>
  )
}