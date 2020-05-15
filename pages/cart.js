import Layout from '../components/Layout';
import { useSelector } from "react-redux";
import { withRedux } from '../lib/redux';

const cart = () => {
    const pageConfig = {
        title: "Cart.."
    }
    const cart = useSelector(state => state.reducerCart);
    console.log(cart);
    return (
        <Layout pageConfig={pageConfig}>
            <h1>Cart</h1>
            <p>Cart Content</p>
            <ul>
                {cart.map((carts) => (
                    <li>
                        <p><img width="500" src={carts.image} /></p>
                        <p>{carts.name}</p>
                        <p>
                            <span>{carts.price}</span>
                        </p>
                    </li>
                ))}
            </ul>
        </Layout>
    );
}

export default (withRedux)(cart);
