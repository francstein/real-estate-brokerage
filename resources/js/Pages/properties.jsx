import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Search,
  Home,
  MapPin,
  ChevronRight,
  Filter,
  Bed,
  Bath,
  X,
  ChevronLeft,
  Heart,
  Share2,
  Map,
  Grid,
  ArrowRight,
  Star,
  Coffee,
  Utensils,
  School,
  ShoppingBag,
  Car,
  Wifi,
  Tv,
  Snowflake,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

// Mock property listings data
const properties = [
  {
    id: "prop-101",
    title: "Luxury Waterfront Villa",
    price: 4750000,
    beds: 5,
    baths: 6,
    sqft: 6200,
    images: ["/images/property-detail-1.jpg", "/images/property-1.jpg", "/images/property-2.jpg"],
    address: "123 Oceanview Drive, Malibu, CA 90265",
    status: "For Sale",
    propertyType: "Single Family",
    featured: true,
    yearBuilt: 2018,
    garage: 3,
    description: "Stunning waterfront villa with panoramic ocean views, private pool, and direct beach access.",
    features: ["Pool", "Waterfront", "Home Theater", "Wine Cellar", "Smart Home"],
    location: { lat: 34.025922, lng: -118.779757 },
    rating: 4.9,
    reviews: 28,
    agent: {
      name: "Jennifer Parker",
      image: "/images/testimonial-1.jpg",
      phone: "(310) 555-1234",
    },
  },
  {
    id: "prop-102",
    title: "Modern Beachfront Condo",
    price: 3200000,
    beds: 3,
    baths: 3.5,
    sqft: 2800,
    images: ["/images/property-1.jpg", "/images/property-detail-1.jpg", "/images/property-3.jpg"],
    address: "789 Shoreline Dr, Malibu, CA 90265",
    status: "For Sale",
    propertyType: "Condo",
    featured: true,
    yearBuilt: 2020,
    garage: 2,
    description:
      "Sleek modern condo with floor-to-ceiling windows offering breathtaking ocean views and luxury finishes.",
    features: ["Ocean View", "Balcony", "Fitness Center", "Concierge", "Pet Friendly"],
    location: { lat: 34.031234, lng: -118.789757 },
    rating: 4.7,
    reviews: 15,
    agent: {
      name: "Michael Rodriguez",
      image: "/images/testimonial-2.jpg",
      phone: "(310) 555-5678",
    },
  },
  {
    id: "prop-103",
    title: "Elegant Ocean View Estate",
    price: 5100000,
    beds: 6,
    baths: 7,
    sqft: 7500,
    images: ["/images/property-2.jpg", "/images/property-4.jpg", "/images/property-5.jpg"],
    address: "456 Cliffside Way, Malibu, CA 90265",
    status: "For Sale",
    propertyType: "Single Family",
    featured: false,
    yearBuilt: 2015,
    garage: 4,
    description:
      "Magnificent estate perched on a cliff with unobstructed ocean views, gourmet kitchen, and resort-style pool.",
    features: ["Pool", "Ocean View", "Guest House", "Tennis Court", "Wine Cellar"],
    location: { lat: 34.041234, lng: -118.769757 },
    rating: 4.8,
    reviews: 22,
    agent: {
      name: "Sarah Johnson",
      image: "/images/testimonial-3.jpg",
      phone: "(310) 555-9012",
    },
  },
  {
    id: "prop-104",
    title: "Contemporary Beach House",
    price: 3850000,
    beds: 4,
    baths: 4,
    sqft: 4200,
    images: ["/images/property-3.jpg", "/images/property-5.jpg", "/images/property-1.jpg"],
    address: "321 Pacific Coast Hwy, Malibu, CA 90265",
    status: "For Sale",
    propertyType: "Single Family",
    featured: false,
    yearBuilt: 2019,
    garage: 2,
    description:
      "Stunning contemporary beach house with open floor plan, gourmet kitchen, and expansive deck for entertaining.",
    features: ["Beach Access", "Outdoor Kitchen", "Fire Pit", "Smart Home", "Solar Panels"],
    location: { lat: 34.035922, lng: -118.809757 },
    rating: 4.6,
    reviews: 18,
    agent: {
      name: "David Thompson",
      image: "/images/testimonial-1.jpg",
      phone: "(310) 555-3456",
    },
  },
  {
    id: "prop-105",
    title: "Luxury Downtown Penthouse",
    price: 2950000,
    beds: 3,
    baths: 3,
    sqft: 2500,
    images: ["/images/property-4.jpg", "/images/property-2.jpg", "/images/property-3.jpg"],
    address: "555 Ocean Ave, Santa Monica, CA 90401",
    status: "For Sale",
    propertyType: "Condo",
    featured: true,
    yearBuilt: 2017,
    garage: 2,
    description:
      "Luxurious penthouse with panoramic city and ocean views, private terrace, and premium finishes throughout.",
    features: ["City View", "Rooftop Terrace", "Concierge", "Fitness Center", "Wine Cellar"],
    location: { lat: 34.015922, lng: -118.489757 },
    rating: 4.9,
    reviews: 31,
    agent: {
      name: "Emily Wilson",
      image: "/images/testimonial-2.jpg",
      phone: "(310) 555-7890",
    },
  },
  {
    id: "prop-106",
    title: "Charming Suburban Home",
    price: 1250000,
    beds: 4,
    baths: 2.5,
    sqft: 2800,
    images: ["/images/property-5.jpg", "/images/property-3.jpg", "/images/property-1.jpg"],
    address: "789 Maple St, Beverly Hills, CA 90210",
    status: "For Sale",
    propertyType: "Single Family",
    featured: false,
    yearBuilt: 2010,
    garage: 2,
    description:
      "Beautifully updated family home in prestigious neighborhood with lush landscaping and modern amenities.",
    features: ["Backyard", "Fireplace", "Updated Kitchen", "Hardwood Floors", "Patio"],
    location: { lat: 34.073613, lng: -118.400037 },
    rating: 4.5,
    reviews: 14,
    agent: {
      name: "Robert Chen",
      image: "/images/testimonial-3.jpg",
      phone: "(310) 555-2345",
    },
  },
  {
    id: "prop-107",
    title: "Modern City Apartment",
    price: 850000,
    beds: 2,
    baths: 2,
    sqft: 1200,
    images: ["/images/property-1.jpg", "/images/property-4.jpg", "/images/property-5.jpg"],
    address: "123 Downtown Blvd, Los Angeles, CA 90017",
    status: "For Rent",
    rentalPrice: 4500,
    propertyType: "Condo",
    featured: false,
    yearBuilt: 2018,
    garage: 1,
    description:
      "Stylish urban apartment with high-end finishes, floor-to-ceiling windows, and access to premium building amenities.",
    features: ["City View", "Balcony", "Fitness Center", "Pet Friendly", "Concierge"],
    location: { lat: 34.040713, lng: -118.25901 },
    rating: 4.4,
    reviews: 9,
    agent: {
      name: "Jessica Martinez",
      image: "/images/testimonial-1.jpg",
      phone: "(310) 555-6789",
    },
  },
  {
    id: "prop-108",
    title: "Hillside Retreat with Views",
    price: 3200000,
    beds: 5,
    baths: 4,
    sqft: 4500,
    images: ["/images/property-2.jpg", "/images/property-5.jpg", "/images/property-3.jpg"],
    address: "456 Mountain Dr, Hollywood Hills, CA 90068",
    status: "For Sale",
    propertyType: "Single Family",
    featured: true,
    yearBuilt: 2016,
    garage: 3,
    description: "Spectacular hillside home with stunning city views, infinity pool, and indoor-outdoor living spaces.",
    features: ["City View", "Pool", "Home Theater", "Wine Cellar", "Smart Home"],
    location: { lat: 34.113613, lng: -118.320037 },
    rating: 4.8,
    reviews: 26,
    agent: {
      name: "Thomas Wright",
      image: "/images/testimonial-2.jpg",
      phone: "(310) 555-0123",
    },
  },
]

