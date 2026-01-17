import { useRef, useState } from "react";
import { useTheme } from "../../Components/theme";
import { useDonnee } from "../../Components/Donnee";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function AjoutChaufRecev()
{
  const navigate = useNavigate();
  const [ withBus, setWithBus ] = useState(false);
  const { theme } = useTheme();
  const {
    donneeBus,
    setDonneeChauffeur,
    idChauffeur,
    setIdChauffeur,
    setDonneeBus,
    parametre

  } = useDonnee();

  const style =
    theme === "clair"
      ? "bg-fond-100 text-black"
      : "bg-fond-800 text-white";

  const [formData, setFormData] = useState({
    nomChauffeur: "",
    heureTravail: "",
    numeroChauffeur: "",
    photoChauffeur: "",
    relier: ""
  });

  const photoChauffeurRef = useRef(null);

  /* ================= CHANGE ================= */
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? URL.createObjectURL(files[0]) : value,
    }));
  };

  /* ================= SUBMIT ================= */
const handleSubmit = (e) => {
  e.preventDefault();

  let selectedBusId = null;

  // liaison bus
  if (withBus) {
    selectedBusId = parseInt(formData.relier);

    // Chercher le bus
    const bus = donneeBus.find(b => b.id === selectedBusId);

    // tsiss
    if (!bus) {
      alert("Bus introuvable");
      return;
    }

    //  Bus efa misy
    if (bus.chauffeurId) {
      alert("Ce bus a déjà un chauffeur !");
      return;
    }
  }

  // 2️⃣ Génération ID chauffeur (AVANT setState)
  const newChauffeurId = idChauffeur;
  setIdChauffeur(prev => prev + 1);

  // 3️⃣ Création chauffeur
  const newChauffeur = {
    id: newChauffeurId,
    nomChauffeur: formData.nomChauffeur,
    heureTravail: formData.heureTravail,
    numeroChauffeur: formData.numeroChauffeur,
    photoChauffeur: formData.photoChauffeur,
    busId: selectedBusId, // null ou id
  };



  setDonneeChauffeur(prev => [...prev, newChauffeur]);

  // 4️⃣ Liaison côté BUS (si nécessaire)
  if (withBus) {
    setDonneeBus(prev =>
      prev.map(bus =>
        bus.id === selectedBusId
          ? { ...bus, chauffeurId: newChauffeurId }
          : bus
      )
    );
  }

//   setIdChauffeur(prevId => {
//   const newId = prevId + 1;

//   const newChauffeur = {
//     id: prevId,
//     nomChauffeur: formData.nomChauffeur,
//     heureTravail: formData.heureTravail,
//     numeroChauffeur: formData.numeroChauffeur,
//     photoChauffeur: formData.photoChauffeur,
//     busId: selectedBusId,
//   };

//   setDonneeChauffeur(prev => [...prev, newChauffeur]);

//   if (withBus) {
//     setDonneeBus(prev =>
//       prev.map(bus =>
//         bus.id === selectedBusId
//           ? { ...bus, chauffeurId: prevId }
//           : bus
//       )
//     );
//   }

//   return newId;
// });


  // 5️⃣ Reset
  setFormData({
    nomChauffeur: "",
    heureTravail: "",
    numeroChauffeur: "",
    photoChauffeur: "",
    relier: "",
  });

  if (photoChauffeurRef.current) {
    photoChauffeurRef.current.value = null;
  }

  Swal.fire(`${parametre.titre}`, "Un chauffeur a bien été ajouté.", "success");
  navigate('/Chauffeurs');

};

  // Affciahge
  return (
    <div className="w-full h-screen flex justify-center items-center">

      <form
        onSubmit={handleSubmit}
        className={`w-[98%] lg:w-[65%] p-10 shadow-xl space-y-8 overflow-auto max-h-[60vh] ${style}`}
      >
        <h2 className="text-4xl font-bold text-center border-b pb-4">
          Ajout Chauffeur
        </h2>



        {/* Sofera */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <input
            name="nomChauffeur"
            value={formData.nomChauffeur}
            onChange={handleChange}
            required
            placeholder="Nom du chauffeur"
            className={`text-lg p-2 border-b outline-none focus:border-b-2 bg-transparent placeholder:italic  ${theme === 'clair' ? 'border-black' : 'border-white' }`}
          />

          <input
            name="numeroChauffeur"
            value={formData.numeroChauffeur}
            onChange={handleChange}
            placeholder="Numéro téléphone"
            className={`text-lg p-2 border-b outline-none focus:border-b-2 bg-transparent placeholder:italic  ${theme === 'clair' ? 'border-black' : 'border-white' }`}
          />

          <input
            name="heureTravail"
            value={formData.heureTravail}
            onChange={handleChange}
            type="number"
            placeholder="Heures de travail"
            className={`text-lg p-2 border-b outline-none focus:border-b-2 bg-transparent placeholder:italic  ${theme === 'clair' ? 'border-black' : 'border-white' }`}
          />

          <input
            ref={photoChauffeurRef}
            name="photoChauffeur"
            type="file"
            onChange={handleChange}
            className="p-3 border-b bg-transparent cursor-pointer"
          />
        </div>

        {/* Checkbox swith an le toggle */}
         <label className="flex items-center gap-3 text-lg">
          <input
            type="checkbox"
            checked={withBus}
            onChange={() => setWithBus(!withBus)}
            className="cursor-pointer"
          />
          Le relier à un bus existant
        </label>

        {/* Bus */}
        {withBus && <div className="space-y-2">
          <label className="text-lg font-semibold">
            Sélectionner un bus
          </label>
          <select
            name="relier"
            value={formData.relier}
            onChange={handleChange}
            className="w-full p-3 rounded border bg-transparent"
          >
            <option value="">-- Choisir un bus --</option>
            {donneeBus.map((bus) => (
              <option key={bus.id} value={bus.id}>
                {bus.marque} – {bus.plaque}
              </option>
            ))}
          </select>
        </div>}


        <button type="submit" className={`w-full p-3 text-xl font-bold bg-[var(--couleur)]`}>
          Ajouter le chauffeur
        </button>
      </form>
    </div>
  );
}
