"use client";
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Search,
  Home,
  Building2,
  MapPin,
  ArrowRight,
  Star,
  ChevronRight,
  MapPinned,
  ChevronLeft,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"

// Dummy data for featured properties, services, market stats, and testimonials
const featuredProperties = [
  {
    id: 1,
    title: "Luxury Villa in Tuscany",
    price: 2500000,
    location: "Tuscany, Italy",
    image: "/images/property1.jpg",
    beds: 5,
    baths: 4,
    sqft: 4500,
    rating: 4.8,
    status: "For Sale",
  },
  {
    id: 2,
    title: "Modern Apartment in New York",
    price: 1200000,
    location: "New York, USA",
    image: "/images/property2.jpg",
    beds: 2,
    baths: 2,
    sqft: 1200,
    rating: 4.5,
    status: "For Rent",
  },
  {
    id: 3,
    title: "Charming House in Paris",
    price: 1800000,
    location: "Paris, France",
    image: "/images/property3.jpg",
    beds: 3,
    baths: 3,
    sqft: 2200,
    rating: 4.7,
    status: "For Sale",
  },
]

const services = [
  {
    title: "Property Management",
    description: "Comprehensive management services for your rental properties.",
    icon: Building2,
    link: "/services/management",
  },
  {
    title: "Real Estate Consulting",
    description: "Expert advice and guidance for buying, selling, or investing.",
    icon: Search,
    link: "/services/consulting",
  },
  {
    title: "Home Staging",
    description: "Professional staging to showcase your property's best features.",
    icon: Home,
    link: "/services/staging",
  },
  {
    title: "Relocation Assistance",
    description: "Seamless relocation services for individuals and families.",
    icon: MapPin,
    link: "/services/relocation",
  },
]

const marketStats = [
  {
    title: "Average Home Price",
    value: "$785,000",
    description: "The current average price of homes in the area.",
  },
  {
    title: "Inventory",
    value: "2,500",
    description: "The number of properties currently listed for sale.",
  },
  {
    title: "Days on Market",
    value: "45",
    description: "The average time a property stays on the market.",
  },
]

