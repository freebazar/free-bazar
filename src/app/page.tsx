import Link from 'next/link';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { auth } from "@/auth";

import { prisma } from "@/lib/prisma";

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

export default async function Home() {
  const session = await auth();

  // Fetch real products from DB
  let products = [];
  try {
    products = await prisma.product.findMany({
      take: 8,
      orderBy: { createdAt: 'desc' }
    });
  } catch (e) {
    console.error("Failed to fetch products:", e);
    // Fallback if DB not ready
  }

  return (
    <>
      <Header session={session} />
      <main style={{ minHeight: '80vh', paddingBottom: '50px' }}>
        <Hero session={session} />
        <div className="container">
          <section style={{ margin: "40px 0" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 'bold', marginBottom: '20px' }}>Source by Category</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '20px'
            }}>
              {[
                { name: 'Consumer Electronics', icon: '📱' },
                { name: 'Apparel', icon: '👕' },
                { name: 'Home & Garden', icon: '🏠' },
                { name: 'Industrial & Machinery', icon: '⚙️' }
              ].map((cat) => (
                <Link
                  key={cat.name}
                  href={`/category/${encodeURIComponent(cat.name)}`}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '30px',
                    background: '#fff',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    color: '#333',
                    border: '1px solid #eee',
                    transition: 'transform 0.2s',
                  }}
                >
                  <span style={{ fontSize: '40px', marginBottom: '10px' }}>{cat.icon}</span>
                  <span style={{ fontWeight: '500' }}>{cat.name}</span>
                </Link>
              ))}
            </div>
          </section>
          <section style={{ margin: "40px 0" }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: "22px", fontWeight: 'bold' }}>Ready to Ship</h2>
              <Link href="/search?ready=true" style={{ color: '#FF6600', fontSize: '14px', textDecoration: 'none' }}>View more ❯</Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
              {products.slice(0, 4).map((product: any) => {
                let imageUrl = "";
                try {
                  imageUrl = JSON.parse(product.images)[0];
                } catch (e) {
                  imageUrl = product.images;
                }
                return (
                  <ProductCard
                    key={`ready-${product.id}`}
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
              })}
            </div>
          </section>

          <section style={{ margin: "40px 0" }}>
            <h2 style={{ margin: "20px 0", fontSize: "22px", fontWeight: 'bold' }}>Recommended for You</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "40px" }}>
              {products.length > 0 ? products.map((product: any) => {
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
              }) : (
                <div style={{ gridColumn: '1 / -1', padding: '40px', textAlign: 'center', color: '#666', background: '#f8f8f8', borderRadius: '8px' }}>
                  Loading verified products... (Run seed script if empty)
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
