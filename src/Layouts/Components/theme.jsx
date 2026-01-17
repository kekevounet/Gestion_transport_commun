import { createContext, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useDonnee } from "./Donnee";

const ThemeContext = createContext();

export function ThemeProvider({ children })
{
  const [ theme, setTheme ] = useState(()=>
  {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? JSON.parse(savedTheme) : []
  });
  const { parametre } = useDonnee();
  const toggleTheme = () =>
  {
    setTheme(theme === 'clair' ? 'sombre' : 'clair' );
    Swal.fire({
      title: `${parametre.titre}`,
      text:`Thème ${theme === 'clair' ? 'sombre' : 'clair'} activé.`,
      icon:'success',
    })
  };

  useEffect(()=>
  {
    localStorage.setItem('theme', JSON.stringify(theme))
  }, [theme]);

  return(
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      { children }
    </ThemeContext.Provider>
  )
}

export function useTheme()
{
  return useContext(ThemeContext);
}