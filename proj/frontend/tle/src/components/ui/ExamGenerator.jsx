import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ExamGenerator() {
  const [examName, setExamName] = useState('');
  const [examDuration, setExamDuration] = useState('');
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      alert('Please select a valid PDF file.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('examName', examName);
    formData.append('examDuration', examDuration);
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:4000/exam/generateExam', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Exam saved successfully:');
      console.log(response.data);
      navigate(`/exam/${response.data.exam._id}`);
    } catch (error) {
      console.error('Error saving exam:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F5EDED]">
      <div className="rounded-lg border border-[#6482AD] bg-[#E2DAD6] p-8 text-center shadow-lg w-96 mt-10">
        <h1 className="text-2xl font-bold text-[#6482AD] mb-6">Exam Generator</h1>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="examName" className="text-[#6482AD] font-semibold text-sm">Exam Name</label>
            <input
              type="text"
              id="examName"
              name="examName"
              required
              className="w-full px-4 py-3 rounded-lg bg-[#F5EDED] border-2 border-[#6482AD] text-[#6482AD] focus:outline-none focus:ring-2 focus:ring-[#7FA1C3] focus:border-transparent"
              placeholder="Enter exam name"
              value={examName}
              onChange={(e) => setExamName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="examDuration" className="text-[#6482AD] font-semibold text-sm">Exam Duration (minutes)</label>
            <select
              id="examDuration"
              name="examDuration"
              required
              className="w-full px-4 py-3 rounded-lg bg-[#F5EDED] border-2 border-[#6482AD] text-[#6482AD] focus:outline-none focus:ring-2 focus:ring-[#7FA1C3] focus:border-transparent"
              value={examDuration}
              onChange={(e) => setExamDuration(e.target.value)}
            >
              <option value="">Select Exam Duration</option>
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="45">45 minutes</option>
              <option value="60">60 minutes</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="fileInput" className="text-[#6482AD] font-semibold text-sm">Upload PDF (max 5 pages)</label>
            <input
              type="file"
              id="fileInput"
              name="fileInput"
              accept=".pdf"
              required
              className="w-full px-4 py-3 rounded-lg bg-[#F5EDED] border-2 border-[#6482AD] text-[#6482AD] focus:outline-none focus:ring-2 focus:ring-[#7FA1C3] focus:border-transparent"
              onChange={handleFileChange}
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-3 bg-[#6482AD] text-white font-semibold rounded-lg hover:bg-[#7FA1C3] transition duration-300 focus:outline-none focus:bg-[#7FA1C3] focus:ring-2 focus:ring-[#6482AD]"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
