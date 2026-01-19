import cloudinary from './config/cloudinary.js';

console.log('Testing Cloudinary Connection...');
console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('API Key Present:', !!process.env.CLOUDINARY_API_KEY);

cloudinary.api.ping()
    .then(res => {
        console.log('Ping Success:', res);
        // Try a simple upload test
        cloudinary.uploader.upload('https://res.cloudinary.com/demo/image/upload/sample.jpg', { folder: 'test_folder' })
            .then(uploadRes => {
                console.log('Upload Success:', uploadRes.secure_url);
            })
            .catch(uploadErr => {
                console.error('Upload Failed:', uploadErr.message);
            });
    })
    .catch(err => {
        console.error('Ping Failed:', err.message);
    });
