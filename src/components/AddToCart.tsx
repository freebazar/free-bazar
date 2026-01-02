"use client";

import { useState } from 'react';
import { useCart, CartItem } from '@/lib/CartContext';

interface AddToCartProps {
    product: {
        id: string;
        title: string;
        price: string;
        images: string;
        supplierName: string;
    };
}

export default function AddToCart({ product }: AddToCartProps) {
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);

    const handleAddToCart = () => {
        let imageUrl = "";
        try {
            imageUrl = JSON.parse(product.images)[0];
        } catch (e) {
            imageUrl = product.images;
        }

        const item: CartItem = {
            id: product.id,
            title: product.title,
            price: product.price,
            image: imageUrl,
            quantity: 1,
            supplierName: product.supplierName
        };

        addToCart(item);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button
                onClick={handleAddToCart}
                className="contactBtn"
                style={{ flex: 1, backgroundColor: added ? '#4CAF50' : '#ff6600' }}
            >
                {added ? 'Added to Cart!' : 'Add to Cart'}
            </button>
            <button className="inquiryBtn" style={{ flex: 1 }}>
                Contact Supplier
            </button>
        </div>
    );
}
