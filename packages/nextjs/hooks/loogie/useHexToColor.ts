import { useEffect, useState } from "react";

function useHexToColor(hexColor: string | null) {
  const [color, setColor] = useState("");

  useEffect(() => {
    if (hexColor && hexColor.length === 8 && hexColor.startsWith("0x")) {
      const color = hexColor.split("0x")[1];
      setColor("#" + color);
    } else {
      setColor("#ffffff");
    }
  }, [hexColor]);

  return color;
}

export default useHexToColor;
