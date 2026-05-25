import React from 'react'
import Hero from '../components/Homepage/Hero';
import StatsBar from '../components/Homepage/StatsBar';
import JobList from '../components/JobList';

const Home = () => {
  return (
    <section className="bg-[#010409] min-h-screen">
      <Hero />
      <StatsBar />
      <div className="px-4 sm:px-6 md:px-12 max-w-5xl mx-auto">
        <JobList mode="home" />
      </div>
    </section>
  )
}

export default Home;