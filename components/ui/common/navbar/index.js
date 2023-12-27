



import Link from "next/link"
import Button from "@components/ui/common/buttons"
import { useWeb3 } from "@components/provider"
import { useRouter } from "next/router"

export default function Footer() {

  const { connect, isLoaded, isWeb3Loaded } = useWeb3()
  const router = useRouter()
  
  return (
    <section>
      <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
        <nav className="relative" aria-label="Global">
          <div className="flex justify-between">
            <div>
              <Link href="/" className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Home
              </Link>
              <Link href="/" className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Marketplace
              </Link>
              <Link href="/" className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Blogs
              </Link>
            </div>
            <div>
              <Link href="/" className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Wishlist
              </Link>
              {
                isLoaded ? "Connecting.." : 
                isWeb3Loaded ?
                <Button onClick={connect}> Connect </Button> : <Button disabled={false} onClick={() =>  window.open("https://metamask.io/download.html", "_blank")}> Install Metamask </Button> 
              }
            </div>
          </div>
        </nav>
      </div>
    </section>
  )
}