// Amenities icons mapping
const amenityIcons = {
  Pool: Home,
  Waterfront: Home,
  "Home Theater": Tv,
  "Wine Cellar": Home,
  "Smart Home": Wifi,
  "Ocean View": Home,
  Balcony: Home,
  "Fitness Center": Home,
  Concierge: Home,
  "Pet Friendly": Home,
  "Guest House": Home,
  "Tennis Court": Home,
  "Beach Access": Home,
  "Outdoor Kitchen": Utensils,
  "Fire Pit": Home,
  "Solar Panels": Home,
  "City View": Home,
  "Rooftop Terrace": Home,
  Backyard: Home,
  Fireplace: Home,
  "Updated Kitchen": Utensils,
  "Hardwood Floors": Home,
  Patio: Home,
  "Air Conditioning": Snowflake,
  Garage: Car,
  "Schools Nearby": School,
  "Shopping Nearby": ShoppingBag,
  "Restaurants Nearby": Utensils,
  "Coffee Shops Nearby": Coffee,
}

export default function PropertiesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState([0, 10000000])
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([])
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [bedrooms, setBedrooms] = useState(null)
  const [bathrooms, setBathrooms] = useState(null)
  const [filteredProperties, setFilteredProperties] = useState(properties)
  const [sortOrder, setSortOrder] = useState("price-high-low")
  const [isFiltersVisible, setIsFiltersVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState("grid")
  const [currentImageIndexes, setCurrentImageIndexes] = useState({})
  const [savedProperties, setSavedProperties] = useState([])
  const mapRef = useRef(null)
  const { toast } = useToast()

  // Initialize current image indexes
  useEffect(() => {
    const initialIndexes = {}
    properties.forEach((property) => {
      initialIndexes[property.id] = 0
    })
    setCurrentImageIndexes(initialIndexes)
  }, [])

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer);
  }, [])

  // Initialize map (in a real app, this would use Google Maps or similar)
  useEffect(() => {
    if (viewMode === "map" && mapRef.current) {
      // This would be where you initialize the map
      // For this example, we're just showing a placeholder
    }
  }, [viewMode])

  const handleSearch = (e) => {
    e.preventDefault()
    applyFilters()
  }

  const handlePropertyTypeChange = (type) => {
    setSelectedPropertyTypes(
      (prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type])
    )
  }

  const handleStatusChange = (status) => {
    setSelectedStatus(status)
  }

  const handleBedroomsChange = (beds) => {
    setBedrooms(beds)
  }

  const handleBathroomsChange = (baths) => {
    setBathrooms(baths)
  }

  const handleSortChange = (value) => {
    setSortOrder(value)
    sortProperties(filteredProperties, value)
  }

  const sortProperties = (props, order) => {
    const sorted = [...props]

    switch (order) {
      case "price-high-low":
        sorted.sort((a, b) => b.price - a.price)
        break
      case "price-low-high":
        sorted.sort((a, b) => a.price - b.price)
        break
      case "beds-high-low":
        sorted.sort((a, b) => b.beds - a.beds)
        break
      case "baths-high-low":
        sorted.sort((a, b) => b.baths - a.baths)
        break
      case "sqft-high-low":
        sorted.sort((a, b) => b.sqft - a.sqft)
        break
      case "newest":
        sorted.sort((a, b) => b.yearBuilt - a.yearBuilt)
        break
      case "rating-high-low":
        sorted.sort((a, b) => b.rating - a.rating)
        break
      default:
        break
    }

    setFilteredProperties(sorted)
  }

  const applyFilters = () => {
    let filtered = properties

    // Apply search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter((property) =>
        property.title.toLowerCase().includes(query) ||
        property.address.toLowerCase().includes(query) ||
        property.description.toLowerCase().includes(query) ||
        property.features.some((feature) => feature.toLowerCase().includes(query)))
    }

    // Apply price range filter
    filtered = filtered.filter(
      (property) => property.price >= priceRange[0] && property.price <= priceRange[1]
    )

    // Apply property type filter
    if (selectedPropertyTypes.length > 0) {
      filtered = filtered.filter((property) => selectedPropertyTypes.includes(property.propertyType))
    }

    // Apply status filter
    if (selectedStatus !== "all") {
      filtered = filtered.filter((property) => property.status === selectedStatus)
    }

    // Apply bedrooms filter
    if (bedrooms !== null) {
      filtered = filtered.filter((property) => property.beds >= bedrooms)
    }

    // Apply bathrooms filter
    if (bathrooms !== null) {
      filtered = filtered.filter((property) => property.baths >= bathrooms)
    }

    // Apply current sort order
    sortProperties(filtered, sortOrder)
  }

  const resetFilters = () => {
    setSearchQuery("")
    setPriceRange([0, 10000000])
    setSelectedPropertyTypes([])
    setSelectedStatus("all")
    setBedrooms(null)
    setBathrooms(null)
    sortProperties(properties, sortOrder)
  }

  const formatPrice = (price) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `$${(price / 1000).toFixed(0)}K`;
    }
    return `$${price}`
  }

  const toggleFilters = () => {
    setIsFiltersVisible(!isFiltersVisible)
  }

  const nextPropertyImage = (propertyId) => {
    const property = properties.find((p) => p.id === propertyId)
    if (!property) return

    setCurrentImageIndexes((prev) => ({
      ...prev,
      [propertyId]: (prev[propertyId] + 1) % property.images.length,
    }))
  }

  const prevPropertyImage = (propertyId) => {
    const property = properties.find((p) => p.id === propertyId)
    if (!property) return

    setCurrentImageIndexes((prev) => ({
      ...prev,
      [propertyId]: prev[propertyId] === 0 ? property.images.length - 1 : prev[propertyId] - 1,
    }))
  }

  const toggleSaveProperty = (propertyId) => {
    if (savedProperties.includes(propertyId)) {
      setSavedProperties((prev) => prev.filter((id) => id !== propertyId))
      toast({
        title: "Property removed",
        description: "Property removed from your saved listings",
      })
    } else {
      setSavedProperties((prev) => [...prev, propertyId])
      toast({
        title: "Property saved",
        description: "Property added to your saved listings",
      })
    }
  }

  const shareProperty = (propertyId) => {
    // In a real app, this would open a share dialog
    navigator.clipboard.writeText(`${window.location.origin}/properties/${propertyId}`)
    toast({
      title: "Link copied",
      description: "Property link copied to clipboard",
    })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Site Header */}
      <SiteHeader />
      {/* Hero Header */}
      <section className="relative pt-16">
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />
        <Image
          src="/images/hero.jpg"
          alt="Luxury properties"
          width={1920}
          height={600}
          className="h-[400px] md:h-[500px] w-full object-cover" />
        <div className="absolute inset-0 flex items-center z-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Find Your Dream Property</h1>
                <p className="text-xl text-white/90 mb-8 max-w-2xl">
                  Explore our curated collection of premium properties in the most desirable locations.
                </p>

                {/* Search Bar */}
                <div className="bg-white/10 backdrop-blur-md p-1 rounded-xl">
                  <form
                    onSubmit={handleSearch}
                    className="relative flex flex-col md:flex-row gap-2">
                    <div className="flex-1 relative">
                      <Input
                        type="text"
                        placeholder="Search by location, property name, or features..."
                        className="w-full h-14 pl-12 pr-4 rounded-lg bg-white border-0"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} />
                      <Search
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                    </div>
                    <div className="md:w-auto">
                      <Button type="submit" className="w-full md:w-auto h-14 px-8 text-base">
                        Search
                      </Button>
                    </div>
                  </form>
                </div>

                {/* Quick Stats */}
                <div className="flex flex-wrap gap-8 mt-8">
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-3 rounded-lg">
                    <p className="text-white/80 text-sm">Available Properties</p>
                    <p className="text-white font-bold text-2xl">{properties.length}</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-3 rounded-lg">
                    <p className="text-white/80 text-sm">Average Price</p>
                    <p className="text-white font-bold text-2xl">$2.8M</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-3 rounded-lg">
                    <p className="text-white/80 text-sm">Featured Locations</p>
                    <p className="text-white font-bold text-2xl">12</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      {/* Main Content */}
      <section className="container mx-auto px-4 md:px-8 py-12 md:py-16">
        {/* View Tabs */}
        <div
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Explore Our Properties</h2>
            <p className="text-gray-600 max-w-2xl">
              Browse our exclusive collection of premium properties in the most sought-after locations.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Tabs defaultValue="all" className="w-[300px]">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="sale">For Sale</TabsTrigger>
                <TabsTrigger value="rent">For Rent</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="flex border rounded-md overflow-hidden">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                className="rounded-none"
                onClick={() => setViewMode("grid")}>
                <Grid className="h-4 w-4 mr-2" />
                Grid
              </Button>
              <Button
                variant={viewMode === "map" ? "default" : "ghost"}
                size="sm"
                className="rounded-none"
                onClick={() => setViewMode("map")}>
                <Map className="h-4 w-4 mr-2" />
                Map
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters - Desktop */}
          <motion.div
            className={`hidden md:block w-72 shrink-0 transition-all duration-300 ease-in-out ${isFiltersVisible ? "opacity-100" : "opacity-0 w-0"}`}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: isFiltersVisible ? 1 : 0, width: isFiltersVisible ? "18rem" : "0rem" }}
            transition={{ duration: 0.3 }}>
            {isFiltersVisible && (
              <div
                className="sticky top-24 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold">Filters</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetFilters}
                    className="h-9 px-3 text-sm">
                    Reset All
                  </Button>
                </div>

                {/* Price Range */}
                <div className="mb-8">
                  <h3 className="font-semibold text-lg mb-4">Price Range</h3>
                  <div className="space-y-6">
                    <Slider
                      defaultValue={[0, 10000000]}
                      max={10000000}
                      step={100000}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="mt-6" />
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{formatPrice(priceRange[0])}</span>
                      <span className="text-sm font-medium">{formatPrice(priceRange[1])}</span>
                    </div>
                  </div>
                </div>

                <Separator className="my-8" />

                {/* Property Type */}
                <div className="mb-8">
                  <h3 className="font-semibold text-lg mb-4">Property Type</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="single-family"
                        checked={selectedPropertyTypes.includes("Single Family")}
                        onCheckedChange={() => handlePropertyTypeChange("Single Family")}
                        className="h-5 w-5" />
                      <Label htmlFor="single-family" className="text-base">
                        Single Family
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="condo"
                        checked={selectedPropertyTypes.includes("Condo")}
                        onCheckedChange={() => handlePropertyTypeChange("Condo")}
                        className="h-5 w-5" />
                      <Label htmlFor="condo" className="text-base">
                        Condo
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="townhouse"
                        checked={selectedPropertyTypes.includes("Townhouse")}
                        onCheckedChange={() => handlePropertyTypeChange("Townhouse")}
                        className="h-5 w-5" />
                      <Label htmlFor="townhouse" className="text-base">
                        Townhouse
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="land"
                        checked={selectedPropertyTypes.includes("Land")}
                        onCheckedChange={() => handlePropertyTypeChange("Land")}
                        className="h-5 w-5" />
                      <Label htmlFor="land" className="text-base">
                        Land
                      </Label>
                    </div>
                  </div>
                </div>

                <Separator className="my-8" />

                {/* Status */}
                <div className="mb-8">
                  <h3 className="font-semibold text-lg mb-4">Status</h3>
                  <RadioGroup
                    value={selectedStatus}
                    onValueChange={handleStatusChange}
                    className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="all" id="all" className="h-5 w-5" />
                      <Label htmlFor="all" className="text-base">
                        All
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="For Sale" id="for-sale" className="h-5 w-5" />
                      <Label htmlFor="for-sale" className="text-base">
                        For Sale
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="For Rent" id="for-rent" className="h-5 w-5" />
                      <Label htmlFor="for-rent" className="text-base">
                        For Rent
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator className="my-8" />

                {/* Bedrooms */}
                <div className="mb-8">
                  <h3 className="font-semibold text-lg mb-4">Bedrooms</h3>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      variant={bedrooms === null ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleBedroomsChange(null)}
                      className="h-10 px-4 rounded-full">
                      Any
                    </Button>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <Button
                        key={num}
                        variant={bedrooms === num ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleBedroomsChange(num)}
                        className="h-10 px-4 rounded-full">
                        {num}+
                      </Button>
                    ))}
                  </div>
                </div>

                <Separator className="my-8" />

                {/* Bathrooms */}
                <div className="mb-8">
                  <h3 className="font-semibold text-lg mb-4">Bathrooms</h3>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      variant={bathrooms === null ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleBathroomsChange(null)}
                      className="h-10 px-4 rounded-full">
                      Any
                    </Button>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <Button
                        key={num}
                        variant={bathrooms === num ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleBathroomsChange(num)}
                        className="h-10 px-4 rounded-full">
                        {num}+
                      </Button>
                    ))}
                  </div>
                </div>

                <Separator className="my-8" />

                {/* Features */}
                <div className="mb-8">
                  <h3 className="font-semibold text-lg mb-4">Features</h3>
                  <div className="space-y-3">
                    {["Pool", "Waterfront", "Garage", "Air Conditioning", "Pet Friendly"].map((feature) => (
                      <div key={feature} className="flex items-center space-x-3">
                        <Checkbox
                          id={`feature-${feature.toLowerCase().replace(/\s+/g, "-")}`}
                          className="h-5 w-5" />
                        <Label
                          htmlFor={`feature-${feature.toLowerCase().replace(/\s+/g, "-")}`}
                          className="text-base">
                          {feature}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full mt-6 h-12 text-base" onClick={applyFilters}>
                  Apply Filters
                </Button>
              </div>
            )}
          </motion.div>

          {/* Filters Toggle Button - Desktop */}
          <div className="hidden md:block">
            <Button
              variant="outline"
              onClick={toggleFilters}
              className="fixed left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md z-10 h-12 px-3 rounded-r-lg rounded-l-none border-l-0">
              {isFiltersVisible ? <X className="h-5 w-5" /> : <Filter className="h-5 w-5" />}
            </Button>
          </div>

          {/* Filters - Mobile */}
          <div className="md:hidden mb-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center h-12">
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[85vh] rounded-t-xl">
                <SheetHeader className="mb-6">
                  <SheetTitle className="text-2xl">Filters</SheetTitle>
                  <SheetDescription>Refine your property search</SheetDescription>
                </SheetHeader>
                <div className="py-4 overflow-y-auto h-full px-2">
                  {/* Mobile filters content - similar to desktop */}
                  {/* ... */}
                  <div className="flex gap-4 mt-8 sticky bottom-0 bg-white pt-4 pb-6">
                    <Button variant="outline" className="w-1/2 h-12" onClick={resetFilters}>
                      Reset All
                    </Button>
                    <Button
                      className="w-1/2 h-12"
                      onClick={() => {
                        applyFilters()
                        document.querySelector("[data-radix-collection-item]")?.click() // Close sheet
                      }}>
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Property Listings */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8">
              <div>
                <p className="text-gray-600">
                  Showing <span className="font-semibold">{filteredProperties.length}</span> properties
                </p>
              </div>
              <div className="flex items-center">
                <Select value={sortOrder} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-[220px] h-10">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-high-low">Price (High to Low)</SelectItem>
                    <SelectItem value="price-low-high">Price (Low to High)</SelectItem>
                    <SelectItem value="beds-high-low">Bedrooms (Most first)</SelectItem>
                    <SelectItem value="baths-high-low">Bathrooms (Most first)</SelectItem>
                    <SelectItem value="sqft-high-low">Square Feet (Largest first)</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="rating-high-low">Rating (High to Low)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {viewMode === "grid" ? (
              isLoading ? (
                // Loading skeleton
                (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-gray-200 h-64 rounded-t-xl w-full"></div>
                      <div className="bg-white p-6 rounded-b-xl border border-gray-100">
                        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                        <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-full mb-6"></div>
                        <div className="flex justify-between">
                          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>)
              ) : filteredProperties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <AnimatePresence>
                    {filteredProperties.map((property, index) => (
                      <motion.div
                        key={property.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}>
                        <Card
                          className="overflow-hidden h-full hover:shadow-lg transition-all duration-300 border-0 rounded-xl">
                          {/* Property Image Carousel */}
                          <div className="relative h-64 group">
                            <Image
                              src={property.images[currentImageIndexes[property.id]] || "/placeholder.svg"}
                              alt={property.title}
                              fill
                              className="object-cover rounded-t-xl" />

                            {/* Image Navigation */}
                            <div
                              className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-full bg-white/80 hover:bg-white"
                                onClick={(e) => {
                                  e.preventDefault()
                                  prevPropertyImage(property.id)
                                }}>
                                <ChevronLeft className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-full bg-white/80 hover:bg-white"
                                onClick={(e) => {
                                  e.preventDefault()
                                  nextPropertyImage(property.id)
                                }}>
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </div>

                            {/* Image Counter */}
                            <div
                              className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                              {currentImageIndexes[property.id] + 1} / {property.images.length}
                            </div>

                            {/* Status Badge */}
                            <div className="absolute top-4 left-4 flex flex-col gap-2">
                              <Badge
                                className="bg-primary text-white px-3 py-1 text-sm font-medium rounded-full">
                                {property.status}
                              </Badge>
                            </div>

                            {/* Featured Badge */}
                            {property.featured && (
                              <div className="absolute top-4 right-4">
                                <Badge
                                  variant="outline"
                                  className="bg-white px-3 py-1 text-sm font-medium rounded-full">
                                  Featured
                                </Badge>
                              </div>
                            )}

                            {/* Action Buttons */}
                            <div className="absolute bottom-4 left-4 flex space-x-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className={`h-8 w-8 rounded-full bg-white/80 hover:bg-white ${
                                  savedProperties.includes(property.id) ? "text-red-500" : ""
                                }`}
                                onClick={(e) => {
                                  e.preventDefault()
                                  toggleSaveProperty(property.id)
                                }}>
                                <Heart
                                  className={`h-4 w-4 ${savedProperties.includes(property.id) ? "fill-red-500" : ""}`} />
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-full bg-white/80 hover:bg-white"
                                onClick={(e) => {
                                  e.preventDefault()
                                  shareProperty(property.id)
                                }}>
                                <Share2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                                <span className="text-sm font-medium">
                                  {property.rating} ({property.reviews} reviews)
                                </span>
                              </div>
                              <span className="text-sm text-gray-600">Built {property.yearBuilt}</span>
                            </div>

                            <Link href={`/properties/${property.id}`}>
                              <h3
                                className="font-bold text-xl mb-2 hover:text-primary transition-colors line-clamp-1">
                                {property.title}
                              </h3>
                            </Link>

                            <p className="text-primary font-bold text-2xl mb-3">
                              {property.status === "For Rent" && property.rentalPrice
                                ? `$${property.rentalPrice.toLocaleString()}/mo`
                                : `$${property.price.toLocaleString()}`}
                            </p>

                            <div className="flex items-center text-gray-600 mb-4">
                              <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                              <span className="text-sm line-clamp-1">{property.address}</span>
                            </div>

                            <p className="text-gray-600 mb-4 line-clamp-2">{property.description}</p>

                            <Separator className="my-4" />

                            <div
                              className="flex items-center justify-between text-sm text-gray-700 font-medium mb-4">
                              <div className="flex items-center">
                                <Bed className="h-5 w-5 mr-2 text-gray-500" />
                                <span>{property.beds} Beds</span>
                              </div>
                              <div className="flex items-center">
                                <Bath className="h-5 w-5 mr-2 text-gray-500" />
                                <span>{property.baths} Baths</span>
                              </div>
                              <div className="flex items-center">
                                <Home className="h-5 w-5 mr-2 text-gray-500" />
                                <span>{property.sqft.toLocaleString()} ft²</span>
                              </div>
                            </div>

                            {/* Property Features */}
                            <div className="flex flex-wrap gap-2 mb-4">
                              {property.features.slice(0, 3).map((feature) => {
                                const IconComponent = amenityIcons[feature] || Home
                                return (
                                  <Badge key={feature} variant="outline" className="rounded-full">
                                    <IconComponent className="h-3 w-3 mr-1" />
                                    {feature}
                                  </Badge>
                                );
                              })}
                              {property.features.length > 3 && (
                                <Badge variant="outline" className="rounded-full">
                                  +{property.features.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </CardContent>

                          <CardFooter className="px-6 pb-6 pt-0 flex justify-between items-center">
                            <div className="flex items-center">
                              <div className="relative h-8 w-8 rounded-full overflow-hidden mr-2">
                                <Image
                                  src={property.agent.image || "/placeholder.svg"}
                                  alt={property.agent.name}
                                  fill
                                  className="object-cover" />
                              </div>
                              <span className="text-sm font-medium">{property.agent.name}</span>
                            </div>
                            <Button asChild>
                              <Link href={`/properties/${property.id}`}>View Details</Link>
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.div
                  className="text-center py-16 bg-gray-50 rounded-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}>
                  <div
                    className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <Search className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">No properties found</h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    We couldn't find any properties matching your criteria. Try adjusting your filters or search terms.
                  </p>
                  <Button onClick={resetFilters} size="lg" className="h-12 px-6">
                    Reset Filters
                  </Button>
                </motion.div>
              )
            ) : (
              // Map View
              (<div className="bg-gray-100 rounded-xl overflow-hidden h-[800px] relative">
                <div ref={mapRef} className="w-full h-full">
                  {/* This would be replaced with an actual map in a real application */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Map className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold mb-2">Map View</h3>
                      <p className="text-gray-600 max-w-md">
                        In a real application, this would display an interactive map with property locations.
                      </p>
                    </div>
                  </div>

                  {/* Property Cards on Map - These would be positioned based on coordinates */}
                  <div
                    className="absolute top-4 right-4 w-80 bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-1">{filteredProperties[0]?.title}</h3>
                      <p className="text-primary font-bold">${filteredProperties[0]?.price.toLocaleString()}</p>
                      <div className="flex items-center text-gray-600 text-sm mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span className="truncate">{filteredProperties[0]?.address}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>)
            )}

            {/* Pagination */}
            {filteredProperties.length > 0 && (
              <div className="flex justify-center mt-16">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon" disabled className="h-10 w-10">
                    <ChevronRight className="h-4 w-4 rotate-180" />
                  </Button>
                  <Button variant="default" size="sm" className="h-10 w-10 p-0">
                    1
                  </Button>
                  <Button variant="outline" size="sm" className="h-10 w-10 p-0">
                    2
                  </Button>
                  <Button variant="outline" size="sm" className="h-10 w-10 p-0">
                    3
                  </Button>
                  <Button variant="outline" size="icon" className="h-10 w-10">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      {/* Featured Locations Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Locations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our most popular neighborhoods and find your perfect property in these sought-after locations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {["Malibu", "Beverly Hills", "Santa Monica", "Hollywood Hills"].map((location, index) => (
              <motion.div
                key={location}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}>
                <div className="relative h-64 rounded-xl overflow-hidden group">
                  <Image
                    src={`/images/property-${index + 1}.jpg`}
                    alt={location}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-white font-bold text-xl mb-1">{location}</h3>
                    <p className="text-white/80 text-sm">12 Properties</p>
                  </div>
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="outline"
                      className="bg-white/20 text-white border-white hover:bg-white/30">
                      View Properties
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="h-12 px-8">
              View All Locations <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from our satisfied clients who found their dream properties with our expert guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}>
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-6">
                      "The team at RealEstate made finding our dream home an absolute pleasure. Their knowledge,
                      professionalism, and attention to detail exceeded our expectations."
                    </p>
                    <div className="flex items-center">
                      <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                        <Image
                          src={`/images/testimonial-${i}.jpg`}
                          alt="Client"
                          fill
                          className="object-cover" />
                      </div>
                      <div>
                        <h4 className="font-semibold">John Smith</h4>
                        <p className="text-sm text-gray-600">Purchased in Malibu</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="relative py-20">
        <div
          className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-90"></div>
        <div
          className="absolute inset-0 bg-[url('/images/hero.jpg')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Find Your Dream Property?</h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-8 text-lg">
              Let our expert agents guide you through the process and help you discover the perfect property.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 h-12 px-8">
                Contact an Agent
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white/10 h-12 px-8">
                Schedule a Viewing
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Site Footer */}
      <SiteFooter />
    </div>
  );
}
