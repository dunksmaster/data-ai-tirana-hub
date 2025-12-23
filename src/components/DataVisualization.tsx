const DataVisualization = ({ className = "" }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 200 120"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Grid lines */}
      <g className="opacity-20">
        <line x1="20" y1="100" x2="180" y2="100" stroke="currentColor" strokeWidth="1" />
        <line x1="20" y1="75" x2="180" y2="75" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4" />
        <line x1="20" y1="50" x2="180" y2="50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4" />
        <line x1="20" y1="25" x2="180" y2="25" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4" />
      </g>
      
      {/* Area chart */}
      <path
        d="M20 100 L40 85 L60 70 L80 75 L100 45 L120 55 L140 35 L160 40 L180 20 L180 100 Z"
        fill="url(#areaGradient)"
        className="opacity-30"
      />
      
      {/* Line chart */}
      <path
        d="M20 100 L40 85 L60 70 L80 75 L100 45 L120 55 L140 35 L160 40 L180 20"
        stroke="hsl(207, 100%, 58%)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Data points */}
      <circle cx="40" cy="85" r="3" fill="hsl(207, 100%, 58%)" />
      <circle cx="80" cy="75" r="3" fill="hsl(207, 100%, 58%)" />
      <circle cx="100" cy="45" r="4" fill="hsl(252, 30%, 35%)" />
      <circle cx="140" cy="35" r="3" fill="hsl(207, 100%, 58%)" />
      <circle cx="180" cy="20" r="4" fill="hsl(252, 30%, 35%)" />
      
      {/* Gradient definition */}
      <defs>
        <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(207, 100%, 58%)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="hsl(207, 100%, 58%)" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default DataVisualization;
