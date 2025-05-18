import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll);
  }, [])

  return (
    <>
      {/* Sticky Header */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
        )}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="relative h-10 w-10 mr-2 overflow-hidden rounded-md">
                <Image
                  src="/images/logo.png"
                  alt="RealEstate Logo"
                  width={40}
                  height={40}
                  className="object-cover" />
              </div>
              <span
                className={cn(
                  "font-bold text-xl transition-colors",
                  isScrolled ? "text-primary" : "text-white"
                )}>
                RealEstate
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/properties"
                className={cn(
                  "font-medium transition-colors hover:text-primary",
                  isScrolled ? "text-gray-700" : "text-white"
                )}>
                Properties
              </Link>
              <Link
                href="/services"
                className={cn(
                  "font-medium transition-colors hover:text-primary",
                  isScrolled ? "text-gray-700" : "text-white"
                )}>
                Services
              </Link>
              <Link
                href="/about"
                className={cn(
                  "font-medium transition-colors hover:text-primary",
                  isScrolled ? "text-gray-700" : "text-white"
                )}>
                About Us
              </Link>
              <Link
                href="/contact"
                className={cn(
                  "font-medium transition-colors hover:text-primary",
                  isScrolled ? "text-gray-700" : "text-white"
                )}>
                Contact
              </Link>
            </nav>

            {/* Search and Mobile Menu Toggle */}
            <div className="flex items-center space-x-4">
              <div
                className={cn(
                  "hidden md:flex items-center relative transition-all duration-300",
                  isScrolled ? "w-48" : "w-40"
                )}>
                <Search
                  className={cn(
                    "absolute left-3 h-4 w-4 transition-colors",
                    isScrolled ? "text-gray-500" : "text-white"
                  )} />
                <Input
                  placeholder="Search..."
                  className={cn("pl-9 h-9 transition-all", isScrolled
                    ? "bg-gray-100 border-gray-200"
                    : "bg-white/20 border-white/30 placeholder-white/70 text-white focus:bg-white/30")} />
              </div>
              <div className="hidden md:flex items-center space-x-3">
                <Button
                  variant={isScrolled ? "outline" : "outline"}
                  className={cn(!isScrolled && "border-white text-white hover:bg-white/20")}
                  asChild>
                  <Link href="/auth/login">Sign In</Link>
                </Button>
                <Button
                  variant={isScrolled ? "default" : "secondary"}
                  className={cn(!isScrolled && "bg-white text-primary hover:bg-white/90")}
                  asChild>
                  <Link href="/auth/signup">Sign Up</Link>
                </Button>
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(true)}>
                <Menu className={isScrolled ? "text-primary" : "text-white"} />
              </Button>
            </div>
          </div>
        </div>
      </header>
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col p-6">
          <div className="flex justify-between items-center mb-8">
            <Link
              href="/"
              className="flex items-center"
              onClick={() => setMobileMenuOpen(false)}>
              <div className="relative h-10 w-10 mr-2 overflow-hidden rounded-md">
                <Image
                  src="/images/logo.png"
                  alt="RealEstate Logo"
                  width={40}
                  height={40}
                  className="object-cover" />
              </div>
              <span className="font-bold text-xl text-white">RealEstate</span>
            </Link>
            <Button
              size="icon"
              variant="ghost"
              className="text-white"
              onClick={() => setMobileMenuOpen(false)}>
              <X />
            </Button>
          </div>
          <nav className="flex flex-col space-y-6 text-center">
            <Link
              href="/properties"
              className="text-white text-2xl font-medium"
              onClick={() => setMobileMenuOpen(false)}>
              Properties
            </Link>
            <Link
              href="/services"
              className="text-white text-2xl font-medium"
              onClick={() => setMobileMenuOpen(false)}>
              Services
            </Link>
            <Link
              href="/about"
              className="text-white text-2xl font-medium"
              onClick={() => setMobileMenuOpen(false)}>
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-white text-2xl font-medium"
              onClick={() => setMobileMenuOpen(false)}>
              Contact
            </Link>
          </nav>
          <div className="mt-auto">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
              <Input placeholder="Search properties..." className="pl-10 h-12 bg-white" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/20"
                asChild
                onClick={() => setMobileMenuOpen(false)}>
                <Link href="/auth/login">Sign In</Link>
              </Button>
              <Button asChild onClick={() => setMobileMenuOpen(false)}>
                <Link href="/auth/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
