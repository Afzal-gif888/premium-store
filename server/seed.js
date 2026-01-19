const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const Announcement = require('./models/Announcement');

dotenv.config();

mongoose.connect('mongodb://127.0.0.1:27017/premium-store', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const seedData = async () => {
    try {
        // Clear existing data
        await Product.deleteMany({});
        await Announcement.deleteMany({});

        // Dummy Products
        const products = [
            {
                name: "Premium Leather Loafers",
                category: "Formal",
                price: 199.99,
                description: "Handcrafted Italian leather loafers for the modern gentleman.",
                features: ["Genuine Leather", "Hand-stitched", "Comfort Sole", "Water Resistant"],
                sizes: { "7": 5, "8": 10, "9": 8, "10": 2 },
                images: ["https://images.unsplash.com/photo-1614252369475-531eba835eb1?q=80&w=1000&auto=format&fit=crop"], // Placeholder URL
                isBestseller: true
            },
            {
                name: "Urban Runner Sneakers",
                category: "Casual",
                price: 129.50,
                description: "Lightweight and durable sneakers perfect for daily wear.",
                features: ["Breathable Mesh", "Memory Foam", "Non-slip Sole"],
                sizes: { "8": 15, "9": 20, "10": 12, "11": 5 },
                images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop"],
                isBestseller: true
            },
            {
                name: "Classic Chelsea Boots",
                category: "Boots",
                price: 249.00,
                description: "Timeless Chelsea boots that elevate any outfit.",
                features: ["Suede Finish", "Elastic Side Panel", "Durable Heel"],
                sizes: { "8": 4, "9": 6, "10": 4 },
                images: ["https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=1000&auto=format&fit=crop"],
                isBestseller: false
            },
            {
                name: "Sport Performance Trainers",
                category: "Sport",
                price: 159.99,
                description: "High-performance trainers for serious athletes.",
                sizes: { "9": 10, "10": 5 },
                images: ["https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1000&auto=format&fit=crop"],
                isBestseller: true
            },
            {
                name: "Leather Oxford Shoes",
                category: "Formal",
                price: 189.99,
                description: "Elegant Oxford shoes for business and formal events.",
                sizes: { "7": 2, "8": 5, "9": 3 },
                images: ["https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?q=80&w=1000&auto=format&fit=crop"],
                isBestseller: false
            }
        ];

        await Product.insertMany(products);
        console.log('Products Seeded');

        // Dummy Announcements
        const announcements = [
            {
                title: "Summer Collection Launch",
                description: "Experience the breeze with our new summer lightweight collection. Available now in store.",
                image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop"
            },
            {
                title: "Exclusive Member Sale",
                description: "This weekend only! Get 20% off on all premium leather items. Visit us to claim your discount.",
                image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop"
            }
        ];

        await Announcement.insertMany(announcements);
        console.log('Announcements Seeded');

        mongoose.connection.close();
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedData();
