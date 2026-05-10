import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return (
      <span
        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md"
        aria-hidden
      />
    );
  }

  const isDarkMode = resolvedTheme === "dark";

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="h-9 w-9 shrink-0"
      aria-label={isDarkMode ? "Use light theme" : "Use dark theme"}
      onClick={() => setTheme(isDarkMode ? "light" : "dark")}
    >
      {isDarkMode ? <Sun className="h-4 w-4" aria-hidden /> : <Moon className="h-4 w-4" aria-hidden />}
    </Button>
  );
};
