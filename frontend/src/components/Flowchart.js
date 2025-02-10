import React from "react";
import mainjoiningline2 from '../assets/mainjoiningline2.svg'; // Adjust path as needed


const Flowchart = ({ map }) => {
  function splitArray(arr, splitIndex) {
    const leftSide = arr.slice(0, splitIndex);
    const rightSide = arr.slice(splitIndex, arr.length);
    return { leftSide, rightSide };
  }

  return (
    <div className="font-Aifont flex flex-col items-center p-5 w-[80%] ">
      
        <div className="flex flex-row gap-5 w-full justify-center items-center my-10">
            <hr className="w-2/6 border-t-2 border-gray-300" />
            <div className="w-2/6 flex items-center justify-center">
                <p className="bg-white text-[#06141D] text-xl rounded-xl border w-fit p-4">
                    {map[0].title}
                </p>
            </div>
            <hr className="w-2/6 border-t-2 border-gray-300" />
        </div>

      
      {map[0].sections.map((sec, index) => (
        <div key={index} className="w-full">
          <div className="flex flex-row items-center text-center">
            <div className="text-black w-4/12 mt-5">
              {splitArray(sec.items, sec.items.length / 2).leftSide.map((e, index) => (
                <p className="bg-gray-800 m-2 text-xs text-white sm:text-base p-2 shadow-3xl rounded-xl border border-white" key={index}>
                  {e}
                </p>
              ))}
            </div>
            <div className="flex flex-col items-center w-4/12">
              <p className="mx-2 p-4 text-lg font-semibold rounded-xl border border-white text-white bg-transparent">
                {sec.title}
              </p>
              <img src={mainjoiningline2} alt="" />
            </div>
            <div className="text-black w-4/12 mt-5">
              {splitArray(sec.items, sec.items.length / 2).rightSide.map((e, index) => (
                <p className="bg-gray-800 text-xs text-white sm:text-base shadow-3xl m-2 p-2 rounded-xl border border-white" key={index}>
                  {e}
                </p>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Flowchart;
