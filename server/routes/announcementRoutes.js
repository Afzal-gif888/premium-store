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

// @desc    Add an announcement
// @route   POST /api/announcements
// @access  Public
router.post('/', async (req, res) => {
    try {
        const { title, description, image } = req.body;

        const announcement = new Announcement({
            title,
            description,
            image
        });

        const createdAnnouncement = await announcement.save();
        apicache.clear('/api/announcements');
        res.status(201).json(createdAnnouncement);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc    Delete an announcement
// @route   DELETE /api/announcements/:id
// @access  Public
router.delete('/:id', async (req, res) => {
    try {
        const announcement = await Announcement.findById(req.params.id);
        if (announcement) {
            await announcement.deleteOne();
            apicache.clear('/api/announcements');
            res.json({ message: 'Announcement removed' });
        } else {
            res.status(404).json({ message: 'Announcement not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
