import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from 'next/link';
import { redirect } from 'next/navigation';
import InquiryItem from "@/components/InquiryItem";

export default async function DashboardPage() {
    const session = await auth();

    if (!session?.user?.email) {
        redirect('/signin');
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: {
            inquiriesRecv: {
                include: {
                    sender: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            },
            products: {
                orderBy: {
                    createdAt: 'desc'
                }
            }
        }
    });

    if (!user || user.role !== 'SUPPLIER') {
        return (
            <>
                <Header session={session} />
                <div style={{ padding: '100px', textAlign: 'center' }}>
                    <h1>Access Denied</h1>
                    <p>This page is only for registered suppliers.</p>
                    <Link href="/">Back to Home</Link>
                </div>
                <Footer />
            </>
        );
    }

    // Stats for the dashboard
    const stats = {
        totalViews: '12.5k',
        activeInquiries: user.inquiriesRecv.length,
        conversionRate: '2.4%',
        totalProducts: user.products.length
    };

    return (
        <>
            <Header session={session} />
            <main style={{ minHeight: '80vh', padding: '40px 0', backgroundColor: '#f2f3f7' }}>
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                        <h1 style={{ fontSize: '24px' }}>Supplier Dashboard</h1>
                        <button style={{ padding: '10px 20px', background: '#FF6600', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
                            + Add New Product
                        </button>
                    </div>

                    {/* Stats Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' }}>
                        {[
                            { label: 'Total Profile Views', value: stats.totalViews, icon: '👁️' },
                            { label: 'Active Inquiries', value: stats.activeInquiries, icon: '💬' },
                            { label: 'Conversion Rate', value: stats.conversionRate, icon: '📈' },
                            { label: 'Live Products', value: stats.totalProducts, icon: '📦' }
                        ].map(stat => (
                            <div key={stat.label} style={{ background: '#fff', padding: '25px', borderRadius: '8px', border: '1px solid #eee' }}>
                                <div style={{ fontSize: '24px', marginBottom: '10px' }}>{stat.icon}</div>
                                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#333' }}>{stat.value}</div>
                                <div style={{ fontSize: '13px', color: '#666' }}>{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '30px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                            {/* Inquiries List */}
                            <div style={{ background: '#fff', padding: '30px', borderRadius: '8px', border: '1px solid #eee' }}>
                                <h2 style={{ fontSize: '18px', marginBottom: '20px' }}>Recent Inquiries</h2>

                                {user.inquiriesRecv.length === 0 ? (
                                    <p style={{ color: '#666' }}>No inquiries received yet.</p>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                                        {user.inquiriesRecv.map((inquiry: any, idx: number) => (
                                            <InquiryItem key={inquiry.id} inquiry={inquiry} idx={idx} />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Products List */}
                            <div style={{ background: '#fff', padding: '30px', borderRadius: '8px', border: '1px solid #eee' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                    <h2 style={{ fontSize: '18px' }}>My Products</h2>
                                    <Link href="/search" style={{ fontSize: '13px', color: '#007aff', textDecoration: 'none' }}>View All</Link>
                                </div>

                                {user.products.length === 0 ? (
                                    <p style={{ color: '#666' }}>You haven't listed any products yet.</p>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                        {user.products.map((product: any) => (
                                            <div key={product.id} style={{ display: 'flex', gap: '15px', padding: '15px', border: '1px solid #f5f5f5', borderRadius: '6px', alignItems: 'center' }}>
                                                <div style={{ width: '50px', height: '50px', background: '#f0f0f0', borderRadius: '4px' }}></div>
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{product.title}</div>
                                                    <div style={{ fontSize: '12px', color: '#666' }}>{product.priceRow} | MOQ: {product.moq}</div>
                                                </div>
                                                <div style={{ display: 'flex', gap: '8px' }}>
                                                    <button style={{ padding: '5px 10px', fontSize: '11px', background: '#fff', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
                                                    <button style={{ padding: '5px 10px', fontSize: '11px', background: '#fff', border: '1px solid #ff4d4f', color: '#ff4d4f', borderRadius: '4px', cursor: 'pointer' }}>Hide</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Quick Actions / Tips */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{ background: '#fff', padding: '25px', borderRadius: '8px', border: '1px solid #eee' }}>
                                <h3 style={{ fontSize: '16px', marginBottom: '15px' }}>Supplier Tips</h3>
                                <ul style={{ paddingLeft: '20px', fontSize: '13px', color: '#666', lineHeight: '1.8' }}>
                                    <li>Complete your company profile to increase trust by 40%.</li>
                                    <li>Respond to inquiries within 24h to maintain 5-star rating.</li>
                                    <li>Add high-quality videos to your product listings.</li>
                                </ul>
                            </div>

                            <div style={{ background: '#eef2ff', padding: '25px', borderRadius: '8px', border: '1px solid #ccd6ff' }}>
                                <h3 style={{ fontSize: '16px', color: '#1e3a8a', marginBottom: '10px' }}>Trade Assurance</h3>
                                <p style={{ fontSize: '12px', color: '#374151', marginBottom: '15px' }}>
                                    Your transactions are protected. Currently 0 active disputes.
                                </p>
                                <button style={{ width: '100%', padding: '10px', background: '#1e3a8a', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
                                    View Protection Status
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
