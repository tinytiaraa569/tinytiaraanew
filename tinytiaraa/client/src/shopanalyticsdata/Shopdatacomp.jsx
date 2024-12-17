import CountryWiseData from '@/shopgoogleanalytics/CountryWiseData'
import GoogleAnalyticsGraph from '@/shopgoogleanalytics/GoogleAnalyticsGraph'
import PageViewsTable from '@/shopsales/PageViewsTable';
import PerformanceDashboard from '@/shopsales/PerformanceData';
import LiveActiveUsers from '@/shopsales/RealTimeActiveUsers';
import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';

function Shopdatacomp() {

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
    const location = useLocation();

    // Get the last segment of the URL (e.g., "dashboard" or "overview")
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const currentPage = pathSegments[pathSegments.length - 1];
  
    // You can map the path segment to a more readable name
    const breadcrumbText = currentPage.charAt(0).toUpperCase() + currentPage.slice(1); // Capitalize first letter
  

  return (
    <div className="min-w-[82%] flex-grow px-8 pt-1 mt-3 bg-white">
        <div >
                        <h2 className='text-[22px] font-[500]'>Analytics Data Summary</h2>
                        <nav aria-label="Breadcrumb" className="text-sm text-gray-600 mb-4 mt-1">
                            <ol className="flex space-x-2">
                            <li>
                                <Link to={"/dashboard"} className="hover:text-blue-500">Home</Link>
                            </li>
                            <li>&gt;</li> {/* Separator */}
                            <li>
                                <span className="text-gray-400">{breadcrumbText}</span> {/* Active breadcrumb */}
                            </li>
                            </ol>
                        </nav>
                    </div>


        <div className='flex gap-5 justify-between my-4'>
        <div className="w-[48%]">
                    <LiveActiveUsers />
         </div>
            <div  className='w-[48%] '>
                <GoogleAnalyticsGraph />
            </div>
           

        </div>
        <div className="my-8">
        <PerformanceDashboard />
        </div>

        <div className="flex justify-between gap-5 my-4">
        <div className='w-[48%] '>
                <CountryWiseData />
            </div>
            <div className="w-[48%]">
                <PageViewsTable />
            </div>
                
        </div>


        
    </div>
  )
}

export default Shopdatacomp