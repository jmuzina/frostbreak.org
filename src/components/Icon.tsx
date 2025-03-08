import React, { useMemo } from "react";
import { iconPaths } from "./IconPaths";

interface Props {
  icon: keyof typeof iconPaths;
  color?: string;
  gradient?: boolean;
  fontSize?: string;
  width?: number;
  height?: number;
}

const Icon: React.FC<Props> = ({
  icon,
  color = "currentcolor",
  gradient,
  fontSize = "1rem",
  width = 24,
  height = 24,
}) => {
  const gradientId =
    "icon-gradient-" + Math.round(Math.random() * 10e12).toString(36);
  const iconPath = useMemo(() => iconPaths[icon], [icon]);

  const svgStyle = useMemo(() => ({ fontSize: fontSize }), [fontSize]);

  if (!iconPath) {
    console.error("Failed to find icon path for", icon);
    return null;
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 256 256"
      aria-hidden={true}
      stroke={gradient ? `url(#${gradientId})` : color}
      fill={gradient ? `url(#${gradientId})` : color}
      style={svgStyle}
    >
      <g dangerouslySetInnerHTML={{ __html: iconPath }} />
      {gradient && (
        <linearGradient
          id={gradientId}
          x1="23"
          x2="235"
          y1="43"
          y2="202"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--gradient-stop-1)" />
          <stop offset=".5" stopColor="var(--gradient-stop-2)" />
          <stop offset="1" stopColor="var(--gradient-stop-3)" />
        </linearGradient>
      )}
    </svg>
  );
};

export default Icon;
