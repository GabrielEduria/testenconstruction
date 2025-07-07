import Motion from "@/components/animation/Motion";

export default function Faq () {
    return (
        <Motion>
            <div id="faq" className="bg-gray-200 md:scroll-mt-20">
                <div className="max-w-screen-xl mx-auto pt-20 sm:pt-16 sm:pb-20 px-4 sm:px-6 lg:pt-20 lg:pb-28 lg:px-8">
                    <h2 className="text-3xl md:text-5xl font-bold leading-9 text-blue-800 text-center">
                        Frequently asked questions
                    </h2>
                    <div className="mt-6 border-t-4 border-gray-500 py-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-8 md:gap-y-12">
                            <dl>
                                <dt className="font-medium leading-6 text-gray-900 text-lg mt-4">What is the return policy for your
                                    products?</dt>
                                <dd className="mt-4">
                                    <p className="text-base text-gray-500">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                    </p>
                                </dd>
                            </dl>

                            <dl>
                                <dt className="font-medium leading-6 text-gray-900 text-lg mt-4">
                                    How do I track my order?
                                </dt>
                                <dd className="mt-4">
                                    <p className="text-base text-gray-500">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                    </p>
                                </dd>
                            </dl>

                            <dl>
                                <dt className="font-medium leading-6 text-gray-900 text-lg mt-4">
                                    What are the shipping options available?
                                </dt>
                                <dd className="mt-4">
                                    <p className="text-base text-gray-500">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                    </p>
                                </dd>
                            </dl>

                            <dl>
                                <dt className="font-medium leading-6 text-gray-900 text-lg mt-4">
                                    What are the hours of operation?
                                </dt>
                                <dd className="mt-4">
                                    <p className="leading-6 text-base text-gray-500">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                    </p>
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>     
        </Motion>
    )
}