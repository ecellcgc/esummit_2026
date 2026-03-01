import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'
import SplitType from 'split-type'
import HeroSection from '../components/HeroSection'
import AboutESummitSection from '../components/AboutESummitSection'
import PastEventGlimpsesSection from '../components/PastEventGlimpsesSection'
import CompetitionsSection from '../components/CompetitionsSection'
import EventTimelineSection from '../components/EventTimelineSection'
import MarqueeSection from '../components/MarqueeSection'
import WhyAttendSection from '../components/WhyAttendSection'
import PastGuestsSection from '../components/PastGuestsSection'
import PartnersSection from '../components/PartnersSection'
import ContactUsSection from '../components/ContactUsSection'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles.css'

gsap.registerPlugin(ScrollTrigger)

function Home() {
  const scrollContainerRef = useRef(null)
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    // Configure ScrollTrigger to use the custom scroll container
    ScrollTrigger.defaults({
      scroller: ".main-scroll-container"
    })

    // ========== PAGE 2: TEXT REVEAL ANIMATION ==========
    const target = document.querySelector(".js-fill > span")
    if (target && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.to(target, {
        backgroundSize: "200% 200%",
        ease: "none",
        scrollTrigger: {
          trigger: ".js-fill",
          start: "top 72%",
          end: "bottom 33%",
          scrub: 1,
          markers: false
        }
      })
    }

    // ========== PAGE 7 (Was 5): MARQUEE & TEXT ANIMATION ==========
    function animateChars(chars, reverse = false) {
      const staggerOptions = {
        each: 0.35,
        from: reverse ? "start" : "end",
        ease: "linear",
      }

      gsap.fromTo(
        chars,
        { fontWeight: 100 },
        {
          fontWeight: 900,
          duration: 1,
          ease: "none",
          stagger: staggerOptions,
          scrollTrigger: {
            trigger: chars[0].closest(".marquee-container"),
            start: "50% bottom",
            end: "top top",
            scrub: true,
          },
        }
      )
    }

    const splitText = new SplitType(".item h1", { types: "chars" })
    const marqueeContainers = document.querySelectorAll(".marquee-container")

    marqueeContainers.forEach((container, index) => {
      let start = "0%"
      let end = "-25%"

      if (index % 2 === 0) {
        start = "-10%"
        end = "5%"
      }

      const marquee = container.querySelector(".marquee")
      if (!marquee) return; // Safety check

      const words = marquee.querySelectorAll(".item h1")

      gsap.fromTo(
        marquee,
        { x: start },
        {
          x: end,
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "150% top",
            scrub: true,
          },
        }
      )

      words.forEach((word) => {
        const chars = Array.from(word.querySelectorAll(".char"))
        if (chars.length) {
          const reverse = index % 2 !== 0
          animateChars(chars, reverse)
        }
      })
    })

    // ========== SMOOTH SCROLLING & ANIMATION MOMENTUM ==========
    // Use native scroll on touch devices (mobile) so scrolling feels natural; use Lenis on desktop
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    let lenis = null

    if (isTouchDevice) {
      // Native scroll: just keep ScrollTrigger in sync
      const handleScroll = () => ScrollTrigger.update()
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true })
      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll)
        if (splitText) splitText.revert()
        ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      }
    }

    lenis = new Lenis({
      wrapper: scrollContainer,
      content: scrollContainer,
      smoothWheel: true,
      syncScroll: true,
      duration: 0.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp: 0.1
    })

    lenis.on("scroll", ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    // Force refresh to ensure positions are correct after layout changes
    // Staggered refreshes to handle image loading and layout settling
    const refreshTimers = [
      setTimeout(() => {
        lenis.resize();
        ScrollTrigger.refresh();
      }, 200),
      setTimeout(() => {
        lenis.resize();
        ScrollTrigger.refresh();
      }, 1000),
      setTimeout(() => {
        lenis.resize();
        ScrollTrigger.refresh();
      }, 3000),
    ];

    // Also refresh on window resize (fixes issues with custom scroller)
    const handleResize = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      lenis.destroy()
      if (splitText) splitText.revert() // Cleanup SplitType
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      refreshTimers.forEach(timer => clearTimeout(timer));
      window.removeEventListener('resize', handleResize);
    }
  }, [])

  const scrollToPage = (pageId) => {
    const scrollContainer = scrollContainerRef.current
    const targetPage = document.getElementById(pageId)

    if (targetPage && scrollContainer) {
      // Offset so section title isn't cropped by the fixed navbar (~72px) + breathing room
      const scrollOffset = 88
      const offsetTop = Math.max(0, targetPage.offsetTop - scrollOffset)
      scrollContainer.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
  }

  return (
    <>
      <Navbar scrollToPage={scrollToPage} />

      <div className="main-scroll-container" ref={scrollContainerRef}>
        <HeroSection scrollToPage={scrollToPage} />
        <AboutESummitSection />
        <CompetitionsSection />
        <EventTimelineSection />
        {/* <MarqueeSection /> */}
        {/* <WhyAttendSection /> */}
        {/* <PastEventGlimpsesSection /> */}
  <PastGuestsSection />
  <PartnersSection />
  <ContactUsSection />
        <Footer />
      </div>
    </>
  )
}


export default Home

