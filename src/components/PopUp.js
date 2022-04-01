import * as React from 'react';
import Box from '@mui/material/Box';
import Cart from './Cart.js';
import Modal from '@mui/material/Modal';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {useContext} from "react";
import ProductContext from "./ProductContext";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function BasicModal() {
    const {cart, setCart} = useContext(ProductContext);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    function clearCart(){
        setCart([]);
        handleClose();
    }
    function openCart(){
        if(cart.length!==0){
            handleOpen();

        }
    }
    return (
        <div key="divmodal">
            <ShoppingCartIcon onClick={openCart}/>
            <Modal
                open={cart.length===0 ? false : open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Cart/>
                    <button key="buyingButton" onClick={handleClose}>Seguir comprando</button>
                    <button key="clearCart" onClick={clearCart}>Vaciar carrito</button>
                    <div style={{width: "35%", float:"right"}}>
                        <PayPalScriptProvider options={{ "client-id": "test" }}>
                            <PayPalButtons style={{ layout: "horizontal", shape:"rect",color: "blue", tagline:false}}/>
                        </PayPalScriptProvider>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}