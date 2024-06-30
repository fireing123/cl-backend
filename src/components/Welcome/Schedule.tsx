import { KDate } from "@/lib/date";
import { useEffect, useState } from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' 
import { getSchoolScheduleInfo } from "@/lib/data/school/schedule";
import { Schedule as TSchedule } from "@/types/types";

export default function Schedule() {
  const [schedule, SetSchedule] = useState<TSchedule[]>([])

  useEffect(() => {
    getSchoolScheduleInfo()
      .then(res => SetSchedule(res))
  }, [])

  if (schedule) {
    return (
      <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        weekends={true}
        events={schedule.map((value) => {
          const year = value.AA_YMD.slice(0, 4)
          const mounth = value.AA_YMD.slice(4, 6)
          const day = value.AA_YMD.slice(6, 8)
          return {title : value.EVENT_NM, date: `${year}-${mounth}-${day}`}
        })}
      />
  )
  } else {
    return <div></div>
  }

    
}