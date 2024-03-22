import React, { createContext, useState, useEffect } from "react";

import { buscar_usuario_Email } from "../data/Apis";

export const AuthContext = createContext({})

//const [useData, setUserData] = useState(useData)

const AuthProvider = ({ children }) => {

    const [test, setTest] = useState('') // email
    const [conjunto, setConjuto] = useState({}) // dados completos
    const [days, setDays] = useState(0) // dias
    const [total, setTotal] = useState(0) // total que sobra
    const [signed, setSigned] = useState(false)
    const [dataformatada, setDataformatada] = useState('xx-xx-xx')

    
    const handleApi = () => {
        try {
          buscar_usuario_Email(test).then((r) => {
            console.log(r)
            setConjuto(r)
          })
        } catch (error) {
          console.error('Erro ao chamar a API:', error);
        }
    };

    const [count, setCount] = useState(0);

    const incrementCount = () => {
        setCount(prevCount => prevCount + 1);
    };


    return (
        <AuthContext.Provider value={
            {
                setTest, 
                count, 
                incrementCount, 
                handleApi, 
                conjunto,
                setConjuto, 
                test, 
                setSigned,
                signed,
                days,
                setDataformatada,
                dataformatada,
                total,
                setDays, 
                setTotal
            }
        }>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider


