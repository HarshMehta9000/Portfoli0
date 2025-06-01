export interface Experience {
  slug: string
  title: string
  description: string
  date: string
  location?: string
  coverImage: string
  logo?: string            // <- added
  tags: string[]
  technologies: string[]
  images: string[]
  links?: {
    title: string
    url: string
  }[]
  content: {
    overview: string
    challenge: string
    solution: string
    thoughts: string
    achievements?: string[]
  }
}

export const experiences: Experience[] = [
  {
    slug: "ensemble-ai",
    title: "Ensemble AI",
    description: "AI powered venue booking platform using agent based architecture (n8n, A2A)",
    date: "Feb 2025 - Present",
    location: "Madison, WI / Remote",
    coverImage: "/nsflogo.jpg",
    logo: "/logo/nsflogo.jpg",
    tags: ["AI", "Founder", "Platform"],
    technologies: ["n8n", "A2A Protocol", "ML", "Python", "AWS"],
    images: ["/nsficorps.png", "/teonsf.png"],
    links: [
      {
        title: "Website",
        url: "https://teo.wisc.edu/nsf-i-corps/",
      },
    ],
    content: {
      overview:
        "Leading the development of Ensemble AI, an AI powered venue booking platform using agent based architecture (n8n, A2A). Focused on real time sync and secure payments, the platform has reduced average booking time by 40% and increased conversion rates by 35% via ML recommendations. Selected for the NSF I-Corps program to explore commercial scaling.",
      challenge:
        "The main challenge was creating a seamless booking experience that could handle complex venue availability, pricing variations, and real-time synchronization across multiple calendars and payment systems. We needed to build an intelligent system that could understand user preferences and make relevant recommendations.",
      solution:
        "We developed an agent-based architecture using n8n and A2A protocol that allows for intelligent automation of the booking process. The system uses machine learning to understand user preferences and make personalized venue recommendations. We implemented secure payment processing and real-time calendar synchronization to ensure a smooth booking experience.",
      thoughts:
        "Building Ensemble AI has been an exciting journey that combines my passion for AI, automation, and solving real business problems. The NSF I-Corps program has provided valuable insights and connections to help scale the platform. I'm particularly proud of how we've been able to reduce booking time by 40% and increase conversion rates through intelligent recommendations.",
      achievements: [
        "Reduced average booking time by 40% through intelligent automation",
        "Increased conversion rates by 35% using ML-powered recommendations",
        "Selected for the NSF I-Corps program for commercial scaling",
        "Implemented secure payment processing and real-time calendar synchronization",
        "Developed a scalable agent-based architecture using n8n and A2A protocol",
      ],
    },
  },
  {
    slug: "hp-tech-ventures",
    title: "HP Tech Ventures",
    description:
      "Evaluated startups for investment by analyzing data with Python and developing Snowflake ETL framework",
    date: "Jul 2024 - Aug 2024",
    location: "Remote",
    logo: "/logo/hptvlogo.png", 
    coverImage: "/hp-tech-ventures-cover.jpg",
    tags: ["Business Analysis", "Data", "Investment"],
    technologies: ["Python", "Numpy", "Pandas", "Snowflake", "SQL", "Databricks", "Excel"],
    images: ["/hp-tech-ventures-1.jpg", "/hp-tech-ventures-2.jpg"],
    links: [
      {
        title: "HP Tech Ventures",
        url: "https://www.hptechventures.com/",
      },
    ],
    content: {
      overview:
        "Evaluated over 30 startups for HP Tech Ventures, identifying high potential investment targets by analyzing 50k+ data points with Python (Numpy/Pandas). Developed a Snowflake ETL framework that improved data management efficiency by 32%. Also utilized SQL, Databricks, and Excel automation for analysis.",
      challenge:
        "The main challenge was processing and analyzing large volumes of disparate data to identify promising investment opportunities. We needed to develop a systematic approach to evaluate startups across multiple dimensions and create a data pipeline that could efficiently process and store this information.",
      solution:
        "I developed a comprehensive data analysis framework using Python (Numpy/Pandas) to process and analyze over 50,000 data points related to startup performance, market trends, and growth potential. I also created a Snowflake ETL framework that improved data management efficiency by 32%, making it easier to integrate and analyze data from multiple sources.",
      thoughts:
        "Working with HP Tech Ventures provided valuable insights into the venture capital ecosystem and the criteria used to evaluate startups for investment. The experience strengthened my data analysis skills and gave me a deeper understanding of how data-driven decision making can inform investment strategies.",
      achievements: [
        "Evaluated over 30 startups for potential investment opportunities",
        "Analyzed 50,000+ data points using Python (Numpy/Pandas)",
        "Developed a Snowflake ETL framework improving data management efficiency by 32%",
        "Created automated analysis workflows using SQL, Databricks, and Excel",
        "Presented data-driven investment recommendations to senior leadership",
      ],
    },
  },
  {
    slug: "beats-by-dre",
    title: "Beats by Dre",
    description:
      "Led competitive analysis and gathered consumer insights using Python NLP to boost marketing effectiveness",
    date: "May 2024 - Jun 2024",
    location: "Remote",
    coverImage: "/beats-by-dre-cover.jpg",
    logo: "/logo/beatsbydrelogo.png",             // <- added
    tags: ["Business Analysis", "Marketing", "NLP"],
    technologies: ["Python", "NLP", "Tableau", "Power BI", "Market Research"],
    images: ["/beats-by-dre-1.jpg", "/beats-by-dre-2.jpg"],
    links: [
      {
        title: "Beats by Dre",
        url: "https://www.beatsbydre.com/",
      },
    ],
    content: {
      overview:
        "Spearheaded competitive analysis for the Beats Pill, informing a pricing strategy that increased sales volume by 10%. Gathered insights from Gen Z consumers (interviews, surveys) and analyzed 2k+ weekly reviews using Python NLP, boosting marketing engagement (+15%) and effectiveness (+11%). Presented data backed recommendations using Tableau/Power BI.",
      challenge:
        "The challenge was to understand the competitive landscape for the Beats Pill and gather meaningful insights from Gen Z consumers to inform marketing and pricing strategies. We needed to process and analyze large volumes of consumer feedback and market data to identify trends and opportunities.",
      solution:
        "I conducted a comprehensive competitive analysis for the Beats Pill and developed a pricing strategy that led to a 10% increase in sales volume. I gathered insights from Gen Z consumers through interviews and surveys, and used Python NLP to analyze over 2,000 weekly reviews. The insights from this analysis helped boost marketing engagement by 15% and effectiveness by 11%.",
      thoughts:
        "This project demonstrated the power of combining traditional market research methods with advanced data analysis techniques. The insights gained from the NLP analysis of consumer reviews provided valuable information that might have been missed through traditional methods alone. The experience reinforced my belief in the importance of data-driven decision making in marketing and product development.",
      achievements: [
        "Developed pricing strategy that increased sales volume by 10%",
        "Analyzed 2,000+ weekly customer reviews using Python NLP",
        "Improved marketing engagement by 15% and effectiveness by 11%",
        "Created interactive data visualizations using Tableau and Power BI",
        "Conducted consumer research through interviews and surveys with Gen Z target audience",
      ],
    },
  },
  {
    slug: "prayas-entertainment",
    title: "Prayas Entertainment",
    description: "Boosted operational efficiency and revenue through data analytics and predictive modeling",
    date: "Jan 2021 - Apr 2023",
    location: "Mumbai, India",
    coverImage: "/prayas-entertainment-cover.jpg",
    logo: "/logo/Prayaslogo.png",                 // <- added
    tags: ["Business Analysis", "Data Analytics", "Forecasting"],
    technologies: ["Predictive Modeling", "Data Mining", "Tableau", "Power BI", "Financial Forecasting"],
    images: ["/prayas-entertainment-1.jpg", "/prayas-entertainment-2.jpg"],
    content: {
      overview:
        "Boosted operational efficiency by 35% and annual revenue by 10% at Prayas Entertainment through data analytics and predictive modeling. Developed effective financial forecasting models and implemented customer segmentation using data mining, increasing CLV by 15% and retention by 10%. Deployed Tableau/Power BI dashboards to enhance decision making.",
      challenge:
        "The main challenge was optimizing operational efficiency and increasing revenue in a competitive entertainment industry. We needed to develop data-driven strategies to improve customer retention, increase lifetime value, and make better financial forecasts to guide business decisions.",
      solution:
        "I implemented data analytics and predictive modeling techniques that boosted operational efficiency by 35% and annual revenue by 10%. I developed financial forecasting models that improved budget planning and resource allocation. I also implemented customer segmentation using data mining techniques, which increased customer lifetime value by 15% and retention by 10%.",
      thoughts:
        "This role allowed me to apply my data science skills to solve real business problems in the entertainment industry. The impact of the data-driven strategies on operational efficiency and revenue growth demonstrated the value of analytics in business decision making. The experience reinforced my passion for using data to drive business success.",
      achievements: [
        "Improved operational efficiency by 35% through data analytics",
        "Increased annual revenue by 10% using predictive modeling",
        "Enhanced customer lifetime value by 15% through segmentation",
        "Improved customer retention by 10% with targeted strategies",
        "Developed financial forecasting models for better resource allocation",
      ],
    },
  },
  {
    slug: "indigo-events",
    title: "Indigo Events & Promotions",
    description: "Directed data-driven media strategies that improved customer satisfaction and lead conversions",
    date: "Mar 2017 - Mar 2020",
    location: "Mumbai, India",
    coverImage: "/indigo-events-cover.jpg",
    logo: "/logo/IndigoEvents.jpg",               // <- added
    tags: ["Data Analysis", "Digital Marketing", "Media Strategy"],
    technologies: ["Google Analytics", "BI Tools", "Data Analysis", "Digital Marketing"],
    images: ["/indigo-events-1.jpg", "/indigo-events-2.jpg"],
    content: {
      overview:
        "Directed data driven media strategies that improved customer satisfaction (+30%) and lead conversions (+21%). Optimized digital marketing campaigns using Google Analytics and BI tools, achieving a 40% higher CTR, 20% lower CPA, 25% conversion rate increase, and 10% ROI rise. Also implemented a data focused application that boosted customer engagement by 27%.",
      challenge:
        "The challenge was to improve the effectiveness of digital marketing campaigns and increase customer engagement and satisfaction. We needed to develop data-driven media strategies that could optimize campaign performance and drive measurable business results.",
      solution:
        "I directed data-driven media strategies that improved customer satisfaction by 30% and lead conversions by 21%. I optimized digital marketing campaigns using Google Analytics and BI tools, which resulted in a 40% higher click-through rate, 20% lower cost per acquisition, 25% increase in conversion rate, and 10% rise in ROI. I also implemented a data-focused application that boosted customer engagement by 27%.",
      thoughts:
        "This role taught me the importance of using data to guide marketing strategies and measure campaign performance. The significant improvements in key metrics demonstrated the value of a data-driven approach to digital marketing. The experience shaped my understanding of how data analysis can drive business growth and customer engagement.",
      achievements: [
        "Improved customer satisfaction by 30% through data-driven strategies",
        "Increased lead conversions by 21% with optimized campaigns",
        "Achieved 40% higher CTR and 20% lower CPA in digital marketing",
        "Boosted conversion rates by 25% and ROI by 10%",
        "Developed a data application that increased customer engagement by 27%",
      ],
    },
  },
  {
    slug: "uw-transportation",
    title: "UW Transportation Services Campus Parking Efficiency Project",
    description: "Analyzed parking transaction records to improve resource allocation and reduce search time",
    date: "2024",
    location: "Madison, WI",
    coverImage: "/uw-transportation-cover.jpg",
    logo: "/logo/UWTSLogo.png",                   // <- added
    tags: ["Data Analysis", "Predictive Modeling", "Resource Optimization"],
    technologies: ["Python", "SQL", "Snowflake", "Tableau", "Power BI"],
    images: ["/uw-transportation-1.jpg", "/uw-transportation-2.jpg"],
    links: [
      {
        title: "GitHub Repository",
        url: "https://github.com/HarshMehta9000/LIS620Parking",
      },
    ],
    content: {
      overview:
        "Analyzed 11M+ parking transaction records using Python, SQL, and Snowflake to uncover usage patterns and weather impacts. Developed predictive models and interactive dashboards (Tableau/Power BI) that cut average parking search time by 27% and improved resource allocation.",
      challenge:
        "The challenge was to analyze a large volume of parking transaction data to identify patterns and optimize resource allocation. We needed to understand how weather and other factors affected parking usage and develop predictive models to guide decision making.",
      solution:
        "I analyzed over 11 million parking transaction records using Python, SQL, and Snowflake to uncover usage patterns and understand the impact of weather on parking behavior. I developed predictive models that could forecast parking demand based on various factors. I also created interactive dashboards using Tableau and Power BI that provided insights to decision makers.",
      thoughts:
        "This project demonstrated the power of data analysis in solving practical problems. By analyzing parking transaction data, we were able to reduce average parking search time by 27% and improve resource allocation. The project reinforced my belief in the value of data-driven decision making in optimizing operations and improving user experience.",
      achievements: [
        "Analyzed 11M+ parking transaction records using Python, SQL, and Snowflake",
        "Reduced average parking search time by 27% through predictive modeling",
        "Improved resource allocation with data-driven insights",
        "Created interactive dashboards using Tableau and Power BI",
        "Identified correlations between weather patterns and parking usage",
      ],
    },
  },
  {
  slug: "uw-music-library",
  title: "Student Assistant – UW-Madison Music Library",
  description:
    "Curated, catalogued, and dispatched thousands of music-collection items while modernising data workflows for campus-wide access.",
  date: "Oct 2023 – May 2025",
  location: "Madison, WI (On-site/On-campus)",
  coverImage: "/expp.jpg",
  logo: "/logo/uwmmml.jpg",
  tags: ["Library Services", "Music Collection", "Data Operations"],
  technologies: [
    "Ex Libris Alma",
    "SQL",
    "Python",
    "R",
    "MySQL",
    "Data Visualisation",
  ],
  images: [
    "/expp.jpg",        // reuse or add additional photos
  ],
  links: [
    {
      title: "UW-Madison Music Library",
      url: "https://www.library.wisc.edu/music/",
    },
  ],
  content: {
    overview:
      "Manage and organise a diverse catalogue of books, CDs, LPs, cassettes, DVDs, and legacy analog formats. Streamlined metadata workflows in Alma and optimised shelving and retrieval, accelerating patron requests across campus and to partner libraries statewide.",
    challenge:
      "Legacy cataloguing practices slowed fulfilment and obscured collection visibility. Needed a scalable way to surface 30 000+ music items spanning multiple media formats.",
    solution:
      "Refactored item records in Alma, introduced scripted bulk-updates via SQL/Python, and redesigned the physical layout for faster pick/pack. Built dashboards in R/Python to monitor circulation KPIs.",
    thoughts:
      "The role blends my love for music with data engineering: every improvement translates into richer discovery for artists, students, and researchers.",
    achievements: [
      "Cut average request-turnaround from 24 h to 6 h",
      "Re-catalogued 5 000 legacy LPs and cassettes for digital discovery",
      "Created visual dashboards that highlight collection-usage trends",
    ],
  },
},

]
