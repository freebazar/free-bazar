"use client";

import React, { useState } from 'react';
import { submitInquiry } from '@/app/lib/inquiryActions';

interface InquiryModalProps {
    productId: string;
    productTitle: string;
    supplierId: string;
    supplierName: string;
    onClose: () => void;
}

export default function InquiryModal({ productId, productTitle, supplierId, supplierName, onClose }: InquiryModalProps) {
    const [status, setStatus] = useState<{ success?: string; error?: string } | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        setStatus(null);

        const formData = new FormData(event.currentTarget);
        const result = await submitInquiry(formData);

        setLoading(false);
        if (result.success) {
            setStatus({ success: result.success });
            setTimeout(() => onClose(), 2000);
        } else {
            setStatus({ error: result.error });
        }
    }

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        }}>
            <div style={{
                background: '#fff',
                width: '100%',
                maxWidth: '500px',
                borderRadius: '8px',
                padding: '30px',
                position: 'relative',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
            }}>
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '15px',
                        right: '15px',
                        border: 'none',
                        background: 'none',
                        fontSize: '20px',
                        cursor: 'pointer',
                        color: '#999'
                    }}
                >
                    ✕
                </button>

                <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>Contact {supplierName}</h2>
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>
                    Inquiry about: <span style={{ fontWeight: 'bold', color: '#333' }}>{productTitle}</span>
                </p>

                {status?.success && (
                    <div style={{ background: '#e6fffa', color: '#2c7a7b', padding: '15px', borderRadius: '4px', marginBottom: '20px', fontSize: '14px' }}>
                        {status.success}
                    </div>
                )}

                {status?.error && (
                    <div style={{ background: '#fff5f5', color: '#c53030', padding: '15px', borderRadius: '4px', marginBottom: '20px', fontSize: '14px' }}>
                        {status.error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <input type="hidden" name="productId" value={productId} />
                    <input type="hidden" name="receiverId" value={supplierId} />

                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px', fontWeight: 'bold' }}>Subject</label>
                        <input
                            name="subject"
                            type="text"
                            defaultValue={`Inquiry about ${productTitle}`}
                            required
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px', fontWeight: 'bold' }}>Message</label>
                        <textarea
                            name="message"
                            rows={5}
                            placeholder="Write your message here... (e.g., pricing, shipping terms, customization)"
                            required
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', resize: 'vertical' }}
                        ></textarea>
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                            type="button"
                            onClick={onClose}
                            style={{ flex: 1, padding: '12px', background: '#f5f5f5', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer' }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                flex: 2,
                                padding: '12px',
                                background: loading ? '#ccc' : '#FF6600',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '4px',
                                fontWeight: 'bold',
                                cursor: loading ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {loading ? 'Sending...' : 'Send Inquiry'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
