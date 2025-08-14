"use client"

import { useState, useMemo } from "react"
import { Layout } from "@/components/layout"
import { Pagination } from "@/components/ui/pagination"
import { usePagination } from "@/lib/hooks/usePagination"
import { 
  Search, 
  Trash2, 
  Edit, 
  Eye, 
  Filter
} from "lucide-react"
import Link from "next/link"

// Sample hospital data matching the Excel sheet fields
const hospitalsData = [
  {
    id: 1,
    hospitalName: "Cleveland Clinic",
    location: "Mumbai, India",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop&crop=center",
    rating: 9.9,
    userScore: 9.9,
    googleRating: 4.5,
    overview: {
      founded: "2010",
      patients: "50,000+",
      doctors: 45,
      sizeCapacity: {
        ot: 10,
        icu: 5,
        patientBed: "100+"
      },
      clinicType: "Multi-Specialty",
      typeOfCare: ["Inpatient", "Outpatient"],
      ageGroup: ["Kids", "Adults"]
    },
    specialities: [
      "Interventional Cardiology",
      "Heart Transplant",
      "Electrophysiology",
      "Cardiac Surgery"
    ],
    features: {
      hospitalFeatures: [
        "Advanced Cardiac Imaging",
        "Robotic Surgery",
        "Minimally Invasive Procedures",
        "Hybrid ORs",
        "3D Printing Lab"
      ],
      advancedMedicalEquipment: [
        "MRI Scanner (3 Tesla MRI for detailed Imaging)",
        "Cardiac Cath Lab (State-of-the-art cardiac catheterization laboratory)"
      ]
    },
    about: {
      aboutHospital: "For over 300 years, we have been committed to providing exceptional healthcare services...",
      mission: "To provide compassionate, high-quality healthcare services...",
      vision: "To be the leading healthcare provider in the region...",
      values: [
        "Compassion and empathy",
        "Excellence in clinical care and service",
        "Integrity and transparency",
        "Innovation and continuous improvement",
        "Respect for patients, families, and colleagues"
      ]
    },
    certificatesAccreditations: ["JCI Accreditation"],
    doctors: 45,
    gallery: [
      "Operation Rooms",
      "Patient Rooms",
      "Facilities",
      "Exterior"
    ],
    locationContact: {
      name: "Granite Medical Center",
      address: "123 Medical Center Drive, Delhi, India 110001",
      email: "info@granitemedical.com"
    },
    operatingHours: {
      mondayFriday: {
        emergency: "24/7",
        general: "8:00 AM - 8:00 PM"
      },
      saturday: {
        emergency: "24/7",
        general: "9:00 AM - 6:00 PM"
      },
      sunday: {
        emergency: "24/7",
        general: "10:00 AM - 4:00 PM"
      }
    },
    howToReach: {
      byCar: "Free parking (300+ spaces), valet service available",
      byBus: "Medical Center (30m), Central Station (200m)",
      byMetro: "Central Metro Station (5 min walk, Blue Line, Red Line)",
      byAir: "Delhi Airport (45 min drive, airport shuttle available)"
    },
    nearbyLandmarks: [
      { name: "Central Park", distance: "0.5 km" },
      { name: "City Mall", distance: "1.2 km" },
      { name: "Delhi University", distance: "2.1 km" },
      { name: "Government Hospital", distance: "3.0 km" },
      { name: "International Airport", distance: "25 km" }
    ]
  },
  {
    id: 2,
    hospitalName: "Apollo Hospitals",
    location: "Chennai, India",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=500&h=300&fit=crop&crop=center",
    rating: 9.7,
    userScore: 9.7,
    googleRating: 4.3,
    overview: {
      founded: "1983",
      patients: "100,000+",
      doctors: 120,
      sizeCapacity: {
        ot: 25,
        icu: 15,
        patientBed: "300+"
      },
      clinicType: "Multi-Specialty",
      typeOfCare: ["Inpatient", "Outpatient", "Emergency"],
      ageGroup: ["Kids", "Adults", "Elderly"]
    },
    specialities: [
      "Cardiology",
      "Oncology",
      "Neurology",
      "Orthopedics",
      "Transplant Surgery"
    ],
    features: {
      hospitalFeatures: [
        "Advanced Imaging Center",
        "Robotic Surgery Suite",
        "Emergency Trauma Center",
        "Cancer Treatment Center",
        "Research Laboratory"
      ],
      advancedMedicalEquipment: [
        "PET-CT Scanner",
        "Linear Accelerator",
        "Da Vinci Surgical Robot"
      ]
    },
    about: {
      aboutHospital: "Apollo Hospitals is one of Asia's largest healthcare groups...",
      mission: "To provide world-class healthcare services...",
      vision: "To be the most trusted healthcare provider...",
      values: [
        "Patient-centric care",
        "Clinical excellence",
        "Innovation",
        "Integrity",
        "Compassion"
      ]
    },
    certificatesAccreditations: ["JCI Accreditation", "NABH Accreditation"],
    doctors: 120,
    gallery: [
      "Modern Operation Theaters",
      "ICU Units",
      "Patient Wards",
      "Hospital Exterior"
    ],
    locationContact: {
      name: "Apollo Hospitals Enterprise Ltd",
      address: "Apollo Hospital Campus, Greams Road, Chennai, Tamil Nadu 600006",
      email: "info@apollohospitals.com"
    },
    operatingHours: {
      mondayFriday: {
        emergency: "24/7",
        general: "7:00 AM - 9:00 PM"
      },
      saturday: {
        emergency: "24/7",
        general: "8:00 AM - 7:00 PM"
      },
      sunday: {
        emergency: "24/7",
        general: "9:00 AM - 6:00 PM"
      }
    },
    howToReach: {
      byCar: "Free parking (500+ spaces), valet service available",
      byBus: "Apollo Hospital Bus Stop (50m), Central Bus Stand (1km)",
      byMetro: "Anna Nagar Metro Station (10 min walk, Blue Line)",
      byAir: "Chennai Airport (30 min drive, airport shuttle available)"
    },
    nearbyLandmarks: [
      { name: "Anna Nagar Park", distance: "0.8 km" },
      { name: "Forum Vijaya Mall", distance: "1.5 km" },
      { name: "Anna University", distance: "3.0 km" },
      { name: "Government General Hospital", distance: "4.2 km" },
      { name: "Chennai Airport", distance: "18 km" }
    ]
  },
  {
    id: 3,
    hospitalName: "Fortis Memorial Research Institute",
    location: "Gurgaon, India",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500&h=300&fit=crop&crop=center",
    rating: 9.5,
    userScore: 9.5,
    googleRating: 4.4,
    overview: {
      founded: "2001",
      patients: "75,000+",
      doctors: 80,
      sizeCapacity: {
        ot: 20,
        icu: 12,
        patientBed: "250+"
      },
      clinicType: "Multi-Specialty",
      typeOfCare: ["Inpatient", "Outpatient", "Emergency", "Day Care"],
      ageGroup: ["Kids", "Adults", "Elderly"]
    },
    specialities: [
      "Cardiac Sciences",
      "Neurology",
      "Oncology",
      "Orthopedics",
      "Pediatrics"
    ],
    features: {
      hospitalFeatures: [
        "Advanced Cardiac Center",
        "Neuro Sciences Institute",
        "Oncology Center",
        "Pediatric Center",
        "Emergency & Trauma Center"
      ],
      advancedMedicalEquipment: [
        "3 Tesla MRI",
        "256 Slice CT Scanner",
        "Linear Accelerator",
        "Hybrid Operating Room"
      ]
    },
    about: {
      aboutHospital: "Fortis Memorial Research Institute is a premier healthcare institution...",
      mission: "To provide world-class healthcare with compassion...",
      vision: "To be the most trusted healthcare provider...",
      values: [
        "Patient first",
        "Clinical excellence",
        "Innovation",
        "Integrity",
        "Compassion"
      ]
    },
    certificatesAccreditations: ["JCI Accreditation", "NABH Accreditation"],
    doctors: 80,
    gallery: [
      "State-of-the-art Operation Theaters",
      "Modern ICU Units",
      "Patient Rooms",
      "Hospital Building"
    ],
    locationContact: {
      name: "Fortis Memorial Research Institute",
      address: "Sector 44, Opposite HUDA City Centre, Gurgaon, Haryana 122002",
      email: "info@fortishealthcare.com"
    },
    operatingHours: {
      mondayFriday: {
        emergency: "24/7",
        general: "8:00 AM - 8:00 PM"
      },
      saturday: {
        emergency: "24/7",
        general: "9:00 AM - 7:00 PM"
      },
      sunday: {
        emergency: "24/7",
        general: "10:00 AM - 5:00 PM"
      }
    },
    howToReach: {
      byCar: "Free parking (400+ spaces), valet service available",
      byBus: "HUDA City Centre Bus Stop (100m), Gurgaon Bus Stand (2km)",
      byMetro: "HUDA City Centre Metro Station (5 min walk, Yellow Line)",
      byAir: "Delhi Airport (35 min drive, airport shuttle available)"
    },
    nearbyLandmarks: [
      { name: "HUDA City Centre", distance: "0.1 km" },
      { name: "Ambience Mall", distance: "1.0 km" },
      { name: "Cyber City", distance: "2.5 km" },
      { name: "Gurgaon Civil Hospital", distance: "3.8 km" },
      { name: "Delhi Airport", distance: "22 km" }
    ]
  },
  {
    id: 4,
    hospitalName: "Max Super Speciality Hospital",
    location: "Delhi, India",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=500&h=300&fit=crop&crop=center",
    rating: 9.3,
    userScore: 9.3,
    googleRating: 4.2,
    overview: {
      founded: "2006",
      patients: "60,000+",
      doctors: 65,
      sizeCapacity: {
        ot: 15,
        icu: 8,
        patientBed: "180+"
      },
      clinicType: "Multi-Specialty",
      typeOfCare: ["Inpatient", "Outpatient", "Emergency"],
      ageGroup: ["Kids", "Adults", "Elderly"]
    },
    specialities: [
      "Cardiology",
      "Neurology",
      "Orthopedics",
      "Gastroenterology",
      "Urology"
    ],
    features: {
      hospitalFeatures: [
        "Advanced Cardiac Care",
        "Neuro Sciences Center",
        "Joint Replacement Center",
        "Digestive Disease Institute",
        "Emergency Services"
      ],
      advancedMedicalEquipment: [
        "3 Tesla MRI",
        "64 Slice CT Scanner",
        "Digital X-Ray",
        "Endoscopy Suite"
      ]
    },
    about: {
      aboutHospital: "Max Super Speciality Hospital is a leading healthcare institution...",
      mission: "To provide world-class healthcare with compassion...",
      vision: "To be the most trusted healthcare provider...",
      values: [
        "Patient care first",
        "Clinical excellence",
        "Innovation",
        "Integrity",
        "Compassion"
      ]
    },
    certificatesAccreditations: ["NABH Accreditation", "ISO Certification"],
    doctors: 65,
    gallery: [
      "Modern Operation Theaters",
      "ICU Units",
      "Patient Wards",
      "Hospital Exterior"
    ],
    locationContact: {
      name: "Max Super Speciality Hospital",
      address: "1, Press Enclave Road, Saket, New Delhi 110017",
      email: "info@maxhealthcare.com"
    },
    operatingHours: {
      mondayFriday: {
        emergency: "24/7",
        general: "8:00 AM - 8:00 PM"
      },
      saturday: {
        emergency: "24/7",
        general: "9:00 AM - 6:00 PM"
      },
      sunday: {
        emergency: "24/7",
        general: "10:00 AM - 5:00 PM"
      }
    },
    howToReach: {
      byCar: "Free parking (200+ spaces), valet service available",
      byBus: "Saket Bus Stop (100m), Saket Metro Station (200m)",
      byMetro: "Saket Metro Station (2 min walk, Yellow Line)",
      byAir: "Delhi Airport (25 min drive, airport shuttle available)"
    },
    nearbyLandmarks: [
      { name: "Saket Metro Station", distance: "0.2 km" },
      { name: "Select Citywalk Mall", distance: "0.5 km" },
      { name: "Saket District Centre", distance: "0.8 km" },
      { name: "AIIMS Delhi", distance: "3.5 km" },
      { name: "Delhi Airport", distance: "20 km" }
    ]
  },
  {
    id: 5,
    hospitalName: "Medanta - The Medicity",
    location: "Gurgaon, India",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=500&h=300&fit=crop&crop=center",
    rating: 9.8,
    userScore: 9.8,
    googleRating: 4.6,
    overview: {
      founded: "2009",
      patients: "120,000+",
      doctors: 150,
      sizeCapacity: {
        ot: 30,
        icu: 20,
        patientBed: "400+"
      },
      clinicType: "Multi-Specialty",
      typeOfCare: ["Inpatient", "Outpatient", "Emergency", "Day Care"],
      ageGroup: ["Kids", "Adults", "Elderly"]
    },
    specialities: [
      "Cardiac Sciences",
      "Neuro Sciences",
      "Oncology",
      "Orthopedics",
      "Transplant"
    ],
    features: {
      hospitalFeatures: [
        "Advanced Cardiac Institute",
        "Institute of Neurosciences",
        "Cancer Institute",
        "Institute of Musculoskeletal Disorders",
        "Emergency & Trauma Center"
      ],
      advancedMedicalEquipment: [
        "7 Tesla MRI",
        "PET-CT Scanner",
        "Linear Accelerator",
        "Robotic Surgery Systems"
      ]
    },
    about: {
      aboutHospital: "Medanta - The Medicity is one of India's largest multi-super specialty institutes...",
      mission: "To provide world-class healthcare with compassion...",
      vision: "To be the most trusted healthcare provider...",
      values: [
        "Patient-centric care",
        "Clinical excellence",
        "Innovation",
        "Integrity",
        "Compassion"
      ]
    },
    certificatesAccreditations: ["JCI Accreditation", "NABH Accreditation", "ISO 9001"],
    doctors: 150,
    gallery: [
      "State-of-the-art Operation Theaters",
      "Modern ICU Units",
      "Patient Rooms",
      "Hospital Building"
    ],
    locationContact: {
      name: "Medanta - The Medicity",
      address: "Medanta City Centre, Sector 38, Gurgaon, Haryana 122001",
      email: "info@medanta.org"
    },
    operatingHours: {
      mondayFriday: {
        emergency: "24/7",
        general: "7:00 AM - 9:00 PM"
      },
      saturday: {
        emergency: "24/7",
        general: "8:00 AM - 7:00 PM"
      },
      sunday: {
        emergency: "24/7",
        general: "9:00 AM - 6:00 PM"
      }
    },
    howToReach: {
      byCar: "Free parking (600+ spaces), valet service available",
      byBus: "Medanta Bus Stop (50m), Gurgaon Bus Stand (3km)",
      byMetro: "Huda City Centre Metro Station (15 min drive, Yellow Line)",
      byAir: "Delhi Airport (30 min drive, airport shuttle available)"
    },
    nearbyLandmarks: [
      { name: "Medanta City Centre", distance: "0.05 km" },
      { name: "Cyber City", distance: "2.0 km" },
      { name: "Huda City Centre", distance: "3.0 km" },
      { name: "Gurgaon Civil Hospital", distance: "4.5 km" },
      { name: "Delhi Airport", distance: "25 km" }
    ]
  },
  {
    id: 6,
    hospitalName: "AIIMS Delhi",
    location: "New Delhi, India",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop&crop=center",
    rating: 9.6,
    userScore: 9.6,
    googleRating: 4.4,
    overview: {
      founded: "1956",
      patients: "200,000+",
      doctors: 200,
      sizeCapacity: {
        ot: 35,
        icu: 25,
        patientBed: "500+"
      },
      clinicType: "Medical Institute",
      typeOfCare: ["Inpatient", "Outpatient", "Emergency", "Research"],
      ageGroup: ["Kids", "Adults", "Elderly"]
    },
    specialities: [
      "Cardiology",
      "Neurology",
      "Oncology",
      "Orthopedics",
      "Research"
    ],
    features: {
      hospitalFeatures: [
        "Advanced Medical Research",
        "Teaching Hospital",
        "Specialized Centers",
        "Emergency Services",
        "Research Laboratories"
      ],
      advancedMedicalEquipment: [
        "Advanced Imaging Systems",
        "Research Equipment",
        "Specialized Surgical Tools",
        "Diagnostic Laboratories"
      ]
    },
    about: {
      aboutHospital: "AIIMS Delhi is India's premier medical institute and hospital...",
      mission: "To provide world-class healthcare and medical education...",
      vision: "To be the leading medical institute...",
      values: [
        "Excellence in education",
        "Clinical excellence",
        "Research innovation",
        "Integrity",
        "Service to society"
      ]
    },
    certificatesAccreditations: ["NABH Accreditation", "Medical Council Recognition"],
    doctors: 200,
    gallery: [
      "Modern Operation Theaters",
      "ICU Units",
      "Patient Wards",
      "Institute Building"
    ],
    locationContact: {
      name: "All India Institute of Medical Sciences",
      address: "Sri Aurobindo Marg, Ansari Nagar, New Delhi 110029",
      email: "info@aiims.edu"
    },
    operatingHours: {
      mondayFriday: {
        emergency: "24/7",
        general: "8:00 AM - 8:00 PM"
      },
      saturday: {
        emergency: "24/7",
        general: "9:00 AM - 6:00 PM"
      },
      sunday: {
        emergency: "24/7",
        general: "10:00 AM - 4:00 PM"
      }
    },
    howToReach: {
      byCar: "Limited parking available, public transport recommended",
      byBus: "AIIMS Bus Stop (100m), Central Bus Stand (2km)",
      byMetro: "AIIMS Metro Station (5 min walk, Pink Line)",
      byAir: "Delhi Airport (35 min drive, airport shuttle available)"
    },
    nearbyLandmarks: [
      { name: "AIIMS Metro Station", distance: "0.1 km" },
      { name: "Safdarjung Hospital", distance: "1.0 km" },
      { name: "JNU Campus", distance: "2.5 km" },
      { name: "Lodhi Garden", distance: "3.0 km" },
      { name: "Delhi Airport", distance: "22 km" }
    ]
  },
  {
    id: 7,
    hospitalName: "Safdarjung Hospital",
    location: "New Delhi, India",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500&h=300&fit=crop&crop=center",
    rating: 9.2,
    userScore: 9.2,
    googleRating: 4.1,
    overview: {
      founded: "1942",
      patients: "150,000+",
      doctors: 180,
      sizeCapacity: {
        ot: 28,
        icu: 18,
        patientBed: "350+"
      },
      clinicType: "Government Hospital",
      typeOfCare: ["Inpatient", "Outpatient", "Emergency"],
      ageGroup: ["Kids", "Adults", "Elderly"]
    },
    specialities: [
      "General Medicine",
      "Surgery",
      "Pediatrics",
      "Gynecology",
      "Emergency Medicine"
    ],
    features: {
      hospitalFeatures: [
        "Emergency Services",
        "General Wards",
        "Specialized Units",
        "Teaching Hospital",
        "Research Center"
      ],
      advancedMedicalEquipment: [
        "Basic Imaging Equipment",
        "Surgical Instruments",
        "Emergency Equipment",
        "Laboratory Services"
      ]
    },
    about: {
      aboutHospital: "Safdarjung Hospital is one of Delhi's largest government hospitals...",
      mission: "To provide quality healthcare to all sections of society...",
      vision: "To be a leading government healthcare provider...",
      values: [
        "Public service",
        "Quality care",
        "Accessibility",
        "Integrity",
        "Compassion"
      ]
    },
    certificatesAccreditations: ["Government Recognition", "Medical Council Approval"],
    doctors: 180,
    gallery: [
      "General Wards",
      "Operation Theaters",
      "Emergency Department",
      "Hospital Building"
    ],
    locationContact: {
      name: "Vardhman Mahavir Medical College & Safdarjung Hospital",
      address: "Ansari Nagar West, New Delhi 110021",
      email: "info@safdarjunghospital.com"
    },
    operatingHours: {
      mondayFriday: {
        emergency: "24/7",
        general: "8:00 AM - 8:00 PM"
      },
      saturday: {
        emergency: "24/7",
        general: "9:00 AM - 6:00 PM"
      },
      sunday: {
        emergency: "24/7",
        general: "10:00 AM - 4:00 PM"
      }
    },
    howToReach: {
      byCar: "Limited parking available, public transport recommended",
      byBus: "Safdarjung Bus Stop (100m), Central Bus Stand (1.5km)",
      byMetro: "AIIMS Metro Station (10 min walk, Pink Line)",
      byAir: "Delhi Airport (30 min drive, airport shuttle available)"
    },
    nearbyLandmarks: [
      { name: "AIIMS Delhi", distance: "1.0 km" },
      { name: "JNU Campus", distance: "2.0 km" },
      { name: "Lodhi Garden", distance: "2.5 km" },
      { name: "Khan Market", distance: "3.0 km" },
      { name: "Delhi Airport", distance: "23 km" }
    ]
  },
  {
    id: 8,
    hospitalName: "BLK Super Speciality Hospital",
    location: "New Delhi, India",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=500&h=300&fit=crop&crop=center",
    rating: 9.4,
    userScore: 9.4,
    googleRating: 4.3,
    overview: {
      founded: "1959",
      patients: "80,000+",
      doctors: 90,
      sizeCapacity: {
        ot: 22,
        icu: 12,
        patientBed: "250+"
      },
      clinicType: "Multi-Specialty",
      typeOfCare: ["Inpatient", "Outpatient", "Emergency"],
      ageGroup: ["Kids", "Adults", "Elderly"]
    },
    specialities: [
      "Cardiology",
      "Neurology",
      "Orthopedics",
      "Oncology",
      "Transplant"
    ],
    features: {
      hospitalFeatures: [
        "Advanced Cardiac Care",
        "Neuro Sciences Center",
        "Joint Replacement Center",
        "Cancer Treatment",
        "Emergency Services"
      ],
      advancedMedicalEquipment: [
        "3 Tesla MRI",
        "64 Slice CT Scanner",
        "Digital X-Ray",
        "Endoscopy Suite"
      ]
    },
    about: {
      aboutHospital: "BLK Super Speciality Hospital is a leading healthcare institution...",
      mission: "To provide world-class healthcare with compassion...",
      vision: "To be the most trusted healthcare provider...",
      values: [
        "Patient care first",
        "Clinical excellence",
        "Innovation",
        "Integrity",
        "Compassion"
      ]
    },
    certificatesAccreditations: ["NABH Accreditation", "ISO Certification"],
    doctors: 90,
    gallery: [
      "Modern Operation Theaters",
      "ICU Units",
      "Patient Wards",
      "Hospital Exterior"
    ],
    locationContact: {
      name: "BLK Super Speciality Hospital",
      address: "Pusa Road, New Delhi 110005",
      email: "info@blkhospital.com"
    },
    operatingHours: {
      mondayFriday: {
        emergency: "24/7",
        general: "8:00 AM - 8:00 PM"
      },
      saturday: {
        emergency: "24/7",
        general: "9:00 AM - 6:00 PM"
      },
      sunday: {
        emergency: "24/7",
        general: "10:00 AM - 5:00 PM"
      }
    },
    howToReach: {
      byCar: "Free parking (150+ spaces), valet service available",
      byBus: "Pusa Road Bus Stop (100m), Central Bus Stand (1km)",
      byMetro: "Rajendra Place Metro Station (10 min walk, Blue Line)",
      byAir: "Delhi Airport (28 min drive, airport shuttle available)"
    },
    nearbyLandmarks: [
      { name: "Rajendra Place Metro", distance: "0.8 km" },
      { name: "Karol Bagh Market", distance: "1.2 km" },
      { name: "Connaught Place", distance: "2.5 km" },
      { name: "New Delhi Railway Station", distance: "3.0 km" },
      { name: "Delhi Airport", distance: "18 km" }
    ]
  },
  {
    id: 9,
    hospitalName: "Ganga Ram Hospital",
    location: "New Delhi, India",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=500&h=300&fit=crop&crop=center",
    rating: 9.1,
    userScore: 9.1,
    googleRating: 4.0,
    overview: {
      founded: "1921",
      patients: "100,000+",
      doctors: 110,
      sizeCapacity: {
        ot: 20,
        icu: 15,
        patientBed: "300+"
      },
      clinicType: "Multi-Specialty",
      typeOfCare: ["Inpatient", "Outpatient", "Emergency"],
      ageGroup: ["Kids", "Adults", "Elderly"]
    },
    specialities: [
      "General Medicine",
      "Surgery",
      "Cardiology",
      "Neurology",
      "Pediatrics"
    ],
    features: {
      hospitalFeatures: [
        "General Medical Services",
        "Surgical Department",
        "Cardiac Care",
        "Emergency Services",
        "Teaching Hospital"
      ],
      advancedMedicalEquipment: [
        "Basic Imaging Equipment",
        "Surgical Instruments",
        "Emergency Equipment",
        "Laboratory Services"
      ]
    },
    about: {
      aboutHospital: "Ganga Ram Hospital is one of Delhi's oldest and most trusted hospitals...",
      mission: "To provide quality healthcare to all sections of society...",
      vision: "To be a leading healthcare provider...",
      values: [
        "Quality care",
        "Patient service",
        "Integrity",
        "Compassion",
        "Excellence"
      ]
    },
    certificatesAccreditations: ["NABH Accreditation", "Medical Council Recognition"],
    doctors: 110,
    gallery: [
      "General Wards",
      "Operation Theaters",
      "Emergency Department",
      "Hospital Building"
    ],
    locationContact: {
      name: "Sir Ganga Ram Hospital",
      address: "Sir Ganga Ram Hospital Marg, New Rajinder Nagar, New Delhi 110060",
      email: "info@gangaramhospital.com"
    },
    operatingHours: {
      mondayFriday: {
        emergency: "24/7",
        general: "8:00 AM - 8:00 PM"
      },
      saturday: {
        emergency: "24/7",
        general: "9:00 AM - 6:00 PM"
      },
      sunday: {
        emergency: "24/7",
        general: "10:00 AM - 4:00 PM"
      }
    },
    howToReach: {
      byCar: "Limited parking available, public transport recommended",
      byBus: "Ganga Ram Hospital Bus Stop (100m), Central Bus Stand (1.5km)",
      byMetro: "Rajendra Place Metro Station (15 min walk, Blue Line)",
      byAir: "Delhi Airport (25 min drive, airport shuttle available)"
    },
    nearbyLandmarks: [
      { name: "Rajendra Place Metro", distance: "1.2 km" },
      { name: "Karol Bagh Market", distance: "1.8 km" },
      { name: "Connaught Place", distance: "2.8 km" },
      { name: "New Delhi Railway Station", distance: "3.2 km" },
      { name: "Delhi Airport", distance: "20 km" }
    ]
  },
  {
    id: 10,
    hospitalName: "Holy Family Hospital",
    location: "New Delhi, India",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop&crop=center",
    rating: 9.0,
    userScore: 9.0,
    googleRating: 3.9,
    overview: {
      founded: "1953",
      patients: "70,000+",
      doctors: 75,
      sizeCapacity: {
        ot: 18,
        icu: 10,
        patientBed: "200+"
      },
      clinicType: "Multi-Specialty",
      typeOfCare: ["Inpatient", "Outpatient", "Emergency"],
      ageGroup: ["Kids", "Adults", "Elderly"]
    },
    specialities: [
      "General Medicine",
      "Surgery",
      "Gynecology",
      "Pediatrics",
      "Emergency Medicine"
    ],
    features: {
      hospitalFeatures: [
        "General Medical Services",
        "Surgical Department",
        "Maternity Care",
        "Pediatric Care",
        "Emergency Services"
      ],
      advancedMedicalEquipment: [
        "Basic Imaging Equipment",
        "Surgical Instruments",
        "Emergency Equipment",
        "Laboratory Services"
      ]
    },
    about: {
      aboutHospital: "Holy Family Hospital is a trusted healthcare institution...",
      mission: "To provide quality healthcare with compassion...",
      vision: "To be a leading healthcare provider...",
      values: [
        "Quality care",
        "Patient service",
        "Integrity",
        "Compassion",
        "Excellence"
      ]
    },
    certificatesAccreditations: ["NABH Accreditation", "Medical Council Recognition"],
    doctors: 75,
    gallery: [
      "General Wards",
      "Operation Theaters",
      "Maternity Ward",
      "Hospital Building"
    ],
    locationContact: {
      name: "Holy Family Hospital",
      address: "Okhla Road, New Delhi 110025",
      email: "info@holyfamilyhospital.com"
    },
    operatingHours: {
      mondayFriday: {
        emergency: "24/7",
        general: "8:00 AM - 8:00 PM"
      },
      saturday: {
        emergency: "24/7",
        general: "9:00 AM - 6:00 PM"
      },
      sunday: {
        emergency: "24/7",
        general: "10:00 AM - 4:00 PM"
      }
    },
    howToReach: {
      byCar: "Limited parking available, public transport recommended",
      byBus: "Holy Family Hospital Bus Stop (100m), Okhla Bus Stand (1km)",
      byMetro: "Okhla Metro Station (15 min walk, Magenta Line)",
      byAir: "Delhi Airport (20 min drive, airport shuttle available)"
    },
    nearbyLandmarks: [
      { name: "Okhla Metro Station", distance: "1.0 km" },
      { name: "Okhla Industrial Area", distance: "1.5 km" },
      { name: "Saket", distance: "3.0 km" },
      { name: "Greater Noida", distance: "15 km" },
      { name: "Delhi Airport", distance: "18 km" }
    ]
  }
]

