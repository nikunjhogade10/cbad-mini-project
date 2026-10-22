import os
import re

css_path = '/Users/nikunjsantoshhogade/CBAD Mini Project/assets/css/design-system.css'

with open(css_path, 'r') as f:
    css = f.read()

# Fix layout width (prevent blank right side on large screens)
css = re.sub(r'--content-max-width:\s*1280px;', '--content-max-width: 100%;', css)
# If 100% looks too stretched, we could use 1600px, but 100% works fine with padding.
with open(css_path, 'w') as f:
    f.write(css)

replacements = {
    "Docker & Containerization": "Container Based Application Development",
    "Docker (CS503)": "CBAD",
    "Docker(CS503)": "CBAD",
    "CS503": "CBAD",
    "Docker Compose Lab": "CBAD Practical 1",
    "Dockerfile Best Practices": "CBAD Assignment 1",
    "Docker Networking Task": "CBAD Project",
    "Docker Lab Assignment": "CBAD Lab Assignment",
    "Docker": "CBAD",
    
    "Database Management Systems": "Program Elective - I",
    "DBMS (CS504)": "PE-I",
    "DBMS(CS504)": "PE-I",
    "CS504": "PE-I",
    "DBMS": "PE-I",
    
    "Design & Analysis of Algorithms": "Design and Analysis of Algorithm",
    "DAA (CS505)": "DAA",
    "DAA(CS505)": "DAA",
    "CS505": "DAA",
    
    "Cloud Computing": "Cloud Network Engineering Lab",
    "Cloud (CS506)": "CNEL",
    "Cloud(CS506)": "CNEL",
    "CS506": "CNEL",
    "Cloud": "CNEL",
    
    "Machine Learning": "Cloud Application Programming Models Lab",
    "ML (CS507)": "CAPML",
    "ML(CS507)": "CAPML",
    "CS507": "CAPML",
    "ML": "CAPML",
    
    "Computer Networks": "Container Based Application Development Lab",
    "Networks (CS508)": "CBADL",
    "Networks(CS508)": "CBADL",
    "CS508": "CBADL",
    "Networks": "CBADL",
    "Comp. Networks": "CBADL"
}

def replace_in_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    original_content = content
    # Order matters: replace longer strings first to prevent partial replacements
    for old, new in sorted(replacements.items(), key=lambda x: len(x[0]), reverse=True):
        # Use regex to match only outside of tags if possible, or just standard replace 
        # since these are mostly display text.
        content = content.replace(old, new)
        
    if content != original_content:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Updated: {filepath}")

# Process all HTML and JS files
for root, dirs, files in os.walk('/Users/nikunjsantoshhogade/CBAD Mini Project'):
    for file in files:
        if file.endswith('.html') or file.endswith('.js'):
            if 'node_modules' in root: continue
            replace_in_file(os.path.join(root, file))

print("Done updating subjects project-wide and CSS layout.")
