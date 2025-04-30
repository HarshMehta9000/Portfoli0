import { galleryImagePaths } from "./image-utils"

export interface GalleryImage {
  src: string
  alt: string
  title: string
  description: string
  categories?: string[]
}

export const galleryImages: GalleryImage[] = [
  {
    src: galleryImagePaths.dataVisualization1 || "/gallery/data-visualization-1.jpg",
    alt: "Data Visualization Dashboard",
    title: "Data Visualization Dashboard",
    description: "Interactive dashboard created for UW Transportation Services showing parking usage patterns.",
    categories: ["Data Visualization", "Dashboard", "Transportation"],
  },
  {
    src: galleryImagePaths.ensembleAiPlatform || "/gallery/ensemble-ai-platform.jpg",
    alt: "Ensemble AI Platform",
    title: "Ensemble AI Platform",
    description: "The Ensemble AI venue booking platform interface showing the agent-based architecture in action.",
    categories: ["AI", "Platform", "Booking"],
  },
  {
    src: "/gallery/financial-analysis.jpg",
    alt: "Financial Analysis Model",
    title: "Financial Analysis Model",
    description: "Predictive model for financial forecasting developed for Prayas Entertainment.",
    categories: ["Finance", "Predictive Modeling", "Entertainment"],
  },
  {
    src: "/gallery/nlp-sentiment-analysis.jpg",
    alt: "NLP Sentiment Analysis",
    title: "NLP Sentiment Analysis",
    description: "Visualization of sentiment analysis performed on customer reviews for Beats by Dre.",
    categories: ["NLP", "Sentiment Analysis", "Customer Insights"],
  },
  {
    src: "/gallery/cloud-architecture.jpg",
    alt: "Cloud Architecture Diagram",
    title: "Cloud Architecture Diagram",
    description: "AWS cloud architecture designed for the MSBA Financial Group project.",
    categories: ["Cloud", "AWS", "Architecture"],
  },
  {
    src: "/gallery/data-mining-results.jpg",
    alt: "Data Mining Results",
    title: "Data Mining Results",
    description: "Results from data mining analysis showing customer segmentation patterns.",
    categories: ["Data Mining", "Customer Segmentation", "Analytics"],
  },
  {
    src: "/gallery/startup-analysis.jpg",
    alt: "Startup Analysis Dashboard",
    title: "Startup Analysis Dashboard",
    description: "Dashboard created for HP Tech Ventures to evaluate startup investment opportunities.",
    categories: ["Startups", "Investment", "Dashboard"],
  },
  {
    src: "/gallery/machine-learning-model.jpg",
    alt: "Machine Learning Model Performance",
    title: "Machine Learning Model Performance",
    description: "Performance metrics for bankruptcy prediction model with 99.19% accuracy.",
    categories: ["Machine Learning", "Model Performance", "Prediction"],
  },
  {
    src: "/gallery/audio-engineering.jpg",
    alt: "Audio Engineering Setup",
    title: "Audio Engineering Setup",
    description: "Live audio engineering setup for events at University of Wisconsin Madison.",
    categories: ["Audio", "Engineering", "Live Events"],
  },
  {
    src: "/gallery/midi-visualization.jpg",
    alt: "MIDI Data Visualization",
    title: "MIDI Data Visualization",
    description: "Visualization created from MIDI music files using the MIDI to CSV Data Tool.",
    categories: ["MIDI", "Music", "Visualization"],
  },
  {
    src: "/gallery/marketing-analytics.jpg",
    alt: "Marketing Analytics",
    title: "Marketing Analytics",
    description: "Marketing campaign performance analysis showing improved CTR and conversion rates.",
    categories: ["Marketing", "Analytics", "Performance"],
  },
  {
    src: "/gallery/job-posting-analysis.jpg",
    alt: "Job Posting Analysis",
    title: "Job Posting Analysis",
    description: "Preliminary results from the Twitter job posting analytics research project.",
    categories: ["Research", "Job Market", "Twitter"],
  },
]
