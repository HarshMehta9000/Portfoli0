import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import VisitorCounterEnhanced from "@/components/visitor-counter-enhanced"
import ContactForm from "@/components/contact-form"
import EnhancedThreeScene from "@/components/enhanced-three-scene"
import { skills } from "@/lib/skills"
import { blogPosts } from "@/lib/blog-posts"
import { experiences } from "@/lib/experiences"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import SectionAnimation from "@/components/section-animation"
import ExperienceCardEnhanced from "@/components/experience-card-enhanced"
import SkillCardEnhanced from "@/components/skill-card-enhanced"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Moved metadata to a separate export to avoid syntax issues
export const metadata = {
  title: "Harsh Mehta | Data Scientist & Founder",
  description:
    "Analyst, Founder & data scientist turning raw data into packed venues. Building Ensemble, the AI-agent booking engine. Business-intelligence analyst by trade, AI strategist by obsession.",
  openGraph: {
    title: "Harsh Mehta | Data Scientist & Founder",
    description:
      "Founder & data scientist turning raw data into packed venues. Building Ensemble, the AI-agent booking engine. Data & Business-intelligence analyst by trade, AI strategist by obsession.",
    type: "website",
    url: "https://harshmehta.co",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Harsh Mehta | Data Scientist & Founder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Harsh Mehta | Data Scientist & Founder",
    description:
      "Data Professional, Aspiring Founder turning raw data into packed venues. Building Ensemble, the AI-agent booking engine. Data & Business-intelligence analyst by trade, AI Integration strategist by obsession.",
    images: ["/og-image.jpg"],
  },
}


