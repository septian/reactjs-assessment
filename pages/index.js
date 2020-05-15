import Layout from '../components/Layout';
import gql from 'graphql-tag'
import { withApollo } from '../lib/apollo';
import { useQuery } from '@apollo/react-hooks';
import Link from 'next/link';

const CATEGORY_QUERY = gql`
{
  categoryList {
    id
    name
    url_key
    url_path
    children {
      id
      name
      url_key
      url_path
      children {
        id
        name
        url_key
        url_path
      }
    }
  }
}
`;

const IndexPage = () => {
  const pageConfig = {
    title: "Homepage.."
  }

  const {loading, data} = useQuery(CATEGORY_QUERY);

  if (loading) {
    return <div>loading...</div>
  }

  const categories = data.categoryList[0].children;

  return (
    <Layout pageConfig={pageConfig}>
      <h1>Homepage</h1>
      <ul>
        {categories.map((cat1) => (
            <li key={cat1.name}>
              <Link href="category/[...slug]" as={`category/${cat1.id}`}>
                <a>{cat1.name}</a>
              </Link>
              <ul>
                {cat1.children.map((cat2) => (
                  <li>
                    <Link href="category/[...slug]" as={`category/${cat2.id}`}>
                      <a>{cat2.name}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
        ))}
      </ul>
    </Layout>
  )
}

export default (withApollo)(IndexPage);
