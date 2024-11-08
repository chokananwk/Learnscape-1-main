// YearlyCalendar.jsx  
import { useState, useMemo } from 'react';  
import { ChevronLeft, ChevronRight } from 'lucide-react';  

function MonthCalendar({ month, year, events }) {  
  const getDaysInMonth = (year, month) => {  
    return new Date(year, month + 1, 0).getDate();  
  };  

  const getFirstDayOfMonth = (year, month) => {  
    return new Date(year, month, 1).getDay();  
  };  

  const days = getDaysInMonth(year, month);  
  const firstDay = getFirstDayOfMonth(year, month);  
  const monthName = new Date(year, month).toLocaleString('th-TH', { month: 'long' });  

  // ปรับการตรวจสอบ events  
  const eventDays = useMemo(() => {  
    const daysWithEvents = {};  
    events.forEach(event => {  
      // แยกเดือนและวันจาก event.date  
      const [eventMonth, eventDay] = event.date.split('-').map(num => parseInt(num));  
      
      // ถ้าเดือนตรงกัน (month + 1 เพราะ JS months เริ่มที่ 0)  
      if (eventMonth === month + 1) {  
        if (!daysWithEvents[eventDay]) {  
          daysWithEvents[eventDay] = [];  
        }  
        daysWithEvents[eventDay].push(event);  
      }  
    });  
    return daysWithEvents;  
  }, [events, month]);  

  const [selectedDay, setSelectedDay] = useState(null);  

  return (  
    <div className="w-full max-w-4xl p-6 mx-auto bg-white shadow-lg rounded-xl">  
      <div className="grid grid-cols-7 gap-4">  
        {['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัส', 'ศุกร์', 'เสาร์'].map(day => (  
          <div key={day} className="py-2 font-medium text-center text-gray-600">  
            {day}  
          </div>  
        ))}  
        
        {[...Array(firstDay)].map((_, i) => (  
          <div key={`empty-${i}`} className="h-16" />  
        ))}  
        
        {[...Array(days)].map((_, i) => {  
          const day = i + 1;  
          const hasEvents = eventDays[day]?.length > 0;  
          
          return (  
            <div   
              key={day}  
              className="relative h-16"  
              onMouseEnter={() => hasEvents && setSelectedDay(day)}  
              onMouseLeave={() => setSelectedDay(null)}  
            >  
              <div   
                className={`  
                  h-full flex items-center justify-center rounded-lg transition-all  
                  ${hasEvents   
                    ? 'bg-blue-50 text-blue-600 cursor-pointer hover:bg-blue-100'   
                    : 'hover:bg-gray-50'  
                  }  
                `}  
              >  
                <span className={`text-lg ${hasEvents ? 'font-medium' : ''}`}>  
                  {day}  
                </span>  
                {hasEvents && (  
                  <div className="absolute -translate-x-1/2 bottom-2 left-1/2">  
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>  
                  </div>  
                )}  
              </div>  
              
              {selectedDay === day && hasEvents && (  
                <div className="absolute z-20 w-64 p-4 mt-2 -translate-x-1/2 bg-white border rounded-lg shadow-xl left-1/2">  
                  {eventDays[day].map(event => (  
                    <div key={event.id} className="mb-3 last:mb-0">  
                      <div className="font-medium text-gray-800">{event.title}</div>  
                      <div className="text-sm text-gray-500">{event.location}</div>  
                      <div className="mt-1 text-xs text-gray-400">  
                        {/* เอาส่วนแสดงเวลาออก หรือแสดงแค่วันที่ */}  
                        ประจำทุกปี  
                      </div>  
                    </div>  
                  ))}  
                </div>  
              )}  
            </div>  
          );  
        })}  
      </div>  
    </div>  
  );  
}

export function YearlyCalendar({ events }) {  
  const [currentMonth, setCurrentMonth] = useState(0);  // 0 คือเดือนมกราคม  
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());  

  const goToPreviousMonth = () => {  
    if (currentMonth === 0) {  
      setCurrentMonth(11);  
      setCurrentYear(currentYear - 1);  
    } else {  
      setCurrentMonth(currentMonth - 1);  
    }  
  };  

  const goToNextMonth = () => {  
    if (currentMonth === 11) {  
      setCurrentMonth(0);  
      setCurrentYear(currentYear + 1);  
    } else {  
      setCurrentMonth(currentMonth + 1);  
    }  
  };  

  return (  
    <div className="px-4 mt-8">  
      <div className="max-w-4xl mx-auto mb-6">  
        <div className="flex items-center justify-between mb-8">  
          <button   
            onClick={goToPreviousMonth}  
            className="p-2 transition-colors rounded-full hover:bg-gray-100"  
          >  
            <ChevronLeft size={24} />  
          </button>  
          
          <h2 className="text-2xl font-bold text-center">  
            {new Date(currentYear, currentMonth).toLocaleString('th-TH', {   
              month: 'long',   
              year: 'numeric'   
            })}  
          </h2>  
          
          <button   
            onClick={goToNextMonth}  
            className="p-2 transition-colors rounded-full hover:bg-gray-100"  
          >  
            <ChevronRight size={24} />  
          </button>  
        </div>  

        <div className="transition-all duration-300 ease-in-out">  
          <MonthCalendar  
            month={currentMonth}  
            year={currentYear}  
            events={events}  
          />  
        </div>  
      </div>  
    </div>  
  );  
}