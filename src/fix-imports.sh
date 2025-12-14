#!/bin/bash

# Script pour corriger tous les imports avec versions

echo "Correction des imports dans les composants UI..."

# Fonction pour corriger un fichier
fix_file() {
    local file="$1"
    
    # Corriger @radix-ui imports
    sed -i 's/@radix-ui\/react-[a-z-]*@[0-9.]*/@radix-ui\/react-\1/g' "$file"
    
    # Correction manuelle pour chaque type d'import Radix
    sed -i 's/@radix-ui\/react-accordion@[0-9.]*/@radix-ui\/react-accordion/g' "$file"
    sed -i 's/@radix-ui\/react-alert-dialog@[0-9.]*/@radix-ui\/react-alert-dialog/g' "$file"
    sed -i 's/@radix-ui\/react-aspect-ratio@[0-9.]*/@radix-ui\/react-aspect-ratio/g' "$file"
    sed -i 's/@radix-ui\/react-avatar@[0-9.]*/@radix-ui\/react-avatar/g' "$file"
    sed -i 's/@radix-ui\/react-checkbox@[0-9.]*/@radix-ui\/react-checkbox/g' "$file"
    sed -i 's/@radix-ui\/react-collapsible@[0-9.]*/@radix-ui\/react-collapsible/g' "$file"
    sed -i 's/@radix-ui\/react-context-menu@[0-9.]*/@radix-ui\/react-context-menu/g' "$file"
    sed -i 's/@radix-ui\/react-dialog@[0-9.]*/@radix-ui\/react-dialog/g' "$file"
    sed -i 's/@radix-ui\/react-dropdown-menu@[0-9.]*/@radix-ui\/react-dropdown-menu/g' "$file"
    sed -i 's/@radix-ui\/react-hover-card@[0-9.]*/@radix-ui\/react-hover-card/g' "$file"
    sed -i 's/@radix-ui\/react-label@[0-9.]*/@radix-ui\/react-label/g' "$file"
    sed -i 's/@radix-ui\/react-menubar@[0-9.]*/@radix-ui\/react-menubar/g' "$file"
    sed -i 's/@radix-ui\/react-navigation-menu@[0-9.]*/@radix-ui\/react-navigation-menu/g' "$file"
    sed -i 's/@radix-ui\/react-popover@[0-9.]*/@radix-ui\/react-popover/g' "$file"
    sed -i 's/@radix-ui\/react-progress@[0-9.]*/@radix-ui\/react-progress/g' "$file"
    sed -i 's/@radix-ui\/react-radio-group@[0-9.]*/@radix-ui\/react-radio-group/g' "$file"
    sed -i 's/@radix-ui\/react-scroll-area@[0-9.]*/@radix-ui\/react-scroll-area/g' "$file"
    sed -i 's/@radix-ui\/react-select@[0-9.]*/@radix-ui\/react-select/g' "$file"
    sed -i 's/@radix-ui\/react-separator@[0-9.]*/@radix-ui\/react-separator/g' "$file"
    sed -i 's/@radix-ui\/react-slider@[0-9.]*/@radix-ui\/react-slider/g' "$file"
    sed -i 's/@radix-ui\/react-slot@[0-9.]*/@radix-ui\/react-slot/g' "$file"
    sed -i 's/@radix-ui\/react-switch@[0-9.]*/@radix-ui\/react-switch/g' "$file"
    sed -i 's/@radix-ui\/react-tabs@[0-9.]*/@radix-ui\/react-tabs/g' "$file"
    sed -i 's/@radix-ui\/react-toggle@[0-9.]*/@radix-ui\/react-toggle/g' "$file"
    sed -i 's/@radix-ui\/react-toggle-group@[0-9.]*/@radix-ui\/react-toggle-group/g' "$file"
    sed -i 's/@radix-ui\/react-tooltip@[0-9.]*/@radix-ui\/react-tooltip/g' "$file"
    
    # Corriger lucide-react
    sed -i 's/lucide-react@[0-9.]*"/lucide-react"/g' "$file"
    
    # Corriger class-variance-authority
    sed -i 's/class-variance-authority@[0-9.]*"/class-variance-authority"/g' "$file"
    
    # Corriger autres packages avec versions
    sed -i 's/cmdk@[0-9.]*"/cmdk"/g' "$file"
    sed -i 's/embla-carousel-react@[0-9.]*"/embla-carousel-react"/g' "$file"
    sed -i 's/input-otp@[0-9.]*"/input-otp"/g' "$file"
    sed -i 's/react-day-picker@[0-9.]*"/react-day-picker"/g' "$file"
    sed -i 's/react-resizable-panels@[0-9.]*"/react-resizable-panels"/g' "$file"
    sed -i 's/sonner@[0-9.]*"/sonner"/g' "$file"
    sed -i 's/vaul@[0-9.]*"/vaul"/g' "$file"
    
    echo "✓ Corrigé: $file"
}

# Trouver tous les fichiers .tsx dans components/ui
for file in components/ui/*.tsx; do
    if [ -f "$file" ]; then
        fix_file "$file"
    fi
done

echo ""
echo "✅ Correction terminée!"
echo ""
echo "Pour appliquer les changements, exécutez:"
echo "  chmod +x fix-imports.sh"
echo "  ./fix-imports.sh"
