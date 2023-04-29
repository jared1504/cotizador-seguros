import { useContext } from "react";
import ContizadorContex from "../context/ContizadorProvider";

const useCotizador = () => {
    return useContext(ContizadorContex)
}

export default useCotizador