const projects = [
  {
    title: "UW Transportation Services Campus Parking Efficiency Project",
    
    description:
      "Analyzed 11M+ parking transaction records using Python, SQL, and Snowflake to uncover usage patterns and weather impacts.",
    image: "/proj1a.png",
    tags: ["Python", "SQL", "Snowflake", "Tableau", "Power BI"],
    github: "https://github.com/HarshMehta9000/LIS620Parking",
    details:
      "Developed predictive models and interactive dashboards (Tableau/Power BI) that cut average parking search time by 27% and improved resource allocation. This project involved analyzing over 11 million parking transaction records to identify patterns and optimize resource allocation.",
  },
  {
    title: "MSBA Financial Group Cloud-Native Data Architecture Project",
    
    description: "Designed an end to end AWS data pipeline (S3, Glue, Redshift).",
    image: "/proj2.png",
    tags: ["AWS", "S3", "Glue", "Redshift", "SageMaker"],
    details:
      "Deployed an ML model via SageMaker Canvas (99.19% accuracy) for bankruptcy risk prediction, informing investment strategies and cutting data processing time by 63%. The architecture allowed for the processing and analysis of large volumes of financial data, enabling more accurate risk assessment and investment decisions.",
  },
  {
    title: "Hard Drive Data Extraction Tool",
    
    description:
      "Developed a user friendly tool (Python, JS, PostgreSQL) to extract hard drive data to JSON, standardizing output for analytics.",
    image: "/proj3.jpeg",
    tags: ["Python", "JavaScript", "PostgreSQL", "JSON"],
    demo: "https://melodic-kringle-9b3415.netlify.app/",
    details:
      "Reduced processing time by 60% and significantly cut computing/cloud costs. The tool extracts hard drive data to JSON, standardizing output for analytics and making it easier to process and analyze large volumes of data.",
  },
  {
    title: "Research: Job Posting Analytics on Twitter",
  
    description:
      "Co authoring research analyzing 100k+ Twitter job postings using data mining and NLP to uncover hiring trends for peer reviewed publication.",
    image: "/proj4.png",
    tags: ["NLP", "Data Mining", "Twitter API", "Research"],
    demo: "https://docs.google.com/document/d/1dZR5oPDQ_W768aWHTl-36N0I0TuC41oIPV4Xl22kiD8/edit?tab=t.jemhm1prcbcn",
    details:
      "This research project involves analyzing over 100,000 Twitter job postings using data mining and NLP techniques to uncover hiring trends. The findings will be published in a peer-reviewed journal, contributing to our understanding of the job market and hiring practices.",
  },
  {
    title: "Creative Application: MIDI to CSV Data Tool",
    
    description:
      "Created a Python tool to transform MIDI music files into analytical CSV datasets, capturing musical structures for analysis in a creative domain.",
    image: "/proj5.jpeg",
    tags: ["Python", "MIDI", "Data Transformation", "Music Analysis"],
    details:
      "This tool transforms MIDI music files into analytical CSV datasets, capturing musical structures like notes, rhythms, harmonies, and dynamics for analysis. It allows for the visualization of patterns in different musical genres, composers' styles, and individual pieces.",
  },
  {
    title: "Graduate Studies: Learnings & Reflections",
  
    description:
      "Overview of key concepts, skills, and insights gained during the M.S. in Information program at UW Madison.",
    image: "/proj6.jpg",
    tags: ["Data Analytics", "Machine Learning", "Cloud Computing"],
    demo: "https://gentle-sorbet-624f58.netlify.app/",
    details:
      "This project provides an overview of the key concepts, skills, and insights gained during the M.S. in Information program at UW Madison, focusing on Data Analytics, Machine Learning, and Cloud Computing. It serves as a reflection on the learning journey and a showcase of the knowledge acquired.",
  },
  {
      title: "Live Audio / AV Tech Engineer – University of Wisconsin-Madison",
    
  description:
    "Front-of-house audio engineer and AV lead for concerts, and campus festivals.",
  image: "/proj7.jpg",   
  tags: [
    "Live Audio",
    "AV Technology",
    "Event Support",
    "Collaboration",
    "Audio Engineering",
    "Problem Solving",
    "Project Coordination",
  ],
  details:
    "Mixed 120+ shows and collaborated with **99 artists** across UW-Madison’s headline venues — Der Rathskeller, The Sett Pub, Wisconsin Union Theatre, Camp Randall Stadium, Memorial Union Terrace, Union South, Trip Commons, Sunset Lounge, Great Hall, and Varsity Hall. Certified Audio Engineer (University of Mumbai & Zee Institute of Media Arts) with prior experience in Mumbai’s live-sound circuit, working every genre from rock, metal, blues, fusion, and classical to Gujarati, Marathi, Hindi, and other contemporary regional acts. Duties spanned FOH/monitor mixing, stage-patch design, mic selection, rapid troubleshooting, and close coordination with production crews to deliver broadcast-quality audio and multimedia experiences for audiences up to 80 000.",
  website: "https://union.wisc.edu",
},
]

export default function Home() {

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Enhanced Three.js Animation */}
      <section className="relative h-[90vh] w-full overflow-hidden">
      	<EnhancedThreeScene intensity={1.2} particleCount={3000} particleSize={0.02} speed={0.3} interactive />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-10">
          <SectionAnimation animation="fade" delay={0.2}>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter gradient-text mb-4">Harsh Mehta</h1>
          </SectionAnimation>
          <SectionAnimation animation="slide-up" delay={0.4}>
            <p className="max-w-[700px] text-lg md:text-xl text-muted-foreground mb-8">
              Data Professional, Data Scientist & Aspiring Founder turning raw data into packed venues. Building Ensemble.
              Data & Business-intelligence analyst by trade, AI Integration strategist by obsession. Music connoisseur, live studio audio
              engineer, cinephile, history buff.
            </p>
          </SectionAnimation>
          <SectionAnimation animation="slide-up" delay={0.6}>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="animate-pulse-slow">
                <Link href="#work">
                  View My Work <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="backdrop-blur-sm bg-background/50">
                <Link href="#contact">Get in Touch</Link>
              </Button>
            </div>
          </SectionAnimation>
        </div>
      </section>

      {/* About Section with Education - WITH PARTICLES */}
      <SectionAnimation id="about" animation="fade" className="bg-muted/50 py-24 relative overflow-hidden">
        {/* Add the particle background */}
        <div className="absolute inset-0 -z-0 opacity-40">
      <EnhancedThreeScene colorScheme="blue" particleCount={1500} particleSize={0.015} speed={0.2} />
      
        </div>

        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <SectionAnimation animation="slide-right" delay={0.2}>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4 gradient-text-alt">About Me</h2>
              <Image                                                
  src="/logo/pfp.jpg"                                
  alt="Harsh Mehta profile photo"
  width={160}
  height={160}
  className="rounded-full mx-auto mb-6 shadow-md"
