import { FaUserGraduate } from "react-icons/fa";
import { AiOutlineFacebook } from "react-icons/ai";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { CgMail } from "react-icons/cg";
import { AiOutlineLinkedin } from "react-icons/ai";
import { useTheme } from "../Components/theme";
import Kevin from "../Assets/Kevin.jpg"
export default function Contact()
{
  // Déclaration
  const { theme } = useTheme();
  const style = theme === 'clair' ? 'bg-fond-100 text-black' : 'bg-fond-800 text-white';
  const liens = [
    {
      icon: <AiOutlineLinkedin /> ,
      lien: "https://www.linkedin.com/in/kevin-niavo-39a541286/",
    },
    {
      icon: <CgMail /> ,
      lien: "mailto:niavo.kevin9@gmail.com",
    },
    {
      icon: <FaUserGraduate /> ,
      lien: "https://niavo.netlify.app",
    },
     {
      icon: <AiOutlineWhatsApp /> ,
      lien: "https://wa.me/0389423351",
    },
    {
      icon: <AiOutlineFacebook /> ,
      lien: "https://web.facebook.com/niavo.kevin",
    }
  ]

  //  Affichagge
  return(
    <div className="w-full h-full flex justify-center items-end">
      <div className="w-full lg:h-[91.5vh] h-screen items-center flex justify-center">

        <div className={`w-[95%] lg:w-[30%] h-[70vh] shadow-2xl flex flex-col items-center space-y-3 ${style} `}>
          {/* Imgae */}
          <div className="w-full h-[70%] bg-fond-800 overflow-hidden">
            <img src={Kevin} alt="Image_de_Kevin" className="w-full h-full object-cover" />
          </div>

          {/* Titre */}
          <div className="lg:text-3xl text-2xl mt-4">MAMINIRINA Niavo Kevin</div>
          <div className="lg:text-xl text-lg">Développer fullstack junior</div>

          {/* lien */}
          <div className="w-full h-[10%] flex justify-around items-center">
            {liens.map((lien, index)=>(
              <a href={`${lien.lien}`} key={index} className={`lg:text-5xl text-4xl no-underline hover:scale-110 duration-150 ${theme === "clair" ? 'text-black' : 'text-white' }`}>{lien.icon}</a>
            ))}
          </div>
        </div>



      </div>
    </div>
  )
}