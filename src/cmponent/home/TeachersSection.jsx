import React from 'react'
import TeacherCard from './TeacherCard'
import { teachersData as defaultTeachersData } from './homeData'

export default function TeachersSection({
  title = 'نخبة أساتذتنا ومؤطرينا',
  teachers = defaultTeachersData,
}) {
  return (
    <section className="teachers" id="teachers">
      <div className="teachers-container">
        <h2 className="teachers-heading">{title}</h2>
      </div>

      <div className="teachers-viewport">
        <div className="teachers-track">
          {/* Primary set of cards */}
          {teachers.map((teacher, index) => (
            <TeacherCard
              key={`teacher-1-${teacher.id || index}`}
              teacher={teacher}
            />
          ))}
          {/* Duplicate set for infinite seamless marquee loop */}
          {teachers.map((teacher, index) => (
            <TeacherCard
              key={`teacher-2-${teacher.id || index}`}
              teacher={teacher}
              ariaHidden={true}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
