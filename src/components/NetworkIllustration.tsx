const NetworkIllustration = ({ className = "" }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Animated connection lines */}
      <g className="opacity-30">
        <line x1="100" y1="100" x2="200" y2="150" stroke="hsl(207, 100%, 58%)" strokeWidth="1" />
        <line x1="200" y1="150" x2="300" y2="100" stroke="hsl(207, 100%, 58%)" strokeWidth="1" />
        <line x1="200" y1="150" x2="150" y2="250" stroke="hsl(207, 100%, 58%)" strokeWidth="1" />
        <line x1="200" y1="150" x2="280" y2="220" stroke="hsl(207, 100%, 58%)" strokeWidth="1" />
        <line x1="150" y1="250" x2="250" y2="300" stroke="hsl(207, 100%, 58%)" strokeWidth="1" />
        <line x1="280" y1="220" x2="250" y2="300" stroke="hsl(207, 100%, 58%)" strokeWidth="1" />
        <line x1="100" y1="100" x2="80" y2="200" stroke="hsl(252, 30%, 35%)" strokeWidth="1" />
        <line x1="80" y1="200" x2="150" y2="250" stroke="hsl(252, 30%, 35%)" strokeWidth="1" />
        <line x1="300" y1="100" x2="320" y2="180" stroke="hsl(252, 30%, 35%)" strokeWidth="1" />
        <line x1="320" y1="180" x2="280" y2="220" stroke="hsl(252, 30%, 35%)" strokeWidth="1" />
      </g>
      
      {/* Primary nodes */}
      <g className="animate-pulse-soft">
        <circle cx="200" cy="150" r="12" fill="hsl(207, 100%, 58%)" />
        <circle cx="200" cy="150" r="20" fill="hsl(207, 100%, 58%)" fillOpacity="0.2" />
      </g>
      
      {/* Secondary nodes */}
      <circle cx="100" cy="100" r="8" fill="hsl(252, 30%, 35%)" className="animate-pulse-soft" style={{ animationDelay: '0.5s' }} />
      <circle cx="300" cy="100" r="8" fill="hsl(252, 30%, 35%)" className="animate-pulse-soft" style={{ animationDelay: '1s' }} />
      <circle cx="150" cy="250" r="8" fill="hsl(207, 100%, 58%)" className="animate-pulse-soft" style={{ animationDelay: '1.5s' }} />
      <circle cx="280" cy="220" r="8" fill="hsl(252, 30%, 35%)" className="animate-pulse-soft" style={{ animationDelay: '2s' }} />
      <circle cx="250" cy="300" r="10" fill="hsl(207, 100%, 58%)" className="animate-pulse-soft" style={{ animationDelay: '0.3s' }} />
      
      {/* Outer nodes */}
      <circle cx="80" cy="200" r="5" fill="hsl(252, 30%, 45%)" fillOpacity="0.6" />
      <circle cx="320" cy="180" r="5" fill="hsl(207, 100%, 58%)" fillOpacity="0.6" />
      
      {/* Decorative elements */}
      <circle cx="60" cy="320" r="3" fill="hsl(207, 100%, 58%)" fillOpacity="0.4" />
      <circle cx="340" cy="280" r="4" fill="hsl(252, 30%, 35%)" fillOpacity="0.4" />
      <circle cx="180" cy="80" r="3" fill="hsl(207, 100%, 58%)" fillOpacity="0.3" />
      <circle cx="350" cy="50" r="2" fill="hsl(252, 30%, 35%)" fillOpacity="0.3" />
    </svg>
  );
};

export default NetworkIllustration;
