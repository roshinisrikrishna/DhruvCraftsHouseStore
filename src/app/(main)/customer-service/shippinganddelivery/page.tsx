import { Metadata } from "next"
import ShippingandDeliveryTemplate from "@modules/customer-service/shippinganddelivery/templates"


export const metadata: Metadata = {
  title: "ShippingandDelivery",
  description: "Explore all of our products.",
}

export default function WishlistPage() {
  return <ShippingandDeliveryTemplate />
}
