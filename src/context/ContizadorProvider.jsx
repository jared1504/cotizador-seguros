import { createContext, useState } from 'react'
import { calcularMarca, calcularPlan, formatearDinero, obtenerDiferenciaYear } from '../helpers'

const ContizadorContex = createContext()
const CotizadorProvider = ({ children }) => {
    const [datos, setDatos] = useState({
        marca: '',
        year: '',
        plan: ''
    })
    const [error, setError] = useState('')
    const [resultado, setResultado] = useState(0)
    const [cargando, setCargando] = useState(false)

    const handleChangeDatos = e => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        })
    }
    const cotizarSeguro = () => {
        //Una base
        let resultado = 2000

        //Obtener diferencia de años
        const diferencia = obtenerDiferenciaYear(datos.year)

        //Hay que restar el 3% por cada año
        resultado -= (resultado * diferencia * 0.03);

        /**
         * Modelos
         * Americano -> 15%
         * Europeo -> 30%
         * Asiatico -> 5%
         */
        resultado *= calcularMarca(datos.marca)

        /**
         * Planes
         * Basico -> 20%
         * Completo -> 50%
         */
        resultado *= calcularPlan(datos.plan)
        //Formatear
        resultado = formatearDinero(resultado)
        setCargando(true)
        setTimeout(() => {
            setResultado(resultado)
            setCargando(false)
        }, 3000);

    }

    return (
        <ContizadorContex.Provider
            value={{
                datos,
                handleChangeDatos,
                error,
                setError,
                cotizarSeguro,
                resultado, 
                cargando
            }}
        >
            {children}
        </ContizadorContex.Provider>
    )
}

export {
    CotizadorProvider
}

export default ContizadorContex