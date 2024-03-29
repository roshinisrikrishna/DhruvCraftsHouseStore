import { Metadata } from "next"
import ContactTemplate from "@modules/customer-service/contact/templates"


export const metadata: Metadata = {
  title: "Contact",
  description: "Explore all of our products.",
}

export default function WishlistPage() {
  return <ContactTemplate />
}
