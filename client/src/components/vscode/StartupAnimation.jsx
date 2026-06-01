import React, { useEffect, useState } from 'react';

const lines = [
  'Loading Extensions...',
  'Loading Projects...',
  'Connecting Database...',
  'Starting Portfolio...',
];

function StartupAnimation({ onFinish }) {
  const [visible, setVisible] = useState(true);
  const [shown, setShown] = useState([]);

  useEffect(() => {
    let i = 0;
    const timers = [];

    function next() {
      if (i >= lines.length) {
        timers.push(
          setTimeout(() => {
            setVisible(false);
            onFinish && onFinish();
          }, 600)
        );
        return;
      }
      timers.push(
        setTimeout(() => {
          setShown((s) => [...s, lines[i]]);
          i += 1;
          next();
        }, 600)
      );
    }

    next();

    return () => timers.forEach((t) => clearTimeout(t));
  }, [onFinish]);

  if (!visible) return null;

  return (
    <div className="startup-overlay fixed inset-0 flex items-center justify-center bg-black/80 z-40">
      <div className="text-green-400 font-mono p-6 rounded">
        {shown.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
        <div className="mt-2">{shown.length === 0 ? 'Starting...' : ''}</div>
      </div>
    </div>
  );
}

export default StartupAnimation;
