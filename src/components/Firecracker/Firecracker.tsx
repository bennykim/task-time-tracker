import confetti from "canvas-confetti";
import { useEffect, useRef } from "react";

type FirecrackerProps = {
  show: boolean;
  onDone: () => void;
};

export const Firecracker = ({ show, onDone }: FirecrackerProps) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) {
      onDone();
      return;
    }

    const customConfetti = confetti.create(canvasRef.current, {
      resize: true,
      useWorker: true,
    });

    customConfetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    setTimeout(onDone, 2500);
  }, [onDone]);

  if (!show) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
      }}
    />
  );
};
