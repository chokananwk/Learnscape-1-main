import { Search } from 'lucide-react';  

export function EventFilter({ activeFilter, onFilterChange, onSearch }) {  
  return (  
    <div className="sticky top-0 z-10 p-4 bg-white shadow-md">  
      <div className="flex flex-wrap items-center justify-between gap-4 mx-auto max-w-7xl">  
        <div className="flex gap-2">  
          {['all', 'festival', 'concert', 'exhibition'].map((filter) => (  
            <button  
              key={filter}  
              onClick={() => onFilterChange(filter)}  
              className={`px-4 py-2 rounded-full transition-all ${  
                activeFilter === filter  
                  ? 'bg-blue-500 text-white'  
                  : 'bg-gray-100 hover:bg-gray-200'  
              }`}  
            >  
              {filter.charAt(0).toUpperCase() + filter.slice(1)}  
            </button>  
          ))}  
        </div>  
        
        <div className="relative">  
          <input  
            type="text"  
            placeholder="Search events..."  
            onChange={(e) => onSearch(e.target.value)}  
            className="w-full py-2 pl-10 pr-4 border rounded-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"  
          />  
          <Search className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" size={20} />  
        </div>  
      </div>  
    </div>  
  );  
}  

export function EventCard({ event }) {  
  // แก้ไขการประกาศตัวแปรและการจัดรูปแบบวันที่  
  const [month, day] = event.date.split('-');  
  const formattedDate = `${day}/${month}`;  

  return (  
    <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] h-full">  
      <img  
        src={event.image}  
        alt={event.title}  
        className="object-cover w-full h-48"  
      />  
      <div className="flex flex-col flex-grow p-4">  
        <div className="flex-grow">  
          <h3 className="mb-2 text-xl font-semibold line-clamp-2">{event.title}</h3>  
          <p className="mb-2 text-gray-600">{event.location}</p>  
          <p className="text-gray-500">วันที่ {formattedDate} (ประจำทุกปี)</p>  
        </div>  
        {event.link ? (  
          <a   
            href={event.link}  
            target="_blank"  
            rel="noopener noreferrer"  
            className="flex items-center justify-center w-full gap-2 px-4 py-2 mt-4 text-center text-white transition-colors bg-blue-500 rounded-full hover:bg-blue-600"  
          >  
            Learn More  
            <svg   
              className="w-4 h-4"   
              fill="none"   
              stroke="currentColor"   
              viewBox="0 0 24 24"  
            >  
              <path   
                strokeLinecap="round"   
                strokeLinejoin="round"   
                strokeWidth={2}   
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"   
              />  
            </svg>  
          </a>  
        ) : (  
          <button   
            className="w-full px-4 py-2 mt-4 text-white transition-colors bg-blue-500 rounded-full opacity-50 cursor-not-allowed hover:bg-blue-600"  
            disabled  
          >  
            Learn More  
          </button>  
        )}  
      </div>  
    </div>  
  );  
}