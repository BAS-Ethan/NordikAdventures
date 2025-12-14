# 🚨 Solution rapide aux erreurs d'imports

## Problème

Les composants UI utilisent des imports avec versions (ex: `"@radix-ui/react-slot@1.1.2"`) qui ne fonctionnent pas dans votre environnement Vite.

## Solution automatique (RECOMMANDÉE)

### Option 1 : Script Python

```bash
# Depuis la racine du projet
python3 URGENT_FIX.py
```

Ce script corrigera automatiquement tous les fichiers.

### Option 2 : Commandes shell (Linux/Mac)

```bash
# Depuis la racine du projet
cd components/ui

# Corriger tous les @radix-ui
sed -i 's/@radix-ui\/\([a-z-]*\)@[0-9.]*"/@radix-ui\/\1"/g' *.tsx

# Corriger lucide-react
sed -i 's/lucide-react@[0-9.]*"/lucide-react"/g' *.tsx

# Corriger class-variance-authority
sed -i 's/class-variance-authority@[0-9.]*"/class-variance-authority"/g' *.tsx

# Corriger autres packages
sed -i 's/cmdk@[0-9.]*"/cmdk"/g' *.tsx
sed -i 's/embla-carousel-react@[0-9.]*"/embla-carousel-react"/g' *.tsx
sed -i 's/input-otp@[0-9.]*"/input-otp"/g' *.tsx
sed -i 's/react-day-picker@[0-9.]*"/react-day-picker"/g' *.tsx
sed -i 's/react-resizable-panels@[0-9.]*"/react-resizable-panels"/g' *.tsx
sed -i 's/sonner@[0-9.]*"/sonner"/g' *.tsx
sed -i 's/vaul@[0-9.]*"/vaul"/g' *.tsx

cd ../..
```

### Option 3 : Recherche/Remplacement manuel (VS Code)

1. Ouvrir VS Code
2. Ouvrir le dossier `components/ui`
3. Ctrl+Shift+H (Rechercher et remplacer dans les fichiers)
4. Activer l'option "Regex" (icône `.*`)
5. Dans "Rechercher" : `(@[^"]+)@[\d.]+"`
6. Dans "Remplacer" : `$1"`
7. Cliquer sur "Remplacer tout"

## Après la correction

```bash
# Réinstaller les dépendances (si nécessaire)
rm -rf node_modules package-lock.json
npm install

# Lancer le serveur
npm run dev
```

## Exemples de corrections

### Avant :
```typescript
import { Slot } from "@radix-ui/react-slot@1.1.2";
import { cva } from "class-variance-authority@0.7.1";
import { CheckIcon } from "lucide-react@0.487.0";
```

### Après :
```typescript
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { CheckIcon } from "lucide-react";
```

## Fichiers déjà corrigés

Les fichiers suivants ont déjà été corrigés et ne nécessitent aucune modification :
- ✅ `/components/ui/button.tsx`
- ✅ `/components/ui/tabs.tsx`
- ✅ `/components/ui/select.tsx`
- ✅ `/components/ui/dialog.tsx`
- ✅ `/components/ui/label.tsx`
- ✅ `/components/ui/separator.tsx`
- ✅ `/components/ui/progress.tsx`
- ✅ `/components/ui/alert.tsx`
- ✅ `/components/ui/badge.tsx`
- ✅ `/components/ShoppingCart.tsx`
- ✅ `/components/ui/card.tsx`
- ✅ `/components/ui/input.tsx`
- ✅ `/components/ui/table.tsx`

## Fichiers qui nécessitent une correction

Environ 29 fichiers dans `/components/ui/` doivent être corrigés :
- accordion.tsx
- alert-dialog.tsx
- aspect-ratio.tsx
- avatar.tsx
- breadcrumb.tsx
- calendar.tsx
- carousel.tsx
- checkbox.tsx
- collapsible.tsx
- command.tsx
- context-menu.tsx
- dropdown-menu.tsx
- form.tsx
- hover-card.tsx
- input-otp.tsx
- menubar.tsx
- navigation-menu.tsx
- pagination.tsx
- popover.tsx
- radio-group.tsx
- resizable.tsx
- scroll-area.tsx
- sheet.tsx
- sidebar.tsx
- slider.tsx
- switch.tsx
- toggle-group.tsx
- toggle.tsx
- tooltip.tsx

## En cas de problème

Si vous rencontrez des erreurs après la correction :

1. **Vérifier node_modules** :
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Vider le cache Vite** :
   ```bash
   rm -rf node_modules/.vite
   ```

3. **Redémarrer le serveur** :
   ```bash
   npm run dev
   ```

## Support

Si les erreurs persistent, vérifiez :
- Que toutes les dépendances sont installées (`npm install`)
- Qu'aucun fichier n'a encore des imports avec `@version`
- Que le fichier `/package.json` contient toutes les dépendances Radix UI nécessaires

---

**Cette solution corrige le problème principal qui empêche l'application de démarrer.** ✨
