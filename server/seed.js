import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Product from './models/Product.js';
import Announcement from './models/Announcement.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const seedData = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected.');

        // Clear existing data
        await Product.deleteMany({});
        await Announcement.deleteMany({});
        console.log('Existing data cleared.');

        // Dummy Products matching schema [{ size: "US 7", stock: 10 }]
        const products = [
            {
                name: "Classic Crocs Clog",
                category: "Clogs",
                price: 49.99,
                brand: "Crocs",
                sizes: [
                    { size: "US 7", stock: 10 },
                    { size: "US 8", stock: 15 },
                    { size: "US 9", stock: 20 },
                    { size: "US 10", stock: 5 }
                ],
                image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1000&auto=format&fit=crop",
                isBestseller: true
            },
            {
                name: "LiteRide 360 Pacer",
                category: "Sneakers",
                price: 64.99,
                brand: "Crocs",
                sizes: [
                    { size: "US 8", stock: 12 },
                    { size: "US 9", stock: 8 },
                    { size: "US 10", stock: 4 }
                ],
                image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop",
                isBestseller: true
            },
            {
                name: "Classic Crocs Sandal",
                category: "Sandals",
                price: 34.99,
                brand: "Crocs",
                sizes: [
                    { size: "US 7", stock: 20 },
                    { size: "US 8", stock: 25 },
                    { size: "US 9", stock: 15 }
                ],
                image: "https://images.unsplash.com/photo-1562183241-b937e95585b6?q=80&w=1000&auto=format&fit=crop",
                isBestseller: false
            },
            {
                name: "Baya Clog",
                category: "Clogs",
                price: 44.99,
                brand: "Crocs",
                sizes: [
                    { size: "US 9", stock: 30 },
                    { size: "US 10", stock: 10 }
                ],
                image: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=1000&auto=format&fit=crop",
                isBestseller: true
            }
        ];

        await Product.insertMany(products);
        console.log('Products Seeded.');

        // Dummy Announcements
        const announcements = [
            {
                title: "Summer Crocs Sale - Up to 40% Off!",
                description: "Get ready for the sun with our latest sandal collection. Visit our store to try them on.",
                image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop"
            }
        ];

        await Announcement.insertMany(announcements);
        console.log('Announcements Seeded.');

        console.log('Seeding complete.');
        process.exit();
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
};

seedData();
