import React, { useState, useEffect, useContext } from "react";
import ProductContext from './ProductContext';
import {fetchData} from "../helpers/fetch";
import Stack from '@mui/material/Stack';
import FilterContext from "./FilterContext";

function Content() {
    const {cart, setCart} = useContext(ProductContext);
    const {filter, setFilter} = useContext(FilterContext);
    const [data, setData] = useState([]);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    const getData = () =>{
        fetchData("http://localhost/bbdd/p3cataleg2.php",

            {
            method: "POST",
            body: JSON.stringify(filter),

        })
            .then(function (myJson) {
                setData(myJson);
            });
    }
    useEffect(() => {
        getData();
    }, [filter]);
    return (

        <div className="App">
            {data &&
                data.length > 0 &&
                data.map((item) => (
                        <article key={item.pid} className="product">
                            <div className="title">
                                <h1>{item.marca}</h1>
                                <h3>{item.model}</h3>
                            </div>
                            <img src={"pccomp/" + item.imatge} style={{ width: 350 }} />
                            <p>
                                Veure detalls
                            </p>
                            <p>
                                <b>Preu: {item.preu}€</b>
                            </p>
                            <Stack spacing={2} direction="row">
                                <button onClick={() => {

                                    if(cart.every((current)=>current.pid !== item.pid)){
                                        item.qty=1;
                                        setCart([...cart, item]);
                                    }
                                }}>Comprar</button>
                            </Stack>
                        </article>
                ))}
            ,
        </div>
    );
}

export default Content;