const testimonials = [
  {
    name: "John Smith",
    text: "The team at RealEstate helped us find our dream home in just a few weeks. Their expertise and dedication were outstanding!",
    rating: 5,
    location: "Los Angeles, CA",
    image: "/images/avatar1.jpg",
  },
  {
    name: "Emily Johnson",
    text: "I was impressed with the level of service and attention to detail. They made the selling process smooth and stress-free.",
    rating: 4,
    location: "New York, NY",
    image: "/images/avatar2.jpg",
  },
  {
    name: "David Brown",
    text: "RealEstate provided excellent guidance and support throughout the entire buying process. I highly recommend their services.",
    rating: 5,
    location: "Chicago, IL",
    image: "/images/avatar3.jpg",
  },
]

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isMobile = useMobile()
  const { toast } = useToast()

  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll);
  }, [])

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredProperties.length)
    }, 5000)
    return () => clearInterval(interval);
  }, [])

  const handleSubscribe = (e) => {
    e.preventDefault()
    toast({
      title: "Subscription successful!",
      description: "You'll receive our latest property updates.",
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Sticky Header */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
        )}>
        <div className="container mx-auto px-1 sm:px-1 md:px-8">
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
                className="md:hidden text-white"
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
      {/* Hero Section */}
      <section className="relative pt-0">
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />
        <Image
          src="/images/hero.jpg"
          width={1920}
          height={800}
          alt="Luxury home exterior"
          className="h-[800px] w-full object-cover"
          priority />
        <div className="absolute inset-0 flex items-center z-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}>
              <h1
                className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                Find Your Dream Home
              </h1>
              <p className="mb-8 max-w-2xl text-lg text-white/90">
                Discover the perfect property with our expert agents and comprehensive listings. Your journey to the
                ideal home starts here.
              </p>
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Button size="lg" className="bg-white text-black hover:bg-white/90">
                  Find a Home
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10">
                  List Your Property
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Search Section */}
      <section className="bg-white py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-5xl rounded-xl bg-white p-6 shadow-lg -mt-16 relative z-30"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}>
            <Tabs defaultValue="buy" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="buy">Buy</TabsTrigger>
                <TabsTrigger value="rent">Rent</TabsTrigger>
                <TabsTrigger value="sell">Sell</TabsTrigger>
              </TabsList>
              <TabsContent value="buy" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="relative md:col-span-2">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input placeholder="Enter location, ZIP, or neighborhood" className="pl-10 h-12" />
                  </div>
                  <div>
                    <select
                      className="h-12 w-full rounded-md border border-input bg-background px-3 py-2">
                      <option value="">Property Type</option>
                      <option value="house">House</option>
                      <option value="apartment">Apartment</option>
                      <option value="condo">Condo</option>
                      <option value="land">Land</option>
                    </select>
                  </div>
                  <div>
                    <select
                      className="h-12 w-full rounded-md border border-input bg-background px-3 py-2">
                      <option value="">Price Range</option>
                      <option value="100k-300k">$100k - $300k</option>
                      <option value="300k-500k">$300k - $500k</option>
                      <option value="500k-1m">$500k - $1M</option>
                      <option value="1m+">$1M+</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <Link href="#" className="text-sm text-primary flex items-center">
                    Advanced Search <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                  <Button className="px-8">Search</Button>
                </div>
              </TabsContent>
              <TabsContent value="rent" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="relative md:col-span-2">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input placeholder="Enter location, ZIP, or neighborhood" className="pl-10 h-12" />
                  </div>
                  <div>
                    <select
                      className="h-12 w-full rounded-md border border-input bg-background px-3 py-2">
                      <option value="">Property Type</option>
                      <option value="house">House</option>
                      <option value="apartment">Apartment</option>
                      <option value="condo">Condo</option>
                    </select>
                  </div>
                  <div>
                    <select
                      className="h-12 w-full rounded-md border border-input bg-background px-3 py-2">
                      <option value="">Monthly Rent</option>
                      <option value="0-1000">$0 - $1,000</option>
                      <option value="1000-2000">$1,000 - $2,000</option>
                      <option value="2000-3000">$2,000 - $3,000</option>
                      <option value="3000+">$3,000+</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <Link href="#" className="text-sm text-primary flex items-center">
                    Advanced Search <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                  <Button className="px-8">Search</Button>
                </div>
              </TabsContent>
              <TabsContent value="sell" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input placeholder="Enter your property address" className="pl-10 h-12" />
                  </div>
                  <div>
                    <select
                      className="h-12 w-full rounded-md border border-input bg-background px-3 py-2">
                      <option value="">Property Type</option>
                      <option value="house">House</option>
                      <option value="apartment">Apartment</option>
                      <option value="condo">Condo</option>
                      <option value="land">Land</option>
                    </select>
                  </div>
                </div>
                <Button className="w-full">Get Free Home Valuation</Button>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>
      {/* Featured Listings Carousel */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}>
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Featured Properties</h2>
              <p className="mt-2 text-lg text-muted-foreground">Explore our handpicked selection of premium listings</p>
            </div>
            <Link
              href="/listings"
              className="mt-4 inline-flex items-center text-primary md:mt-0">
              View all listings <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>

          {/* Carousel */}
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * (100 / (isMobile ? 1 : 3))}%)` }}>
                {featuredProperties.map((property, index) => (
                  <motion.div
                    key={property.id}
                    className={`w-full ${!isMobile ? "md:w-1/3" : ""} flex-shrink-0 px-4`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}>
                    <Card className="overflow-hidden transition-all hover:shadow-lg h-full">
                      <div className="relative">
                        <Image
                          src={property.image || "/placeholder.svg"}
                          alt={property.title}
                          width={500}
                          height={300}
                          className="h-64 w-full object-cover transition-transform duration-300 hover:scale-105" />
                        <Badge className="absolute left-4 top-4 bg-primary">{property.status}</Badge>
                        <div
                          className="absolute bottom-4 right-4 flex items-center space-x-1 rounded-md bg-black/50 px-2 py-1 text-white">
                          <MapPinned className="h-4 w-4" />
                          <span className="text-xs">{property.location}</span>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <div className="mb-2 flex items-center justify-between">
                          <h3 className="font-bold text-xl">${property.price.toLocaleString()}</h3>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="ml-1 text-sm">{property.rating}</span>
                          </div>
                        </div>
                        <h4 className="mb-4 text-lg font-medium">{property.title}</h4>
                        <div
                          className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Home className="mr-1 h-4 w-4" />
                            <span>{property.beds} beds</span>
                          </div>
                          <div className="flex items-center">
                            <Building2 className="mr-1 h-4 w-4" />
                            <span>{property.baths} baths</span>
                          </div>
                          <div>
                            <span>{property.sqft.toLocaleString()} sq ft</span>
                          </div>
                        </div>
                        <div className="mt-6">
                          <Button variant="outline" className="w-full">
                            View Property
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Carousel Controls */}
            <div className="flex justify-center mt-8 space-x-2">
              {featuredProperties.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 w-2 rounded-full transition-all ${
                    currentSlide === index ? "bg-primary w-6" : "bg-gray-300"
                  }`}
                  onClick={() => setCurrentSlide(index)} />
              ))}
            </div>

            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-all z-10 ml-2"
              onClick={() => setCurrentSlide((prev) => (prev === 0 ? featuredProperties.length - 1 : prev - 1))}>
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-all z-10 mr-2"
              onClick={() => setCurrentSlide((prev) => (prev + 1) % featuredProperties.length)}>
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}>
            <h2 className="text-3xl font-bold tracking-tight">Our Services</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              We provide comprehensive real estate services to help you buy, sell, or rent properties with confidence
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}>
                <Card className="text-center h-full hover:shadow-lg transition-all">
                  <CardContent className="pt-6 flex flex-col h-full">
                    <div
                      className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mx-auto">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mb-2 text-xl font-medium">{service.title}</h3>
                    <p className="text-muted-foreground flex-grow">{service.description}</p>
                    <Link
                      href={service.link}
                      className="mt-4 inline-flex items-center text-sm text-primary">
                      Learn more <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Market Snapshot */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}>
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Market Snapshot</h2>
              <p className="mt-2 text-lg text-muted-foreground">Current trends in the real estate market</p>
            </div>
            <Link
              href="/market-reports"
              className="mt-4 inline-flex items-center text-primary md:mt-0">
              View detailed reports <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {marketStats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}>
                <Card className="text-center h-full hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <h3 className="text-4xl font-bold text-primary">{stat.value}</h3>
                    <p className="mt-2 text-lg font-medium">{stat.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{stat.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}>
            <h2 className="text-3xl font-bold tracking-tight">What Our Clients Say</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Read testimonials from satisfied clients who found their dream homes with us
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}>
                <Card className="h-full hover:shadow-lg transition-all">
                  <CardContent className="flex h-full flex-col p-6">
                    <div className="mb-4 flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`} />
                      ))}
                    </div>
                    <p className="flex-1 text-muted-foreground">"{testimonial.text}"</p>
                    <div className="mt-6 flex items-center">
                      <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          width={40}
                          height={40}
                          className="h-full w-full object-cover" />
                      </div>
                      <div className="ml-4">
                        <p className="font-medium">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Newsletter Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}>
            <h2 className="text-3xl font-bold tracking-tight">Stay Updated</h2>
            <p className="mt-4 text-lg text-white/80">
              Subscribe to our newsletter to receive the latest property listings and market insights
            </p>
            <form
              onSubmit={handleSubscribe}
              className="mt-8 flex flex-col sm:flex-row sm:justify-center gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                required
                className="bg-white/20 border-white/30 placeholder-white/70 text-white h-12" />
              <Button type="submit" className="bg-white text-primary hover:bg-white/90 h-12">
                Subscribe
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}>
            <h2 className="text-3xl font-bold tracking-tight">Ready to Find Your Dream Home?</h2>
            <p className="mt-4 text-lg text-white/80">
              Connect with our expert agents today and start your journey to finding the perfect property
            </p>
            <div
              className="mt-8 flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Find an Agent
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10">
                Browse Properties
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Footer */}
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
                  <Link href="#" className="hover:text-white">
                    Properties
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
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
                  className="bg-white/20 border-white/30 placeholder-white/70 text-white h-10 mb-2" />
                <Button type="submit" className="bg-white text-primary hover:bg-white/90 h-10">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 text-center">
            <p>&copy; 2023 RealEstate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
