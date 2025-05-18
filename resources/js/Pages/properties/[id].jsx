import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, notFound } from "next/navigation"
import {
  Bed,
  Bath,
  Home,
  MapPin,
  Calendar,
  Share2,
  Heart,
  Download,
  Phone,
  Mail,
  ArrowLeft,
  ArrowRight,
  School,
  ShoppingBag,
  Utensils,
  Trees,
  Building,
  Ruler,
  CalendarClock,
  Info,
  FileText,
  User,
} from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

// Mock data for a single property
const getProperty = (id) => {
  // In a real application, this would fetch data from an API
  const property = {
    id,
    title: "Luxury Waterfront Villa",
    address: "123 Oceanview Drive, Malibu, CA 90265",
    price: 4750000,
    description:
      "This stunning waterfront villa offers breathtaking ocean views and luxurious living spaces. Featuring an open floor plan, gourmet kitchen, and resort-style pool, this property is perfect for those seeking the ultimate coastal lifestyle. The home includes high-end finishes throughout, smart home technology, and a private dock for easy water access.",
    beds: 5,
    baths: 6,
    sqft: 6200,
    lotSize: "0.75 acres",
    yearBuilt: 2018,
    propertyType: "Single Family",
    status: "For Sale",
    propertyTax: 52000,
    hoaFees: 850,
    energyRating: "A",
    walkScore: 82,
    images: [
      "/images/property-detail-1.jpg",
      "/images/property-detail-2.jpg",
      "/images/property-detail-3.jpg",
      "/images/property-detail-4.jpg",
      "/images/property-detail-5.jpg",
    ],
    features: [
      "Waterfront Property",
      "Private Pool",
      "Smart Home Technology",
      "Gourmet Kitchen",
      "Home Theater",
      "Wine Cellar",
      "Outdoor Kitchen",
      "3-Car Garage",
      "Private Dock",
      "Solar Panels",
    ],
    nearbyAmenities: [
      { name: "Malibu Elementary School", type: "school", distance: "0.8 miles" },
      { name: "Malibu High School", type: "school", distance: "1.2 miles" },
      { name: "Malibu Village Shopping Center", type: "shopping", distance: "1.5 miles" },
      { name: "Nobu Malibu", type: "restaurant", distance: "2.1 miles" },
      { name: "Malibu Lagoon State Beach", type: "park", distance: "2.3 miles" },
      { name: "PCH Medical Center", type: "medical", distance: "3.2 miles" },
    ],
    agent: {
      name: "Jennifer Parker",
      phone: "(310) 555-1234",
      email: "jennifer@realestate.com",
      image: "/images/agent.jpg",
    },
    openHouses: [
      { date: "2023-06-10", startTime: "13:00", endTime: "16:00" },
      { date: "2023-06-11", startTime: "14:00", endTime: "17:00" },
    ],
    documents: [
      { name: "Property Disclosure", type: "PDF", size: "1.2 MB" },
      { name: "Floor Plans", type: "PDF", size: "3.5 MB" },
      { name: "HOA Documents", type: "PDF", size: "2.8 MB" },
    ],
    similarProperties: [
      {
        id: "prop-102",
        title: "Modern Beachfront Condo",
        price: 3200000,
        beds: 3,
        baths: 3.5,
        sqft: 2800,
        image: "/images/property-1.jpg",
        address: "789 Shoreline Dr, Malibu, CA",
      },
      {
        id: "prop-103",
        title: "Elegant Ocean View Estate",
        price: 5100000,
        beds: 6,
        baths: 7,
        sqft: 7500,
        image: "/images/property-2.jpg",
        address: "456 Cliffside Way, Malibu, CA",
      },
      {
        id: "prop-104",
        title: "Contemporary Beach House",
        price: 3850000,
        beds: 4,
        baths: 4,
        sqft: 4200,
        image: "/images/property-3.jpg",
        address: "321 Pacific Coast Hwy, Malibu, CA",
      },
    ],
  }

  return property
}

