import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { imageCategories } from "@/lib/image-categories"
import ImageCategoryManager from "@/components/image-category-manager"

export const metadata: Metadata = {
  title: "Image Management | Admin",
  description: "Manage images for your portfolio site",
}

export default function ImageManagementPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-2">Image Management</h1>
      <p className="text-muted-foreground mb-6">
        Upload and manage images for specific sections of your portfolio site
      </p>

      <Tabs defaultValue="categories" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="categories">By Category</TabsTrigger>
          <TabsTrigger value="all">All Images</TabsTrigger>
        </TabsList>

        <TabsContent value="categories">
          <div className="grid gap-8">
            {imageCategories.map((category) => (
              <Card key={category.id}>
                <CardHeader>
                  <CardTitle>{category.name}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ImageCategoryManager category={category} />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Images</CardTitle>
              <CardDescription>View and manage all uploaded images across your site</CardDescription>
            </CardHeader>
            <CardContent>
              <ImageCategoryManager showAllImages />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
