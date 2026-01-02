import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import Link from 'next/link';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

export default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{
        q?: string;
        minPrice?: string;
        maxPrice?: string;
        moq?: string;
        verified?: string;
    }>;
}) {
    const session = await auth();
    const params = await searchParams;
    const query = params.q || "";
    const minPrice = parseFloat(params.minPrice || "0");
    const maxPrice = parseFloat(params.maxPrice || "999999");
    const moq = parseInt(params.moq || "999999");
    const verifiedOnly = params.verified === "true";

    let products: any[] = [];
    try {
        products = await prisma.product.findMany({
            where: {
                AND: [
                    {
                        OR: [
                            { title: { contains: query } },
                            { description: { contains: query } },
                            { category: { contains: query } },
                        ],
                    },
                    { minPrice: { gte: minPrice } },
                    { maxPrice: { lte: maxPrice } },
                    { moq: { lte: moq } },
                    verifiedOnly ? { isVerified: true } : {},
                ],
            },
            orderBy: { createdAt: "desc" },
        });
    } catch (e) {
        console.error("Failed to fetch products:", e);
    }

    return (
        <>
            <Header session={session} />
            <main style={{ minHeight: "80vh", paddingBottom: "50px", backgroundColor: '#f2f3f7' }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '20px', paddingTop: '20px' }}>
                    {/* Filter Sidebar */}
                    <aside style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #eee', height: 'fit-content' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '15px' }}>Filters</h3>

                        <form action="/search" method="GET">
                            <input type="hidden" name="q" value={query} />

                            <div style={{ marginBottom: '20px' }}>
                                <h4 style={{ fontSize: '14px', marginBottom: '10px' }}>Supplier Type</h4>
                                <label style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                    <input type="checkbox" name="verified" value="true" defaultChecked={verifiedOnly} />
                                    <span>Verified Supplier</span>
                                </label>
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <h4 style={{ fontSize: '14px', marginBottom: '10px' }}>Price (USD)</h4>
                                <div style={{ display: 'flex', gap: '5px' }}>
                                    <input
                                        type="number"
                                        name="minPrice"
                                        placeholder="Min"
                                        defaultValue={params.minPrice}
                                        style={{ width: '100%', padding: '5px', fontSize: '12px', border: '1px solid #ccc', borderRadius: '4px' }}
                                    />
                                    <input
                                        type="number"
                                        name="maxPrice"
                                        placeholder="Max"
                                        defaultValue={params.maxPrice}
                                        style={{ width: '100%', padding: '5px', fontSize: '12px', border: '1px solid #ccc', borderRadius: '4px' }}
                                    />
                                </div>
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <h4 style={{ fontSize: '14px', marginBottom: '10px' }}>Min Order (MOQ)</h4>
                                <input
                                    type="number"
                                    name="moq"
                                    placeholder="Less than..."
                                    defaultValue={params.moq}
                                    style={{ width: '100%', padding: '5px', fontSize: '12px', border: '1px solid #ccc', borderRadius: '4px' }}
                                />
                            </div>

                            <button type="submit" style={{
                                width: '100%',
                                padding: '10px',
                                background: '#FF6600',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '4px',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                            }}>
                                Apply Filters
                            </button>

                            <Link href={`/search?q=${query}`} style={{
                                display: 'block',
                                textAlign: 'center',
                                marginTop: '10px',
                                fontSize: '12px',
                                color: '#007aff',
                                textDecoration: 'none'
                            }}>
                                Clear All
                            </Link>
                        </form>
                    </aside>

                    {/* Results Area */}
                    <div>
                        <div style={{ marginBottom: "20px" }}>
                            <h1 style={{ fontSize: "20px", marginBottom: "5px" }}>
                                {query ? `Results for "${query}"` : "All Products"}
                            </h1>
                            <p style={{ color: "#666", fontSize: '14px' }}>{products.length} products found</p>
                        </div>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(3, 1fr)",
                                gap: "20px",
                                marginBottom: "40px",
                            }}
                        >
                            {products.length > 0 ? (
                                products.map((product: any) => {
                                    let imageUrl = "";
                                    try {
                                        imageUrl = JSON.parse(product.images)[0];
                                    } catch (e) {
                                        imageUrl = product.images;
                                    }

                                    return (
                                        <ProductCard
                                            key={product.id}
                                            id={product.id}
                                            title={product.title}
                                            price={product.priceRow}
                                            minOrder={`${product.moq} ${product.moqUnit}`}
                                            image={imageUrl}
                                            supplierName={product.supplierName}
                                            isVerified={product.isVerified}
                                            yearsInBiz={product.yearsInBiz}
                                            responseRate={product.responseRate || "95%"}
                                            rating={product.rating}
                                            reviewCount={product.reviewCount}
                                        />
                                    );
                                })
                            ) : (
                                <div
                                    style={{
                                        gridColumn: "1 / -1",
                                        padding: "60px",
                                        textAlign: "center",
                                        color: "#666",
                                        background: '#fff',
                                        border: "1px dashed #ccc",
                                        borderRadius: "8px",
                                    }}
                                >
                                    No products found matching your current filters.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
