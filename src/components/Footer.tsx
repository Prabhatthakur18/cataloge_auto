import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ChevronRight,
  Award,
  Factory
} from 'lucide-react';
import { getMainCategories } from '@/data/mockData';

const Footer = () => {
  const mainCategories = getMainCategories();
     
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <Factory className="h-8 w-8 text-blue-400 mr-3" />
              <h3 className="text-2xl font-bold text-white">Autoform</h3>
            </div>
            
            <div className="flex items-start mb-4">
              <Award className="h-5 w-5 text-yellow-400 mr-2 mt-1 flex-shrink-0" />
              <span className="text-sm text-yellow-300 font-medium">ISO TS/16949 Certified</span>
            </div>
            
            <p className="text-gray-300 leading-relaxed mb-6">
              Leading provider of premium car seat covers in India with over 30 years of industry experience. 
              Our 2,20,000 sq. ft. Dehradun facility features state-of-the-art German CNC cutters and 
              Japanese automatic stitching machines for superior quality production.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
                <div className="text-blue-400 font-bold text-lg">30+</div>
                <div className="text-gray-400">Years Experience</div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
                <div className="text-blue-400 font-bold text-lg">2,20,000</div>
                <div className="text-gray-400">Sq. Ft. Facility</div>
              </div>
            </div>
          </div>
                     
          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white border-b border-gray-700 pb-2">
              Explore Categories
            </h4>
            <ul className="space-y-3">
              {mainCategories.map(category => (
                <li key={category.id}>
                  <Link 
                    to={`/category/${category.id}`} 
                    className="group flex items-center text-gray-300 hover:text-blue-400 transition-colors duration-200"
                  >
                    <ChevronRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform duration-200" />
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
                     
          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white border-b border-gray-700 pb-2">
              Get In Touch
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start group">
                <MapPin className="h-5 w-5 text-blue-400 mr-3 mt-1 flex-shrink-0" />
                <div className="text-gray-300 text-sm leading-relaxed">
                  <div className="font-medium text-white mb-1">Marketing Office</div>
                  D-135, Sector 63 Rd, D Block, Sector 63, Noida, 
                  Hazratpur Wajidpur, Uttar Pradesh 201301
                </div>
              </li>
              
              <li className="flex items-center group">
                <Mail className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0" />
                <a 
                  href="mailto:marketing@autoform.com" 
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                >
                  marketing@autoform.com
                </a>
              </li>
              
              <li className="flex items-center group">
                <Phone className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0" />
                <div className="text-gray-300">
                  <a 
                    href="tel:+919278411411" 
                    className="hover:text-blue-400 transition-colors duration-200 block"
                  >
                    +91 9278411411
                  </a>
                  <a 
                    href="tel:+911204358039" 
                    className="hover:text-blue-400 transition-colors duration-200 text-sm"
                  >
                    +91 120 4358039
                  </a>
                </div>
              </li>
              
              <li className="flex items-center group">
                <Clock className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0" />
                <span className="text-gray-300">Mon-Sat: 9:30AM - 6:00PM</span>
              </li>
            </ul>
            
            {/* Help Section */}
            <div className="mt-8">
              <h5 className="text-md font-medium mb-3 text-white">Quick Help</h5>
              <Link 
                to="/faqs" 
                className="group flex items-center text-gray-300 hover:text-blue-400 transition-colors duration-200"
              >
                <ChevronRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform duration-200" />
                FAQs
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-gray-700 bg-gray-900/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Autoform. All rights reserved.
            </p>
         <div className="flex items-center text-sm text-gray-400">
  <span className="mr-4">Made with quality in India</span>
  <div className="w-6 h-4 flex flex-col overflow-hidden rounded-sm border border-gray-300">
    <div className="flex-1 bg-[#FF9933]"></div> {/* Saffron */}
    <div className="flex-1 bg-white relative flex items-center justify-center">
      <div className="w-[4px] h-[4px] bg-[#000080] rounded-full"></div> {/* Chakra center dot */}
    </div>
    <div className="flex-1 bg-[#138808]"></div> {/* Green */}
  </div>
</div>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;