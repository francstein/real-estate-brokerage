import Link from "next/link"
import { Home } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PropertyNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <div
          className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <Home className="h-12 w-12 text-gray-400" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Property Not Found</h1>
        <p className="text-gray-600 mb-8">
          We couldn't find the property you're looking for. It may have been sold or removed from our listings.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/properties">Browse Properties</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
