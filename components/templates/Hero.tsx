import { Button } from "../ui/button";

const Hero = () => {
  return (
    <div className="relative flex items-center justify-center ">
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="space-y-2">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight flex gap-4">
              <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Share Files
              </span>
              <span className="bg-[#40AB74] px-2 rounded-md">
                Instantly
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              The Fastest Way to Share Files, Securely.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;