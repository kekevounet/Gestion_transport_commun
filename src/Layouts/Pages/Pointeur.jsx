import { BiTrash } from "react-icons/bi";
import { useTheme } from "../Components/theme";
import { useDonnee } from "../Components/Donnee";
import { useState } from "react";
export default function Pointeur()
{
  //Déclaration
  const { theme } = useTheme();
  const [ idPointeur, setIdPointeur ] = useState(0);
  const { pointage, setPointage } = useDonnee();
  const [ plaque, setPlaque ] = useState("");
  const style = theme === "clair" ? "bg-fond-100 text-black" : "bg-fond-800 text-white";

  // Comportement
  const handleSubmit = (e) => {
  e.preventDefault();

  const nextId = idPointeur + 1;

  const newPointage = {
    id: nextId,
    date: new Date().toLocaleString("FR-fr"),
    plaque: plaque,
  };

  setIdPointeur(nextId);
  setPointage(prev => [...prev, newPointage]);
  setPlaque("");
};

const handleDelete = (id) =>
{
  setPointage(pointage.filter((p)=> p.id !== id))
}


  // Affichage
  return(
    <div className="w-full h-full flex justify-center items-end">
      <div className="w-full h-screen lg:h-[91.5vh] flex flex-col justify-between p-[1%] mt-20 lg:mt-0 gap-3">

        <form className={`w-full h-20 flex items-center justify-center space-x-4 ${style} `} onSubmit={handleSubmit}>
          <input
            type="text"
            required
            value={plaque}
            onChange={(e)=> setPlaque(e.target.value) }
            name="plaque d'immatriculation"
            placeholder="Plaque d'immatriculation"
            className={`p-2 border rounded-xl placeholder:px-3 placeholder:italic outline-none focus:outline-2 focus:outline-offset-0 bg-transparent ${theme === 'clair' ? 'border-black focus:outline-black' : 'border-white focus:outline-white' }`}
          />
          <input type='submit' className="py-2 px-3 rounded-xl text-lg font-bold bg-[var(--couleur)]" />
        </form>

        <div className={`w-full h-full overflow-auto p-[1%] ${style}`}>

          <div className={`w-full h-auto space-x-3 p-4 flex items-center justify-between overflow-hidden text-sm lg:text-xl relative group border-b ${style}  ${theme === 'clair' ? 'border-black' : 'border-white' } `}>
            <div className="w-[30.33%] text-center">Heure d'arrivée</div>
            <div className={`w-[30.33%] text-center border-x ${theme === 'clair' ? 'border-black' : 'border-white' }`}>Numéro voiture</div>
            <div className="w-[30.33%] text-center">Action</div>
          </div>

          {/* Bouclena */}
          {pointage.map((p)=>(
            <div key={p.id} className={`w-full h-auto space-x-3 p-4 flex items-center justify-between overflow-hidden text-sm lg:text-xl relative group duration-300 ${style} `}>
              <div className="w-[30.33%] text-center">{p.date}</div>
              <div className={`w-[30.33%] text-center border-x ${theme === 'clair' ? 'border-black' : 'border-white' }`}>{p.plaque}</div>
              <div className="w-[30.33%] text-center text-red-500 h-full flex items-center justify-center text-3xl"><BiTrash className="cursor-pointer hover:opacity-70 duration-300" onClick={()=>handleDelete(p.id)} /></div>
            </div>
          ))}


        </div>

      </div>
    </div>
  )
}