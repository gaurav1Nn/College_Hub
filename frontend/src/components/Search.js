import React, { useState } from 'react';
import axios from 'axios';
import Flowchart from './Flowchart';

const Search = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  const [on, setOn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const generatemap = () => {
    if (input) {
      setIsLoading(true);
      let data = JSON.stringify({
        topic: ` ${input}`
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://roadmap-be.vercel.app/v1',
        headers: { 'Content-Type': 'application/json' },
        data: data
      };

      axios.request(config)
        .then((response) => {
          setOutput(response.data);
          setOn(true);
          setIsLoading(false);
        })
        .catch((error) => {
          setOn(false);
          setIsLoading(false);
        });
    } else {
      alert('Input cannot be empty');
    }
  };

  // Function to print the page
  const printPage = () => {
    alert('Please enable "More settings > Options > Background Graphics" in the print settings for a better PDF experience.');
    window.print(); // This triggers the print dialog (allows saving as PDF)
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#06141D] font-sans">
      <h1 className="text-5xl text-white mb-8 animate-fade-in mt-10">Roadmap Generator</h1>
      <div className='flex flex-row gap-4'>
        <input
            type="text"
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter topic to get a roadmap"
            className="p-3 text-lg rounded-lg w-80 max-w-full shadow-md bg-transparent text-white border border-white focus:outline-none focus:shadow-lg transition-shadow"
        />
        <button
            onClick={generatemap}
            className=" px-2 text-lg text-white bg-transparent rounded-lg border border-white hover:text-[#06141D] hover:bg-white transition-colors"
        >
            {isLoading ? 'Generating...' : 'Generate Roadmap'}
        </button>
      </div>
      
      {on ? <Flowchart map={output} /> : ''}

      {/* Button to trigger the print dialog */}
      {on && (
        <button
          onClick={printPage}
          className="mt-8 px-4 py-2 text-lg text-white bg-blue-600 rounded-lg hover:bg-blue-800 transition-colors"
        >
          Save as PDF
        </button>
      )}
    </div>
  );
};

export default Search;