/>
              <p className="text-muted-foreground mb-6">
                I am Harsh Mehta, a data scientist, founder, and builder focused on mastering AI through code, systems
                design, and disciplined iteration. I build intelligent automation, machine learning products, and data
                infrastructure that solve real business problems. My work at Ensemble AI, HP Tech Ventures, and Beats by
                Dre reflects a balance of technical depth and strategic execution.
              </p>
              <p className="text-muted-foreground mb-6">
                Beyond data, I explore music visualizations, cinema, cultural patterns, and creative systems. I help
                solopreneurs and small teams scale faster through automation and sharp problem solving.
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                <Button asChild variant="outline" size="sm" className="animated-underline">
                  <Link
                    href="https://drive.google.com/file/d/13yGccHtQa6l8f4hNelCS9uMOmf4LEhKI/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Resume
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm" className="animated-underline">
                  <Link href="https://www.linkedin.com/in/harshpmehta/" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm" className="animated-underline">
                  <Link href="https://github.com/HarshMehta9000" target="_blank" rel="noopener noreferrer">
                    GitHub
                  </Link>
                </Button>
              </div>
            </SectionAnimation>
            <SectionAnimation animation="slide-up" delay={0.4}>
              <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-lg p-1 shadow-lg">
                <div className="bg-background rounded-md p-6 h-full">
                  <h3 className="text-xl font-semibold mb-4">Education</h3>
