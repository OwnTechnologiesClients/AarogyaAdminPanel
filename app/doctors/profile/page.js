import { Layout } from "@/components/layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function DoctorProfile() {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Doctor Profile Card */}
          <div className="lg:col-span-2">
            <Card className="bg-blue-900 text-white p-6">
              <div className="flex items-start space-x-4">
                <div className="relative">
                  <Image
                    src="/doctorimg/doctor-1.png"
                    alt="Dr. Demetrius Wright"
                    width={120}
                    height={120}
                    className="rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">Hello I am, Dr. Demetrius Wright</h2>
                  <p className="text-blue-200 mb-2">MBBS, MS - General Surgery, General Physician</p>
                  <p className="text-blue-200 mb-3">16 Years Experience Overall</p>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-blue-200">18900 Reviews</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Statistics Cards */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">300+ Patients</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">10% High</Badge>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">400+ Surgeries</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">18% High</Badge>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674c.3-.922-.755-1.688-1.538-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">900+ Reviews</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-red-100 text-red-800">30% High</Badge>
              </div>
            </Card>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - About and Specialization */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">About</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Dr. Demetrius Wright is an eminent Endocrinologist associated with med hospitals. 
                He specializes in diagnosing and treating diseases related to glands and hormonal imbalances. 
                He treats common conditions including Diabetes, Metabolic disorders, Lack of growth, 
                Osteoporosis, Thyroid diseases, Cancers of the endocrine glands, over/under production 
                of hormones, Cholesterol disorders, Hypertension and Infertility. He is available for 
                consultation at Med hospital and follows a patient-centric approach.
              </p>
              
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-3">Specialized in</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 px-3 py-1">Diabetes</Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 px-3 py-1">Thyroid</Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 px-3 py-1">Osteoporosis</Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 px-3 py-1">Surgeon</Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 px-3 py-1">General</Badge>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Availability */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Availability</h3>
              <div className="grid grid-cols-1 gap-2 mb-6">
                <Badge variant="outline" className="bg-gray-50 text-gray-700 px-3 py-2 text-center">Mon - 9:AM - 2:PM</Badge>
                <Badge variant="outline" className="bg-gray-50 text-gray-700 px-3 py-2 text-center">Tue - 9:AM - 2:PM</Badge>
                <Badge variant="outline" className="bg-gray-50 text-gray-700 px-3 py-2 text-center">Wed - 9:AM - 2:PM</Badge>
                <Badge variant="outline" className="bg-gray-50 text-gray-700 px-3 py-2 text-center">Thu - 9:AM - 2:PM</Badge>
                <Badge variant="outline" className="bg-gray-50 text-gray-700 px-3 py-2 text-center">Fri - 9:AM - 2:PM</Badge>
                <Badge variant="outline" className="bg-gray-50 text-gray-700 px-3 py-2 text-center">Sat - 9:AM - 2:PM</Badge>
                <Badge variant="outline" className="bg-gray-50 text-gray-700 px-3 py-2 text-center">Sun - NA</Badge>
              </div>
              
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold">
                Book Appointment
              </Button>
            </Card>
          </div>
        </div>

        {/* Patient Reviews and Awards Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Patient Reviews - Takes 2 columns */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Patient Reviews</h3>
              
              <div className="space-y-6">
                {/* Review 1 */}
                <div className="border-b border-gray-100 pb-6 last:border-b-0">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg flex-shrink-0 overflow-hidden">
                      <Image
                        src="/chatImg/client-5.png"
                        alt="Trisha Norfleet"
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">Excellent</Badge>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Trisha Norfleet</h4>
                      <p className="text-gray-700 text-sm leading-relaxed mb-3">
                        I am consulting with her for last 10 years and she is really good in thyroid. Her experience has greatest strength by looking at the report she will diagnosis the problem and listen to us. We might think she is in a hurry to complete the patient but her experience makes her 100%.
                      </p>
                      <div className="flex items-center space-x-2 mb-2">
                        <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-500 text-sm">I recommend the doctor</span>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Review 2 */}
                <div className="border-b border-gray-100 pb-6 last:border-b-0">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg flex-shrink-0 overflow-hidden">
                      <Image
                        src="/chatImg/client-6.png"
                        alt="Carla Remington"
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">Super</Badge>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Carla Remington</h4>
                      <p className="text-gray-700 text-sm leading-relaxed mb-3">
                        I am consulting with her for last 10 years and she is really good in thyroid. Her experience has greatest strength by looking at the report she will diagnosis the problem and listen to us. We might think she is in a hurry to complete the patient but her experience makes her 100%.
                      </p>
                      <div className="flex items-center space-x-2 mb-2">
                        <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-500 text-sm">I recommend the doctor</span>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Review 3 */}
                <div className="border-b border-gray-100 pb-6 last:border-b-0">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg flex-shrink-0 overflow-hidden">
                      <Image
                        src="/chatImg/client-7.png"
                        alt="Dreama Weigel"
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">Super</Badge>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Dreama Weigel</h4>
                      <p className="text-gray-700 text-sm leading-relaxed mb-3">
                        I am consulting with her for last 10 years and she is really good in thyroid. Her experience has greatest strength by looking at the report she will diagnosis the problem and listen to us. We might think she is in a hurry to complete the patient but her experience makes her 100%.
                      </p>
                      <div className="flex items-center space-x-2 mb-2">
                        <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-500 text-sm">I recommend the doctor</span>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 font-semibold">
                  Load More
                </Button>
              </div>
            </Card>
          </div>

          {/* Awards - Takes 1 column */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Awards</h3>
              
              <div className="text-center">
                {/* Certificate Illustration */}
                <div className="bg-blue-50 rounded-lg p-6 mb-6">
                  <div className="relative">
                    {/* Medical professionals */}
                    <div className="flex justify-center space-x-2 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                          </svg>
                        </div>
                      ))}
                    </div>
                    
                    {/* Certificate */}
                    <div className="bg-white border-2 border-blue-200 rounded-lg p-4 relative">
                      <div className="text-center">
                        <h4 className="text-blue-800 font-bold text-lg mb-2">CERTIFICATE</h4>
                        <div className="space-y-1">
                          <div className="h-0.5 bg-blue-200"></div>
                          <div className="h-0.5 bg-blue-200 w-3/4 mx-auto"></div>
                          <div className="h-0.5 bg-blue-200 w-1/2 mx-auto"></div>
                        </div>
                      </div>
                      
                      {/* Seal */}
                      <div className="absolute top-2 right-2">
                        <div className="w-8 h-8 bg-orange-400 rounded-full border-2 border-orange-600"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Award Count */}
                <div className="text-6xl font-bold text-blue-600 mb-2">108</div>
                <p className="text-gray-600 text-sm">Awards received in 2025</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  )
} 