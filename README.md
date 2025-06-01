# Portfolio Site Image Management

This document provides instructions for managing images in your portfolio site.

## Image Management System

The portfolio site includes a comprehensive image management system that makes it easy to add, replace, and delete images from both the backend and frontend.

### Features

- **Vercel Blob Storage Integration**: Secure and scalable image storage
- **Image Optimization**: Automatic resizing and compression of images
- **Admin Interface**: User-friendly interface for managing images
- **Drag-and-Drop Uploads**: Easy image uploading with preview
- **Gallery Management**: Organize and categorize your portfolio images
- **Image Editing**: Update image metadata and categories

## How to Use

### Accessing the Admin Interface

1. Navigate to `/admin/login` in your browser
2. Enter the admin password (default: `admin123`)
3. You'll be redirected to the admin dashboard

### Adding Images

1. Go to `/admin/images` in the admin interface
2. Click the "Upload New Image" tab or "Add Image" button
3. Drag and drop an image or click to browse
4. Fill in the image details (title, description, category)
5. Adjust optimization settings if needed
6. Click "Upload Image"

### Managing Gallery Images

1. Go to `/admin/images` in the admin interface
2. Use the search and filter options to find images
3. Click the edit icon to update image details
4. Click the delete icon to remove an image

### Image Optimization Options

- **Quality**: Adjust the compression level (40-100%)
- **Format**: Choose between JPEG, PNG, WebP, or AVIF
- **Thumbnails**: Automatically generate thumbnails for gallery views

## Technical Details

### Image Storage

Images are stored in Vercel Blob Storage, which provides:
- Global CDN distribution
- Automatic optimization
- Secure access controls

### API Endpoints

- `POST /api/images/upload`: Upload a new image
- `POST /api/images/optimized-upload`: Upload and optimize an image
- `POST /api/images/delete`: Delete an image
- `GET /api/images/list`: List images in a folder

## Best Practices

1. **Image Preparation**:
   - Resize images to appropriate dimensions before uploading
   - Use descriptive filenames
   - Remove unnecessary metadata

2. **Optimization**:
   - Use WebP format for best compression/quality ratio
   - Set quality to 80% for most images (70% for larger files)
   - Generate thumbnails for gallery images

3. **Organization**:
   - Use consistent naming conventions
   - Add detailed descriptions and alt text
   - Categorize images appropriately

## Troubleshooting

If you encounter issues with image management:

1. Check browser console for errors
2. Verify Vercel Blob Storage configuration
3. Ensure image files meet size and format requirements
4. Clear browser cache and try again

For additional help, refer to the [Vercel Blob documentation](https://vercel.com/docs/storage/vercel-blob).
