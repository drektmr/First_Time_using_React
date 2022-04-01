import { createContext } from "react";
// Crear el context que s'importarà en els diferents components
// S'inicialitza a null
const VisibleContext = createContext(false);

export default VisibleContext;