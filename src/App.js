import React, {useState, useEffect} from "react";
import "./App.css";
import Header from "./components/Header.js";
import PrimarySearchAppBar from "./components/Nav.js";
import Aside from "./components/Aside.js";
import Content from "./components/Content.js";
import ProductContext from "./components/ProductContext";
import FilterContext from "./components/FilterContext";

function App() {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
    const [filter, setFilter] = useState([]);
    return (

        <ProductContext.Provider value={{cart, setCart}}>
            <FilterContext.Provider value={{filter, setFilter}}>
                    <div id="container" className="container">
                        <header id="main_header" className="header">
                            <Header/>
                        </header>
                        <nav id="main_nav" className="nav">
                            <PrimarySearchAppBar/>
                        </nav>
                        <div className="main">
                            <aside id="aside_left" className="aside">
                                <Aside/>
                            </aside>
                            <section id="content_wrapp" className="content_wrapp">
                                <Content/>
                            </section>
                        </div>
                        <footer id="main_footer" className="footer">

                        </footer>
                    </div>
            </FilterContext.Provider>
        </ProductContext.Provider>
    );
}

export default App;