import { getPercentageDiff } from "@/lib/util/get-precentage-diff"
import { LineItem, Region } from "@medusajs/medusa"
import clsx from "clsx"
import { formatAmount } from "@/lib/util/prices"
import { CalculatedVariant } from "@/types/medusa"

type LineItemPriceProps = {
  item: Omit<LineItem, "beforeInsert">
  region: Region
  style?: "default" | "tight"
}

const LineItemPrice = ({
  item,
  region,
  style = "default",
}: LineItemPriceProps) => {
  const originalPrice = (item.variant as CalculatedVariant)?.original_price 
    ? (item.variant as CalculatedVariant).original_price * item.quantity
    : 0;
  const hasReducedPrice = (item.total || 0) < originalPrice

  return (
    <div className="flex flex-col gap-x-2 text-ui-fg-subtle items-end">
      <div className="text-left">
        {hasReducedPrice && (
          <>
            <p>
              {style === "default" && (
                <span className="text-ui-fg-subtle">Original: </span>
              )}
              <span className="line-through text-ui-fg-muted">
                {formatAmount({
                  amount: originalPrice,
                  region: region,
                  includeTaxes: false,
                })}
              </span>
            </p>
            {style === "default" && (
              <span className="text-ui-fg-interactive">
                -{getPercentageDiff(originalPrice, item.total || 0)}%
              </span>
            )}
          </>
        )}
        <span
          className={clsx("text-base-regular", {
            "text-ui-fg-interactive": hasReducedPrice,
          })}
        >
          {formatAmount({
            amount: (item.total && item.original_tax_total &&(item.total - item.original_tax_total)) || 0,
            region: region,
          })}
        </span>
      </div>
    </div>
  )
}

export default LineItemPrice
