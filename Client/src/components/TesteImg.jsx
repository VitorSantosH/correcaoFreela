import React from "react";
import { useState } from "react";
import api from "../services/api";

const Teste = () => {

    const [imgSrc, setImg] = useState('')

    api.get('/api/rippbank')
    .then(res => {
        setImg(res.data[0].scSelectedFile)
        console.log(res)
    })


    return (
        <div>
            <img src={`${imgSrc}`} alt="fale" />
        </div>
    )

}


export default Teste;