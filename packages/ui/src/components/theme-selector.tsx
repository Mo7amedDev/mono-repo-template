'use client'

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";

export interface ThemeTranslations {
  light: string;
  dark: string;
  system: string;
}

interface ThemeSelectorProps {
  translations?: ThemeTranslations;
}

const defaultTranslations: ThemeTranslations = {
  light: 'Light',
  dark: 'Dark',
  system: 'System'
};

export function ThemeSelector({ translations = defaultTranslations }: ThemeSelectorProps) {
    const { theme, setTheme } = useTheme();
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme('light')}>
                    <Sun className="mr-2 h-4 w-4" />
                    <span>{translations.light}</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                    <Moon className="mr-2 h-4 w-4" />
                    <span>{translations.dark}</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>
                    <Monitor className="mr-2 h-4 w-4" />
                    <span>{translations.system}</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}