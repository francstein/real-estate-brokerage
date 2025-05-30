"use client";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export function SiteFooter() {
  const [email, setEmail] = useState("")
  const { toast } = useToast()

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      toast({
        title: "Subscription successful!",
        description: "You'll receive our latest property updates.",
      })
      setEmail("")
    }
  }

  return (
    <footer className="bg-gray-900 py-12 text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-medium text-white">About Us</h3>
            <p className="mb-4">
              A premier real estate brokerage with over 20 years of experience helping clients find their dream homes.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-white">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd" />
                </svg>
              </Link>
              <Link href="#" className="hover:text-white">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true">
                  <path
                    d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link href="#" className="hover:text-white">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd" />
                </svg>
              </Link>
              <Link href="#" className="hover:text-white">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-medium text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/properties" className="hover:text-white">
                  Properties
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-medium text-white">Contact Us</h3>
            <p className="mb-2">123 Main Street, Anytown, CA 12345</p>
            <p className="mb-2">
              Email:{" "}
              <Link href="mailto:info@realestate.com" className="hover:text-white">
                info@realestate.com
              </Link>
            </p>
            <p>Phone: (123) 456-7890</p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-medium text-white">Subscribe</h3>
            <p className="mb-4">Stay up-to-date with our latest property listings and market insights.</p>
            <form onSubmit={handleSubscribe} className="flex flex-col">
              <Input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/20 border-white/30 placeholder-white/70 text-white h-10 mb-2" />
              <Button type="submit" className="bg-white text-primary hover:bg-white/90 h-10">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} RealEstate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
