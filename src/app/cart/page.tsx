"use client";

import Link from 'next/link';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from '@/lib/CartContext';

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, totalPrice, itemCount } = useCart();

    return (
        <>
            <Header session={null} />
            <main style={{ minHeight: '80vh', paddingBottom: '50px', backgroundColor: '#f2f3f7' }}>
                <div className="container" style={{ paddingTop: '20px' }}>
                    <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Shopping Cart ({itemCount})</h1>

                    {cart.length === 0 ? (
                        <div style={{ background: '#fff', padding: '50px', textAlign: 'center', borderRadius: '8px' }}>
                            <div style={{ fontSize: '48px', marginBottom: '20px' }}>🛒</div>
                            <h2 style={{ marginBottom: '10px' }}>Your cart is empty</h2>
                            <p style={{ color: '#666', marginBottom: '20px' }}>Looks like you haven't added anything yet.</p>
                            <Link href="/">
                                <button style={{
                                    padding: '10px 30px',
                                    backgroundColor: '#ff6600',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '4px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer'
                                }}>
                                    Start Sourcing
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '20px' }}>
                            {/* Items List */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                {cart.map((item) => (
                                    <div key={item.id} style={{
                                        background: '#fff',
                                        padding: '20px',
                                        borderRadius: '8px',
                                        display: 'flex',
                                        gap: '20px',
                                        alignItems: 'center'
                                    }}>
                                        <img src={item.image} alt={item.title} style={{ width: '100px', height: '100px', objectFit: 'contain' }} />

                                        <div style={{ flex: 1 }}>
                                            <h3 style={{ fontSize: '16px', marginBottom: '5px' }}>{item.title}</h3>
                                            <p style={{ fontSize: '12px', color: '#666', marginBottom: '10px' }}>Supplier: {item.supplierName}</p>
                                            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#ff6600' }}>{item.price}</div>
                                        </div>

                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                style={{ width: '30px', height: '30px', border: '1px solid #ccc', background: '#fff' }}
                                            >-</button>
                                            <span>{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                style={{ width: '30px', height: '30px', border: '1px solid #ccc', background: '#fff' }}
                                            >+</button>
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            style={{ color: '#999', background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' }}
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Summary Box */}
                            <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', height: 'fit-content', position: 'sticky', top: '20px' }}>
                                <h2 style={{ fontSize: '18px', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Order Summary</h2>

                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <span>Items ({itemCount})</span>
                                    <span>${totalPrice.toFixed(2)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <span>Shipping</span>
                                    <span>Calculated later</span>
                                </div>

                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginTop: '20px',
                                    paddingTop: '20px',
                                    borderTop: '1px solid #eee',
                                    fontWeight: 'bold',
                                    fontSize: '18px'
                                }}>
                                    <span>Total</span>
                                    <span style={{ color: '#ff6600' }}>${totalPrice.toFixed(2)}</span>
                                </div>

                                <Link href="/checkout">
                                    <button style={{
                                        width: '100%',
                                        marginTop: '20px',
                                        padding: '15px',
                                        backgroundColor: '#ff6600',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '4px',
                                        fontWeight: 'bold',
                                        fontSize: '16px',
                                        cursor: 'pointer'
                                    }}>
                                        Checkout
                                    </button>
                                </Link>

                                <p style={{ fontSize: '11px', color: '#999', marginTop: '15px', textAlign: 'center' }}>
                                    By proceeding to checkout, you agree to our Terms of Service.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}
