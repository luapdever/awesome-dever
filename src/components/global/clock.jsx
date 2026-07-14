import React, { useEffect, useState } from "react";

/**
 * Live clock for the OS menu bar. The time is only computed after mount
 * (inside useEffect) so the server-rendered markup stays empty and we avoid
 * any hydration mismatch.
 */
function Clock() {
  const [now, setNow] = useState(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, 1000 * 30);
    return () => clearInterval(id);
  }, []);

  if (!now) return <span suppressHydrationWarning />;

  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const date = now.toLocaleDateString([], { weekday: "short", day: "numeric", month: "short" });

  return (
    <span suppressHydrationWarning>
      {date}&nbsp;&nbsp;{time}
    </span>
  );
}

export default Clock;
