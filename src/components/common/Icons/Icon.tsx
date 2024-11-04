import { ICONS } from '@/constants/icons';

interface IconProprType {
  name: keyof typeof ICONS;
  size?: number;
  color?: string;
  bgColor?: string;
  rx?: string;
}

const Icon = ({ name, size = 28, color = 'black', bgColor, rx }: IconProprType) => {
  const icon = ICONS[name];

  // 사이즈 동적 조절
  const scale = size >= 28 ? size / 28 : 1;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex items-center justify-center"
    >
      {bgColor && <rect width={size} height={size} rx={rx} fill={bgColor} />}
      <g transform={`scale(${scale})`}>
        <path fillRule="evenodd" clipRule="evenodd" d={icon} fill={color} />
      </g>
    </svg>
  );
};

export default Icon;
