import { DollarSign, Truck, CreditCard, Shield, Headphones, Smartphone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white mt-8 border-t">
      {/* Features Section */}
      <div className="px-4 py-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 mb-3 flex items-center justify-center">
            <DollarSign className="w-8 h-8" />
          </div>
          <h3 className="text-sm mb-1">Great value</h3>
          <p className="text-xs text-gray-600">We offer competitive prices on over 100 million items.</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 mb-3 flex items-center justify-center">
            <Truck className="w-8 h-8" />
          </div>
          <h3 className="text-sm mb-1">World wide shopping</h3>
          <p className="text-xs text-gray-600">We ship to over 200 countries and regions, and our site comes in 12 languages.</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 mb-3 flex items-center justify-center">
            <CreditCard className="w-8 h-8" />
          </div>
          <h3 className="text-sm mb-1">Safe payment</h3>
          <p className="text-xs text-gray-600">Pay with the world's most popular and secure payment methods.</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 mb-3 flex items-center justify-center">
            <Shield className="w-8 h-8" />
          </div>
          <h3 className="text-sm mb-1">Shop with confidence</h3>
          <p className="text-xs text-gray-600">Our Buyer Protection policy covers your entire purchase journey.</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 mb-3 flex items-center justify-center">
            <Headphones className="w-8 h-8" />
          </div>
          <h3 className="text-sm mb-1">Help center</h3>
          <p className="text-xs text-gray-600">Round-the-clock assistance for a smooth shopping experience.</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 mb-3 flex items-center justify-center">
            <Smartphone className="w-8 h-8" />
          </div>
          <h3 className="text-sm mb-1">Shop better</h3>
          <p className="text-xs text-gray-600">Download the app for mobile-only features such as image search and discount games.</p>
        </div>
      </div>

      {/* Links Section */}
      <div className="bg-gray-50 px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {/* Stay Connected */}
          <div>
            <h3 className="text-sm mb-4">Stay connected</h3>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300">
                <span className="text-sm">f</span>
              </a>
              <a href="#" className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300">
                <span className="text-sm">t</span>
              </a>
              <a href="#" className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300">
                <span className="text-sm">i</span>
              </a>
              <a href="#" className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300">
                <span className="text-sm">x</span>
              </a>
              <a href="#" className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300">
                <span className="text-sm">w</span>
              </a>
            </div>
          </div>

          {/* Shopping with us */}
          <div>
            <h3 className="text-sm mb-4">Shopping with us</h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li><a href="#" className="hover:underline">Making payments</a></li>
              <li><a href="#" className="hover:underline">Delivery options</a></li>
              <li><a href="#" className="hover:underline">Buyer Protection</a></li>
            </ul>
          </div>

          {/* Customer service */}
          <div>
            <h3 className="text-sm mb-4">Customer service</h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li><a href="#" className="hover:underline">Customer Service</a></li>
              <li><a href="#" className="hover:underline">Transaction Services Agreement for non-EU/UK Consumers</a></li>
              <li><a href="#" className="hover:underline">Terms and Conditions for EU/EEA/UK Consumers (Transactions)</a></li>
              <li><a href="#" className="hover:underline">Take our feedback survey</a></li>
            </ul>
          </div>

          {/* Collaborate with us */}
          <div>
            <h3 className="text-sm mb-4">Collaborate with us</h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li><a href="#" className="hover:underline">Partnerships</a></li>
              <li><a href="#" className="hover:underline">Affiliate program</a></li>
              <li><a href="#" className="hover:underline">DS Center</a></li>
            </ul>
          </div>
        </div>

        {/* Help */}
        <div className="mt-8 max-w-7xl mx-auto">
          <h3 className="text-sm mb-3">Help</h3>
          <p className="text-xs text-gray-600">
            Customer Service, Disputes & Reports, Buyer Protection, Report IPR infringement
          </p>
        </div>

        {/* Browse by Category */}
        <div className="mt-6 max-w-7xl mx-auto">
          <h3 className="text-sm mb-3">Browse by Category</h3>
          <p className="text-xs text-gray-600">
            All Popular, Product, Promotion, Low Price, Great Value, Reviews, Blog, Seller Portal, BLACK FRIDAY, AliExpress Assistant
          </p>
          <div className="flex gap-2 mt-3">
            <a href="#" className="inline-block">
              <div className="bg-black text-white px-4 py-2 rounded text-xs flex items-center gap-2">
                <span>▶</span> GOOGLE PLAY
              </div>
            </a>
            <a href="#" className="inline-block">
              <div className="bg-black text-white px-4 py-2 rounded text-xs flex items-center gap-2">
                <span>🍎</span> APP STORE
              </div>
            </a>
          </div>
        </div>

        {/* Multi-Language Sites */}
        <div className="mt-6 max-w-7xl mx-auto">
          <h3 className="text-sm mb-3">AliExpress Multi-Language Sites</h3>
          <p className="text-xs text-gray-600">
            Russian, Portuguese, Spanish, French, German, Italian, Dutch, Turkish, Japanese, Korean, Thai, Vietnamese, Arabic, Hebrew, Polish
          </p>
        </div>

        {/* Alibaba Group */}
        <div className="mt-6 max-w-7xl mx-auto">
          <h3 className="text-sm mb-3">Alibaba Group</h3>
          <p className="text-xs text-gray-600">
            Alibaba.com, AliExpress, Alimama, Alipay, Fliggy, Alibaba Cloud, Alibaba International, AliTelecom, DingTalk, Juhuasuan, Taobao Marketplace, Tmall, Taobao Global, AliOS, 1688
          </p>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-100 px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs text-gray-600 mb-2">
            Intellectual Property Protection · Privacy Policy · Sitemap · Terms of Use · Information for EU consumers · Transaction Services Agreement for non-EU/UK Consumers · Terms and Conditions for EU/EEA/UK Consumers (Transactions) · User Information Legal Enquiry Guide © 2010-2025 AliExpress.com. All rights reserved. 增值电信业务经营许可证 浙B2-20120091-8 浙公网安备 33010802002248号
          </p>
        </div>
      </div>
    </footer>
  );
}
