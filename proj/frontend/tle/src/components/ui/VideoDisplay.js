import React, { useState, useEffect } from 'react';
import VideoChatbot from './VideoChatBot.jsx'; // Import the new component

export default function VideoDisplay() {
    const [videoUrl, setVideoUrl] = useState('');
    const [videoContext, setVideoContext] = useState('');

    useEffect(() => {
        const url = localStorage.getItem('videoUrl');
        const context = localStorage.getItem('videoContext');

        if (url && context) {
            setVideoUrl(url);
            setVideoContext(context);
        }
    }, []);

    return (
        <div className="flex">
            <div className="w-2/3 p-4">
                <div className="mb-4">
                    {videoUrl ? (
                        <iframe width="560" height="315" src={videoUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    ) : (
                        <p>No video available</p>
                    )}
                </div>
                <div className="p-4 bg-gray-100 rounded-md">
                    <h3 className="text-xl font-semibold">Video Context</h3>
                    <p className="mt-2">{videoContext || 'No context available'}</p>
                </div>
            </div>
            <div className="w-1/3 p-4">
                <VideoChatbot videoContext={videoContext} /> {/* Use the new component */}
            </div>
        </div>
    );
}
