import Motion from "@/components/animation/Motion"
export default function ServiceCoverage () {
    return (
        <Motion>
            <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 md:scroll-mt-20">
            <div className="max-w-4xl mx-auto text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Service Coverage Area
                </h3>
                <p className="text-gray-600 mb-6">
                    We proudly serve all cities and municipalities within Metro Manila
                </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div className="bg-white p-3 rounded-lg">Caloocan</div>
                        <div className="bg-white p-3 rounded-lg">Las Piñas</div>
                        <div className="bg-white p-3 rounded-lg">Makati</div>
                        <div className="bg-white p-3 rounded-lg">Malabon</div>
                        <div className="bg-white p-3 rounded-lg">Mandaluyong</div>
                        <div className="bg-white p-3 rounded-lg">Manila</div>
                        <div className="bg-white p-3 rounded-lg">Marikina</div>
                        <div className="bg-white p-3 rounded-lg">Muntinlupa</div>
                        <div className="bg-white p-3 rounded-lg">Navotas</div>
                        <div className="bg-white p-3 rounded-lg">Parañaque</div>
                        <div className="bg-white p-3 rounded-lg">Pasay</div>
                        <div className="bg-white p-3 rounded-lg">Pasig</div>
                        <div className="bg-white p-3 rounded-lg">Pateros</div>
                        <div className="bg-white p-3 rounded-lg">Quezon City</div>
                        <div className="bg-white p-3 rounded-lg">San Juan</div>
                        <div className="bg-white p-3 rounded-lg">Taguig</div>
                        <div className="bg-white p-3 rounded-lg font-semibold text-orange-600">Valenzuela</div>
                    </div>
                </div>
            </section>
        </Motion>
    )
}