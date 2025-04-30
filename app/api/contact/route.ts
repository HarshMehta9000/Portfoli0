import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    // Parse the form data
    const formData = await request.formData()
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

    // Validate the data
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Store the contact information
    // In a real app, you would store this in a database
    const contactData = {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
    }

    // Log the data (for demonstration purposes)
    console.log("Contact form submission:", contactData)

    // Store in localStorage (for demonstration purposes)
    // In a real app, you would use a database
    const storedContacts = localStorage.getItem("contactSubmissions") || "[]"
    const contacts = JSON.parse(storedContacts)
    contacts.push(contactData)
    localStorage.setItem("contactSubmissions", JSON.stringify(contacts))

    // Send email (in a real app)
    // This is a placeholder for the email sending logic
    // You would use a service like SendGrid, AWS SES, or Nodemailer
    const emailSent = await sendEmail({
      to: ["contact.harshmehta@gmail.com", "hershpmehta@gmail.com", "hmehta7@wisc.edu"],
      from: "website@harshmehta.dev",
      subject: `New Contact Form: ${subject}`,
      text: `
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        
        Message:
        ${message}
      `,
    })

    return NextResponse.json({ success: true, message: "Contact form submitted successfully" })
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json({ error: "Failed to process contact form" }, { status: 500 })
  }
}

// Mock email sending function
// In a real app, you would use a proper email service
async function sendEmail(options: {
  to: string[]
  from: string
  subject: string
  text: string
}) {
  // Simulate sending an email
  console.log("Sending email:", options)

  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Return success
  return { success: true }
}
