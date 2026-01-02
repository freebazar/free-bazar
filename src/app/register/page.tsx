"use client";

import Link from 'next/link';
import { useActionState } from 'react';
import { registerUser } from '@/app/lib/authActions';
import styles from '../signin/signin.module.css';

export default function Register() {
    const [state, action, isPending] = useActionState(registerUser, null);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Link href="/" className={styles.logo}>
                    Free Bazar
                </Link>
                <div style={{ fontSize: '12px', color: '#666' }}>
                    Join the Global Wholesale Market
                </div>
            </header>

            <main className={styles.main}>
                <div className={styles.loginBox}>
                    <h2 className={styles.formTitle}>Create Account</h2>

                    {state?.error && (
                        <div style={{
                            background: '#fff5f5',
                            color: '#c53030',
                            padding: '12px',
                            borderRadius: '4px',
                            marginBottom: '20px',
                            fontSize: '13px',
                            border: '1px solid #feb2b2'
                        }}>
                            {state.error}
                        </div>
                    )}

                    {state?.success && (
                        <div style={{
                            background: '#f0fff4',
                            color: '#2f855a',
                            padding: '12px',
                            borderRadius: '4px',
                            marginBottom: '20px',
                            fontSize: '13px',
                            border: '1px solid #9ae6b4'
                        }}>
                            {state.success}
                            <div style={{ marginTop: '10px' }}>
                                <Link href="/signin" style={{ fontWeight: 'bold', textDecoration: 'underline' }}>
                                    Click here to sign in
                                </Link>
                            </div>
                        </div>
                    )}

                    {!state?.success && (
                        <form action={action}>
                            <div className={styles.inputGroup}>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="Email address"
                                    required
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="Create Password"
                                    required
                                    minLength={6}
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <input
                                    name="companyName"
                                    type="text"
                                    placeholder="Company Name"
                                    className={styles.input}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isPending}
                                className={styles.submitBtn}
                                style={{
                                    opacity: isPending ? 0.7 : 1,
                                    cursor: isPending ? 'not-allowed' : 'pointer'
                                }}
                            >
                                {isPending ? 'Registering...' : 'Agree and Register'}
                            </button>
                        </form>
                    )}

                    <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '12px' }}>
                        Already have an account? <Link href="/signin" style={{ color: 'var(--primary-color)' }}>Sign In</Link>
                    </div>
                </div>
            </main>

            <footer className={styles.footer}>
                © 1999-2025 Free Bazar. All rights reserved.
            </footer>
        </div>
    );
}
