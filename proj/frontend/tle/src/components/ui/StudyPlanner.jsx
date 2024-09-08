import React, { useState } from 'react';
import axios from 'axios';

export default function StudyPlanner() {
    const [subject, setSubject] = useState('');
    const [duration, setDuration] = useState('');
    const [studyPlans, setStudyPlans] = useState([]);

    const handleSubjectChange = (e) => {
        setSubject(e.target.value);
    };

    const handleDurationChange = (e) => {
        setDuration(e.target.value);
    };
    const handleSubmit = async () => {
      try {
          const response = await axios.post('http://localhost:4000/study/studyPlanner', {
              studyPlan: subject,
              timeDuration: duration
          });
  
          console.log('API Response:', response.data); // Log the raw response data
  
          // Validate the response data type and format
          if (typeof response.data === 'object' && response.data !== null) {
              // Format the data for display
              const formattedData = Object.entries(response.data).map(([key, value]) => ({
                  day: key,
                  hoursOfStudy: value["Hours of Study"] || "N/A",
                  topic: value["Topics"] || "N/A",
                  subtopic: value["Subtopic"] || "N/A",
                  exercises: value["Exercises"] || "N/A"
              }));
  
              // Sort the data based on the day
              formattedData.sort((a, b) => {
                  const dayA = parseInt(a.day.split(' ')[0]);
                  const dayB = parseInt(b.day.split(' ')[0]);
                  return dayA - dayB;
              });
  
              console.log('Formatted Data:', formattedData); // Log the formatted data
              setStudyPlans(formattedData);
          } else {
              console.error('Unexpected response format. Expected an object but received:', response.data);
          }
      } catch (err) {
          console.error('Error:', err);
      }
  };
  
  
  

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-8">
            {/* Input Form */}
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-bold mb-6 text-center text-[#295F98]">Study Planner</h2>
                <form className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-[#6C4E31] font-semibold text-sm" htmlFor="courseName">
                            Subject Name
                        </label>
                        <input
                            type="text"
                            id="courseName"
                            name="courseName"
                            value={subject}
                            onChange={handleSubjectChange}
                            className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-[#7C93C3] text-[#295F98] focus:outline-none focus:ring-2 focus:ring-[#55679C] focus:border-transparent"
                            placeholder="Enter subject name"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-[#6C4E31] font-semibold text-sm" htmlFor="courseDesc">
                            Time Duration
                        </label>
                        <input
                            type="text"
                            id="courseDesc"
                            name="courseDesc"
                            value={duration}
                            onChange={handleDurationChange}
                            className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-[#7C93C3] text-[#295F98] focus:outline-none focus:ring-2 focus:ring-[#55679C] focus:border-transparent"
                            placeholder="Enter duration"
                            required
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="w-full px-4 py-3 hover:bg-[#7C93C3] border-2 border-[#7C93C3] hover:text-white font-semibold rounded-lg transition duration-300 bg-[#E1D7B7] hover:border-white focus:outline-none focus:bg-[#55679C] focus:text-white focus:border-transparent focus:ring-2 focus:ring-[#55679C]"
                    >
                        Submit
                    </button>
                </form>
            </div>

            {/* Output Cards */}
            <div>
<div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 relative">
    {studyPlans.length > 0 ? (
        studyPlans.map((plan, index) => (
            <a
                key={index}
                href="#"
                className="group relative block bg-white rounded-md border border-blue shadow-md p-4 transition-transform duration-300"
            >
                <span className="absolute inset-0 border-2 border-dashed border-black transition-opacity duration-300"></span>
                <div className="relative flex flex-col h-full items-start border-2 border-black bg-white transition-transform duration-300 group-hover:-translate-x-2 group-hover:-translate-y-2 group-hover:z-10">
                    <div className="relative p-4 !pt-0 transition-opacity duration-300 group-hover:absolute group-hover:opacity-0 sm:p-6 lg:p-8">
                        <h2 className="text-xl font-medium sm:text-2xl">
                            {`${plan.day}`}
                        </h2>
                    </div>
                    <div className="absolute p-4 opacity-0 transition-opacity duration-300 group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8">
                        <h3 className="text-xl font-medium sm:text-2xl">
                            {`${plan.day}`}
                        </h3>
                        <ul className="mt-4 text-sm sm:text-base list-disc pl-5">
                            <li><strong>Hours:</strong> {plan.hours}</li>
                            <li><strong>Topic:</strong> {plan.topic}</li>
                            <li><strong>Subtopic:</strong> {plan.subtopic}</li>
                            <li><strong>Exercises:</strong> {plan.exercises}</li>
                        </ul>
                        <p className="mt-8 font-bold">Read more</p>
                    </div>
                </div>
            </a>
        ))
    ) : (
        <p className='justify-center'>No study plans available</p>
    )}
</div>

            </div>
        </div>
    );
}
