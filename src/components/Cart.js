// Importar el context
import ProductContext from './ProductContext';
import {useContext} from "react";
function Cart() {
    // Carregar el context

    // Calcular l'import total
    // Es pot utilitzar Array.reduce()
   const {cart, setCart} = useContext(ProductContext);
   const totalPrice=cart.reduce((total, product) =>{
       return total+=parseFloat(product.preu)*product.qty;
    },0).toFixed(2);
    return (
        <table key="cartProducts" className="blueTable" id="cart">
            <thead>
            <tr key="headers">
                <th>Ref.</th>
                <th>Imatge</th>
                <th>Descripció</th>
                <th>Quantitat</th>
                <th>Preu</th>
                <th>Import</th>
            </tr>
            </thead>
            <tbody>
            {cart && cart.length > 0 && cart.map((product) => (
                <tr key={product.pid}>
                    <td>{product.pid}</td>
                    <td><img src={"pccomp/" + product.imatge} style={{ width: 50 }} /></td>
                    <td>{product.marca} {product.model}</td>

                    <td>
                    <input name={product.marca} id={product.pid} type="number" min="0" value={product.qty} onChange={(e) => {
                       setCart([...cart], product.qty = e.target.value);
                       setCart(cart.filter(product=>product.qty>0))
                    }}/>
                    </td>
                    <td>{product.preu}€</td>
                    <td>{(product.preu * product.qty).toFixed(2)}€</td>
                </tr>
            ))}
            </tbody>
            <tfoot>
            <tr key="totalPrice">
                <td>
                    <b>Total</b>
                </td>
                <td>
                    {totalPrice}
                </td>
            </tr>
            </tfoot>
        </table>
    );
}
export default Cart;