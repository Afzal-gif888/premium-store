import express from 'express';
import Announcement from '../models/Announcement.js';

import apicache from 'apicache';

const router = express.Router();
const cache = apicache.middleware;

// @desc    Fetch all announcements
// @route   GET /api/announcements
// @access  Public
router.get('/', async (req, res) => {
    try {
        // Sort by newest first
        const announcements = await Announcement.find({}).sort({ createdAt: -1 }).lean();
        res.json(announcements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Add an announcement (Auto-clears existing ones)
// @route   POST /api/announcements
// @access  Public
router.post('/', async (req, res) => {
    try {
        const { title, description, image } = req.body;
        console.log(`[ANNOUNCEMENT] New publish request: "${title}"`);

        // 1. Clear ALL existing announcements first (Backend enforcement)
        const deleteResult = await Announcement.deleteMany({});
        console.log(`[ANNOUNCEMENT] Cleared ${deleteResult.deletedCount} old announcements`);

        // 2. Create the new one
        const announcement = new Announcement({
            title,
            description,
            image
        });

        const createdAnnouncement = await announcement.save();
        console.log(`[ANNOUNCEMENT] SUCCESS: Saved new announcement with ID ${createdAnnouncement._id}`);

        apicache.clear('/api/announcements');
        apicache.clear('/api/announcements*');

        res.status(201).json(createdAnnouncement);
    } catch (error) {
        console.error(`[ANNOUNCEMENT] POST ERROR: ${error.message}`);
        res.status(400).json({ message: error.message });
    }
});

// @desc    Delete an announcement
// @route   DELETE /api/announcements/:id
// @access  Public
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log(`[ANNOUNCEMENT] Attempting to delete: ${id}`);

        const announcement = await Announcement.findById(id);
        if (announcement) {
            await announcement.deleteOne();
            console.log(`[ANNOUNCEMENT] SUCCESS: Removed ${id}`);

            apicache.clear('/api/announcements');
            apicache.clear('/api/announcements*');

            res.json({ message: 'Announcement removed' });
        } else {
            console.warn(`[ANNOUNCEMENT] Not found for deletion: ${id}`);
            res.status(404).json({ message: 'Announcement not found' });
        }
    } catch (error) {
        console.error(`[ANNOUNCEMENT] DELETE ERROR: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
});

export default router;
