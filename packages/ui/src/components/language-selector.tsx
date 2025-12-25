'use client';

import { Globe, Check } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

interface LanguageSelectorProps {
  currentPath?: string;
}

const languages = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'es', name: 'Español' },
  { code: 'ar', name: 'العربية' },
];

export function LanguageSelector({ currentPath: propPath }: LanguageSelectorProps) {
  const [currentPath, setCurrentPath] = useState<string>('/');
  
  // Get current path from prop or window location
  useEffect(() => {
    if (propPath) {
      setCurrentPath(propPath);
    } else if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
    }
  }, [propPath]);

  // Extract current locale from the path
  const getCurrentLocale = () => {
    if (!currentPath) return 'en';
    
    const segments = currentPath.split('/').filter(Boolean);
    
    // Check if the first segment is a valid locale
    const validLocales = ['en', 'fr', 'es', 'ar'];
    if (segments.length > 0 && validLocales.includes(segments[0] as any)) {
      return segments[0];
    }
    
    // Default to English if no locale in path
    return 'en';
  };

  const currentLocale = getCurrentLocale();

  // Function to create URL with new locale while preserving the rest of the path
  const createLocalizedUrl = (locale: string) => {
    if (!currentPath) {
      return `/${locale}`;
    }
    
    // Remove current locale from path if present
    let newPath = currentPath;
    
    // Remove any existing locale prefix
    const validLocales = ['en', 'fr', 'es', 'ar'];
    for (const loc of validLocales) {
      if (currentPath.startsWith(`/${loc}/`)) {
        newPath = currentPath.replace(`/${loc}/`, '/');
        break;
      } else if (currentPath === `/${loc}`) {
        newPath = '/';
        break;
      }
    }
    
    // Ensure newPath starts with /
    if (!newPath.startsWith('/')) {
      newPath = '/' + newPath;
    }
    
    // Handle root path
    if (newPath === '/') {
      return `/${locale}`;
    }
    
    // Return /locale + path (removing leading slash if present)
    return `/${locale}${newPath.startsWith('/') ? newPath : '/' + newPath}`;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Globe className="h-4 w-4" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => {
          const isActive = currentLocale === lang.code;
          const href = createLocalizedUrl(lang.code);
          
          return (
            <DropdownMenuItem key={lang.code} asChild>
              <a 
                href={href}
                className="flex items-center justify-between w-full"
                onClick={(e) => {
                  // Prevent navigation if already on this locale
                  if (isActive) {
                    e.preventDefault();
                  }
                }}
              >
                <span>{lang.name}</span>
                {isActive && <Check className="h-4 w-4 ml-2" />}
              </a>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}