import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAnnouncements, addAnnouncement, deleteAnnouncement } from 'store/slices/announcementSlice';
import Button from 'components/ui/Button';
import Image from 'components/AppImage';
import { API_ENDPOINTS } from 'config/api';

const AnnouncementsPage = () => {
    const dispatch = useDispatch();
    const announcementState = useSelector(state => state.announcements) || { items: [], status: 'idle' };
    const announcements = announcementState.items || [];
    const status = announcementState.status || 'idle';

    React.useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchAnnouncements());
        }
    }, [status, dispatch]);

    // Form State
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !imageFile) {
            alert("Title and Image are required");
            return;
        }

        setIsSubmitting(true);
        try {
            // 1. Upload Image
            const formData = new FormData();
            formData.append('image', imageFile);

            const uploadRes = await fetch(API_ENDPOINTS.UPLOAD, {
                method: 'POST',
                body: formData
            });

            const uploadData = await uploadRes.json();

            if (!uploadRes.ok) {
                throw new Error(uploadData.message || 'Image upload failed to Cloudinary');
            }

            // 2. Create NEW Announcement Object
            const newAnnouncement = {
                title,
                description,
                image: uploadData.url,
            };

            // 3. Delete existing announcements (user doesn't want them stored)
            for (const item of announcements) {
                try {
                    await dispatch(deleteAnnouncement(item._id || item.id)).unwrap();
                } catch (delError) {
                    console.error('Failed to delete old announcement:', delError);
                }
            }

            // 4. Create NEW Announcement
            await dispatch(addAnnouncement(newAnnouncement)).unwrap();
            dispatch(fetchAnnouncements());

            // Reset
            setTitle('');
            setDescription('');
            setImageFile(null);
            setPreview(null);
            alert('Announcement Published Successfully!');

        } catch (error) {
            console.error('Announcements Error:', error);
            alert('Failed to publish: ' + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = (id) => {
        if (window.confirm("Delete this announcement?")) {
            dispatch(deleteAnnouncement(id)).then(() => {
                dispatch(fetchAnnouncements());
            });
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Announcements (Hero Section)</h1>
            <p className="text-gray-500">The most recently added announcement will be displayed as the Hero section on the homepage.</p>

            <div className="bg-white p-6 rounded-lg shadow border">
                <h2 className="text-lg font-semibold mb-4">Publish New Announcement</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input
                            className="w-full border p-2 rounded"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="e.g. Summer Collection Live Now!"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                            className="w-full border p-2 rounded"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Brief details..."
                            rows="3"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Hero Image</label>
                        <input type="file" accept="image/*" onChange={handleImageUpload} />
                        {preview && (
                            <div className="mt-2 w-full h-48 bg-gray-100 rounded overflow-hidden">
                                <Image src={preview} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                        )}
                    </div>
                    <div className="flex justify-end">
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <div className="flex items-center gap-2">
                                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                                    Publishing...
                                </div>
                            ) : 'Publish Announcement'}
                        </Button>
                    </div>
                </form>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Current Active Announcement</h2>
                {announcements.length > 0 ? (
                    <div className="bg-white p-4 rounded-lg shadow border flex gap-4 items-start relative border-green-200 bg-green-50/30">
                        <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded overflow-hidden border">
                            <Image src={announcements[0].image} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <h3 className="font-bold text-lg">{announcements[0].title}</h3>
                                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Active</span>
                            </div>
                            <p className="text-gray-600 mt-1">{announcements[0].description}</p>
                            <p className="text-xs text-gray-400 mt-2">Published: {new Date(announcements[0].createdAt).toLocaleString()}</p>
                        </div>
                        <button
                            onClick={() => handleDelete(announcements[0]._id || announcements[0].id)}
                            className="text-red-500 text-sm hover:underline absolute top-4 right-4"
                        >
                            Remove
                        </button>
                    </div>
                ) : (
                    <p className="text-gray-500 italic">No active announcement. Publish one above.</p>
                )}
            </div>
        </div>
    );
};

export default AnnouncementsPage;
