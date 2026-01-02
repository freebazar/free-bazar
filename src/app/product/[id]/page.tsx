import Link from 'next/link';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import ProductActions from "@/components/ProductActions";
import ReviewList from "@/components/ReviewList";
import "@/components/ProductDetail.css";

// Force dynamic rendering since we are fetching specific IDs
export const dynamic = 'force-dynamic';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    const { id } = await params;
    const product = await prisma.product.findUnique({
        where: { id },
        include: {
            reviews: {
                include: {
                    user: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            }
        }
    });

    if (!product) {
        return (
            <>
                <Header session={session} />
                <div style={{ padding: '50px', textAlign: 'center' }}>Product not found</div>
                <Footer />
            </>
        )
    }

    // Safely parse images
    let images: string[] = [];
    try {
        images = JSON.parse(product.images);
    } catch (e) {
        images = [product.images];
    }
    const mainImage = images[0] || "";

    return (
        <>
            <Header session={session} />

            <div className="productContainer">
                <div className="breadcrumb">
                    Home {'>'} {product.category} {'>'} {product.title}
                </div>

                <div style={{ display: 'flex', gap: '20px' }}>
                    {/* Main Content */}
                    <div className="mainSection" style={{ flex: 1 }}>
                        {/* Images */}
                        <div className="imageGallery">
                            <div className="mainImage">
                                {mainImage ? <img src={mainImage} alt={product.title} /> : <div>No Image</div>}
                            </div>
                            <div className="thumbnailList">
                                {images.map((img, idx) => (
                                    <div key={idx} className="thumbnail">
                                        <img src={img} alt="thumb" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Info */}
                        <div className="productInfo">
                            <h1 className="productTitle">{product.title}</h1>

                            <div className="priceSection">
                                <span className="priceLabel">FOB Price:</span>
                                <span className="priceValue">{product.priceRow}</span>
                            </div>

                            <div className="infoRow">
                                <span className="infoLabel">Min. Order:</span>
                                <span className="infoValue">{product.moq} {product.moqUnit}</span>
                            </div>

                            {/* Static details for prototype */}
                            <div className="infoRow">
                                <span className="infoLabel">Rating:</span>
                                <span className="infoValue" style={{ color: '#FF6600', fontWeight: 'bold' }}>
                                    {"★".repeat(Math.round(product.rating || 0))}
                                    <span style={{ color: '#666', fontWeight: 'normal', marginLeft: '5px' }}>
                                        ({product.reviewCount} Reviews)
                                    </span>
                                </span>
                            </div>

                            <div className="infoRow">
                                <span className="infoLabel">Guarantee:</span>
                                <span className="infoValue">Trade Assurance</span>
                            </div>

                            <ProductActions product={{
                                id: product.id,
                                title: product.title,
                                price: product.priceRow,
                                images: product.images,
                                supplierId: product.supplierId,
                                supplierName: product.supplierName
                            }} />
                        </div>
                    </div>

                    {/* Right Sidebar: Supplier */}
                    <div className="supplierSidebar">
                        <Link href="#" className="supplierTitle">{product.supplierName}</Link>

                        <div style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
                            {product.isVerified && (
                                <span style={{ fontSize: '12px', background: '#e6f2ff', color: '#007aff', padding: '2px 5px', borderRadius: '2px', fontWeight: 'bold' }}>
                                    Verified
                                </span>
                            )}
                            <span style={{ fontSize: '12px', background: '#f0f0f0', color: '#666', padding: '2px 5px', borderRadius: '2px', fontWeight: 'bold' }}>
                                {product.yearsInBiz} YRS
                            </span>
                        </div>

                        <div style={{ fontSize: '12px', color: '#666' }}>
                            {product.countryCode === 'CN' ? 'China' : product.countryCode}
                        </div>

                        <div className="supplierStats">
                            <div className="statRow">
                                <span>Response Time</span>
                                <span>&lt; 24h</span>
                            </div>
                            <div className="statRow">
                                <span>Transactions</span>
                                <span>200+</span>
                            </div>
                            <div className="statRow">
                                <span>On-time Delivery</span>
                                <span>98.5%</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Description Space */}
                <div style={{ marginTop: '20px', background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e2e2' }}>
                    <h3 style={{ marginBottom: '15px' }}>Product Details</h3>
                    <p style={{ lineHeight: '1.6', color: '#333', marginBottom: '30px' }}>
                        {product.description}
                    </p>

                    <ReviewList reviews={product.reviews as any[]} />
                </div>
            </div>

            <Footer />
        </>
    );
}
