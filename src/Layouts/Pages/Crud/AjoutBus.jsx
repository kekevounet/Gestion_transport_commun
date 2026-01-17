import { useRef, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import { useTheme } from "../../Components/theme";
import { useDonnee } from "../../Components/Donnee";

export default function AjoutBus()
{
  // Déclaration
  const navigate = useNavigate();
  const { theme } = useTheme();
  const {
    donneeBus,
    setDonneeBus,
    donneeChauffeurs,
    setDonneeChauffeur,
    idBus,
    setIdBus,
    idChauffeur,
    setIdChauffeur,
    parametre,
  } = useDonnee();

  const [withChauffeur, setWithChauffeur] = useState(false);

  const [formData, setFormData] = useState({
    marque: "",
    plaque: "",
    capacite: "",
    proprietaire: "",
    versement: "",
    carburant: "",
    photoBus: "",

    nomChauffeur: "",
    numeroChauffeur: "",
    photoChauffeur: "",
    BusId: ""
  });

  const photoBusRef = useRef(null);
  const photoChauffeurRef = useRef(null);

  const style =
    theme === "clair"
      ? "bg-fond-100 text-black"
      : "bg-fond-800 text-white";

    // Comportement

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? URL.createObjectURL(files[0]) : value,
    }));
  };

  const handleSubmit = (e) =>
  {
    e.preventDefault();
    let chauffeurId = null;

    // Chauffeur
    if(withChauffeur)
    {
      // setIdChauffeur( idChauffeur + 1 )
      setIdChauffeur( idChauffeur + 1 )
      const newChauffeur = {
        id: idChauffeur,
        nomChauffeur: formData.nomChauffeur,
        numeroChauffeur: formData.numeroChauffeur,
        photoChauffeur: formData.photoChauffeur,
        idBus,
        BusId: idBus
      }
      setDonneeChauffeur([ ...donneeChauffeurs, newChauffeur]);
      chauffeurId = idChauffeur;
    }

    // Bus
    setIdBus( idBus+1 )

    const newBus = {
      id: idBus,
      marque: formData.marque,
      plaque: formData.plaque,
      capacite: formData.capacite,
      proprietaire: formData.proprietaire,
      versement: formData.carburant,
      photoBus: formData.photoBus,
      chauffeurId,
    }
    setDonneeBus([ ...donneeBus, newBus]);

    // Réinitialisation des composants
    setFormData({
      marque: "",
      plaque: "",
      capacite: "",
      proprietaire: "",
      versement: "",
      carburant: "",
      photoBus: "",

      nomChauffeur: "",
      numeroChauffeur: "",
      photoChauffeur: "",

      // Message de success
    });
    Swal.fire(`${parametre.titre}`, "Un bus a bien été ajouté.", "success")
      if (photoBusRef.current) photoBusRef.current.value = null;
      if (photoChauffeurRef.current) photoChauffeurRef.current.value = null;

    navigate('/Bus')

  }

  return (
    <div className="w-full lg:h-full h-screen flex justify-center items-center">

      <form
        onSubmit={handleSubmit}
        className={`w-[98%] lg:w-[70%] p-10 mt-20 max-h-[60vh] shadow-xl space-y-10 duration-500 overflow-auto ${style}`}
      >
        <h2 className="text-4xl font-bold text-center border-b pb-4">
          Ajout d’un Bus
        </h2>

        {/* ================= BUS ================= */}
        <section className="space-y-6 duration-500">
          <h3 className="text-2xl font-semibold">Informations du Bus</h3>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <input name="marque" onChange={handleChange} value={formData.marque} placeholder="Marque du véhicule" required className={`text-lg p-2 border-b outline-none focus:border-b-2 bg-transparent placeholder:italic  ${theme === 'clair' ? 'border-black' : 'border-white' }`} />
            <input name="plaque" onChange={handleChange} value={formData.plaque} placeholder="Plaque d'immatriculation" required className={`text-lg p-2 border-b outline-none focus:border-b-2 bg-transparent placeholder:italic  ${theme === 'clair' ? 'border-black' : 'border-white' }`} />
            <input type="number" name="capacite" onChange={handleChange} value={formData.capacite} placeholder="Capacité maximale" required className={`text-lg p-2 border-b outline-none focus:border-b-2 bg-transparent placeholder:italic  ${theme === 'clair' ? 'border-black' : 'border-white' }`} />

            <input name="proprietaire" onChange={handleChange} value={formData.proprietaire} placeholder="Propriétaire du véhicule" className={`text-lg p-2 border-b outline-none focus:border-b-2 bg-transparent placeholder:italic  ${theme === 'clair' ? 'border-black' : 'border-white' }`} />
            <input type="number" name="versement" onChange={handleChange} value={formData.versement} placeholder="Versement journalier" className={`text-lg p-2 border-b outline-none focus:border-b-2 bg-transparent placeholder:italic  ${theme === 'clair' ? 'border-black' : 'border-white' }`} />
            <input type="number" name="carburant" onChange={handleChange} value={formData.carburant} placeholder="Carburant journalier" className={`text-lg p-2 border-b outline-none focus:border-b-2 bg-transparent placeholder:italic  ${theme === 'clair' ? 'border-black' : 'border-white' }`} />
          </div>

          <input
            ref={photoBusRef}
            type="file"
            name="photoBus"
            onChange={handleChange}
          />
        </section>

        {/* ================= CHECK ================= */}
        <label className="flex items-center gap-3 text-lg">
          <input
            type="checkbox"
            checked={withChauffeur}
            onChange={() => setWithChauffeur(!withChauffeur)}
            className="cursor-pointer"
          />
          Ajouter un chauffeur
        </label>

        {/* ================= CHAUFFEUR ================= */}
        {withChauffeur && (
          <section className="p-6 border border-dashed space-y-5 duration-500">
            <h3 className="text-2xl font-semibold">Informations Chauffeur</h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <input
                name="nomChauffeur"
                value={formData.nomChauffeur}
                onChange={handleChange}
                placeholder="Nom du chauffeur"
                className={`text-lg p-2 border-b outline-none focus:border-b-2 bg-transparent placeholder:italic  ${theme === 'clair' ? 'border-black' : 'border-white' }`}
              />

              <input
                name="numeroChauffeur"
                value={formData.numeroChauffeur}
                onChange={handleChange}
                placeholder="Numéro du chauffeur"
                className={`text-lg p-2 border-b outline-none focus:border-b-2 bg-transparent placeholder:italic  ${theme === 'clair' ? 'border-black' : 'border-white' }`}
              />
            </div>

            <input
              ref={photoChauffeurRef}
              type="file"
              name="photoChauffeur"
              onChange={handleChange}
            />
          </section>
        )}

        <button type="submit" className={`w-full p-3 text-xl font-bold bg-[var(--couleur)]`}>
          Ajouter le Bus
        </button>
      </form>
    </div>
  );

}
