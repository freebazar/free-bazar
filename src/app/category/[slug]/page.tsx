import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const session = await auth();
    const { slug } = await params;
    const categoryName = decodeURIComponent(slug);

    let products: any[] = [];
    try {
        products = await prisma.product.findMany({
            where: {
                category: {
                    equals: categoryName,
                },
            },
            orderBy: { createdAt: "desc" },
        });
    } catch (e) {
        console.error("Failed to fetch products:", e);
    }

    return (
        <>
            <Header session={session} />
            <main style={{ minHeight: "80vh", paddingBottom: "50px" }}>
                <div className="container">
                    <div style={{ margin: "20px 0" }}>
                        <div style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
                            Home &gt; {categoryName}
                        </div>
                        <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>
                            {categoryName}
                        </h1>
                        <p style={{ color: "#666" }}>{products.length} products found in this category</p>
                    </div>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(4, 1fr)",
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
                                    />
                                );
                            })
                        ) : (
                            <div
                                style={{
                                    gridColumn: "1 / -1",
                                    padding: "40px",
                                    textAlign: "center",
                                    color: "#666",
                                    border: "1px dashed #ccc",
                                    borderRadius: "8px",
                                }}
                            >
                                No products found in this category.
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
