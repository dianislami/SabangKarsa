import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={`relative inline-flex h-8 w-14 items-center justify-center rounded-full bg-muted border ${theme === "light" ? "border-white" : "border-gray-400"} transition-colors hover:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2`}
    >
      {/* Background track */}
      <div className="absolute inset-0 rounded-full bg-muted"></div>
      
      {/* Moving circle */}
      <div className={`absolute h-6 w-6 rounded-full bg-background border ${theme === "light" ? "border-white" : "border-gray-400"} shadow-sm transition-transform duration-200 ease-in-out ${
        theme === "light" ? "translate-x-[-12px]" : "translate-x-[12px]"
      }`}>
        <div className="flex h-full w-full items-center justify-center">
          {theme === "light" ? (
            <Sun className="h-3 w-3 text-white" />
          ) : (
            <Moon className="h-3 w-3 text-gray-400" />
          )}
        </div>
      </div>
      
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}