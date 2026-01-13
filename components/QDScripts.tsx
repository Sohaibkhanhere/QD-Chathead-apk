import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES, SCRIPTS } from '../constants';
import ManualCopyModal from './ManualCopyModal';

const QDScripts: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [indexes, setIndexes] = useState([0, 0, 0, 0, 0]);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [manualCopyText, setManualCopyText] = useState<string | null>(null);

  const holdTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  // Start at a safe, visible default position.
  const posRef = useRef({ left: 20, top: 50 });
  const draggingRef = useRef(false);
  const holdActive = useRef(false);
  const wasDragged = useRef(false);

  // This effect runs once after mount to safely set the initial position.
  useEffect(() => {
    // Calculate the final initial position after mount to ensure window.innerWidth is correct.
    const newLeft = Math.max(20, window.innerWidth - 100);
    posRef.current.left = newLeft;
    if (containerRef.current) {
        containerRef.current.style.left = `${newLeft}px`;
    }
  }, []); // Empty dependency array ensures this runs only once.


  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 1500);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
        setOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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

  const safeCopy = (text: string) => {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      navigator.clipboard.writeText(text).then(() => {
        setToast("Copied to clipboard!");
      }).catch((err) => {
        console.warn("clipboard.writeText rejected:", err);
        const ok = legacyCopy(text);
        if (ok) setToast("Copied to clipboard!");
        else setManualCopyText(text);
      });
    } else {
      const ok = legacyCopy(text);
      if (ok) setToast("Copied to clipboard!");
      else setManualCopyText(text);
    }
  };

  const handleClick = (key: string) => {
    if (holdActive.current) {
      holdActive.current = false;
      return;
    }

    const idx = CATEGORIES.findIndex((c) => c.key === key);
    if (idx === -1) return;

    setIndexes((prev) => {
      const next = [...prev];
      const nextIndex = (next[idx] + 1) % SCRIPTS[key].length;
      next[idx] = nextIndex;
      safeCopy(SCRIPTS[key][nextIndex]);
      return next;
    });
    setOpen(false);
    setOpenMenu(null); 
  };

  const handleHold = (key: string) => {
    holdActive.current = false;
    holdTimeout.current = setTimeout(() => {
      holdActive.current = true;
      setOpenMenu(key);
    }, 450);
  };

  const clearHold = () => {
    if (holdTimeout.current) {
      clearTimeout(holdTimeout.current);
    }
  };

  const handleSelect = (key: string, sIdx: number) => {
    safeCopy(SCRIPTS[key][sIdx]);
    setOpenMenu(null);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Prevent dragging when interacting with category buttons.
    if ((e.target as HTMLElement).closest(".chathead-button")) {
      return;
    }

    // Reset drag status at the beginning of an interaction.
    wasDragged.current = false;
    draggingRef.current = true;
    
    const startX = e.clientX;
    const startY = e.clientY;
    const orig = { ...posRef.current };

    const onMove = (ev: PointerEvent) => {
      if (!draggingRef.current) return;
      
      // If moved more than a small threshold, consider it a drag.
      if (!wasDragged.current && (Math.abs(ev.clientX - startX) > 5 || Math.abs(ev.clientY - startY) > 5)) {
        wasDragged.current = true;
      }
      
      const newLeft = Math.max(8, Math.min(window.innerWidth - 80, orig.left + (ev.clientX - startX)));
      const newTop = Math.max(8, Math.min(window.innerHeight - 80, orig.top + (ev.clientY - startY)));
      posRef.current = { left: newLeft, top: newTop };
      if (containerRef.current) {
        containerRef.current.style.left = `${newLeft}px`;
        containerRef.current.style.top = `${newTop}px`;
      }
    };

    const onUp = () => {
      draggingRef.current = false;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  const menuSide = () => (posRef.current.left > window.innerWidth / 2 ? "left" : "right");

  return (
    <>
      <div
        ref={containerRef}
        className="fixed z-50 flex flex-col items-center gap-2 cursor-grab active:cursor-grabbing"
        style={{ left: posRef.current.left, top: posRef.current.top, touchAction: "none" }}
        onPointerDown={onPointerDown}
      >
        <button
          onClick={() => {
            // Prevent toggling the menu if a drag just occurred.
            if (wasDragged.current) {
              return;
            }
            setOpen((o) => !o);
          }}
          className="w-16 h-16 rounded-full shadow-lg border-2 border-white flex items-center justify-center font-bold text-lg transition-transform hover:scale-110 active:scale-100"
          style={{ background: "#f4a850", color: "#111827" }}
        >
          QD
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex flex-col items-center gap-3"
            >
              {CATEGORIES.map((cat) => (
                <div key={cat.key} className="relative">
                  <button
                    onClick={() => handleClick(cat.key)}
                    onMouseDown={() => handleHold(cat.key)}
                    onMouseUp={clearHold}
                    onMouseLeave={clearHold}
                    onTouchStart={() => handleHold(cat.key)}
                    onTouchEnd={clearHold}
                    className="chathead-button w-20 h-20 rounded-full flex flex-col items-center justify-center text-white font-semibold shadow-md transition-transform hover:scale-105 cursor-pointer"
                    style={{ backgroundColor: cat.color }}
                  >
                    {cat.name.split("\n").map((line, i) => (
                      <span key={i} className={i > 0 ? "text-xs opacity-90" : "text-sm"}>{line}</span>
                    ))}
                  </button>

                  <AnimatePresence>
                  {openMenu === cat.key && (
                    <motion.div
                       initial={{ opacity: 0, scale: 0.95 }}
                       animate={{ opacity: 1, scale: 1 }}
                       exit={{ opacity: 0, scale: 0.95 }}
                       transition={{ duration: 0.15 }}
                      className="absolute top-0 rounded-xl shadow-2xl p-2 bg-white border border-gray-200 z-10 flex flex-col gap-1.5"
                      style={{
                        width: 320,
                        left: menuSide() === "left" ? 'auto' : "100%",
                        right: menuSide() === 'left' ? '100%' : 'auto',
                        marginRight: menuSide() === 'left' ? '12px' : '0',
                        marginLeft: menuSide() === 'right' ? '12px' : '0',
                        maxHeight: 280,
                        overflowY: "auto",
                      }}
                    >
                      {SCRIPTS[cat.key].map((s, si) => (
                        <button
                          key={si}
                          onClick={() => handleSelect(cat.key, si)}
                          className="text-left w-full py-2 px-3 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm text-gray-800 transition-colors"
                        >
                          {s}
                        </button>
                      ))}
                    </motion.div>
                  )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
      {manualCopyText && (
          <ManualCopyModal text={manualCopyText} onClose={() => setManualCopyText(null)} setToast={setToast} />
      )}
      </AnimatePresence>
      
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-slate-800 text-white px-4 py-2 rounded-full text-sm shadow-lg"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default QDScripts;