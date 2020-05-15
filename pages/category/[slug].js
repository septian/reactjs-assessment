import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks';
import { withApollo } from '../../lib/apollo';
import Link from 'next/link';

const CATEGORY_QUERY = gql`
query getCategoryById($id: String!) {
    categoryList(filters: { ids: { eq: $id } }) {
        id
        name
        image_path
        description
        products {
            items {
                id
                name
                url_key
                description {
                    html
                }
                small_image {
                    url
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
}
`;

const Category = () => {
    const router = useRouter();
    const { slug } = router.query;
    const pageConfig = {
    title: "Category Page.."
    }
    const {loading, data} = useQuery(CATEGORY_QUERY, {variables: {id: slug}});

    if (loading) {
        return <div>loading...</div>
    }

    const categories = data.categoryList[0];
    const products = data.categoryList[0].products.items;
    
    return (
    <Layout pageConfig={pageConfig}>
        <div>
            <h1>{categories.name}</h1>
            <img width="500" src={categories.image_path} />
            <p>{categories.description}</p>
            <ul>
                {products.map((product) => (
                    <li>
                        <p><img width="500" src={product.small_image.url} /></p>
                        <Link href="/product/[...slug]" as={`/product/${product.url_key}`}>
                            <a>{product.name}</a>
                        </Link>
                        <p>
                            <span>{product.price_range.minimum_price.regular_price.currency}</span>&nbsp;
                            <span>{product.price_range.minimum_price.regular_price.value}</span>
                        </p>
                    </li>
                ))}
            </ul>
        </div>    
    </Layout>
    )
}

export default (withApollo)(Category);
