import { useMobileMenu } from "@/lib/context/mobile-menu-context"
import { useStore } from "@/lib/context/store-context"
import useCountryOptions from "@/lib/hooks/use-country-options"
import ChevronDown from "@/components/common/icons/chevron-down"
import { MagnifyingGlassMini, XMark as X } from "@medusajs/icons"
import { useCollections, useMeCustomer } from "medusa-react"
import Link from "next/link"
import ReactCountryFlag from "react-country-flag"
import { Heading } from "@medusajs/ui"
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'


const MainMenu = () => {
  const { collections } = useCollections()
  const { customer } = useMeCustomer()
  const { countryCode } = useStore()

  const countries = useCountryOptions()

  const {
    close,
    screen: [_, setScreen],
  } = useMobileMenu()

  const setScreenCountry = () => setScreen("country")
  const setScreenSearch = () => setScreen("search")


  const [showForBuyersMenu, setShowForBuyersMenu] = useState(false);
  const [showAboutCompanyMenu, setShowAboutCompanyMenu] = useState(false);

  const toggleAboutCompanyMenu = () => {
    setShowAboutCompanyMenu(!showAboutCompanyMenu);
  };

  const toggleForBuyersMenu = () => {
    setShowForBuyersMenu(!showForBuyersMenu);
  };

  const pathname = usePathname();
  // console.log('pathname', pathname)
  const [isNavigating, setIsNavigating] = useState(false);
  const [clickedPath, setClickedPath] = useState('');

  // console.log('clickedPath', clickedPath)
  // Initialize clickedPath with the current pathname when the component mounts
  useEffect(() => {
    setClickedPath(pathname);
  }, [pathname]);

  useEffect(() => {
    // Determine if navigation is occurring
    setIsNavigating(pathname !== clickedPath);
  }, [pathname, clickedPath]);

  // Function to handle link clicks
  const handleLinkClick = (targetPath: string) => {
    // Split the targetPath at "#" and take the first part (the URL without the hash)
    const pathWithoutHash = targetPath.split('#')[0];
  
    // Check if the target path without hash is the same as the current pathname
    if (pathWithoutHash === pathname) {
      console.log("Already on the same page:", pathWithoutHash);
      // Do not proceed with navigation
      return;
    }
  
    console.log("Link clicked with path:", pathWithoutHash);
    setClickedPath(pathWithoutHash); // Update clickedPath to the target path without the hash
    setIsNavigating(true); // Assume navigation is starting
  };
  
  
  
  return (
    <div className="flex flex-col flex-1">
      <div className="flex items-center justify-between w-full border-b border-gray-200 p-6">
        <div className="flex-1 basis-0">
          <button
            className="flex items-center gap-x-2"
            onClick={setScreenCountry}
          >
            <ReactCountryFlag countryCode={countryCode || "in"} svg />
            <ChevronDown />
          </button>
        </div>

        <Heading className="txt-compact-xlarge-plus text-ui-fg-subtle uppercase">
          Dhruv crafts house
        </Heading>

        <div className="flex-1 basis-0 flex justify-end">
          <button onClick={close}>
            <X />
          </button>
        </div>
      </div>

      <div className="space-y-6 flex-1 flex flex-col justify-between p-6">
        {/* {process.env.FEATURE_SEARCH_ENABLED && ( */}
          <button
            className="bg-gray-50 flex items-center px-4 py-2 gap-x-2 text-ui-fg-muted rounded-rounded"
            onClick={setScreenSearch}
          >
            <MagnifyingGlassMini />
            <span className="text-base-regular">
              Search products
            </span>
          </button>
        {/* )} */}

        <div className="flex flex-col flex-1 text-large-regular text-gray-900">
          <ul className="flex flex-col gap-y-2">
            <li className="bg-gray-50 p-4 rounded-rounded">
              <Link href="/store"
              //  onClick={() => handleLinkClick(`/store`)}
               >
                <button
                  className="flex items-center justify-between w-full"
                  onClick={close}
                >
                  <span className="sr-only">Go to Store</span>
                  <span>Store</span>
                  <ChevronDown className="-rotate-90" />
                </button>
              </Link>
            </li>
            {collections ? (
              <>
                {collections.map((collection) => (
                  <li
                    key={collection.id}
                    className="bg-gray-50 p-4 rounded-rounded"
                  >
                    <Link href={`/collections/${collection.handle}`}
                    //  onClick={() => handleLinkClick(`/collections/${collection.handle}`)}
                     >
                      <button
                        className="flex items-center justify-between w-full"
                        onClick={close}
                      >
                        <span className="sr-only">
                          Go to {collection.title} collection
                        </span>
                        <span>{collection.title}</span>
                        <ChevronDown className="-rotate-90" />
                      </button>
                    </Link>
                  </li>
                ))}
              </>
            ) : null}
          </ul>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-col gap-y-8 text-small-regular">
            <div className="flex flex-col gap-y-4 ">
              <Link href={`/wishlist`} passHref 
              // onClick={() => handleLinkClick(`/wishlist`)}
              >
                <button
                  className="flex items-center justify-between border-b border-gray-200 py-2 w-full"
                  onClick={close}
                >
                  {/* <span className="sr-only">Go to sign in page</span> */}
                  <span className="normal-case">FAVORITES</span>
                  <ChevronDown className="-rotate-90" />
                </button>
              </Link>
            </div>
            {!customer ? (
              <div className="flex flex-col gap-y-4 ">
                <span className="text-gray-700 uppercase">Account</span>
                <Link href={`/account/login`} passHref 
                // onClick={() => handleLinkClick(`/account/login`)}
                >
                  <button
                    className="flex items-center justify-between border-b border-gray-200 py-2 w-full"
                    onClick={close}
                  >
                    <span className="sr-only">Go to sign in page</span>
                    <span className="normal-case">Sign in</span>
                    <ChevronDown className="-rotate-90" />
                  </button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-y-4">
                <span className="text-gray-700 uppercase">Signed in as</span>
                <Link href={`/account`} passHref 
                // onClick={() => handleLinkClick(`/account/login`)}
                >
                  <button
                    className="flex items-center justify-between border-b border-gray-200 py-2 w-full"
                    onClick={close}
                  >
                    <span className="sr-only">Go to account page</span>
                    <span className="normal-case">{customer.email}</span>
                    <ChevronDown className="-rotate-90" />
                  </button>
                </Link>
              </div>
            )}
             {/* FOR BUYERS Section */}
             <div className="flex flex-col gap-y-4 ">
              <button
                className="flex items-center justify-between border-b border-gray-200 py-2 w-full"
                onClick={toggleForBuyersMenu}
              >
                <span className="text-gray-700 uppercase">FOR BUYERS</span>
                <ChevronDown className={`transform transition-transform ${showForBuyersMenu ? '-rotate-180' : '-rotate-90'}`} />
              </button>
              {showForBuyersMenu && (
                <ul className="pl-4">
                  <li><Link href="/" onClick={() =>{
                    //  handleLinkClick(`/`)
                     close();
                    }}>GUARANTEES</Link></li>
                  <li><Link href="/refundandcancellation" onClick={() => {
                    // handleLinkClick(`/refundandcancellation`)
                    close();
                  }}>REFUND AND CANCELLATION POLICY</Link></li>
                  <li><Link href="/shippinganddelivery" onClick={() => {
                    // handleLinkClick(`/shippinganddelivery`)
                    close();
                  }}>SHIP AND DELIVERY POLICY</Link></li>
                  <li><Link href="/" onClick={() => {
                    // handleLinkClick(`/`)
                    close();
                  }}>QUESTIONS AND ANSWERS</Link></li>
                  <li><Link href="/" onClick={() => {
                    // handleLinkClick(`/`)
                    close();
                  }}>BLOG</Link></li>
                  <li><Link href="/contact" onClick={() => {
                    // handleLinkClick(`/contact`)
                    close();
                  }}>ASK A QUESTION</Link></li>
                  <li><Link href="/contact" onClick={() => {
                    // handleLinkClick(`/contact`)
                    close();
                  }}>CONTACT US</Link></li>
                  <li><Link href="/termsandconditions" onClick={() => {
                    // handleLinkClick(`/termsandconditions`)
                    close();
                  }}>TERMS AND CONDITIONS</Link></li>
                  <li><Link href="/privacypolicy" onClick={() => {
                    // handleLinkClick(`/privacypolicy`)
                    close();
                  }}>PRIVACY POLICY</Link></li>
                </ul>
              )}
            </div>
            {/* About Company Section */}
            <div className="flex flex-col gap-y-4 ">
              <button
                className="flex items-center justify-between border-b border-gray-200 py-2 w-full"
                onClick={toggleAboutCompanyMenu}
              >
                <span className="text-gray-700 uppercase">ABOUT COMPANY</span>
                <ChevronDown className={`transform transition-transform ${showAboutCompanyMenu ? '-rotate-180' : '-rotate-90'}`} />
              </button>
              {showAboutCompanyMenu && (
                <ul className="pl-4">
                  <li>ABOUT</li>
                  <li>SOCIAL RESPONSIBILITY</li>
                  <li>ENVIRONMENTAL RESPONSIBILITY</li>
                </ul>
              )}
            </div>
           
            <div className="flex flex-col gap-y-4">
              <span className="text-gray-700 uppercase">Delivery</span>
              <button
                className="flex items-center justify-between border-b border-gray-200 py-2"
                onClick={setScreenCountry}
              >
                <span className="sr-only">
                  Click to select shipping country
                </span>
                <div className="flex items-center gap-x-2">
                  <ReactCountryFlag countryCode={countryCode || "us"} svg />
                  <span className="normal-case">
                    Shipping to{" "}
                    {countries?.find((c) => c.country === countryCode)?.label}
                  </span>
                </div>
                <ChevronDown className="-rotate-90" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainMenu