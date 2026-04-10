interface DividerProps {
  color?: string;
  flip?: boolean;
  className?: string;
}

export function Divider({ color = '#F8F8F4', flip = false, className = '' }: DividerProps) {
  return (
    <div
      className={['w-full overflow-hidden leading-none', className].join(' ')}
      aria-hidden="true"
      style={{ transform: flip ? 'scaleY(-1)' : undefined }}
    >
      <svg
        viewBox="0 0 1440 64"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="block w-full h-16"
      >
        <path
          d="M0,32 C240,64 480,0 720,32 C960,64 1200,0 1440,32 L1440,64 L0,64 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}
