import { useEffect, useRef, useState, useCallback } from "react";
import confetti from "canvas-confetti";
import addToTeamVideo from "@/assets/addtoteam.mp4";
import dariaAvatar from "@/assets/daria-avatar.png";

const POPUP_SHOWN_KEY = "gameAdPopupShown";

export function GameAdPopup() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [muted, setMuted] = useState(true);
  const [showClose, setShowClose] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [closing, setClosing] = useState(false);
  const [showReplay, setShowReplay] = useState(true);
  const [videoError, setVideoError] = useState(false);

  // Show popup 5 seconds after page load, only once per session
  useEffect(() => {
    if (sessionStorage.getItem(POPUP_SHOWN_KEY)) return;
    const timer = setTimeout(() => setVisible(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Once visible, attach video listeners
  useEffect(() => {
    if (!visible || dismissed) return;
    const video = videoRef.current;
    if (!video) return;

    const closeTimer = setTimeout(() => setShowClose(true), 4000);

    const handleTimeUpdate = () => {
      const d = video.duration;
      if (!d || isNaN(d)) return;
      if (d - video.currentTime <= 2) setShowCTA(true);
    };

    const handleEnded = () => {
      setVideoEnded(true);
      setShowCTA(true);
      setShowClose(true);
    };

    const handleError = () => {
      setVideoError(true);
      setTimeout(() => setShowClose(true), 4000);
      setTimeout(() => setShowCTA(true), 5000);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("error", handleError);

    return () => {
      clearTimeout(closeTimer);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("error", handleError);
    };
  }, [visible, dismissed]);

  const handleClose = useCallback(() => {
    sessionStorage.setItem(POPUP_SHOWN_KEY, "true");
    setClosing(true);
    setTimeout(() => {
      setDismissed(true);
      setVisible(false);
      setClosing(false);
      setShowReplay(true);
    }, 400);
  }, []);

  const handleCTAClick = useCallback(() => {
    const count = 200;
    const defaults = { origin: { y: 0.6 } };
    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({ ...defaults, ...opts, particleCount: Math.floor(count * particleRatio) });
    }
    fire(0.25, { spread: 26, startVelocity: 55, colors: ["#FFD700", "#FF69B4", "#00BFFF", "#7FFF00"] });
    fire(0.2, { spread: 60, colors: ["#FFD700", "#FF6347", "#DA70D6"] });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8, colors: ["#FFD700", "#FF1493", "#1E90FF"] });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2, colors: ["#FFFF00", "#FF69B4"] });
    fire(0.1, { spread: 120, startVelocity: 45, colors: ["#FFD700", "#00FF7F"] });

    sessionStorage.setItem(POPUP_SHOWN_KEY, "true");
    setClosing(true);
    setTimeout(() => {
      setDismissed(true);
      setVisible(false);
      setClosing(false);
      setShowReplay(true);
      document.getElementById("contacts")?.scrollIntoView({ behavior: "smooth" });
    }, 500);
  }, []);

  const handleReplay = useCallback(() => {
    setDismissed(false);
    setClosing(false);
    setShowClose(false);
    setShowCTA(false);
    setVideoEnded(false);
    setVideoError(false);
    setMuted(true);
    sessionStorage.removeItem(POPUP_SHOWN_KEY);
    setVisible(true);
  }, []);

  // Reset & play video when popup opens
  useEffect(() => {
    if (visible && videoRef.current && !videoError) {
      const video = videoRef.current;
      video.currentTime = 0;
      video.muted = true;
      video.play().catch(() => setVideoError(true));
    }
  }, [visible, videoError]);

  // Sync muted state
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted]);

  if (!visible && !showReplay) return null;

  return (
    <>
      {/* Backdrop */}
      {visible && !dismissed && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            background: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            animation: closing ? "fadeOut 0.4s ease forwards" : "fadeIn 0.3s ease",
          }}
        >
          {/* Pop-up window — vertical 9:16 layout */}
          <div
            style={{
              position: "relative",
              height: "min(800px, 90vh)",
              aspectRatio: "9/16",
              borderRadius: "20px",
              overflow: "hidden",
              background: "#000",
              border: "2px solid rgba(255,215,0,0.3)",
              boxShadow:
                "0 0 60px rgba(255,100,0,0.25), 0 0 120px rgba(100,0,200,0.15), 0 30px 80px rgba(0,0,0,0.8)",
              animation: closing
                ? "scaleOut 0.4s ease forwards"
                : "scaleIn 0.35s cubic-bezier(0.34,1.56,0.64,1)",
            }}
          >
            {videoError ? (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "linear-gradient(135deg, #1a0533, #0d1a3a)",
                  color: "#FFD700",
                  fontFamily: "'Impact', sans-serif",
                  fontSize: "16px",
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                🎬 Video failed to load
              </div>
            ) : (
              <video
                ref={videoRef}
                src={addToTeamVideo}
                playsInline
                autoPlay
                muted
                preload="auto"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            )}

            {/* Mute button */}
            <button
              onClick={() => setMuted((m) => !m)}
              aria-label={muted ? "Unmute" : "Mute"}
              style={{
                position: "absolute",
                bottom: "20px",
                left: "14px",
                background: "rgba(0,0,0,0.6)",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: "16px",
                color: "#fff",
                backdropFilter: "blur(4px)",
                zIndex: 20,
              }}
            >
              {muted ? "🔇" : "🔊"}
            </button>

            {/* Close button */}
            {showClose && (
              <button
                onClick={handleClose}
                aria-label="Close"
                style={{
                  position: "absolute",
                  top: "14px",
                  right: "14px",
                  background: "rgba(30,30,30,0.85)",
                  border: "2px solid rgba(255,255,255,0.25)",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontSize: "14px",
                  color: "#ddd",
                  fontWeight: 700,
                  zIndex: 30,
                  animation: "popIn 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                  backdropFilter: "blur(4px)",
                }}
              >
                ✕
              </button>
            )}

            {/* End-of-video Overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.75)",
                backdropFilter: "blur(6px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "24px",
                opacity: showCTA ? 1 : 0,
                transition: "opacity 0.4s ease",
                pointerEvents: showCTA ? "auto" : "none",
                zIndex: 15,
              }}
            >
              {/* DEV LOG */}
              <div
                className="glass-card"
                style={{
                  width: "100%",
                  padding: "20px",
                  marginBottom: "30px",
                  textAlign: "left",
                  fontSize: "15px",
                  lineHeight: 1.6,
                  color: "#e2e8f0",
                }}
              >
                <div style={{ marginBottom: "8px" }}>⏳ Time: <span className="text-glow-green font-bold">4 hours</span></div>
                <div style={{ marginBottom: "8px" }}>🛠 Stack: <span className="font-bold">Nano Banana + Suno + Premiere Pro</span></div>
                <div>🎙 Audio: <span className="font-bold">Voice Acting &amp; Sound Design by Daria</span></div>
              </div>

              {/* CTA button */}
              <button
                id="game-ad-cta"
                onClick={handleCTAClick}
                style={{
                  width: "100%",
                  padding: "16px 20px",
                  background: "linear-gradient(135deg, #FFD700 0%, #FF8C00 50%, #FF4500 100%)",
                  border: "none",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontFamily: "'Impact', 'Arial Black', sans-serif",
                  fontSize: "22px",
                  fontWeight: 900,
                  color: "#000",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  boxShadow: "0 6px 30px rgba(255,165,0,0.55), 0 0 60px rgba(255,100,0,0.25), inset 0 1px 0 rgba(255,255,255,0.3)",
                  animation: showCTA ? "ctaPulse 0.85s ease-in-out infinite" : "none",
                  position: "relative",
                  overflow: "hidden",
                  marginBottom: "20px",
                }}
              >
                <span style={{ position: "relative", zIndex: 1 }}>🎮 ADD TO TEAM!</span>
                {showCTA && (
                  <span
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%)",
                      backgroundSize: "200% 100%",
                      animation: "shimmer 1.5s ease-in-out infinite",
                    }}
                  />
                )}
              </button>

              {/* Play Again Indicator (Only at the very end) */}
              <div style={{ opacity: videoEnded ? 1 : 0, transition: "opacity 0.3s ease", display: "flex", alignItems: "center" }}>
                {videoEnded && (
                  <button
                    onClick={() => {
                      setShowCTA(false);
                      setVideoEnded(false);
                      if (videoRef.current) {
                        videoRef.current.currentTime = 0;
                        videoRef.current.play();
                      }
                    }}
                    style={{
                      background: "rgba(10,10,15,0.8)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                      color: "#e2e8f0",
                      padding: "10px 16px",
                      fontSize: "15px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                    title="Play Again"
                  >
                     <span className="font-bold">🔄 Play Again</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sticky replay button — blue accent */}
      {showReplay && (
        <button
          onClick={handleReplay}
          id="game-ad-replay"
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            zIndex: 9998,
            background: "rgba(15,15,25,0.92)",
            border: "2px solid rgba(96,165,250,0.45)",
            borderRadius: "50px",
            padding: "10px 16px 10px 10px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(96,165,250,0.15)",
            backdropFilter: "blur(12px)",
            animation: "slideInRight 0.5s cubic-bezier(0.34,1.56,0.64,1)",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow =
              "0 12px 40px rgba(0,0,0,0.6), 0 0 30px rgba(96,165,250,0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow =
              "0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(96,165,250,0.15)";
          }}
        >
          <img
            src={dariaAvatar}
            alt="Daria"
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid rgba(96,165,250,0.55)",
            }}
          />
          <div style={{ textAlign: "left" }}>
            <div
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: "#60a5fa",
                fontFamily: "'Arial Black', sans-serif",
                letterSpacing: "0.5px",
              }}
            >
              Play again? ▶
            </div>
            <div style={{ fontSize: "9px", color: "#9ca3af", fontFamily: "monospace" }}>
              Daria's ad awaits
            </div>
          </div>
        </button>
      )}

      {/* Keyframes */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.85) translateY(16px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes scaleOut {
          from { opacity: 1; transform: scale(1); }
          to { opacity: 0; transform: scale(0.88) translateY(8px); }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes ctaPulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 6px 30px rgba(255,165,0,0.55), 0 0 60px rgba(255,100,0,0.25), inset 0 1px 0 rgba(255,255,255,0.3);
          }
          50% {
            transform: scale(1.04);
            box-shadow: 0 10px 45px rgba(255,165,0,0.85), 0 0 90px rgba(255,100,0,0.5), inset 0 1px 0 rgba(255,255,255,0.4);
          }
        }
        @keyframes shimmer {
          0% { background-position: -100% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(80px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.45; }
          50% { opacity: 1; }
        }
      `}</style>
    </>
  );
}
