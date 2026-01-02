"use client";

import React from 'react';

interface Review {
    id: string;
    rating: number;
    comment: string;
    user: {
        name: string;
        image?: string;
    };
    createdAt: string | Date;
}

export default function ReviewList({ reviews }: { reviews: Review[] }) {
    return (
        <div style={{ marginTop: '40px', borderTop: '1px solid #eee', paddingTop: '30px' }}>
            <h3 style={{ fontSize: '20px', marginBottom: '20px' }}>Customer Reviews ({reviews.length})</h3>

            {reviews.length === 0 ? (
                <p style={{ color: '#666' }}>No reviews yet for this product.</p>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                    {reviews.map((review) => (
                        <div key={review.id} style={{ borderBottom: '1px solid #f9f9f9', paddingBottom: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                                <div style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    background: '#f0f0f0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '14px'
                                }}>
                                    {review.user.image ? <img src={review.user.image} alt="" /> : "👤"}
                                </div>
                                <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{review.user.name}</span>
                                <span style={{ color: '#999', fontSize: '12px' }}>
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </span>
                            </div>

                            <div style={{ color: '#FF6600', marginBottom: '8px' }}>
                                {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                            </div>

                            <p style={{ fontSize: '14px', lineHeight: '1.5', color: '#333' }}>
                                {review.comment}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
