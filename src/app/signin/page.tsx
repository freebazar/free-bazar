"use client";

import Link from 'next/link';
import { useActionState } from 'react';
import { authenticate } from '@/app/actions';
import styles from './signin.module.css';

export default function SignIn() {
    const [errorMessage, dispatch, isPending] = useActionState(authenticate, undefined);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Link href="/" className={styles.logo}>
                    Free Bazar
                </Link>
                <div style={{ fontSize: '12px', color: '#666' }}>
                    Global Leader in E-Commerce
                </div>
            </header>

            <main className={styles.main}>
                <div className={styles.loginBox}>
                    <h2 className={styles.formTitle}>Sign in</h2>

                    {errorMessage && (
                        <div style={{
                            background: '#fff5f5',
                            color: '#c53030',
                            padding: '12px',
                            borderRadius: '4px',
                            marginBottom: '20px',
                            fontSize: '13px',
                            border: '1px solid #feb2b2'
                        }}>
                            {errorMessage}
                        </div>
                    )}

                    <form action={dispatch}>
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
                                placeholder="Password"
                                required
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
                            {isPending ? 'Signing in...' : 'Sign In'}
                        </button>
                        <div style={{ marginTop: '10px', fontSize: '12px', display: 'flex', justifyContent: 'space-between' }}>
                            <a href="#">Forgot Password?</a>
                            <a href="#">Mobile Number Sign In</a>
                        </div>
                    </form>

                    <div className={styles.divider}>
                        <span>OR</span>
                    </div>

                    <div className={styles.socialLogin}>
                        <span>🔵</span>
                        <span>🔴</span>
                        <span>💼</span>
                    </div>

                    <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '12px' }}>
                        Don't have an account? <Link href="/register" style={{ color: 'var(--primary-color)' }}>Register</Link>
                    </div>
                </div>
            </main>

            <footer className={styles.footer}>
                © 1999-2025 Free Bazar. All rights reserved.
            </footer>
        </div>
    );
}
