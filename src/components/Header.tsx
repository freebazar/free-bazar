"use client";

import Link from 'next/link';
import './Header.css';
import { useCart } from '@/lib/CartContext';

const Header = ({ session }: { session: any }) => {
    const { itemCount } = useCart();
    return (
        <header className="header">
            <div className="topBar">
                <div className="container topBarContent">
                    {session?.user ? (
                        <Link href="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <span style={{ fontWeight: 'bold' }}>Hi, {session.user.name}</span>
                        </Link>
                    ) : (
                        <Link href="/signin">Sign In / Register</Link>
                    )}
                    <Link href="/profile" style={{ textDecoration: 'none', color: 'inherit' }}><span>My Orders</span></Link>
                    <span>Help</span>
                </div>
            </div>

            <div className="container mainHeader">
                <Link href="/" className="logo">
                    Free Bazar
                </Link>

                <form action="/search" method="GET" className="searchBar">
                    <input
                        type="text"
                        name="q"
                        placeholder="What are you looking for..."
                        className="searchInput"
                    />
                    <button type="submit" className="searchButton">Search</button>
                </form>

                <div className="actions">
                    {session?.user ? (
                        <Link href="/profile" className="actionItem" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <span>👤</span>
                            <span>My Account</span>
                        </Link>
                    ) : (
                        <Link href="/signin" className="actionItem">
                            <span>👤</span>
                            <span>Sign In</span>
                        </Link>
                    )}
                    <div className="actionItem">
                        <span>💬</span>
                        <span>Messages</span>
                    </div>
                    <Link href="/profile" className="actionItem" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <span>🛒</span>
                        <span>Orders</span>
                    </Link>
                    <Link href="/cart" className="actionItem" style={{ position: 'relative' }}>
                        <span>🛒</span>
                        <span>Cart</span>
                        {itemCount > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: '-8px',
                                right: '0px',
                                background: '#ff6600',
                                color: 'white',
                                borderRadius: '50%',
                                padding: '2px 6px',
                                fontSize: '10px',
                                fontWeight: 'bold'
                            }}>
                                {itemCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>

            <div className="container navBar">
                <ul className="navLinks">
                    <li><Link href="/search" style={{ textDecoration: 'none', color: 'inherit' }}>All Categories</Link></li>
                    <li><Link href="/search?ready=true" style={{ textDecoration: 'none', color: 'inherit' }}>Ready to Ship</Link></li>
                    <li><Link href="/category/Apparel" style={{ textDecoration: 'none', color: 'inherit' }}>Apparel</Link></li>
                    <li><Link href="/category/Consumer%20Electronics" style={{ textDecoration: 'none', color: 'inherit' }}>Electronics</Link></li>
                    <li><Link href="/search?q=Industrial" style={{ textDecoration: 'none', color: 'inherit' }}>Industrial</Link></li>
                    <li>Buyer Central</li>
                    <li><Link href="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>Sell on Free Bazar</Link></li>
                </ul>
            </div>
        </header>
    );
};

export default Header;
