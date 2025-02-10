import React, { useState } from 'react';
import axios from 'axios';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import app from '../firebase';

const storage = getStorage(app);

const ResourceUpload = ({ fetchResources }) => {
    const [file, setFile] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [uploadError, setUploadError] = useState('');
    const [isDragOver, setIsDragOver] = useState(false);
    const [loading, setLoading] = useState(false); // Loading state

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);

        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            validateFile(droppedFile);
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            validateFile(selectedFile);
        }
    };

    const validateFile = (selectedFile) => {
        if (selectedFile.size <= 20 * 1024 * 1024) { // 20MB file size limit
            setFile(selectedFile);
            setUploadError('');
        } else {
            setUploadError('File size exceeds 20MB limit');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file || loading) { // Prevent multiple submissions
            return;
        }

        setLoading(true); // Set loading to true

        try {
            const uniqueFileName = `${Date.now()}-${file.name}`;

            // Upload the file to Firebase Storage with the unique filename
            const storageRef = ref(storage, `resources/${uniqueFileName}`);
            await uploadBytes(storageRef, file);
            const fileUrl = await getDownloadURL(storageRef);

            // Retrieve the token from localStorage
            const token = localStorage.getItem('token');

            // Send resource data (including file URL) to backend with the token in the headers
            await axios.post('http://localhost:5000/api/resources/upload', {
                name,
                description,
                url: fileUrl,
                tags
            }, {
                headers: {
                    'Authorization': `Bearer ${token}` // Include the token in the headers
                }
            });

            // Clear inputs
            setFile(null);
            setName('');
            setDescription('');
            setTags('');
            fetchResources(); // Refresh resource list
        } catch (error) {
            console.error('Error uploading file:', error);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div className='flex flex-col  justify-evenly'>
                <input
                    type="text"
                    placeholder="Resource Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="p-4 bg-transparent border border-gray-600 rounded mb-2 w-full"
                    required
                />
                <textarea
                    placeholder="Resource Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="p-4 bg-[#06141D] border border-gray-600 rounded mb-2 w-full"
                    required
                />
                <input
                    type="text"
                    placeholder="Tags (comma separated)"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="p-4 bg-transparent border border-gray-600 rounded mb-2 w-full"
                    required
                />
            </div>
            <div
                className={`border-dashed border-2 rounded p-4 py-8 my-6 w-full text-center ${isDragOver ? 'border-blue-400 bg-gray-800' : 'border-gray-600 '} cursor-pointer `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-input').click()}
            >
                {file ? (
                    <p>{file.name}</p>
                ) : (
                    <p>Drag & drop a file here, or click to select</p>
                )}
                <input
                    type="file"
                    id="file-input"
                    onChange={handleFileChange}
                    className="hidden"
                    required
                />
            </div>
            {uploadError && <p className="text-red-500">{uploadError}</p>}
            {loading ? ( // Show loading animation
                <div className="flex items-center justify-center mb-4">
                    <div className="animate-spin h-5 w-5 border-4 border-blue-500 border-t-transparent rounded-full"></div>
                    <span className="ml-2 text-blue-500">Uploading...</span>
                </div>
            ) : (
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                    Upload Resource
                </button>
            )}
        </form>
    );
};

export default ResourceUpload;
