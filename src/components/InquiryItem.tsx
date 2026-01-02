"use client";

import React, { useState } from 'react';
import { markInquiryAsRead } from '@/app/lib/dashboardActions';

interface InquiryItemProps {
    inquiry: any;
    idx: number;
}

export default function InquiryItem({ inquiry, idx }: InquiryItemProps) {
    const [isRead, setIsRead] = useState(inquiry.status === 'READ');
    const [loading, setLoading] = useState(false);

    async function handleMarkRead() {
        if (isRead) return;
        setLoading(true);
        const result = await markInquiryAsRead(inquiry.id);
        setLoading(false);
        if (result.success) {
            setIsRead(true);
        }
    }

    return (
        <div key={inquiry.id} style={{
            padding: '20px 0',
            borderTop: idx === 0 ? 'none' : '1px solid #eee',
            display: 'flex',
            gap: '20px',
            opacity: isRead ? 0.7 : 1
        }}>
            <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
            }}>
                👤
            </div>
            <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '15px' }}>{inquiry.sender?.name || 'Anonymous Buyer'}</span>
                    <span style={{ fontSize: '11px', color: '#999' }}>{new Date(inquiry.createdAt).toLocaleString()}</span>
                </div>
                <div style={{ fontSize: '14px', fontWeight: '500', color: '#FF6600', marginBottom: '8px' }}>
                    {inquiry.subject}
                </div>
                <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.5', margin: 0 }}>
                    {inquiry.message}
                </p>
                <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                    <button style={{ padding: '6px 12px', background: '#007aff', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '12px', cursor: 'pointer' }}>Reply</button>
                    {!isRead && (
                        <button
                            onClick={handleMarkRead}
                            disabled={loading}
                            style={{ padding: '6px 12px', background: '#fff', border: '1px solid #ccc', color: '#333', borderRadius: '4px', fontSize: '12px', cursor: 'pointer' }}
                        >
                            {loading ? '...' : 'Mark as Read'}
                        </button>
                    )}
                </div>
            </div>
            <div style={{ textAlign: 'right', minWidth: '100px' }}>
                {!isRead && (
                    <span style={{ fontSize: '10px', background: '#FF6600', color: '#fff', padding: '2px 6px', borderRadius: '10px', fontWeight: 'bold' }}>NEW</span>
                )}
            </div>
        </div>
    );
}
