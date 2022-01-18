export interface Root {
    _id: Id
    identifiers: Identifiers
    name: string
    alternateNames: any[]
    descriptions: Descriptions
    labels: string[]
    contact: Contact
    giataData: GiataData
    expediaData: ExpediaData
    starRating: StarRating
    propertyType: string
    brand: string
    chain: string
    location: Location
    buildingInfo: BuildingInfo
    generalFacilities: GeneralFacilities
    covidMeasures: CovidMeasures
    familyFacilities: FamilyFacilities
    disabilityFriendly: DisabilityFriendly
    roomAmenities: RoomAmenities
    userRatings: UserRatings
    houseRules: HouseRules
    onsitePayments: OnsitePayments
    roomsInfo: RoomsInfo[]
    ratesInfo: RatesInfo
    images: Image2[]
    propertyId: string
    accessibility: any[]
    accessibilty: any[]
    broodBasics: string[]
    poolTime: any[]
    broodOnTheBeach: any[]
    yums: string[]
    childcareAndRelaxations: any[]
    familyFun: string[]
    wifi: any[]
    additionalInformation: string[]
    gettingInAndAround: string[]
    babiesAndToddlers: any[]
    childrenWillLove: any[]
    greatForTeens: any[]
    timeForParents: any[]
    littleDetails: string[]
    hittingTheSlopes: any[]
  }
  export interface Id {
    $oid: string
  }
  export interface Identifiers {
    giataId: string
    supplier: Supplier
    web: Web
  }
  export interface Supplier {
    travellandaPropertyId: string
    hotelBedsPropertyId: string
    expediaPropertyId: string
    smyRoomsPropertyId: string
    sunHotelsPropertyId: string
  }
  export interface Web {
    tripAdvisorId: string
    googleMapsPlaceId: string
    bookingComId: string
  }
  export interface Descriptions {
    general: string
    tripAbrood: string
    headline: string
    location: string
    attractions: Attractions
    amenities: string
    dining: string
    rooms: string
    renovations: string
    business_amenities: string
    national_ratings: string
  }
  export interface Attractions {
    nearbyPlaces: string[]
    gettingThere: string[]
  }
  export interface Contact {
    email: string
    phone: string
    url: string
    fax: string
  }
  export interface GiataData {
    href: string
    updatedAt: string
  }
  export interface ExpediaData {
    expedia_rank: number
    expedia_collect: boolean
    property_collect: boolean
  }
  export interface StarRating {
    official: string
    recommended: string
  }
  export interface Location {
    geocode: Geocode
    address: Address
    locationLabel: string
    city: string
    state: string
    airport: string
    country: string
    distanceFromCityCenter: number
    destinationId: string
  }
  export interface Geocode {
    lat: number
    long: number
  }
  export interface Address {
    addressLine1: string
    addressLine2: string
    postCode: string
  }
  export interface BuildingInfo {
    numberOfFloors: string
    numberOfRooms: string
    numberOfBuildings: string
    numberOfSuites: string
    numberOfPools: string
    numberOfCafes: string
    numberOfRestaurants: string
    maxOccupancy: string
    yearBuilt: string
  }
  export interface GeneralFacilities {
    parking: Parking
    airConditioning: boolean
    reception24x7: boolean
    languagesSpoken: any[]
    luggageStorage: boolean
    lifts: boolean
    cafe: boolean
    restaurant: boolean
    bar: boolean
    allInclusive: boolean
    wifi: Wifi
    roomService: boolean
    laundryService: boolean
    bikeRental: boolean
    boatTour: boolean
    airportTransfer: boolean
    shuttle: Shuttle
    wellness: Wellness
  }
  export interface Parking {
    available: boolean
    free: boolean
    details: string
  }
  export interface Wifi {
    available: boolean
    free: boolean
    details: string
  }
  export interface Shuttle {
    available: boolean
    details: string
  }
  export interface Wellness {
    swimmingPool: boolean
    indoorPool: IndoorPool
    outdoorPool: OutdoorPool
    heatedPool: boolean
    sunLoungers: boolean
    sauna: boolean
    steamRoom: boolean
    jacuzzi: string
    spa: boolean
    fitnessCentre: FitnessCentre
  }
  export interface IndoorPool {
    available: boolean
    free: boolean
    details: string
  }
  export interface OutdoorPool {
    available: boolean
    free: boolean
    details: string
  }
  export interface FitnessCentre {
    available: boolean
    free: boolean
    details: string
  }
  export interface CovidMeasures {
    enhancedCleaningMeasures: any[]
    safetyMeasures: any[]
    socialDistancing: string[]
  }
  export interface FamilyFacilities {
    kidsClub: boolean
    playground: boolean
    kidsPool: boolean
    babySitting: boolean
    waterSlides: boolean
    indoorPlayArea: boolean
    familyRooms: boolean
  }
  export interface DisabilityFriendly {
    wheelchairFriendly: boolean
  }
  export interface RoomAmenities {
    shower: string
    bathtub: string
    hairdryer: string
    "cable tv": string
    minibar: string
    fridge: string
    safe: string
    airConditioning: string
    heating: string
    microwave: string
    teaCoffeeMaker: string
    accessible: string
  }
  export interface UserRatings {
    tripAbroodFamilyRating: any
    userReviewsRating: any
    expediaRating: ExpediaRating
    bookingRating: BookingRating
    tripAdvisorRating: TripAdvisorRating
    tripAbroodWeighedRating: number
  }
  export interface ExpediaRating {
    totalRating: number
    numberOfRatings: number
    numberOfFamilyRatings: any
    numberOfExcellentRatings: any
    numberOfGoodRatings: any
    numberOfOkRatings: any
    numberOfMediocreRatings: any
    numberOfPoorRatings: any
    locationRating: any
    neighbourhoodRating: any
    cleanlinessRating: number
    serviceRating: number
    comfortRating: number
    valueForMoneyRating: string
    amenitiesRating: any
    conditionRating: number
    recommendationPercent: number
  }
  export interface BookingRating {
    totalRating: string
    numberOfRatings: string
    numberOfFamilyRatings: string
    numberOfExcellentRatings: string
    numberOfGoodRatings: string
    numberOfOkRatings: string
    numberOfMediocreRatings: string
    numberOfPoorRatings: string
    locationRating: string
    cleanlinessRating: string
    staffRating: string
    comfortRating: string
    valueForMoneyRating: string
    facilitiesRating: string
    propertyConditionRating: string
  }
  export interface TripAdvisorRating {
    totalRating: string
    numberOfRatings: string
    numberOfFamilyRatings: string
    numberOfExcellentRatings: string
    numberOfGoodRatings: string
    numberOfOkRatings: string
    numberOfMediocreRatings: string
    numberOfPoorRatings: string
    locationRating: string
    sleepRating: string
    roomRating: string
    serviceRating: string
    valueRating: string
    cleanlinessRating: string
  }
  export interface HouseRules {
    checkIn: CheckIn
    checkOut: CheckOut
    fees: Fees
    policies: Policies
  }
  export interface CheckIn {
    "24_hour": string
    begin_time: string
    end_time: string
    instructions: string[]
    special_instructions: string
    min_age: number
  }
  export interface CheckOut {
    time: string
  }
  export interface Fees {
    mandatory: string
    optional: string
  }
  export interface Policies {
    cotPolicy: string
    bedPolicy: string
    childPolicy: any[]
    petPolicy: PetPolicy
    know_before_you_go: string
  }
  export interface PetPolicy {
    allowed: boolean
    details: string[]
  }
  export interface OnsitePayments {
    currency: string
  }
  export interface RoomsInfo {
    roomId: string
    name: string
    descriptions: string
    amenities: string[]
    images: Image[]
    bedsInfo: BedsInfo
    roomView: RoomView
    area: Area
    occupancy: Occupancy
    roomBroodBasics: string[]
    roomAmenities: any[]
    roomYums: string[]
    roomFamilyFuns: string[]
    roomStayConnected: string[]
    roomBathTime: string[]
    roomAdditionalAmenities: string[]
    roomAccesibilityAndSafety: any[]
    roomGoodForEnvironments: any[]
    familyFreindlyFeatures: string[]
  }
  export interface Image {
    caption: string
    category: number
    hero_image: boolean
    links: Links
  }
  export interface Links {
    tiny_href: string
    small_href: string
    medium_href: string
    large_href: string
  }
  export interface BedsInfo {
    description: string
  }
  export interface RoomView {
    description: string[]
  }
  export interface Area {
    square_meters: string
    square_feet: string
  }
  export interface Occupancy {
    max_allowed: MaxAllowed
    age_categories: AgeCategories
  }
  export interface MaxAllowed {
    total: number
    children: number
    adults: number
  }
  export interface AgeCategories {
    infant_minimum_age: any
    children_minimum_age: any
    adult_minimum_age: number
  }
  export interface RatesInfo {}
  export interface Image2 {
    caption: string
    category: number
    hero_image: boolean
    links: Links2
  }
  export interface Links2 {
    tiny_href: string
    small_href: string
    medium_href: string
    large_href: string
  }