export default function PropertyDetailPage() {
  const { id } = useParams()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [liked, setLiked] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Simulate API fetch
    try {
      const propertyData = getProperty(id)
      setProperty(propertyData)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      notFound()
    }
  }, [id])

  const handleNextImage = () => {
    if (property?.images) {
      setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
    }
  }

  const handlePrevImage = () => {
    if (property?.images) {
      setCurrentImageIndex((prev) => (prev === 0 ? property.images.length - 1 : prev - 1))
    }
  }

  const handleContactAgent = (e) => {
    e.preventDefault()
    toast({
      title: "Message Sent",
      description: "The agent will contact you shortly.",
    })
  }

  const handleToggleLike = () => {
    setLiked(!liked)
    toast({
      title: liked ? "Removed from favorites" : "Added to favorites",
      description: liked ? "Property removed from your saved listings" : "Property saved to your favorites",
    })
  }

  const handleShare = () => {
    // In a real app, this would open a share dialog
    navigator.clipboard.writeText(window.location.href)
    toast({
      title: "Link Copied",
      description: "Property link copied to clipboard",
    })
  }

  const handleDownloadDocument = (docName) => {
    toast({
      title: "Downloading Document",
      description: `${docName} is being downloaded`,
    })
  }

  if (loading) {
    return (
      <div
        className="container mx-auto px-4 py-16 flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div
            className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return notFound();
  }

  const formatDate = (dateString) => {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options);
  }

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":")
    const hour = Number.parseInt(hours)
    return `${hour > 12 ? hour - 12 : hour}:${minutes} ${hour >= 12 ? "PM" : "AM"}`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Link
          href="/properties"
          className="inline-flex items-center text-primary hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Listings
        </Link>
      </div>
      {/* Property Images Gallery */}
      <section className="relative bg-gray-900 h-[500px] md:h-[600px]">
        {property.images && property.images.length > 0 ? (
          <>
            <Image
              src={property.images[currentImageIndex] || "/placeholder.svg"}
              alt={`${property.title} - Image ${currentImageIndex + 1}`}
              fill
              className="object-cover"
              priority />
            <div className="absolute inset-0 bg-black/30"></div>

            {/* Image Navigation */}
            <div className="absolute inset-0 flex items-center justify-between px-4">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-white/80 hover:bg-white"
                onClick={handlePrevImage}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-white/80 hover:bg-white"
                onClick={handleNextImage}>
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>

            {/* Image Counter */}
            <div
              className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-md text-sm">
              {currentImageIndex + 1} / {property.images.length}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-200">
            <Home className="h-24 w-24 text-gray-400" />
            <p className="text-gray-500 mt-4">No images available</p>
          </div>
        )}
      </section>
      {/* Property Header */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center mb-2">
              <Badge className="mr-2 bg-primary">{property.status}</Badge>
              <Badge variant="outline">{property.propertyType}</Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{property.title}</h1>
            <div className="flex items-center text-gray-600 mb-4">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{property.address}</span>
            </div>
            <div className="flex items-center space-x-4 text-lg font-semibold">
              <div className="flex items-center">
                <Bed className="h-5 w-5 mr-1 text-primary" />
                <span>{property.beds} Beds</span>
              </div>
              <div className="flex items-center">
                <Bath className="h-5 w-5 mr-1 text-primary" />
                <span>{property.baths} Baths</span>
              </div>
              <div className="flex items-center">
                <Home className="h-5 w-5 mr-1 text-primary" />
                <span>{property.sqft.toLocaleString()} Sq Ft</span>
              </div>
            </div>
          </div>

          <div className="mt-6 md:mt-0 flex flex-col items-start md:items-end">
            <p className="text-3xl font-bold text-primary">${property.price.toLocaleString()}</p>
            <p className="text-gray-600 mb-4">${Math.round(property.price / property.sqft).toLocaleString()} / sq ft</p>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                className={cn(liked && "text-red-500 border-red-500")}
                onClick={handleToggleLike}>
                <Heart className={cn("h-5 w-5", liked && "fill-red-500")} />
              </Button>
              <Button variant="outline" size="icon" onClick={handleShare}>
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Main Content */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Property Details */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="details">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="neighborhood">Neighborhood</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-semibold mb-4">Property Description</h2>
                    <p className="text-gray-700 mb-8">{property.description}</p>

                    <h3 className="text-xl font-semibold mb-4">Property Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 mr-2 text-primary" />
                        <span className="text-gray-700">Year Built: {property.yearBuilt}</span>
                      </div>
                      <div className="flex items-center">
                        <Ruler className="h-5 w-5 mr-2 text-primary" />
                        <span className="text-gray-700">Lot Size: {property.lotSize}</span>
                      </div>
                      <div className="flex items-center">
                        <Building className="h-5 w-5 mr-2 text-primary" />
                        <span className="text-gray-700">Property Type: {property.propertyType}</span>
                      </div>
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-primary" />
                        <span className="text-gray-700">
                          Property Tax: ${property.propertyTax.toLocaleString()}/year
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Info className="h-5 w-5 mr-2 text-primary" />
                        <span className="text-gray-700">HOA Fees: ${property.hoaFees}/month</span>
                      </div>
                      <div className="flex items-center">
                        <Info className="h-5 w-5 mr-2 text-primary" />
                        <span className="text-gray-700">Energy Rating: {property.energyRating}</span>
                      </div>
                    </div>

                    {property.openHouses && property.openHouses.length > 0 && (
                      <>
                        <h3 className="text-xl font-semibold mb-4">Open Houses</h3>
                        <div className="space-y-4 mb-8">
                          {property.openHouses.map((openHouse, index) => (
                            <div key={index} className="flex items-start">
                              <CalendarClock className="h-5 w-5 mr-2 text-primary shrink-0 mt-1" />
                              <div>
                                <p className="font-medium">{formatDate(openHouse.date)}</p>
                                <p className="text-gray-600">
                                  {formatTime(openHouse.startTime)} - {formatTime(openHouse.endTime)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="features" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-semibold mb-4">Property Features</h2>

                    {property.features && property.features.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3">
                        {property.features.map((feature, index) => (
                          <div key={index} className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No features listed for this property.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="neighborhood" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-semibold mb-4">Neighborhood</h2>

                    <div className="mb-6">
                      <div className="flex items-center mb-2">
                        <MapPin className="h-5 w-5 mr-2 text-primary" />
                        <span className="font-medium">Walk Score: {property.walkScore}/100</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-primary h-2.5 rounded-full"
                          style={{ width: `${property.walkScore}%` }}></div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {property.walkScore > 90
                          ? "Walker's Paradise"
                          : property.walkScore > 70
                            ? "Very Walkable"
                            : property.walkScore > 50
                              ? "Somewhat Walkable"
                              : "Car-Dependent"}
                      </p>
                    </div>

                    <h3 className="text-xl font-semibold mb-4">Nearby Amenities</h3>

                    {property.nearbyAmenities && property.nearbyAmenities.length > 0 ? (
                      <div className="space-y-4">
                        {property.nearbyAmenities.map((amenity, index) => (
                          <div key={index} className="flex items-start">
                            {amenity.type === "school" && (
                              <School className="h-5 w-5 mr-2 text-primary shrink-0 mt-1" />
                            )}
                            {amenity.type === "shopping" && (
                              <ShoppingBag className="h-5 w-5 mr-2 text-primary shrink-0 mt-1" />
                            )}
                            {amenity.type === "restaurant" && (
                              <Utensils className="h-5 w-5 mr-2 text-primary shrink-0 mt-1" />
                            )}
                            {amenity.type === "park" && <Trees className="h-5 w-5 mr-2 text-primary shrink-0 mt-1" />}
                            {amenity.type === "medical" && <User className="h-5 w-5 mr-2 text-primary shrink-0 mt-1" />}
                            <div>
                              <p className="font-medium">{amenity.name}</p>
                              <p className="text-gray-600">{amenity.distance}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No nearby amenities information available.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-semibold mb-4">Property Documents</h2>

                    {property.documents && property.documents.length > 0 ? (
                      <div className="space-y-4">
                        {property.documents.map((doc, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 border rounded-md">
                            <div className="flex items-center">
                              <FileText className="h-5 w-5 mr-2 text-primary" />
                              <div>
                                <p className="font-medium">{doc.name}</p>
                                <p className="text-sm text-gray-600">
                                  {doc.type} • {doc.size}
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center"
                              onClick={() => handleDownloadDocument(doc.name)}>
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No documents available for this property.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Similar Properties */}
            <div className="mt-12">
              <h2 className="text-2xl font-semibold mb-6">Similar Properties</h2>

              {property.similarProperties && property.similarProperties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {property.similarProperties.map((similarProp) => (
                    <motion.div
                      key={similarProp.id}
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.2 }}>
                      <Link href={`/properties/${similarProp.id}`}>
                        <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
                          <div className="relative h-48">
                            <Image
                              src={similarProp.image || "/placeholder.svg"}
                              alt={similarProp.title}
                              fill
                              className="object-cover" />
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-semibold text-lg mb-1 line-clamp-1">{similarProp.title}</h3>
                            <p className="text-primary font-bold mb-2">${similarProp.price.toLocaleString()}</p>
                            <p className="text-gray-600 text-sm mb-3 line-clamp-1">{similarProp.address}</p>
                            <div className="flex items-center justify-between text-sm text-gray-600">
                              <div className="flex items-center">
                                <Bed className="h-4 w-4 mr-1" />
                                <span>{similarProp.beds}</span>
                              </div>
                              <div className="flex items-center">
                                <Bath className="h-4 w-4 mr-1" />
                                <span>{similarProp.baths}</span>
                              </div>
                              <div className="flex items-center">
                                <Home className="h-4 w-4 mr-1" />
                                <span>{similarProp.sqft.toLocaleString()} sq ft</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No similar properties available.</p>
              )}
            </div>
          </div>

          {/* Right Column - Agent Info & Contact Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Agent Information */}
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Listing Agent</h3>
                  <div className="flex items-center mb-4">
                    <div className="relative h-16 w-16 rounded-full overflow-hidden mr-4">
                      <Image
                        src={property.agent.image || "/placeholder.svg"}
                        alt={property.agent.name}
                        fill
                        className="object-cover" />
                    </div>
                    <div>
                      <p className="font-medium text-lg">{property.agent.name}</p>
                      <p className="text-gray-600">Listing Agent</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-primary" />
                      <span>{property.agent.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-primary" />
                      <span>{property.agent.email}</span>
                    </div>
                  </div>

                  <Button className="w-full">Call Agent</Button>
                </CardContent>
              </Card>

              {/* Contact Form */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Request Information</h3>
                  <form onSubmit={handleContactAgent} className="space-y-4">
                    <div>
                      <Input placeholder="Your Name" required />
                    </div>
                    <div>
                      <Input type="email" placeholder="Your Email" required />
                    </div>
                    <div>
                      <Input type="tel" placeholder="Your Phone" />
                    </div>
                    <div>
                      <Textarea
                        placeholder="I'm interested in this property and would like to schedule a viewing."
                        className="min-h-[120px]"
                        required />
                    </div>
                    <Button type="submit" className="w-full">
                      Send Message
                    </Button>
                  </form>
                  <p className="text-xs text-gray-500 mt-4">
                    By submitting this form, you agree to our privacy policy and terms of service.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
