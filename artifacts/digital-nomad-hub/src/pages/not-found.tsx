import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-background text-foreground overflow-hidden relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="flex-1 flex items-center justify-center relative z-10 px-6">
        <div className="max-w-2xl text-center space-y-8 animate-fade-in-up">
          <h1 className="text-[12rem] font-bold leading-none tracking-tighter gradient-text opacity-80">
            404
          </h1>
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold tracking-tight">System Module Not Found</h2>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              The infrastructure component you are looking for has been moved, deleted, or never existed.
            </p>
          </div>
          
          <div className="pt-8">
            <Link href="/" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors">
              Return to Core System
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
