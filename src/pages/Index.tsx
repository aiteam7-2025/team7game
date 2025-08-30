const Index = () => {
  return (
    <main className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header area - ready for your content */}
          <header className="text-center mb-16 animate-fade-in">
            <div className="w-24 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
              Your Canvas
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A beautiful blank slate ready for your vision. Clean design system, responsive layout, and smooth animations included.
            </p>
          </header>

          {/* Main content area - ready for your components */}
          <section className="mb-16 animate-slide-up">
            <div className="bg-card shadow-soft rounded-2xl p-8 md:p-12 border border-border/50 transition-smooth hover:shadow-elegant">
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-accent rounded-full mx-auto mb-6 flex items-center justify-center">
                  <div className="w-8 h-8 bg-accent-foreground/20 rounded-full"></div>
                </div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Ready to Build</h2>
                <p className="text-muted-foreground">This space is yours to customize with any content you need.</p>
              </div>
            </div>
          </section>

          {/* Game Section */}
          <section className="mb-16 animate-slide-up">
            <div className="bg-card shadow-soft rounded-2xl p-8 md:p-12 border border-border/50 transition-smooth hover:shadow-elegant">
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <div className="w-10 h-10 bg-white rounded-full"></div>
                </div>
                <h2 className="text-3xl font-semibold text-foreground mb-4">Line Drop Game</h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Test your timing skills! Stop the falling line exactly on the target to score points. 
                  Press spacebar or click when you think the line is at the center.
                </p>
                <a 
                  href="/game" 
                  className="inline-block px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/50"
                >
                  Play Now
                </a>
              </div>
            </div>
          </section>

          {/* Grid layout - ready for your modules */}
          <section className="grid md:grid-cols-2 gap-8 animate-slide-up">
            <div className="bg-card shadow-soft rounded-xl p-6 border border-border/50 transition-smooth hover:shadow-elegant">
              <div className="h-32 bg-muted rounded-lg mb-4 flex items-center justify-center">
                <div className="text-muted-foreground text-sm">Content Block 1</div>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Module Space</h3>
              <p className="text-muted-foreground text-sm">Perfect spot for your first component or feature.</p>
            </div>
            
            <div className="bg-card shadow-soft rounded-xl p-6 border border-border/50 transition-smooth hover:shadow-elegant">
              <div className="h-32 bg-muted rounded-lg mb-4 flex items-center justify-center">
                <div className="text-muted-foreground text-sm">Content Block 2</div>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Module Space</h3>
              <p className="text-muted-foreground text-sm">Another space ready for your content.</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Index;
