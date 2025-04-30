import CategoryImageDisplay from "./category-image-display"

export default function HeroSection() {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <CategoryImageDisplay
          category="hero"
          alt="Hero background image"
          className="object-cover w-full h-full"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/40" />
      </div>

      <div className="relative container h-full flex flex-col justify-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 gradient-text">Harsh Mehta</h1>
        <p className="text-xl md:text-2xl max-w-[600px] text-muted-foreground">Data Scientist & AI Specialist</p>
      </div>
    </section>
  )
}
