
import Hero from '@/components/Hero'
import Section from '@/components/Section'
import Stats from '@/components/Stats'
import About from '@/components/About'
import Stack from '@/components/Stack'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Footer from "@/components/Footer"
import PageEnter from '@/components/PageEnter'

export default function Home() {
  return (
    <PageEnter>
      <div className="min-h-dvh bg-transparent">
        
        <main>
        <Hero />

        <Section id="stats">
          <Stats />
        </Section>

        <Section id="about" title="About">
          <About />
        </Section>

        <Section id="stack" title="Stack">
          <Stack />
        </Section>

        <Section id="experience" title="Experience">
          <Experience />
        </Section>

        <Section id="projects" title="Projects">
          <Projects />
        </Section>

        
          <Contact />
          <Footer/>
        
        </main>
       
      </div>
    </PageEnter>
  )
}
