import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import { NextPage } from "next"
import { AppProps } from "next/app"
import { ReactElement, ReactNode } from "react"
import { Region, Cart } from "@medusajs/medusa"

export type CollectionData = {
  id: string
  title: string
}
export type RegionInfo = Pick<Region, "currency_code" | "tax_code" | "tax_rate">

export type CartWithCheckoutStep = Omit<
  Cart,
  "beforeInsert" | "beforeUpdate" | "afterUpdateOrLoad"
> & {
  checkout_step: "address" | "delivery" | "payment"
}

export type FeaturedProduct = {
  id: string
  title: string
  handle: string
  thumbnail?: string
}

export type StoreNavData = {
  collections: CollectionData[]
  hasMoreCollections: boolean
  featuredProducts: PricedProduct[]
}

// page props for store pages (products and collection pages)
export type StoreProps<T extends unknown> = {
  page: {
    data: T
  }
}

// page props for non-store pages (home, about, contact, etc)
export type SiteProps = {
  site: {
    navData: StoreNavData
  }
}

export type PrefetchedPageProps = {
  notFound: boolean
}

// For pages with nested layouts
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout: (page: ReactElement) => ReactNode
}

export type AppPropsWithLayout<P = {}, IP = P> = AppProps<P> & {
  Component: NextPageWithLayout<P, IP>
}

export type ProductPreviewType = {
  id: string
  title: string
  handle: string | null
  thumbnail: string | null
  created_at?: Date
  price?: {
    calculated_price: string
    original_price: string
    difference: string
    price_type: "default" | "sale"
  }
  isFeatured?: boolean
  buy_get_num?: number
  buy_get_offer?: number
  sales_quantity?: number
  discountCode?: string
  video?: string
}

export type InfiniteProductPage = {
  response: {
    products: PricedProduct[]
    count: number
  }
}
