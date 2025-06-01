// Define the structure for image categories
export interface ImageCategory {
  id: string
  name: string
  description: string
  folder: string
  maxImages?: number
  allowedTypes?: string[]
  maxSizeMB?: number
  dimensions?: {
    width?: number
    height?: number
    aspectRatio?: number
  }
}

// Define all available image categories in the application
export const imageCategories: ImageCategory[] = [
  {
    id: "hero",
    name: "Hero Section",
    description: "Main hero image displayed at the top of the homepage",
    folder: "hero",
    maxImages: 1,
    dimensions: {
      aspectRatio: 16 / 9,
    },
  },
  {
    id: "gallery",
    name: "Gallery",
    description: "Images displayed in the portfolio gallery section",
    folder: "gallery",
  },
  {
    id: "experience",
    name: "Experience",
    description: "Images for experience/work history entries",
    folder: "experience",
  },
  {
    id: "projects",
    name: "Projects",
    description: "Images for project showcases",
    folder: "projects",
  },
  {
    id: "blog",
    name: "Blog Posts",
    description: "Cover images for blog posts",
    folder: "blog",
    dimensions: {
      aspectRatio: 16 / 9,
    },
  },
  {
    id: "skills",
    name: "Skills",
    description: "Icons or images representing skills",
    folder: "skills",
    maxSizeMB: 1,
  },
  {
    id: "about",
    name: "About Me",
    description: "Personal photos or images for the about section",
    folder: "about",
    maxImages: 3,
  },
]

// Helper function to get a category by ID
export function getCategoryById(id: string): ImageCategory | undefined {
  return imageCategories.find((category) => category.id === id)
}

// Helper function to get folder path for a category
export function getCategoryFolderPath(categoryId: string): string {
  const category = getCategoryById(categoryId)
  return category ? category.folder : "general"
}
