import {Zap, Shield, TrendingUp, } from 'lucide-react';
import Image from 'next/image';
import Motion from '@/components/animation/Motion';
export default function Hero () {
    return (
        <div id="hero" className="relative w-full h-auto py-30">
            <div className="absolute inset-0 -z-10">
                <div className="relative w-full h-full">
                   <Image
                        src="/images/background/solarpanelbackground.jpg"
                        alt="Solar panel background"
                        fill
                        className="object-cover"
                        priority
                    />
                  <div className="absolute inset-0 bg-black/70" />
                </div>
            </div>
            <Motion>
                <div className="relative max-w-4xl mx-auto text-center">
               
                        <h1 className="text-4xl md:text-7xl  font-bold text-white mb-6">
                            Get Your Solar Quote
                        </h1>
                        <p className="text-base md:text-lg text-white mb-12 max-w-2xl mx-auto">
                            Professional solar panel installation serving Metro Manila.
                            Clean energy solutions from Valenzuela to your doorstep.
                        </p>
              
                    <div className="flex flex-wrap justify-center gap-8 text-white">
                        <div className="flex items-center space-x-3">
                            <div className="bg-orange-500 p-2 rounded-full">
                            <Zap className="h-5 w-5 text-white" />
                            </div>
                            <span className="font-medium">25-Year Warranty</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="bg-blue-500 p-2 rounded-full">
                            <Shield className="h-5 w-5 text-white" />
                            </div>
                            <span className="font-medium">DOE Certified</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="bg-orange-500 p-2 rounded-full">
                            <TrendingUp className="h-5 w-5 text-white" />
                            </div>
                            <span className="font-medium">Up to 90% Savings</span>
                        </div>
                    </div>
                </div>
            </Motion>
        </div>
    )
}