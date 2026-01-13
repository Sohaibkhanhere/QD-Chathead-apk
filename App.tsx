import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import QDScripts from './components/QDScripts';

const App: React.FC = () => {
  const [showHelper, setShowHelper] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHelper(false);
    }, 4000); // The helper message will disappear after 4 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {showHelper && (
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-40 bg-white/70 backdrop-blur-lg text-center p-5 rounded-2xl shadow-lg border border-gray-200/80"
          >
            <h1 className="text-2xl font-bold text-slate-800">QD Scripts Helper</h1>
            <p className="text-slate-600 text-sm mt-1">Drag the floating icon to move it around.</p>
          </motion.div>
        )}
      </AnimatePresence>
      
      <QDScripts />
    </>
  );
};

export default App;