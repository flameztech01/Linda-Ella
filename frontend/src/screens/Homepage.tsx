import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import About from "../components/About"
import Pricing from "../components/Pricing"
import Booking from "../components/Booking"
import Contact from "../components/Contact"
import Gallery from "../components/Gallery"

const Homepage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Pricing />
      <Booking />
      <Gallery />
      <Contact />
    </div>
  )
}

export default Homepage
