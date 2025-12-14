#!/usr/bin/env python3
"""
Script pour corriger automatiquement tous les imports avec versions dans les composants UI.
"""

import re
from pathlib import Path

def fix_imports(file_path):
    """
    Supprime les versions des imports dans un fichier TypeScript.
    """
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # Pattern pour capturer les imports avec versions
    # Exemples: "@radix-ui/react-dialog@1.1.6" -> "@radix-ui/react-dialog"
    #           "lucide-react@0.487.0" -> "lucide-react"
    pattern = r'(["\'])([^"\']+)@[\d.]+(["\'])'
    
    # Remplacer les versions
    content = re.sub(pattern, r'\1\2\3', content)
    
    # Écrire le fichier uniquement s'il a changé
    if content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    """
    Parcourt tous les fichiers .tsx dans components/ui et les corrige.
    """
    ui_dir = Path('components/ui')
    
    if not ui_dir.exists():
        print("❌ Le dossier components/ui n'existe pas!")
        print("   Assurez-vous d'exécuter ce script depuis la racine du projet.")
        return
    
    tsx_files = list(ui_dir.glob('*.tsx'))
    
    if not tsx_files:
        print("❌ Aucun fichier .tsx trouvé dans components/ui/")
        return
    
    print(f"🔍 {len(tsx_files)} fichiers trouvés dans components/ui/")
    print()
    
    fixed_count = 0
    for file_path in tsx_files:
        if fix_imports(file_path):
            print(f"✅ Corrigé: {file_path.name}")
            fixed_count += 1
        else:
            print(f"⏭️  Aucun changement: {file_path.name}")
    
    print()
    print(f"✨ Terminé! {fixed_count}/{len(tsx_files)} fichiers corrigés.")
    print()
    
    if fixed_count > 0:
        print("📝 Prochaines étapes:")
        print("   1. Vérifiez que les modifications sont correctes")
        print("   2. Exécutez 'npm run dev' pour tester")
        print()

if __name__ == '__main__':
    main()
