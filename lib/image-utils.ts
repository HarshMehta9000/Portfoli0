// Simple utility to help with image management

// Gallery image paths
export const galleryImagePaths = {
  // Add your image paths here for easy reference
  dataVisualization1: "/images/gallery/data-visualization-1.jpg",
  ensembleAiPlatform: "/images/gallery/ensemble-ai-platform.jpg",
  financialAnalysis: "/images/gallery/financial-analysis.jpg",
  // Add more as needed
}

// Project image paths
export const projectImagePaths = {
  // Add your project image paths here
  transportationProject: "/images/projects/transportation-project.jpg",
  financialGroup: "/images/projects/financial-group.jpg",
  dataExtraction: "/images/projects/data-extraction.jpg",
  // Add more as needed
}

// Blog image paths
export const blogImagePaths = {
  // Add your blog image paths here
  automationSystems: "/images/blog/automation-systems.jpg",
  dataScience: "/images/blog/data-science.jpg",
  aiBusiness: "/images/blog/ai-business.jpg",
  // Add more as needed
}

// Helper function to get placeholder if image is missing
export function getImagePath(path: string, fallback = "/placeholder.svg"): string {
  // In a real app, you might want to check if the image exists
  return path || fallback
}
