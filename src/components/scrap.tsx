// components/ImageScraper.js
"use client"
import { useState } from 'react';

export default function ImageScraper() {

    const [url, setUrl] = useState('');
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleFetchImages = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api?url=${encodeURIComponent(url)}`, {
                method: 'GET', 
            });
            const data = await response.json();
            console.log("data =>", data);

            setImages(data.images);
        } catch (error) {
            console.log('Error fetching images:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg">
            <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">Image Scraper</h2>

            <div className="flex w-full gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Enter URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="flex-1 p-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:border-blue-500"
                />
                <button
                    onClick={handleFetchImages}
                    className="px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
                >
                    Fetch Images
                </button>
            </div>

            {loading && (
                <p className="text-lg text-gray-500 mb-4 animate-pulse">Loading images...</p>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4 w-full">
                { images.length ? images.map((src, index) => (
                    <div key={index} className="overflow-hidden rounded-lg shadow-md">
                        <img src={src} alt={`Scraped Image ${index + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-200" />
                    </div>
                )) : "Not found any images"}
            </div>
        </div>
    );
}
