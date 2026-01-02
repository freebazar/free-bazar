import Link from 'next/link';
import './Hero.css';

const categories = [
    "Consumer Electronics",
    "Apparel",
    "Home & Garden",
    "Industrial & Machinery",
    "Health & Personal Care",
    "Vehicle Parts & Accessories",
    "Sports & Entertainment",
    "Packaging & Printing",
    "Mother, Kids & Toys",
    "Furniture",
    "Metals & Alloys",
    "Fabric & Textile Raw Material",
    "Rubber & Plastics"
];

// Mock slides data
const slides = [
    {
        image: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)", // Blue gradient placeholder
        title: "Consumer Electronics Expo",
        subtitle: "Top trends in tech. Source directly from factories."
    },
    {
        image: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", // Pink/Orange gradient
        title: "Fashion Week 2025",
        subtitle: "New arrivals in apparel. Low MOQs available."
    }
];

const Hero = ({ session }: { session: any }) => {
    return (
        <section className="hero">
            <div className="container heroContent">
                {/* Categories Sidebar */}
                <div className="categories">
                    <h3>
                        <span>☰</span> My Markets
                    </h3>
                    <ul className="categoryList">
                        {categories.map((cat, index) => (
                            <li key={index} className="categoryItem">
                                <Link href={`/category/${encodeURIComponent(cat)}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                    {cat} <span>›</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Main Banner Slider (Simple CSS Implementation for now, active slide hardcoded or we can use state if client side) */}
                <div className="banner">
                    {/* For simplicity in this server component, we just render one specific slide or use a client component for real rotation. 
                        Let's just render the first one nicely for 'static' preview or assume it's Client Component if we add 'use client' 
                    */}
                    <div className="sliderContainer">
                        {/* Simulating just one active slide for visual fidelity without JS complexity for now */}
                        <div className="slide active" style={{ background: slides[0].image }}>
                            <div className="slideContent">
                                <h2>{slides[0].title}</h2>
                                <p>{slides[0].subtitle}</p>
                                <button className="slideBtn">View More</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: User Card + RFQ */}
                <div className="rightColumn">
                    {/* User Card */}
                    <div className="userCard">
                        <div className="userWelcome">
                            <div className="avatar">{session?.user?.image || '👤'}</div>
                            <div>
                                <p style={{ fontSize: '13px', fontWeight: 'bold' }}>Hi, {session?.user?.name || 'user'}</p>
                                <p style={{ fontSize: '11px', color: '#666' }}>{session?.user ? 'Welcome back!' : "Get started now!"}</p>
                            </div>
                        </div>
                        {!session?.user && (
                            <div className="authButtons">
                                <Link href="/register" style={{ textDecoration: 'none' }}>
                                    <button className="authBtn joinBtn" style={{ width: '100%' }}>Join for free</button>
                                </Link>
                                <Link href="/signin" style={{ textDecoration: 'none' }}>
                                    <button className="authBtn signInBtn" style={{ width: '100%' }}>Sign in</button>
                                </Link>
                            </div>
                        )}
                        {session?.user && (
                            <div style={{ marginTop: '10px' }}>
                                <div style={{ fontSize: '12px', marginBottom: '5px', display: 'flex', justifyContent: 'space-between' }}>
                                    <span>Orders</span> <span style={{ fontWeight: 'bold' }}>0</span>
                                </div>
                                <div style={{ fontSize: '12px', marginBottom: '5px', display: 'flex', justifyContent: 'space-between' }}>
                                    <span>Messages</span> <span style={{ fontWeight: 'bold' }}>0</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Request for Quotation Widget */}
                    <div className="rfqWidget">
                        <div className="rfqTitle">Request for Quotation</div>
                        <p style={{ fontSize: '11px', color: '#666', marginBottom: '10px' }}>
                            One Request, Multiple Quotes.
                        </p>
                        <input type="text" placeholder="What are you looking for?" className="rfqInput" />
                        <div style={{ display: 'flex', gap: '5px' }}>
                            <input type="text" placeholder="Quantity" className="rfqInput" style={{ flex: 1 }} />
                            <select className="rfqInput" style={{ width: '60px' }}>
                                <option>Pcs</option>
                            </select>
                        </div>
                        <button className="rfqBtn">Request for Quotation</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
