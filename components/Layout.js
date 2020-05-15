import Head from 'next/head';
import Navigation from './Navigation';

const Layout = ({children, pageConfig}) => {
    const {title} = pageConfig;
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <header>
                <Navigation />
            </header>
            <div className="content">
                {children}
            </div>
            <footer>
                &copy; 2020
            </footer>
        </>
    );
};


export default Layout;
