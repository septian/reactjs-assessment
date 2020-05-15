import Link from 'next/link';


const Navigation = () => {
    return (
        <div>
            <Link href="/">
                <a>Home</a>
            </Link>
            &nbsp;|&nbsp;
            <Link href="/about">
                <a>About</a>
            </Link>
            &nbsp;|&nbsp;
            <Link href="/cart">
                <a>Cart</a>
            </Link>
        </div>
    );
};

export default Navigation;
