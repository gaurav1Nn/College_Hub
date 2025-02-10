import React, { useState } from 'react';
import ResourceList from '../components/ResourceList';
import ResourceUpload from '../components/ResourceUpload';
import Header from '../components/Header';

const ResourcesPage = () => {
    const [refresh, setRefresh] = useState(false); // State to trigger refresh

    const fetchResources = () => {
        setRefresh(prev => !prev); // Toggle refresh state to trigger useEffect in ResourceList
    };

    return (
        <div className='flex flex-col items-center'>
            <Header />
            <div className=" bg-[#06141D] text-white p-2 w-[80%] flex flex-col items-center">
                <h1 className="text-4xl font-bold my-10">Upload Resources</h1>
                <div className=' flex flex-row w-full gap-10'>
                    <div className='w-1/2'>
                        <ResourceUpload fetchResources={fetchResources} />
                    </div>
                    <div className='w-1/2'>
                        <ResourceList refresh={refresh} /> {/* Pass the refresh state to ResourceList */}
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default ResourcesPage;
