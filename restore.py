import os

files_to_restore = [
    r"D:\AI_Interview\Frontend\src\App.tsx",
    r"D:\AI_Interview\Frontend\src\context\AuthContext.tsx"
]

for filepath in files_to_restore:
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        continue
        
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    restored_lines = []
    in_new_code = False
    
    for line in lines:
        stripped = line.strip()
        
        # If it's an empty line before new code, just add it
        if not stripped:
            restored_lines.append("")
            continue
            
        # If it's a commented line, restore it
        if line.startswith("// "):
            restored_lines.append(line[3:].rstrip())
        elif line.startswith("//"):
            restored_lines.append(line[2:].rstrip())
        else:
            # We hit the actual active new code that we want to discard
            in_new_code = True
            break
            
    # Write the restored content back
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write("\n".join(restored_lines) + "\n")
        
    print(f"Restored: {filepath}")
