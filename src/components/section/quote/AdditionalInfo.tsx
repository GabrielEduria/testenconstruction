import { Phone, Mail, MapPin } from "lucide-react";
import Motion from "@/components/animation/Motion";

export default function AdditionalInfo () {
    return (
        <Motion>
            <div id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-white md:scroll-mt-20">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Contact Us
                        </h2>
                        <p className="text-gray-600">
                        Serving Metro Manila with professional solar panel installation from our Valenzuela headquarters
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                        <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Phone className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Call Us</h3>
                        <p className="text-gray-600">+63 917 123 4567</p>
                        <p className="text-gray-600">+63 44 123 4567</p>
                        </div>
                        <div className="text-center">
                        <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Mail className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
                        <p className="text-gray-600">info@valenzuelasolar.ph</p>
                        <p className="text-gray-600">quotes@valenzuelasolar.ph</p>
                        </div>
                        <div className="text-center">
                        <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <MapPin className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Visit Us</h3>
                        <p className="text-gray-600">Gen. T. de Leon, Valenzuela City</p>
                        <p className="text-gray-600">Metro Manila, Philippines</p>
                        </div>
                    </div>
                </div>
            </div>
        </Motion>
    )
}