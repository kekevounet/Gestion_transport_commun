import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

import { useTheme } from "../../Components/theme";
import { useDonnee } from "../../Components/Donnee";
import { useParams } from "react-router-dom";

export default function ModificationBus()
{
  // Déclaration
  const { id } = useParams();
  const busId = parseInt(id);
  const { theme } = useTheme();
  const { donneeBus, setDonneeBus , donneeChauffeurs, setDonneeChauffeur, setIdChauffeur, } = useDonnee();
  const [ formData, setFormData ] = useState({
    marque: '',
    plaque: '',
    capacite: '',
    proprietaire: '',
    versement: '',
    carburant: '',
    photoBus: '',

    nomChauffeur: '',
    numeroChauffeur: '',
    photoChauffeur: ''
  });
  const photoBusRef = useRef(null);
  const photoChauffeurRef = useRef(null);
  const [ withChauffeur, setWithChauffeur ] = useState(false);
  const style = theme === "clair" ? "bg-fond-100 text-black" : "bg-fond-800 text-white";

  const bus = donneeBus.find((b)=> b.id === parseInt(id));
  // const chauffeur = bus.idChauffeur ? donneeChauffeurs.find((c)=> c.id === bus.idChauffeur) || null : null;
  const chauffeur = donneeChauffeurs.find((c) => c.busId === busId) || null;



  // Comportement
  const handleChange = (e) =>
  {
    const { name, value, type, files } = e.target;
    setFormData((prev)=>(
      {
        ...prev,
        [ name ] : type === 'file' ? URL.createObjectURL(files[0]) : value
      }
    ))
  }

  // Affichage de tous les informations
  useEffect(()=>
  {
    if (!bus) return null;
    setFormData({
      marque: bus.marque,
      plaque: bus.plaque,
      capacite: bus.capacite,
      proprietaire: bus.proprietaire,
      versement: bus.versement,
      carburant: bus.carburant,
      nomChauffeur: chauffeur?.nomChauffeur || "",
      numeroChauffeur: chauffeur?.numeroChauffeur || "",
      photoChauffeur: chauffeur?.photoChauffeur,
      photoBus: bus.photoBus
    })
  }, [bus, chauffeur])

  // Validation
const handleSubmit = (e) => {
    e.preventDefault();

    let chauffeurId = bus?.idChauffeur ?? null;

    /* ---- Chauffeur ---- */
    if (withChauffeur) {
      if (!formData.nomChauffeur || !formData.numeroChauffeur) {
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: "Nom et numéro du chauffeur obligatoires",
        });
        return;
      }

      if (chauffeur) {
        setDonneeChauffeur(
          donneeChauffeurs.map((c) =>
            c.id === chauffeur.id
              ? {
                  ...c,
                  nomChauffeur: formData.nomChauffeur,
                  numeroChauffeur: formData.numeroChauffeur,
                  photoChauffeur: formData.photoChauffeur
                }
              : c
          )
        );
        chauffeurId = chauffeur.id;
      } else {
        // AJOUT
        const newId =
          donneeChauffeurs.length > 0
            ? Math.max(...donneeChauffeurs.map(c => c.id)) + 1
            : 1;

        setIdChauffeur(newId)
        setDonneeChauffeur([
          ...donneeChauffeurs,
          {
            id: newId,
            nomChauffeur: formData.nomChauffeur,
            numeroChauffeur: formData.numeroChauffeur,
            photoChauffeur: formData.photoChauffeur,
            busId,
          },
        ]);
        chauffeurId = newId;
      }
    }

    /* ---- Bus ---- */
    setDonneeBus(
      donneeBus.map((b) =>
        b.id === busId
          ? {
              ...b,
              marque: formData.marque,
              plaque: formData.plaque,
              capacite: formData.capacite,
              proprietaire: formData.proprietaire,
              versement: formData.versement,
              carburant: formData.carburant,
              idChauffeur: chauffeurId,
              photoBus: formData.photoBus
            }
          : b
      )
    );

    Swal.fire({
      icon: "success",
      title: "Succès",
      text: "Bus modifié avec succès",
    });
  };
  // Affichage
  return (
    <div className="w-full h-full flex justify-center items-center">

      <form
        onSubmit={ handleSubmit }
        className={`w-[70%] p-10 mt-20 shadow-xl space-y-10 duration-500 ${style}`}
      >
        <h2 className="text-4xl font-bold text-center border-b pb-4">
          Modification d’un Bus
        </h2>

        {/* ================= BUS ================= */}
        <section className="space-y-6 duration-500">
          <h3 className="text-2xl font-semibold">Informations du Bus</h3>

          <div className="grid grid-cols-3 gap-6">
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

            <div className="grid grid-cols-2 gap-6">
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

        <button type="submit" className={`w-full p-3 text-xl font-bold rounded-3xl ${theme === 'clair' ? 'bg-base-300' : 'bg-base-800' }`}>
          Modifier le Bus
        </button>
      </form>
    </div>
  );
}
