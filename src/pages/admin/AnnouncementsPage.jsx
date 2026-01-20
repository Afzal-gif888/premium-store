import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAnnouncements, addAnnouncement, deleteAnnouncement } from 'store/slices/announcementSlice';
import Button from 'components/ui/Button';
import Image from 'components/AppImage';

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

        try {
            // 1. Upload Image
            const formData = new FormData();
            formData.append('image', imageFile);

            // We need a way to upload. Since we are inside a component, we can use fetch/axios directly or a thunk.
            // For simplicity, let's use fetch here or assumption that we have an upload util.
            // But we don't have an upload thunk. Let's do a direct fetch for upload.
            const apiBase = `${window.location.protocol}//${window.location.hostname}:5000`;
            const uploadRes = await fetch(`${apiBase}/api/upload`, {
                method: 'POST',
                body: formData
            });
            const uploadData = await uploadRes.json();

            if (!uploadRes.ok) throw new Error(uploadData.message || 'Upload failed');

            // 2. Create Announcement
            const newAnnouncement = {
                title,
                description,
                image: uploadData.url,
            };

            await dispatch(addAnnouncement(newAnnouncement)).unwrap();
            dispatch(fetchAnnouncements());

            // Reset
            setTitle('');
            setDescription('');
            setImageFile(null);
            setPreview(null);
            alert('Announcement Published!');

        } catch (error) {
            console.error(error);
            alert('Failed to publish: ' + error.message);
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
                        <Button type="submit">Publish Announcement</Button>
                    </div>
                </form>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">History</h2>
                {announcements.map((item, index) => (
                    <div key={item._id || item.id} className="bg-white p-4 rounded-lg shadow border flex gap-4 items-start relative">
                        <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                            <Image src={item.image} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <h3 className="font-bold text-lg">{item.title}</h3>
                                {index === 0 && <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Active Hero</span>}
                            </div>
                            <p className="text-gray-600 mt-1">{item.description}</p>
                            <p className="text-xs text-gray-400 mt-2">Posted: {new Date(item.createdAt).toLocaleDateString()}</p>
                        </div>
                        <button
                            onClick={() => handleDelete(item._id || item.id)}
                            className="text-red-500 text-sm hover:underline absolute top-4 right-4"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AnnouncementsPage;
