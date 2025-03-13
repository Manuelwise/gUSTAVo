import React from 'react';
// import { Link } from 'react-router-dom';
import { FileText, Shield, Clock } from 'lucide-react';
// import HeroImage from '../assets/image/gnpclogo.png';
import featureImage from '../assets/image/typeshii2_Enhanced.jpg';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="p-6 rounded-lg shadow-lg bg-white transform transition-transform duration-300 hover:scale-105 hover:bg-blue-50 cursor-pointer">
    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-lg mb-4">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div 
    className=" text-black py-20 min-h-[400px] flex items-center justify-center"
      >
<div
    className="absolute inset-1 bg-cover bg-center px-0"
    style={{backgroundImage: `url(${featureImage})`,
    backgroundSize: 'cover', // Ensures the whole image fits inside the div
    backgroundPosition: 'center', // Centers the image within the div
    backgroundRepeat: 'no-repeat', // Prevents tiling if the image is smaller than the div
    opacity: 0.9,
  }}></div>
    <div className="relative container mx-auto text-center bg-white/40 rounded-lg max-w-[700px]">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
            GNPC Records & Archives Portal
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
            Access and manage organizational documents efficiently through our
            secure digital platform.
        </p>
    </div>
</div>


      {/* Features Section */}
      <div 
        className="relative py-16 bg-width-100%"
        > 
        <div className="container mx-auto px-4 rounded-lg relative inset-1">
          <h2 className="text-5xl font-bold text-center mb-12 text-black-500">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={FileText}
              title="Easy File Requests"
              description="Submit file requests quickly and easily through our streamlined digital form system."
            />
            <FeatureCard
              icon={Shield}
              title="Secure Access"
              description="Your data is protected with enterprise-grade security measures and controlled access."
            />
            <FeatureCard
              icon={Clock}
              title="Quick Processing"
              description="Experience fast response times with our efficient request processing system."
            />
          </div>
        </div>
      </div>

      {/* How It Works Section (no background change here) */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Submit Request</h3>
                  <p className="text-gray-600">
                    Fill out the file request form with your details and the
                    specific files you need.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Processing</h3>
                  <p className="text-gray-600">
                    Our team reviews your request and processes it according to
                    our security protocols.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Access Granted</h3>
                  <p className="text-gray-600">
                    Receive notification when your request is approved and access
                    your requested files.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
