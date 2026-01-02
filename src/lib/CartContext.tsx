"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
    id: string;
    title: string;
    price: string;
    image: string;
    quantity: number;
    supplierName: string;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    itemCount: number;
    totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    // Load from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart from localStorage", e);
            }
        }
    }, []);

    // Save to localStorage when cart changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (newItem: CartItem) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === newItem.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === newItem.id
                        ? { ...item, quantity: item.quantity + newItem.quantity }
                        : item
                );
            }
            return [...prevCart, newItem];
        });
    };

    const removeFromCart = (id: string) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id));
    };

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity < 1) return;
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

    const totalPrice = cart.reduce((total, item) => {
        // Simple price parsing: "$10.00 - $15.00" -> use min price
        const priceStr = item.price.split('-')[0].replace(/[^0-9.]/g, '');
        const priceNum = parseFloat(priceStr) || 0;
        return total + (priceNum * item.quantity);
    }, 0);

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            itemCount,
            totalPrice
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
