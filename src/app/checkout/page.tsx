"use client";

import { useState } from 'react';
import Link from 'next/link';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from '@/lib/CartContext';

export default function CheckoutPage() {
    const { cart, totalPrice, itemCount, clearCart } = useCart();
    const [isOrdered, setIsOrdered] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        address: '',
        city: '',
        country: 'China',
        paymentMethod: 'Trade Assurance'
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePlaceOrder = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate order processing
        setTimeout(() => {
            setIsOrdered(true);
            clearCart();
        }, 1000);
    };

    if (isOrdered) {
        return (
            <>
                <Header session={null} />
                <main style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f2f3f7' }}>
                    <div style={{ background: '#fff', padding: '50px', borderRadius: '8px', textAlign: 'center', maxWidth: '500px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                        <div style={{ fontSize: '64px', color: '#4CAF50', marginBottom: '20px' }}>✅</div>
                        <h1 style={{ fontSize: '28px', marginBottom: '10px' }}>Order Placed!</h1>
                        <p style={{ color: '#666', marginBottom: '30px' }}>
                            Thank you for your order. Your transaction is protected by <span style={{ color: '#007aff', fontWeight: 'bold' }}>Trade Assurance</span>.
                        </p>
                        <Link href="/">
                            <button style={{
                                padding: '12px 40px',
                                backgroundColor: '#ff6600',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '4px',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                            }}>
                                Continue Sourcing
                            </button>
                        </Link>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    if (cart.length === 0) {
        return (
            <>
                <Header session={null} />
                <main style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ textAlign: 'center' }}>
                        <h2>Your cart is empty</h2>
                        <Link href="/">Go back to shopping</Link>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header session={null} />
            <main style={{ minHeight: '80vh', padding: '40px 0', backgroundColor: '#f2f3f7' }}>
                <div className="container">
                    <h1 style={{ fontSize: '24px', marginBottom: '30px' }}>Checkout</h1>

                    <form onSubmit={handlePlaceOrder} style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '30px' }}>
                        {/* Shipping Info */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{ background: '#fff', padding: '30px', borderRadius: '8px', border: '1px solid #e2e2e2' }}>
                                <h2 style={{ fontSize: '18px', marginBottom: '20px' }}>Shipping Information</h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px', color: '#666' }}>Full Name</label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            required
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px', color: '#666' }}>Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px', color: '#666' }}>Address</label>
                                        <input
                                            type="text"
                                            name="address"
                                            required
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                                        />
                                    </div>
                                    <div style={{ display: 'flex', gap: '15px' }}>
                                        <div style={{ flex: 1 }}>
                                            <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px', color: '#666' }}>City</label>
                                            <input
                                                type="text"
                                                name="city"
                                                required
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                                            />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px', color: '#666' }}>Country</label>
                                            <select
                                                name="country"
                                                value={formData.country}
                                                onChange={handleInputChange}
                                                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                                            >
                                                <option>China</option>
                                                <option>United States</option>
                                                <option>India</option>
                                                <option>Germany</option>
                                                <option>United Kingdom</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ background: '#fff', padding: '30px', borderRadius: '8px', border: '1px solid #e2e2e2' }}>
                                <h2 style={{ fontSize: '18px', marginBottom: '20px' }}>Payment Method</h2>
                                <div style={{ display: 'flex', gap: '20px' }}>
                                    <label style={{
                                        flex: 1,
                                        padding: '15px',
                                        border: '2px solid #ff6600',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px'
                                    }}>
                                        <input type="radio" checked readOnly />
                                        <span>Trade Assurance</span>
                                    </label>
                                    <label style={{
                                        flex: 1,
                                        padding: '15px',
                                        border: '1px solid #eee',
                                        borderRadius: '8px',
                                        color: '#999',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px'
                                    }}>
                                        <input type="radio" disabled />
                                        <span>Credit Card</span>
                                    </label>
                                </div>
                                <p style={{ fontSize: '12px', color: '#666', marginTop: '15px' }}>
                                    Trade Assurance protects your online orders when payment is made through Free Bazar.
                                </p>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{ background: '#fff', padding: '25px', borderRadius: '8px', border: '1px solid #e2e2e2', position: 'sticky', top: '20px' }}>
                                <h2 style={{ fontSize: '18px', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Order Summary</h2>

                                <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '20px' }}>
                                    {cart.map(item => (
                                        <div key={item.id} style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                                            <img src={item.image} alt={item.title} style={{ width: '50px', height: '50px', objectFit: 'contain', border: '1px solid #eee' }} />
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontSize: '13px', fontWeight: '500', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.title}</div>
                                                <div style={{ fontSize: '12px', color: '#666' }}>Qty: {item.quantity} × {item.price.split('-')[0]}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '14px' }}>
                                    <span>Subtotal ({itemCount} items)</span>
                                    <span>${totalPrice.toFixed(2)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '14px' }}>
                                    <span>Shipping Fee</span>
                                    <span style={{ color: '#4CAF50' }}>FREE</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #eee', fontWeight: 'bold', fontSize: '20px' }}>
                                    <span>Total</span>
                                    <span style={{ color: '#ff6600' }}>${totalPrice.toFixed(2)}</span>
                                </div>

                                <button type="submit" style={{
                                    width: '100%',
                                    marginTop: '25px',
                                    padding: '15px',
                                    backgroundColor: '#ff6600',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '4px',
                                    fontWeight: 'bold',
                                    fontSize: '16px',
                                    cursor: 'pointer'
                                }}>
                                    Place Order
                                </button>

                                <div style={{ marginTop: '15px', display: 'flex', alignItems: 'center', gap: '5px', justifyContent: 'center' }}>
                                    <span style={{ fontSize: '14px' }}>🔒</span>
                                    <span style={{ fontSize: '11px', color: '#666' }}>Secure Transaction</span>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </>
    );
}
