import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CourseDisplay() {
    const [videos, setVideos] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/tutor/getVideos/${localStorage.getItem("courseId")}`);
                setVideos(response.data);
                console.log(response);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    const handleVideoClick = (videoUrl, videoContext) => {
        localStorage.setItem("videoUrl", videoUrl);
        localStorage.setItem("videoContext", videoContext);
        navigate("/videoDisplay");
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold text-center mb-6">Course Videos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {videos.map((video) => (
                    <a
                        href="#"
                        key={video._id}
                        className="group relative block h-64"
                        onClick={() => handleVideoClick(video.videoUrl, video.videoContext)}
                    >
                        <span className="absolute inset-0 border-2 border-dashed border-black"></span>

                        <div
                            className="relative flex h-full transform items-end border-2 border-black bg-white transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2"
                        >
                            <div className="p-4 !pt-0 transition-opacity group-hover:absolute group-hover:opacity-0 sm:p-6 lg:p-8">
                                <h3 className="mt-4 text-xl font-semibold sm:text-2xl">{video.videoName}</h3>
                                <p className="mt-2 text-gray-700">{video.videoDesc}</p>
                            </div>

                            <div className="absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8">
                                <h3 className="mt-4 text-xl font-semibold sm:text-2xl">{video.videoName}</h3>
                                <p className="mt-2 text-sm sm:text-base text-gray-700">{video.videoDesc}</p>
                                <p className="mt-8 font-bold">Watch Video</p>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}
