import React from 'react'
import Hero from '../components/Homepage/Hero';
import StatsBar from '../components/Homepage/StatsBar';
import FeaturedPosition from '../components/Homepage/FeaturedPositions';
const Home = () => {
  return (
  <section>
    <Hero />
    <StatsBar />
    <FeaturedPosition />
  </section>
  )
}
export default Home;