<div className="space-y-4">

  {/* UW-Madison */}
  <div className="card-hover p-4 rounded-md border flex items-center">
    <div className="flex-1">
      <h4 className="font-medium">University of Wisconsin-Madison</h4>
      <p className="text-sm text-muted-foreground">
        M.S. in Information (Data, ML, Cloud Focus)
      </p>
      <p className="text-sm text-muted-foreground">Sept 2023 - May 2025</p>
      <p className="text-sm font-semibold mt-1">GPA: 3.95/4.0</p>
    </div>
    <Image
      src="/logo/uwlogo.png"
      alt="UW-Madison logo"
      width={50}
      height={50}
      className="h-10 w-auto ml-4"
      priority
    />
  </div>

  {/* University of Mumbai */}
  <div className="card-hover p-4 rounded-md border flex items-center">
    <div className="flex-1">
      <h4 className="font-medium">University of Mumbai</h4>
      <p className="text-sm text-muted-foreground">
        Bachelor of Management Studies (Business Analytics Major)
      </p>
      <p className="text-sm text-muted-foreground">Jun 2013 - Jul 2017</p>
      <p className="text-sm font-semibold mt-1">GPA: 3.5/4.0</p>
    </div>
    <Image
      src="/logo/uomlogo.jpeg"
      alt="University of Mumbai logo"
      width={50}
      height={50}
      className="h-10 w-auto ml-4"
      priority
    />
                    </div>
                  </div>
                </div>
              </div>
            </SectionAnimation>
          </div>
        </div>
      </SectionAnimation>

      {/* Experience Section - WITH PARTICLES */}
      <SectionAnimation id="work" animation="fade" className="py-24 relative overflow-hidden">
        {/* Add the particle background */}
        <div className="absolute inset-0 -z-0 opacity-40">
        </div>
      <EnhancedThreeScene colorScheme="purple" particleCount={1800} particleSize={0.018} speed={0.25} />
        <div className="container relative z-10">
          <div className="flex flex-col items-center mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4 gradient-text">Experience</h2>
            <p className="text-muted-foreground max-w-[700px]">
              As a Founder, Data Scientist, and Analyst, I apply deep expertise in data science, machine learning, and
              cloud technologies (AWS, Python, SQL) to uncover strategic insights and tackle complex business problems.
            </p>
          </div>

          <Tabs defaultValue="cards" className="w-full mb-8">
            <div className="flex justify-center">
              <TabsList>
                <TabsTrigger value="cards">Cards</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="cards" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {experiences.map((experience, index) => (
                  <ExperienceCardEnhanced key={experience.slug} experience={experience} index={index} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="timeline" className="mt-6">
              <div className="relative border-l-2 border-muted ml-4 md:ml-6 pl-6 md:pl-8 space-y-10">
                {experiences.map((experience, index) => (
                  <SectionAnimation key={experience.slug} animation="slide-up" delay={index * 0.1} className="relative">
                    <div className="absolute w-4 h-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full -left-[34px] md:-left-[42px] top-1"></div>
                    <div className="card-hover p-6 border rounded-lg">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <h3 className="text-xl font-bold">{experience.title}</h3>
                        <div className="text-sm text-muted-foreground">{experience.date}</div>
                      </div>
                      <p className="text-muted-foreground mb-4">{experience.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {experience.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="font-normal">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/experience/${experience.slug}`}>
                          View Details <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </SectionAnimation>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SectionAnimation>

      {/* Projects Section - WITH PARTICLES */}
      <SectionAnimation id="projects" animation="fade" className="bg-muted/50 py-24 relative overflow-hidden">
        {/* Add the particle background */}
        <div className="absolute inset-0 -z-0 opacity-40">
        <EnhancedThreeScene colorScheme="teal" particleCount={1600} particleSize={0.016} speed={0.22} />
        </div>

        <div className="container relative z-10">
          <div className="flex flex-col items-center mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4 gradient-text-alt">Projects</h2>
            <p className="text-muted-foreground max-w-[700px]">
              A selection of my recent projects in data science, machine learning, and cloud computing.
            </p>
          </div>
                
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <SectionAnimation key={project.title} animation="slide-up" delay={index * 0.1}>
                <div className="border rounded-lg overflow-hidden bg-background card-hover h-full flex flex-col">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <div className="flex gap-2">
                        {project.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="font-normal">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="p-6 flex-grow">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="font-normal text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="px-6 pb-6 pt-0 mt-auto">
                    <div className="flex gap-2">
                      {project.github && (
                        <Button asChild variant="outline" size="sm" className="flex-1">
                          <Link href={project.github} target="_blank" rel="noopener noreferrer">
                            GitHub Repository
                          </Link>
                        </Button>
                      )}
                      {project.demo && (
                        <Button asChild size="sm" className="flex-1">
                          <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                            Live Preview
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </SectionAnimation>
            ))}
          </div>
        </div>
      </SectionAnimation>

      {/* Skills Section - WITH PARTICLES */}
      <SectionAnimation id="skills" animation="fade" className="py-24 relative overflow-hidden">
        {/* Add the particle background */}
        <div className="absolute inset-0 -z-0 opacity-40">
        <EnhancedThreeScene particleCount={2100} particleSize={0.018} speed={0.2} />
        </div>

        <div className="container relative z-10">
          <div className="flex flex-col items-center mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4 gradient-text">Skills</h2>
            <p className="text-muted-foreground max-w-[700px]">My technical expertise and professional capabilities.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, skillList], index) => (
              <SkillCardEnhanced key={category} category={category} skills={skillList} index={index} />
            ))}
          </div>
        </div>
      </SectionAnimation>

      {/* Blog Section - WITH PARTICLES */}
      <SectionAnimation id="blog" animation="fade" className="bg-muted/50 py-24 relative overflow-hidden">
        {/* Add the particle background */}
        <div className="absolute inset-0 -z-0 opacity-40">
        </div>
        <EnhancedThreeScene colorScheme="blue" particleCount={2100} particleSize={0.017} speed={0.18} />
        <div className="container relative z-10">
          <div className="flex flex-col items-center mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4 gradient-text-alt">Blog</h2>
            <p className="text-muted-foreground max-w-[700px]">
              Thoughts and insights on data science, AI, and technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.slice(0, 3).map((post, index) => (
              <SectionAnimation key={post.slug} animation="slide-up" delay={index * 0.1}>
                <Link href={`/blog/${post.slug}`} className="group h-full">
                  <div className="border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col bg-background">
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={post.coverImage || "/placeholder.svg"}
                        alt={post.title}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="font-normal text-xs">
                          {post.readingTime} min read
                        </Badge>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <p className="text-sm text-muted-foreground mb-2">{post.date}</p>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-blue-500 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 flex-1">{post.excerpt}</p>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-xs bg-muted px-2 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </SectionAnimation>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Button asChild className="animated-underline">
              <Link href="/blog">
                View All Posts <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </SectionAnimation>



      {/* Contact Section */}
      <SectionAnimation id="contact" animation="fade" className="bg-muted/50 py-24 relative overflow-hidden">
      {/* particle background */}
      <div className="absolute inset-0 -z-0 opacity-40">
      <EnhancedThreeScene
      colorScheme="purple"
      particleCount={1800}
      particleSize={0.018}
      speed={0.25}
    />
  </div>
        <div className="container">
          <div className="flex flex-col items-center mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4 gradient-text-alt">Get in Touch</h2>
            <p className="text-muted-foreground max-w-[600px]">
              If you are hiring, investing, or collaborating, I invite you to explore and connect.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <SectionAnimation animation="slide-right" delay={0.2}>
              <div className="glass p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium">Email</p>
                    <div className="space-y-1 mt-1">
                      <a
                        href="mailto:contact.harshmehta@gmail.com"
                        className="text-blue-500 hover:underline block animated-underline"
                      >
                        contact.harshmehta@gmail.com
                      </a>
                      <a
                        href="mailto:hershpmehta@gmail.com"
                        className="text-blue-500 hover:underline block animated-underline"
                      >
                        hershpmehta@gmail.com
                      </a>
                      <a
                        href="mailto:hmehta7@wisc.edu"
                        className="text-blue-500 hover:underline block animated-underline"
                      >
                        hmehta7@wisc.edu
                      </a>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <a href="tel:6082988733" className="text-blue-500 hover:underline animated-underline">
                      (608) 298-8733
                    </a>
                  </div>
                  <div>
                    <p className="font-medium">Social</p>
                    <div className="flex gap-4 mt-2">
                      <Button asChild variant="outline" size="sm" className="animated-underline">
                        <Link href="https://www.linkedin.com/in/harshpmehta/" target="_blank" rel="noopener noreferrer">
                          LinkedIn
                        </Link>
                      </Button>
                      <Button asChild variant="outline" size="sm" className="animated-underline">
                        <Link href="https://github.com/HarshMehta9000" target="_blank" rel="noopener noreferrer">
                          GitHub
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </SectionAnimation>
            <SectionAnimation animation="slide-up" delay={0.4}>
            
              <div className="glass p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Send a Message</h3>
                <ContactForm />
              </div>
            </SectionAnimation>
          </div>
        </div>
      </SectionAnimation>

      {/* Footer */}
      
      <footer className="border-t py-12 bg-background/80 backdrop-blur-sm">
      
        <div className="container flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <span className="font-bold text-xl gradient-text">Harsh Mehta</span>
          </div>
          <div className="flex items-center gap-4">
            <VisitorCounterEnhanced />
          </div>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Link
              href="https://www.linkedin.com/in/harshpmehta/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground animated-underline"
            >
              LinkedIn
            </Link>
            <Link
              href="https://github.com/HarshMehta9000"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground animated-underline"
            >
              GitHub
            </Link>
            <Link
              href="mailto:contact.harshmehta@gmail.com"
              className="text-muted-foreground hover:text-foreground animated-underline"
            >
              Email
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
