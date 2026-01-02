import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
    const session = await auth();

    if (!session?.user?.email) {
        redirect('/signin');
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: {
            orders: {
                include: {
                    items: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            },
            reviews: {
                include: {
                    product: true
                }
            }
        }
    });

    if (!user) return <div>User not found</div>;

    return (
        <>
            <Header session={session} />
            <main style={{ minHeight: '80vh', padding: '40px 0', backgroundColor: '#f2f3f7' }}>
                <div className="container" style={{ maxWidth: '1000px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '30px' }}>
                        {/* Sidebar */}
                        <aside>
                            <div style={{ background: '#fff', padding: '30px', borderRadius: '8px', border: '1px solid #eee', textAlign: 'center' }}>
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '50%',
                                    background: '#f0f0f0',
                                    margin: '0 auto 15px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '32px'
                                }}>
                                    {user.image ? <img src={user.image} alt="" style={{ width: '100%', borderRadius: '50%' }} /> : "👤"}
                                </div>
                                <h2 style={{ fontSize: '18px', marginBottom: '5px' }}>{user.name}</h2>
                                <p style={{ fontSize: '12px', color: '#666', marginBottom: '20px' }}>{user.email}</p>
                                <button style={{ width: '100%', padding: '10px', background: '#f5f5f5', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer' }}>Edit Profile</button>
                            </div>

                            <nav style={{ marginTop: '20px', background: '#fff', borderRadius: '8px', border: '1px solid #eee', overflow: 'hidden' }}>
                                <div style={{ padding: '15px', borderLeft: '4px solid #FF6600', background: '#fff9f5', fontWeight: 'bold' }}>My Account</div>
                                <div style={{ padding: '15px', borderBottom: '1px solid #eee', cursor: 'pointer' }}>My Orders</div>
                                <div style={{ padding: '15px', borderBottom: '1px solid #eee', cursor: 'pointer' }}>My Inquiries</div>
                                <div style={{ padding: '15px', cursor: 'pointer' }}>My Reviews</div>
                            </nav>
                        </aside>

                        {/* Main Content */}
                        <section style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{ background: '#fff', padding: '30px', borderRadius: '8px', border: '1px solid #eee' }}>
                                <h1 style={{ fontSize: '22px', marginBottom: '25px' }}>My Orders</h1>

                                {user.orders.length === 0 ? (
                                    <div style={{ textAlign: 'center', padding: '40px' }}>
                                        <p style={{ color: '#666', marginBottom: '20px' }}>You haven't placed any orders yet.</p>
                                        <Link href="/search">
                                            <button style={{ padding: '10px 25px', background: '#FF6600', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Start Sourcing</button>
                                        </Link>
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                        {user.orders.map((order: any) => (
                                            <div key={order.id} style={{ border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden' }}>
                                                <div style={{ background: '#f8f9fb', padding: '15px', display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                                                    <div style={{ display: 'flex', gap: '20px' }}>
                                                        <div>
                                                            <div style={{ color: '#666', marginBottom: '2px' }}>Order Placed</div>
                                                            <div>{new Date(order.createdAt).toLocaleDateString()}</div>
                                                        </div>
                                                        <div>
                                                            <div style={{ color: '#666', marginBottom: '2px' }}>Total</div>
                                                            <div style={{ fontWeight: 'bold' }}>${order.total.toFixed(2)}</div>
                                                        </div>
                                                        <div>
                                                            <div style={{ color: '#666', marginBottom: '2px' }}>Status</div>
                                                            <div style={{ color: order.status === 'DELIVERED' ? '#4CAF50' : '#FF6600', fontWeight: 'bold' }}>{order.status}</div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div style={{ color: '#666', marginBottom: '2px' }}>Order ID</div>
                                                        <div>#{order.id.slice(-8).toUpperCase()}</div>
                                                    </div>
                                                </div>
                                                <div style={{ padding: '20px' }}>
                                                    {order.items.map((item: any) => (
                                                        <div key={item.id} style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                                            <div style={{ width: '60px', height: '60px', background: '#f0f0f0', borderRadius: '4px', flexShrink: 0 }}></div>
                                                            <div style={{ flex: 1 }}>
                                                                <Link href={`/product/${item.productId}`} style={{ textDecoration: 'none', color: '#333', fontWeight: '500', fontSize: '14px' }}>
                                                                    {item.title}
                                                                </Link>
                                                                <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                                                                    Quantity: {item.quantity} × ${item.priceAtOrder.toFixed(2)}
                                                                </div>
                                                            </div>
                                                            <button style={{ padding: '8px 15px', background: '#fff', border: '1px solid #FF6600', color: '#FF6600', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>Buy Again</button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div style={{ background: '#fff', padding: '30px', borderRadius: '8px', border: '1px solid #eee' }}>
                                <h1 style={{ fontSize: '22px', marginBottom: '25px' }}>My Reviews</h1>
                                {user.reviews.length === 0 ? (
                                    <p style={{ color: '#666' }}>You haven't written any reviews yet.</p>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                        {user.reviews.map((review: any) => (
                                            <div key={review.id} style={{ padding: '15px', border: '1px solid #f0f0f0', borderRadius: '8px' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                                    <Link href={`/product/${review.productId}`} style={{ fontSize: '14px', fontWeight: 'bold', textDecoration: 'none', color: '#007aff' }}>
                                                        {review.product.title}
                                                    </Link>
                                                    <span style={{ fontSize: '12px', color: '#999' }}>{new Date(review.createdAt).toLocaleDateString()}</span>
                                                </div>
                                                <div style={{ color: '#FF6600', fontSize: '14px', marginBottom: '8px' }}>
                                                    {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                                                </div>
                                                <p style={{ fontSize: '13px', color: '#333' }}>{review.comment}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
