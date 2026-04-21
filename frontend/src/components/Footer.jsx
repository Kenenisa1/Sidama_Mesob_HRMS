import React from 'react';
import { Leaf, Zap } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#020c17] z-50 text-gray-400 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Top Section: Links and Initiative Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start border-b border-gray-800 pb-12">
          
          {/* Contact Column */}
          <div className="space-y-4">
            <h3 className="text-white text-xl font-bold">Contact</h3>
            <div className="flex flex-col space-y-2 text-sm md:text-base">
              <p>Sidama National Regional State</p>
              <p>Hawassa, Ethiopia</p>
              <a href="mailto:info@smuc.gov.et" className="hover:text-[#059669] transition-colors">
                info@smuc.gov.et
              </a>
              <p>+251-46-XXX-XXXX</p>
            </div>
          </div>

          {/* Center: Paperless Initiative Card */}
          <div className="flex justify-center">
            <div className="bg-[#041d1a] border border-[#059669]/30 rounded-2xl p-8 flex flex-col items-center text-center w-full max-w-[280px] shadow-2xl">
              <div className="bg-[#059669]/10 p-3 rounded-full mb-4">
                <Leaf size={40} className="text-[#84cc16]" />
              </div>
              <h4 className="text-[#059669] text-lg font-bold mb-1">Paperless Initiative</h4>
              <p className="text-xs text-gray-500 font-medium tracking-wide uppercase">
                100% Digital Processing
              </p>
            </div>
          </div>

          {/* Legal Column */}
          <div className="md:text-right space-y-4">
            <h3 className="text-white text-xl font-bold">Legal</h3>
            <div className="flex flex-col space-y-2 text-sm md:text-base">
              <a href="#" className="hover:text-white transition-colors">Help & Guidance</a>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright and Slogan */}
        <div className="pt-8 flex flex-col items-center text-center space-y-2">
          <p className="text-sm">
            © {currentYear} Sidama Mesob Unity Center. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm font-medium">
            <Zap size={16} className="text-yellow-500 fill-yellow-500" />
            <span className="bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent">
              Building a Modern Sidama through Organized Benefit
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;