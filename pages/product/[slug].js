import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks';
import { withApollo } from '../../lib/apollo';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { compose } from 'redux';
import { withRedux } from '../../lib/redux';
import { addToCart } from '../../redux/actionCart';

const PRODUCT_QUERY = gql`
query getProduct($urlKey: String!) {
    products(filter: { url_key: { eq: $urlKey } }) {
        items {
            name
            sku
            stock_status
            description {
                html
            }
            image {
                url
                label
            }
            price_range {
                minimum_price {
                    regular_price {
                        currency
                        value
                    }
                    final_price {
                        currency
                        value
                    }
                }
            }
        }
    }
}
`;

const Product = () => {
    const router = useRouter();
    const { slug } = router.query;

    const [qty, setQty] = useState();
    const dispatch = useDispatch();

    const { loading, data } = useQuery(PRODUCT_QUERY, {variables: {urlKey: slug}})

    if (loading) {
        return <div>loading...</div>
    }

    const product = data.products.items[0];

    const pageConfig = {
    title: "Product Page.."
    }

    const handleChangeQty = (event) => {
        setQty(event.target.value);
    }

    const handleAddToCart = (event) => {
        event.preventDefault();
        
        const item = {
            sku: product.sku,
            name: product.name,
            image: product.image.url,
            price: product.price_range.minimum_price.regular_price.value,
            qty: qty
        };
        dispatch( addToCart(item) );
    }

    return (
    <Layout pageConfig={pageConfig}>
        <p><img width="500" src={product.image.url} /></p>
        <p>{product.name}</p>
        <p>
            <span>{product.price_range.minimum_price.regular_price.currency}</span>&nbsp;
            <span>{product.price_range.minimum_price.regular_price.value}</span>
        </p>

        <form className="product-action" onSubmit={handleAddToCart}>
            <p>
                <span>Qty</span>&nbsp;
                <input
                    type="text"
                    name="qty"
                    onChange={handleChangeQty}
                />
            </p>
            <button type="submit">Add to Cart</button>
        </form>
        <p>{product.description.html}</p>
    </Layout>
    )
}

export default compose(withRedux,withApollo)(Product);