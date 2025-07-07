import Motion from "@/components/animation/Motion";
import { plans } from "@/data";

export default function Pricing() {
  return (
    <Motion>
      <div id="pricing" className="bg-gradient-to-br from-slate-50 to-blue-50 py-16 px-4 scroll-mt-10">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-semibold mb-3">
              Net Metering Available - Sell Back to Grid
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              Go Solar, <span className="text-orange-500 ext-transparent">Save Forever</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional installation, 25-year warranty, and immediate savings on your MERALCO bill.
            </p>
          </div>
          <div className="flex justify-center items-center space-x-8 mb-8 text-sm text-gray-600">
            <div>Save up to 90%</div>
            <div>25-year warranty</div>
            <div>Free consultation</div>
          </div>

    
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                  plan.popular ? 'ring-2 ring-orange-500 scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                      Most Popular
                    </div>
                  </div>
                )}
                <div className="p-6">
               
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h3>
                    <div className="text-gray-600 text-sm">
                      {plan.power} • {plan.coverage}
                    </div>
                  </div>
                  <div className="text-center mb-4">
                    <span className="text-3xl font-bold text-gray-900">₱{plan.monthlyPrice.toLocaleString()}</span>
                    <span className="text-gray-600 ml-1">/package</span>
                  </div>
                  <div className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-all cursor-pointer ${
                      plan.popular
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>



        </div>
      </div>
    </Motion>
  );
}
