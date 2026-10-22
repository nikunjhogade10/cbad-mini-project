import os

replacements = {
    "innerHTCAPML": "innerHTML",
    "CAPCAPML": "CAPML",
    "AICAPML": "AIML"
}

def fix_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    original_content = content
    for old, new in replacements.items():
        content = content.replace(old, new)
        
    if content != original_content:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Fixed: {filepath}")

for root, dirs, files in os.walk('/Users/nikunjsantoshhogade/CBAD Mini Project'):
    for file in files:
        if file.endswith('.html') or file.endswith('.js'):
            if 'node_modules' in root: continue
            fix_file(os.path.join(root, file))

print("Done fixing errors.")