export default function HospitalList() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter hospitals based on search term
  const filteredHospitals = useMemo(() => {
    return hospitalsData.filter(hospital =>
      hospital.hospitalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.specialities.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase())) ||
      hospital.overview.clinicType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.locationContact.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm])

  // Use pagination hook
  const {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    currentItems: currentHospitals,
    handlePageChange,
    handleItemsPerPageChange,
    resetPagination
  } = usePagination(filteredHospitals, 4)

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    resetPagination() // Reset to first page when searching
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Hospital List</h1>
            <p className="text-gray-700 text-lg">View and manage all hospitals</p>
          </div>
          <Link href="/hospital/add">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-sm">
              Add New Hospital
            </button>
          </Link>
        </div>

        <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg border border-blue-100">
          {/* Search and Controls */}
          <div className="p-6 border-b border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search hospitals, specialty, location, clinic type..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="pl-10 pr-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-80 text-gray-900 placeholder-gray-500 shadow-md bg-white"
                  />
                </div>
                <button className="flex items-center space-x-2 px-4 py-3 border-2 border-blue-200 rounded-lg hover:bg-blue-50 hover:border-blue-400 transition-colors shadow-md bg-white">
                  <Filter className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-900">Filter</span>
                </button>
              </div>
              {searchTerm && (
                <div className="text-sm text-gray-800 font-semibold bg-blue-100 px-4 py-2 rounded-lg">
                  Found <span className="text-blue-700 font-bold">{filteredHospitals.length}</span> hospital{filteredHospitals.length !== 1 ? 's' : ''}
                  <span className="text-gray-700 ml-2">for "{searchTerm}"</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-indigo-600">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Hospital Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Capacity
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-blue-100">
                {currentHospitals.map((hospital, index) => (
                  <tr key={index} className="hover:bg-blue-50 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-blue-700">
                      #{hospital.id}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-lg overflow-hidden ring-2 ring-blue-200">
                          <img 
                            src={hospital.image} 
                            alt={hospital.hospitalName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback to initials if image fails to load
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div className="w-full h-full bg-blue-100 rounded-lg flex items-center justify-center hidden">
                            <span className="text-sm font-semibold text-blue-600">
                              {hospital.hospitalName.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-bold text-gray-900">{hospital.hospitalName}</div>
                          <div className="text-xs text-gray-500 truncate max-w-32">{hospital.specialities[0]}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-gray-800">
                      {hospital.location}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-green-600">
                      ⭐ {hospital.rating}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-blue-700">
                      {hospital.overview.clinicType}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-gray-700">
                      <div className="text-xs">
                        <div>OT: {hospital.overview.sizeCapacity.ot}</div>
                        <div>ICU: {hospital.overview.sizeCapacity.icu}</div>
                        <div>Beds: {hospital.overview.sizeCapacity.patientBed}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-red-600 hover:text-red-700 p-2 rounded hover:bg-red-50 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-700 p-2 rounded hover:bg-green-50 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-blue-600 hover:text-blue-700 p-2 rounded hover:bg-blue-50 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-blue-200">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          </div>
        </div>

    
      </div>
    </Layout>
  )
} 