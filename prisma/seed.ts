import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // Create multiple users/suppliers sequentially to avoid SQLite locking issues
    const suppliers = [];
    const supplierData = [
        {
            email: 'tech@supplier.com',
            name: 'Shenzhen Gold Tech Co., Ltd',
            companyName: 'Shenzhen Gold Tech Co., Ltd',
            role: 'SUPPLIER',
            password: 'password123',
        },
        {
            email: 'garments@supplier.com',
            name: 'Guangzhou Fashion Textiles',
            companyName: 'Guangzhou Fashion Textiles',
            role: 'SUPPLIER',
            password: 'password123',
        },
        {
            email: 'home@supplier.com',
            name: 'Ningbo Home Essentials',
            companyName: 'Ningbo Home Essentials',
            role: 'SUPPLIER',
            password: 'password123',
        },
        {
            email: 'industrial@supplier.com',
            name: 'Shanghai Heavy Machineries',
            companyName: 'Shanghai Heavy Machineries',
            role: 'SUPPLIER',
            password: 'password123',
        }
    ];

    for (const data of supplierData) {
        const s = await prisma.user.upsert({
            where: { email: data.email },
            update: {},
            create: data,
        });
        suppliers.push(s);
    }


    const products = [
        // Consumer Electronics
        {
            title: "Wireless Bluetooth Headphones with Noise Cancelling",
            description: "High quality wireless headphones with active noise cancelling feature. Battery life up to 20 hours.",
            priceRow: "$15.00 - $25.00",
            minPrice: 15.00,
            maxPrice: 25.00,
            moq: 10,
            images: JSON.stringify(["https://s.alicdn.com/@sc04/kf/H9d1e13b4156641558296216834907128R.jpg_300x300.jpg"]),
            supplierName: "Shenzhen Gold Tech Co., Ltd",
            isVerified: true,
            yearsInBiz: 5,
            rating: 4.8,
            reviewCount: 120,
            category: "Consumer Electronics",
            supplierIndex: 0
        },
        {
            title: "Smart Watch Series 8 Waterproof Fitness Tracker",
            description: "IP68 Waterproof smart watch with heart rate monitor, blood oxygen tracking, and sports modes.",
            priceRow: "$8.50 - $12.00",
            minPrice: 8.50,
            maxPrice: 12.00,
            moq: 50,
            images: JSON.stringify(["https://s.alicdn.com/@sc04/kf/H833f4039867c4d3298c558661642861e6.jpg_300x300.jpg"]),
            supplierName: "Shenzhen Gold Tech Co., Ltd",
            isVerified: true,
            yearsInBiz: 5,
            rating: 4.5,
            reviewCount: 85,
            category: "Consumer Electronics",
            supplierIndex: 0
        },
        {
            title: "Portable 4K Mini Projector for Home Theater",
            description: "Miniature projector supporting 4K resolution with built-in speakers and Android system.",
            priceRow: "$45.00 - $60.00",
            minPrice: 45.00,
            maxPrice: 60.00,
            moq: 5,
            images: JSON.stringify(["https://s.alicdn.com/@sc04/kf/H7567843d1a384811a2f96557876a6e2e2.jpg_300x300.jpg"]),
            supplierName: "Shenzhen Gold Tech Co., Ltd",
            isVerified: true,
            yearsInBiz: 5,
            rating: 4.7,
            reviewCount: 45,
            category: "Consumer Electronics",
            supplierIndex: 0
        },
        {
            title: "Gaming Mechanical Keyboard RGB Backlit",
            description: "Professional gaming keyboard with mechanical blue switches and customizable RGB lighting.",
            priceRow: "$12.00 - $18.00",
            minPrice: 12.00,
            maxPrice: 18.00,
            moq: 20,
            images: JSON.stringify(["https://s.alicdn.com/@sc04/kf/H8b6188248c8b4b4eb46ef323485d4608o.jpg_300x300.jpg"]),
            supplierName: "Shenzhen Gold Tech Co., Ltd",
            isVerified: true,
            yearsInBiz: 5,
            rating: 4.9,
            reviewCount: 210,
            category: "Consumer Electronics",
            supplierIndex: 0
        },
        {
            title: "Folding Drone with 4K UHD Camera",
            description: "Powerful obstacle avoidance drone with 4K camera and 30-minute flight time.",
            priceRow: "$80.00 - $120.00",
            minPrice: 80.00,
            maxPrice: 120.00,
            moq: 2,
            images: JSON.stringify(["https://s.alicdn.com/@sc04/kf/H946a4e320d3248358249877688225e34G.jpg_300x300.jpg"]),
            supplierName: "Shenzhen Gold Tech Co., Ltd",
            isVerified: true,
            yearsInBiz: 5,
            rating: 4.6,
            reviewCount: 67,
            category: "Consumer Electronics",
            supplierIndex: 0
        },

        // Apparel
        {
            title: "Custom Logo T-Shirt 100% Cotton",
            description: "Premium cotton t-shirts with custom printing available in various sizes and colors.",
            priceRow: "$2.50 - $5.00",
            minPrice: 2.50,
            maxPrice: 5.00,
            moq: 50,
            images: JSON.stringify(["https://s.alicdn.com/@sc04/kf/Hb0b684074252445c9284346985060852P.jpg_300x300.jpg"]),
            supplierName: "Guangzhou Fashion Textiles",
            isVerified: true,
            yearsInBiz: 8,
            rating: 4.2,
            reviewCount: 30,
            category: "Apparel",
            supplierIndex: 1
        },
        {
            title: "Men's Slim Fit Business Suit",
            description: "Elegant 3-piece business suit for men, perfectly tailored for a sharp look.",
            priceRow: "$35.00 - $55.00",
            minPrice: 35.00,
            maxPrice: 55.00,
            moq: 10,
            images: JSON.stringify(["https://s.alicdn.com/@sc04/kf/H859666838a5d45d38622e1777085a86bv.jpg_300x300.jpg"]),
            supplierName: "Guangzhou Fashion Textiles",
            isVerified: true,
            yearsInBiz: 8,
            rating: 4.4,
            reviewCount: 55,
            category: "Apparel",
            supplierIndex: 1
        },
        {
            title: "Women's Summer Boho Floral Dress",
            description: "Breathable and comfortable summer dress with beautiful floral prints.",
            priceRow: "$6.00 - $10.00",
            minPrice: 6.00,
            maxPrice: 10.00,
            moq: 20,
            images: JSON.stringify(["https://s.alicdn.com/@sc04/kf/H5746b43d38644837b2f96557876a6e2e2.jpg_300x300.jpg"]),
            supplierName: "Guangzhou Fashion Textiles",
            isVerified: true,
            yearsInBiz: 8,
            rating: 4.3,
            reviewCount: 120,
            category: "Apparel",
            supplierIndex: 1
        },
        {
            title: "High Performance Compression Gym Wear",
            description: "Stretchable and moisture-wicking compression wear for athletes.",
            priceRow: "$4.50 - $8.00",
            minPrice: 4.50,
            maxPrice: 8.00,
            moq: 100,
            images: JSON.stringify(["https://s.alicdn.com/@sc04/kf/H8473658248358249877688225e34G.jpg_300x300.jpg"]),
            supplierName: "Guangzhou Fashion Textiles",
            isVerified: true,
            yearsInBiz: 8,
            rating: 4.8,
            reviewCount: 89,
            category: "Apparel",
            supplierIndex: 1
        },
        {
            title: "Hooded Winter Jacket Waterproof",
            description: "Windproof and waterproof winter jacket with thick fleece lining.",
            priceRow: "$18.00 - $30.00",
            minPrice: 18.00,
            maxPrice: 30.00,
            moq: 15,
            images: JSON.stringify(["https://s.alicdn.com/@sc04/kf/Hc9a3a1d3a4b44a8fb91f54979f4ead55J.jpg_300x300.jpg"]),
            supplierName: "Guangzhou Fashion Textiles",
            isVerified: true,
            yearsInBiz: 8,
            rating: 4.6,
            reviewCount: 42,
            category: "Apparel",
            supplierIndex: 1
        },

        // Home & Garden
        {
            title: "Ceramic Minimalist Flower Vase",
            description: "Nordic style ceramic vase for modern home decoration.",
            priceRow: "$3.00 - $7.00",
            minPrice: 3.00,
            maxPrice: 7.00,
            moq: 30,
            images: JSON.stringify(["https://s.alicdn.com/@sc04/kf/H84b43d3a4b44a8fb91f54979f4ead55J.jpg_300x300.jpg"]),
            supplierName: "Ningbo Home Essentials",
            isVerified: false,
            yearsInBiz: 3,
            rating: 4.5,
            reviewCount: 15,
            category: "Home & Garden",
            supplierIndex: 2
        },
        {
            title: "Electric Countertop Air Fryer XL",
            description: "Oil-free cooking with large capacity air fryer, digital touch screen.",
            priceRow: "$25.00 - $40.00",
            minPrice: 25.00,
            maxPrice: 40.00,
            moq: 10,
            images: JSON.stringify(["https://s.alicdn.com/@sc04/kf/H9d1e13b4156641558296216834907128R.jpg_300x300.jpg"]),
            supplierName: "Ningbo Home Essentials",
            isVerified: false,
            yearsInBiz: 3,
            rating: 4.9,
            reviewCount: 156,
            category: "Home & Garden",
            supplierIndex: 2
        },
        {
            title: "Memory Foam Ergonomic Pillow",
            description: "Slow rebound memory foam pillow for neck pain relief and better sleep.",
            priceRow: "$5.50 - $12.00",
            minPrice: 5.50,
            maxPrice: 12.00,
            moq: 50,
            images: JSON.stringify(["https://s.alicdn.com/@sc04/kf/H846a4e320d3248358249877688225e34G.jpg_300x300.jpg"]),
            supplierName: "Ningbo Home Essentials",
            isVerified: false,
            yearsInBiz: 3,
            rating: 4.7,
            reviewCount: 230,
            category: "Home & Garden",
            supplierIndex: 2
        },
        {
            title: "Wall Mounted Automatic Soap Dispenser",
            description: "Touchless infrared sensor soap dispenser for bathroom and kitchen.",
            priceRow: "$2.80 - $4.50",
            minPrice: 2.80,
            maxPrice: 4.50,
            moq: 100,
            images: JSON.stringify(["https://s.alicdn.com/@sc04/kf/H0b6188248c8b4b4eb46ef323485d4608o.jpg_300x300.jpg"]),
            supplierName: "Ningbo Home Essentials",
            isVerified: false,
            yearsInBiz: 3,
            rating: 4.3,
            reviewCount: 45,
            category: "Home & Garden",
            supplierIndex: 2
        },
        {
            title: "Solar Outdoor Garden Lights LED",
            description: "Waterproof solar powered lights for garden path decoration.",
            priceRow: "$1.20 - $2.50",
            minPrice: 1.20,
            maxPrice: 2.50,
            moq: 200,
            images: JSON.stringify(["https://s.alicdn.com/@sc04/kf/H7546b43d38644837b2f96557876a6e2e2.jpg_300x300.jpg"]),
            supplierName: "Ningbo Home Essentials",
            isVerified: false,
            yearsInBiz: 3,
            rating: 4.6,
            reviewCount: 122,
            category: "Home & Garden",
            supplierIndex: 2
        },

        // Industrial & Machinery
        {
            title: "Large Format 1325 CNC Router Machine",
            description: "Professional woodwork 3D CNC engraving and cutting machine.",
            priceRow: "$1500.00 - $2500.00",
            minPrice: 1500.00,
            maxPrice: 2500.00,
            moq: 1,
            images: JSON.stringify(["https://s.alicdn.com/@sc04/kf/H84c43d3a4b44a8fb91f54979f4ead55J.jpg_300x300.jpg"]),
            supplierName: "Shanghai Heavy Machineries",
            isVerified: true,
            yearsInBiz: 15,
            rating: 4.8,
            reviewCount: 12,
            category: "Industrial & Machinery",
            supplierIndex: 3
        },
        {
            title: "Manual Hydraulic Pallet Jack 3 Ton",
            description: "Heavy duty manual stacker fork lift for warehouse material handling.",
            priceRow: "$120.00 - $180.00",
            minPrice: 120.00,
            maxPrice: 180.00,
            moq: 5,
            images: JSON.stringify(["https://s.alicdn.com/@sc04/kf/H9d1e13b4156641558296216834907128R.jpg_300x300.jpg"]),
            supplierName: "Shanghai Heavy Machineries",
            isVerified: true,
            yearsInBiz: 15,
            rating: 4.9,
            reviewCount: 34,
            category: "Industrial & Machinery",
            supplierIndex: 3
        },
        {
            title: "Digital Fiber Laser Marking Machine",
            description: "High speed laser marking for metal, stainless steel, and aluminum.",
            priceRow: "$600.00 - $950.00",
            minPrice: 600.00,
            maxPrice: 950.00,
            moq: 1,
            images: JSON.stringify(["https://s.alicdn.com/@sc04/kf/H846a4e320d3248358249877688225e34G.jpg_300x300.jpg"]),
            supplierName: "Shanghai Heavy Machineries",
            isVerified: true,
            yearsInBiz: 15,
            rating: 4.7,
            reviewCount: 22,
            category: "Industrial & Machinery",
            supplierIndex: 3
        },
        {
            title: "Industrial Air Compressor 50L",
            description: "Silent oil-free air compressor for industrial and dental usage.",
            priceRow: "$80.00 - $150.00",
            minPrice: 80.00,
            maxPrice: 150.00,
            moq: 5,
            images: JSON.stringify(["https://s.alicdn.com/@sc04/kf/H0b6188248c8b4b4eb46ef323485d4608o.jpg_300x300.jpg"]),
            supplierName: "Shanghai Heavy Machineries",
            isVerified: true,
            yearsInBiz: 15,
            rating: 4.5,
            reviewCount: 18,
            category: "Industrial & Machinery",
            supplierIndex: 3
        },
        {
            title: "Electric Winch 12V 13500lb",
            description: "High power electric winch for off-road vehicles and towing.",
            priceRow: "$45.00 - $85.00",
            minPrice: 45.00,
            maxPrice: 85.00,
            moq: 10,
            images: JSON.stringify(["https://s.alicdn.com/@sc04/kf/H7546b43d38644837b2f96557876a6e2e2.jpg_300x300.jpg"]),
            supplierName: "Shanghai Heavy Machineries",
            isVerified: true,
            yearsInBiz: 15,
            rating: 4.6,
            reviewCount: 56,
            category: "Industrial & Machinery",
            supplierIndex: 3
        }
    ];

    // Create a buyer user
    const buyer = await prisma.user.upsert({
        where: { email: 'buyer@demo.com' },
        update: {},
        create: {
            email: 'buyer@demo.com',
            name: 'John Doe',
            companyName: 'Global Sourcing Inc.',
            role: 'BUYER',
            password: 'password123',
        },
    });

    // Clear existing data
    await prisma.inquiry.deleteMany();
    await prisma.review.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.product.deleteMany();

    const createdProducts = [];
    for (const p of products) {
        const { supplierIndex, ...productData } = p as any;
        const created = await prisma.product.create({
            data: {
                ...productData,
                supplierId: suppliers[supplierIndex].id
            }
        });
        createdProducts.push(created);

        // Add reviews to the first 5 products
        if (createdProducts.length <= 5) {
            await prisma.review.create({
                data: {
                    rating: 5,
                    comment: "Excellent quality and fast shipping! Highly recommended supplier.",
                    userId: buyer.id,
                    productId: created.id
                }
            });
            await prisma.review.create({
                data: {
                    rating: 4,
                    comment: "Good value for money. The communication was smooth.",
                    userId: buyer.id,
                    productId: created.id
                }
            });
        }
    }

    // Create a mock order for the buyer
    if (createdProducts.length > 0) {
        await prisma.order.create({
            data: {
                userId: buyer.id,
                total: createdProducts[0].minPrice * 10,
                status: 'DELIVERED',
                items: {
                    create: {
                        productId: createdProducts[0].id,
                        quantity: 10,
                        priceAtOrder: createdProducts[0].minPrice,
                        title: createdProducts[0].title
                    }
                }
            }
        });

        // Create mock inquiries
        await prisma.inquiry.create({
            data: {
                subject: "Inquiry about price terms",
                message: "I am interested in your products. Can we negotiate the price for bulk orders?",
                senderId: buyer.id,
                receiverId: suppliers[0].id,
                productId: createdProducts[0].id,
                status: "UNREAD"
            }
        });
    }

    console.log('Seed data inserted successfully: 20 products, 10 reviews, 1 order, 1 inquiry')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

