'use client';

export default function GeoBackground({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Grid */}
      <div className="absolute inset-0 geo-grid-bg" />
      {/* Topographic lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.07]"
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0,120 C200,80 400,160 600,120 C800,80 1000,160 1200,120 C1300,100 1380,110 1440,120" stroke="#06b6d4" strokeWidth="1.5" fill="none" />
        <path d="M0,200 C200,160 400,240 600,200 C800,160 1000,240 1200,200 C1300,180 1380,190 1440,200" stroke="#06b6d4" strokeWidth="1.5" fill="none" />
        <path d="M0,280 C200,240 400,320 600,280 C800,240 1000,320 1200,280 C1300,260 1380,270 1440,280" stroke="#06b6d4" strokeWidth="1" fill="none" />
        <path d="M0,360 C200,320 400,400 600,360 C800,320 1000,400 1200,360 C1300,340 1380,350 1440,360" stroke="#10b981" strokeWidth="1" fill="none" />
        <path d="M0,440 C200,400 400,480 600,440 C800,400 1000,480 1200,440 C1300,420 1380,430 1440,440" stroke="#10b981" strokeWidth="1" fill="none" />
        <path d="M0,520 C200,480 400,560 600,520 C800,480 1000,560 1200,520 C1300,500 1380,510 1440,520" stroke="#b87333" strokeWidth="0.8" fill="none" />
        <path d="M0,600 C200,560 400,640 600,600 C800,560 1000,640 1200,600 C1300,580 1380,590 1440,600" stroke="#b87333" strokeWidth="0.8" fill="none" />
        <path d="M0,680 C200,640 400,720 600,680 C800,640 1000,720 1200,680 C1300,660 1380,670 1440,680" stroke="#b87333" strokeWidth="0.6" fill="none" />
      </svg>
      {/* Gradient overlays */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-geo-cyan/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-geo-copper/5 rounded-full blur-3xl translate-x-1/4 translate-y-1/4" />
    </div>
  );
}
