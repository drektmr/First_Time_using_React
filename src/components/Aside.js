import React, {useState, useEffect, cloneElement, useContext} from "react";
import {fetchData} from '../helpers/fetch.js';
import FilterContext from "./FilterContext";


function Aside() {

    const {filter, setFilter} = useContext(FilterContext);
    const [data, setData] = useState([]);
    const getData = () =>{
        fetchData("http://localhost/bbdd/p3filtres.php")
            .then(function (myJson) {
                setData(myJson);
            });
    }
    useEffect(() => {
        getData();
    }, []);
    return (
        <div>
            {

                data && Object.entries(data).map((element, i) => {
                    return (
                        <div className="filter" key={i}>
                            <div className="title">
                                <h3 key={element[0]}>{element[0]}</h3>
                            </div>
                            <div className="body">
                            {
                                element[1].map(item => {
                                    return (
                                        Object.entries(item).map((value, i) => {
                                            if (i % 2)
                                                return <div key={i}>
                                                    <input
                                                        type="checkbox"
                                                        key={value[1]}
                                                        name={element[0]}
                                                        value={value[1]}
                                                        onChange={function handleOnchange(){
                                                            let item = []; // array d'items de cada categoria
                                                            let sel = {};  // objecte on es desarà {'nomCategoria' : [Array d'items]}
                                                            const product = document.querySelectorAll("input[type='checkbox']:checked");
                                                            // [...product] canvia HTMLCollection o NodeList a Array
                                                            [...product].forEach((element) => {
                                                                let name = element.getAttribute("name");
                                                                let value = element.getAttribute("value");

                                                                if(!(name in sel)){
                                                                    item=[];
                                                                }
                                                                item.push(value);
                                                                sel[name]=item;
                                                            });
                                                            setFilter(sel);
                                                            // S'afegeix sel al context
                                                        }
                                                        }
                                                    />
                                                    <label key={`${value[1]}-${i}`} htmlFor={value[1]}>{value[1]}</label>
                                                </div>
                                        })
                                    )
                                })
                            }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default Aside;