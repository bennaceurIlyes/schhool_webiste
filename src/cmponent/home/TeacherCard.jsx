import React from 'react'

export default function TeacherCard({ teacher, ariaHidden = false }) {
  if (!teacher) return null

  return (
    <div className="teacher-card" aria-hidden={ariaHidden ? 'true' : undefined}>
      <div className="teacher-img-wrap">
        <img
          src={teacher.image}
          alt={ariaHidden ? '' : teacher.name}
          className="teacher-img"
          loading="lazy"
        />
      </div>
      <div className="teacher-info">
        <span className="teacher-name">{teacher.name}</span>
      </div>
    </div>
  )
}
