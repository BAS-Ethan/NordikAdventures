# Instructions pour corriger les imports

## Fichiers déjà corrigés ✅
- `/components/ui/button.tsx`
- `/components/ui/tabs.tsx`
- `/components/ui/select.tsx`
- `/components/ui/dialog.tsx`
- `/components/ui/label.tsx`
- `/components/ui/separator.tsx`
- `/components/ui/progress.tsx`
- `/components/ui/alert.tsx`
- `/components/ui/badge.tsx`
- `/components/ShoppingCart.tsx`

## Fichiers à corriger :

### Règle de correction :
Supprimer `@version` de tous les imports :
- `"@radix-ui/react-xxx@1.2.3"` → `"@radix-ui/react-xxx"`
- `"lucide-react@0.487.0"` → `"lucide-react"`
- `"class-variance-authority@0.7.1"` → `"class-variance-authority"`
- `"cmdk@1.1.1"` → `"cmdk"`
- etc.

### Liste des fichiers restants :

1. `/components/ui/accordion.tsx`
2. `/components/ui/alert-dialog.tsx`
3. `/components/ui/aspect-ratio.tsx`
4. `/components/ui/avatar.tsx`
5. `/components/ui/breadcrumb.tsx`
6. `/components/ui/calendar.tsx`
7. `/components/ui/carousel.tsx`
8. `/components/ui/checkbox.tsx`
9. `/components/ui/collapsible.tsx`
10. `/components/ui/command.tsx`
11. `/components/ui/context-menu.tsx`
12. `/components/ui/dropdown-menu.tsx`
13. `/components/ui/form.tsx`
14. `/components/ui/hover-card.tsx`
15. `/components/ui/input-otp.tsx`
16. `/components/ui/menubar.tsx`
17. `/components/ui/navigation-menu.tsx`
18. `/components/ui/pagination.tsx`
19. `/components/ui/popover.tsx`
20. `/components/ui/radio-group.tsx`
21. `/components/ui/resizable.tsx`
22. `/components/ui/scroll-area.tsx`
23. `/components/ui/sheet.tsx`
24. `/components/ui/sidebar.tsx`
25. `/components/ui/slider.tsx`
26. `/components/ui/switch.tsx`
27. `/components/ui/toggle-group.tsx`
28. `/components/ui/toggle.tsx`
29. `/components/ui/tooltip.tsx`

## Solution manuelle rapide

Exécuter ces commandes depuis le dossier racine du projet :

```bash
# Corriger tous les @radix-ui
find components/ui -name "*.tsx" -exec sed -i 's/@radix-ui\/\([a-z-]*\)@[0-9.]*"/@radix-ui\/\1"/g' {} \;

# Corriger lucide-react
find components/ui -name "*.tsx" -exec sed -i 's/lucide-react@[0-9.]*"/lucide-react"/g' {} \;

# Corriger class-variance-authority
find components/ui -name "*.tsx" -exec sed -i 's/class-variance-authority@[0-9.]*"/class-variance-authority"/g' {} \;

# Corriger autres packages
find components/ui -name "*.tsx" -exec sed -i 's/cmdk@[0-9.]*"/cmdk"/g' {} \;
find components/ui -name "*.tsx" -exec sed -i 's/embla-carousel-react@[0-9.]*"/embla-carousel-react"/g' {} \;
find components/ui -name "*.tsx" -exec sed -i 's/input-otp@[0-9.]*"/input-otp"/g' {} \;
find components/ui -name "*.tsx" -exec sed -i 's/react-day-picker@[0-9.]*"/react-day-picker"/g' {} \;
find components/ui -name "*.tsx" -exec sed -i 's/react-resizable-panels@[0-9.]*"/react-resizable-panels"/g' {} \;
find components/ui -name "*.tsx" -exec sed -i 's/sonner@[0-9.]*"/sonner"/g' {} \;
find components/ui -name "*.tsx" -exec sed -i 's/vaul@[0-9.]*"/vaul"/g' {} \;
```

Ou utiliser un éditeur de texte avec recherche/remplacement global :
- Chercher : `(@[^"]+)@[\d.]+"`
- Remplacer : `$1"`
