import Link from 'next/link';
import './ProductCard.css';

interface ProductCardProps {
    id: string;
    title: string;
    price: string;
    minOrder: string;
    image?: string;
    supplierName?: string;
    isVerified?: boolean;
    yearsInBiz?: number;
    responseRate?: string;
    rating?: number;
    reviewCount?: number;
}

const ProductCard = ({
    id,
    title,
    price,
    minOrder,
    image,
    supplierName = "Shenzhen Quality Co.", // Default fallback
    isVerified = true, // Default for demo
    yearsInBiz = 4,
    responseRate = "95%",
    rating = 0,
    reviewCount = 0
}: ProductCardProps) => {
    return (
        <Link href={`/product/${id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
            <div className="card">
                <div className="imageWrapper">
                    {image ? (
                        <img src={image} alt={title} className="image" />
                    ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc' }}>
                            No Image
                        </div>
                    )}
                </div>

                <h3 className="title">{title}</h3>

                {/* Rating Section */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '8px' }}>
                    <div style={{ color: '#ffc107', fontSize: '12px' }}>
                        {'★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating))}
                    </div>
                    <span style={{ fontSize: '11px', color: '#666' }}>({reviewCount})</span>
                </div>

                <div className="price">{price}</div>
                <div className="minOrder">{minOrder} Min. Order</div>

                {/* New Supplier Section */}
                <div className="supplierInfo">
                    <div className="supplierHeader">
                        <span className="supplierName">{supplierName}</span>
                        <span className="yearsBadge">{yearsInBiz} YRS</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {isVerified && (
                            <div className="verifiedBadge">
                                <span className="verifiedIcon">✓</span>
                                Verified
                            </div>
                        )}
                        <span className="responseRate">{responseRate} Response</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
