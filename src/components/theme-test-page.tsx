import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toogle"
import { useTheme } from "@/components/theme-provider"

export function ThemeTestPage() {
  const { theme } = useTheme()

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header - Sky-800 navbar */}
      <header className="bg-primary text-primary-foreground border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary-foreground">Theme Test Page</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-primary-foreground/80">
              Current theme: {theme}
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Colors Demo */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Color System</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-primary text-primary-foreground p-4 rounded-lg">
                <h3 className="font-semibold">Primary</h3>
                <p className="text-sm">Sky-800</p>
              </div>
              <div className="bg-secondary text-secondary-foreground p-4 rounded-lg">
                <h3 className="font-semibold">Secondary</h3>
                <p className="text-sm">Sky-50</p>
              </div>
              <div className="bg-muted text-muted-foreground p-4 rounded-lg">
                <h3 className="font-semibold">Muted</h3>
                <p className="text-sm">Background variant</p>
              </div>
              <div className="bg-accent text-accent-foreground p-4 rounded-lg">
                <h3 className="font-semibold">Accent</h3>
                <p className="text-sm">Highlight color</p>
              </div>
            </div>
          </section>

          {/* Buttons Demo */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Button Variants</h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
          </section>

          {/* Cards Demo */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Card Components</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-card text-card-foreground p-6 rounded-lg border border-border">
                <h3 className="font-semibold mb-2">Card Title</h3>
                <p className="text-sm text-muted-foreground">
                  This is a card component with background and foreground colors.
                </p>
              </div>
              <div className="bg-popover text-popover-foreground p-6 rounded-lg border border-border">
                <h3 className="font-semibold mb-2">Popover Style</h3>
                <p className="text-sm text-muted-foreground">
                  This uses popover background and foreground colors.
                </p>
              </div>
              <div className="bg-muted text-muted-foreground p-6 rounded-lg">
                <h3 className="font-semibold mb-2">Muted Card</h3>
                <p className="text-sm">
                  This card uses muted background for subtle emphasis.
                </p>
              </div>
            </div>
          </section>

          {/* Typography Demo */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Typography</h2>
            <div className="space-y-2">
              <h1 className="text-4xl font-bold">Heading 1 - Plus Jakarta Sans</h1>
              <h2 className="text-3xl font-semibold">Heading 2 - Plus Jakarta Sans</h2>
              <h3 className="text-2xl font-medium">Heading 3 - Plus Jakarta Sans</h3>
              <p className="text-base">
                This is body text using Plus Jakarta Sans font family.
                It should be clear and readable in both light and dark themes.
              </p>
              <p className="text-sm text-muted-foreground">
                This is muted text with smaller size and reduced opacity.
              </p>
            </div>
          </section>

          {/* Form Elements Demo */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Form Elements</h2>
            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm font-medium mb-2">Input Field</label>
                <input
                  type="text"
                  placeholder="Enter text here..."
                  className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Select Field</label>
                <select className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                  <option>Option 1</option>
                  <option>Option 2</option>
                  <option>Option 3</option>
                </select>
              </div>
            </div>
          </section>

          {/* Additional Color Demo */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Additional Colors</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-destructive text-destructive-foreground p-4 rounded-lg">
                <h3 className="font-semibold">Destructive</h3>
                <p className="text-sm">Error/Delete</p>
              </div>
              <div className="bg-card text-card-foreground p-4 rounded-lg border border-border">
                <h3 className="font-semibold">Card</h3>
                <p className="text-sm">Card background</p>
              </div>
              <div className="bg-popover text-popover-foreground p-4 rounded-lg border border-border">
                <h3 className="font-semibold">Popover</h3>
                <p className="text-sm">Popover background</p>
              </div>
              <div className="p-4 rounded-lg border-2 border-ring">
                <h3 className="font-semibold">Ring</h3>
                <p className="text-sm">Focus ring color</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}