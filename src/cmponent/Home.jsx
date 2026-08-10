import React from 'react'
import './Home.css'
import { Link } from 'react-router'
import { BookOpen, MessagesSquare, Hammer } from 'lucide-react'
import girlStudying from '../assets/smiling-girl-studying-home.jpg'
import boyCurly from '../assets/full-shot-kid-cheating-school.jpg'
import girlBook from '../assets/students-knowing-right-answer.jpg'
import girlPainting from '../assets/book-day-with-group-younf-childre.jpg'

function Home() {
  return (
    <>
      <nav className='navbare'>
        <div className='logo'><h1>KIDS <span>SCHOOL.</span></h1></div>
        <div className='navcontainer'>
          <Link to="/" className="active">Home</Link>
          <Link to="/About">About</Link>
          <Link to="/Classes">Activites</Link>
          <Link to="/Contact">Contact</Link>
        </div>
        <button className='login'>Login</button>
      </nav>

      <div className='container hero'>
        <div className='hero-left'>
          <p className='eyebrow'>100% Satisfaction Guarantee</p>
          <h1 className='hero-title'>
            Unlock <strong>Your</strong><br />
            <strong>Child's</strong> Potential
          </h1>
          <p className='hero-desc'>
            We believe every child has unique talents and abilities waiting to be discovered.
          </p>
          <div className='hero-actions'>
            <button className='join-btn'>Join For Free</button>
            <a href="#" className='watch-link'>
              <span className='play-icon'>&#9658;</span>
              See how it works
            </a>
          </div>
        </div>

        <div className='hero-right'>
          <div className='yellow-circle'></div>
          <div className='dot dot-yellow'></div>
          <div className='dot dot-purple'></div>
          <div className='dot dot-gray'></div>
          <div className='dot dot-blue'></div>

          <div className='img-grid'>
            <img src={girlStudying} alt="Girl studying" className='img-circle top-left' />
            <img src={boyCurly} alt="Boy smiling" className='img-rounded top-right' />
            <img src={girlBook} alt="Girl with book on head" className='img-rounded bottom-left' />
            <img src={girlPainting} alt="Girl painting" className='img-rounded bottom-right' />
          </div>
        </div>
      </div>

      <section className='formations'>
        <div className='formations-head'>
          <p className='eyebrow'>What We Offer</p>
          <h2 className='section-title'>
            Our <strong>Formations</strong>
          </h2>
          <p className='section-sub'>
            A few focused paths built around how kids actually learn.
          </p>
        </div>

        <div className='formation-row'>
          <div className='formation-card card-a'>
            <div className='formation-icon icon-yellow'>
              <BookOpen size={22} strokeWidth={2} />
            </div>
            <h3>Support Lessons</h3>
            <p>Personalized help across every subject and every grade level, at each child's own pace.</p>
          </div>

          <div className='formation-card card-b'>
            <div className='formation-icon icon-blue'>
              <MessagesSquare size={22} strokeWidth={2} />
            </div>
            <h3>Language Learning</h3>
            <p>Playful, conversation-first lessons that build real confidence in a new language.</p>
          </div>

          <div className='formation-card card-c'>
            <div className='formation-icon icon-purple'>
              <Hammer size={22} strokeWidth={2} />
            </div>
            <h3>Work Formation</h3>
            <p>Hands-on skills and early habits that prepare kids for what comes next.</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home