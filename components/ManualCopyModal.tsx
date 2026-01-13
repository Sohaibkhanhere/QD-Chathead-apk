import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface ManualCopyModalProps {
  text: string;
  onClose: () => void;
  setToast: (message: string) => void;
}

const ManualCopyModal: React.FC<ManualCopyModalProps> = ({ text, onClose, setToast }) => {
  const taRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (taRef.current) {
      taRef.current.select();
    }
  }, []);

  const legacyCopy = (text: string): boolean => {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      try { ta.setSelectionRange(0, ta.value.length); } catch (e) { /* ignore */ }
      const successful = document.execCommand("copy");
      document.body.removeChild(ta);
      return successful;
    } catch (e) {
      console.warn("Legacy copy failed", e);
      return false;
    }
  };

  const tryCopyAgain = () => {
    const ok = legacyCopy(text);
    if (ok) {
      setToast("Copied successfully!");
      onClose();
    } else {
      setToast("Press Ctrl/Cmd + C to copy");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative bg-white rounded-lg shadow-xl p-6 max-w-md w-full z-10"
      >
        <h3 className="text-lg font-semibold text-slate-800 mb-3">Automatic Copy Failed</h3>
        <p className="text-sm text-slate-600 mb-4">
          Please copy the text below manually.
        </p>
        <textarea
          ref={taRef}
          className="w-full h-32 p-2 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          defaultValue={text}
          readOnly
        />
        <div className="mt-2 text-xs text-gray-500">
          If "Try Copy" doesn't work, select the text and press{" "}
          <kbd className="px-1.5 py-0.5 border border-gray-300 bg-gray-100 rounded text-xs">Ctrl</kbd>+
          <kbd className="px-1.5 py-0.5 border border-gray-300 bg-gray-100 rounded text-xs">C</kbd> (or{" "}
          <kbd className="px-1.5 py-0.5 border border-gray-300 bg-gray-100 rounded text-xs">Cmd</kbd>+
          <kbd className="px-1.5 py-0.5 border border-gray-300 bg-gray-100 rounded text-xs">C</kbd> on Mac).
        </div>
        <div className="mt-5 flex gap-3 justify-end">
          <button
            className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors text-sm font-medium"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="px-4 py-2 rounded-md bg-slate-800 text-white hover:bg-slate-700 transition-colors text-sm font-medium"
            onClick={tryCopyAgain}
          >
            Try Copy
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ManualCopyModal;
