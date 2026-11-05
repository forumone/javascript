import { useEffect, useState } from "react";

export function Synced() {
  const [copy, setCopy] = useState(0);

  useEffect(() => {
    setCopy(1);
  }, []);

  return <p>{copy}</p>;
}
