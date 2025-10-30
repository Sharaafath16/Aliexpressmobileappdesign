import { MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-4 w-80 bg-white rounded-lg shadow-2xl z-50 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm">Chat with us</h3>
                <p className="text-xs opacity-90">We're online now!</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="h-64 p-4 bg-gray-50 overflow-y-auto">
              <div className="space-y-3">
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm">
                    A
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm max-w-[70%]">
                    <p className="text-sm">Hi! How can I help you today?</p>
                    <p className="text-xs text-gray-500 mt-1">Just now</p>
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <div className="bg-red-500 text-white p-3 rounded-lg shadow-sm max-w-[70%]">
                    <p className="text-sm">Hello! I need help with my order.</p>
                    <p className="text-xs opacity-75 mt-1">Just now</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-3 border-t bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600">
                  <MessageCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-4 w-14 h-14 bg-gradient-to-r from-red-500 to-orange-500 rounded-full shadow-lg flex items-center justify-center text-white z-50 hover:shadow-xl"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
      </motion.button>
    </>
  );
}
