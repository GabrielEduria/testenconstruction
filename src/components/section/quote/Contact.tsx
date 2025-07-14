'use client';
import { Calculator, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import Motion from '@/components/animation/Motion';

export default function Contact () {
      const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        province: '',
        zipCode: '',
        propertyType: '',
        roofType: '',
        monthlyBill: '',
        systemSize: '',
        installationType: '',
        timeline: '',
        message: ''
      });
    
      const [isSubmitting, setIsSubmitting] = useState(false);
      const [isSubmitted, setIsSubmitted] = useState(false);
    
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
      };
    
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
          setIsSubmitting(false);
          setIsSubmitted(true);
       
          setTimeout(() => {
            setIsSubmitted(false);
            setFormData({
              firstName: '',
              lastName: '',
              email: '',
              phone: '',
              address: '',
              city: '',
              province: '',
              zipCode: '',
              propertyType: '',
              roofType: '',
              monthlyBill: '',
              systemSize: '',
              installationType: '',
              timeline: '',
              message: ''
            });
          }, 3000);
        }, 2000);
      };
    return (
        <Motion>
          <div id="quote" className="py-16 px-4 sm:px-6 lg:px-8 md:scroll-mt-20">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg border">
                <div className="bg-blue-800 text-center md:text-left px-2 md:px-8 py-6 rounded-t-lg">
                  <div className="flex flex-col md:flex-row items-center gap-4">
                  <Calculator className="h-6 w-6 text-white" />
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    Request Your Custom Solar Quote
                  </h2>
                  </div>
                  <p className="text-blue-100 mt-2">
                    Fill out the form below and our solar experts will contact you within 24 hours
                  </p>
                </div>

                <div className="p-4 md:p-8 space-y-8">
              
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          placeholder="+63 917 123 4567"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Property Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                      Property Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Property Address *
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City *
                        </label>
                        <select
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                        >
                          <option value="">Select City</option>
                          <option value="Caloocan">Caloocan</option>
                          <option value="Las Piñas">Las Piñas</option>
                          <option value="Makati">Makati</option>
                          <option value="Malabon">Malabon</option>
                          <option value="Mandaluyong">Mandaluyong</option>
                          <option value="Manila">Manila</option>
                          <option value="Marikina">Marikina</option>
                          <option value="Muntinlupa">Muntinlupa</option>
                          <option value="Navotas">Navotas</option>
                          <option value="Parañaque">Parañaque</option>
                          <option value="Pasay">Pasay</option>
                          <option value="Pasig">Pasig</option>
                          <option value="Pateros">Pateros</option>
                          <option value="Quezon City">Quezon City</option>
                          <option value="San Juan">San Juan</option>
                          <option value="Taguig">Taguig</option>
                          <option value="Valenzuela">Valenzuela</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Zip Code
                        </label>
                        <input
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Property Type *
                        </label>
                        <select
                          name="propertyType"
                          value={formData.propertyType}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                        >
                          <option value="">Select Property Type</option>
                          <option value="Residential House">Residential House</option>
                          <option value="Condominium">Condominium</option>
                          <option value="Townhouse">Townhouse</option>
                          <option value="Commercial Building">Commercial Building</option>
                          <option value="Industrial Facility">Industrial Facility</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Roof Type *
                        </label>
                        <select
                          name="roofType"
                          value={formData.roofType}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                        >
                          <option value="">Select Roof Type</option>
                          <option value="Concrete">Concrete</option>
                          <option value="Metal/GI Sheet">Metal/GI Sheet</option>
                          <option value="Clay Tiles">Clay Tiles</option>
                          <option value="Asphalt Shingles">Asphalt Shingles</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Solar System Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                      Solar System Requirements
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Monthly Electricity Bill (₱) *
                        </label>
                        <select
                          name="monthlyBill"
                          value={formData.monthlyBill}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                        >
                          <option value="">Select Range</option>
                          <option value="₱3,000 - ₱5,000">₱3,000 - ₱5,000</option>
                          <option value="₱5,000 - ₱10,000">₱5,000 - ₱10,000</option>
                          <option value="₱10,000 - ₱20,000">₱10,000 - ₱20,000</option>
                          <option value="₱20,000 - ₱30,000">₱20,000 - ₱30,000</option>
                          <option value="₱30,000+">₱30,000+</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Desired System Size (kW)
                        </label>
                        <select
                          name="systemSize"
                          value={formData.systemSize}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                        >
                          <option value="">Not sure / Let experts decide</option>
                          <option value="3-5 kW">3-5 kW</option>
                          <option value="5-10 kW">5-10 kW</option>
                          <option value="10-20 kW">10-20 kW</option>
                          <option value="20+ kW">20+ kW</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Installation Type *
                        </label>
                        <select
                          name="installationType"
                          value={formData.installationType}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                        >
                          <option value="">Select Installation Type</option>
                          <option value="Grid-Tied">Grid-Tied (Connected to MERALCO)</option>
                          <option value="Off-Grid">Off-Grid (With Battery Storage)</option>
                          <option value="Hybrid">Hybrid (Grid-Tied + Battery Backup)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Installation Timeline *
                        </label>
                        <select
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                        >
                          <option value="">Select Timeline</option>
                          <option value="ASAP">As soon as possible</option>
                          <option value="1-3 months">1-3 months</option>
                          <option value="3-6 months">3-6 months</option>
                          <option value="6+ months">6+ months</option>
                          <option value="Just researching">Just researching</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Requirements or Questions
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                      placeholder="Tell us about any specific requirements, concerns, or questions you have about solar installation..."
                    />
                  </div>

                  {/* Submit Button */}
                  
                  <div className="pt-4">
                    <form onSubmit={handleSubmit}>
                      <button
                        type="button"
                        disabled={isSubmitting}
                        className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-200 cursor-pointer ${
                          isSubmitting
                            ? 'bg-gray-400 cursor-not-allowed'
                            : isSubmitted
                            ? 'bg-green-500 hover:bg-green-600'
                            : 'bg-orange-500 hover:bg-orange-600'
                        } shadow-lg hover:shadow-xl`}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Processing Your Request...
                          </span>
                        ) : isSubmitted ? (
                          <span className="flex items-center justify-center">
                            <CheckCircle className="h-5 w-5 mr-2" />
                            Quote Request Submitted Successfully!
                          </span>
                        ) : (
                          'Get My FREE Solar Quote'
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Motion>
    )
}