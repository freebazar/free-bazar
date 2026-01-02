"use client";

import React, { useState } from 'react';
import AddToCart from './AddToCart';
import InquiryModal from './InquiryModal';

interface ProductActionsProps {
    product: {
        id: string;
        title: string;
        price: string;
        images: string;
        supplierId: string;
        supplierName: string;
    };
}

export default function ProductActions({ product }: ProductActionsProps) {
    const [showInquiryModal, setShowInquiryModal] = useState(false);

    return (
        <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
            <div style={{ flex: 1 }}>
                <AddToCart product={{
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    images: product.images,
                    supplierName: product.supplierName
                }} />
            </div>
            <style jsx>{`
                .contact-btn {
                    flex: 1;
                    padding: 12px 20px;
                    border: 1px solid #FF6600;
                    color: #FF6600;
                    background: #fff;
                    borderRadius: 4px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .contact-btn:hover {
                    background: #fff9f5;
                    box-shadow: 0 2px 8px rgba(255,102,0,0.1);
                }
            `}</style>
            <button
                onClick={() => setShowInquiryModal(true)}
                className="contact-btn"
            >
                Contact Supplier
            </button>

            {showInquiryModal && (
                <InquiryModal
                    productId={product.id}
                    productTitle={product.title}
                    supplierId={product.supplierId}
                    supplierName={product.supplierName}
                    onClose={() => setShowInquiryModal(false)}
                />
            )}
        </div>
    );
}
