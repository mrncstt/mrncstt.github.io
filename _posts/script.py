import os
import re

def process_markdown_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        lines = file.readlines()

    header = []
    in_header = False
    for line in lines:
        if line.strip() == '---':
            if in_header:
                break
            else:
                in_header = True
                continue
        if in_header:
            header.append(line.strip())

    if not header:
        return
    
    # Extract date from header
    date_match = re.search(r'date:\s*\"?(\d{4}-\d{2}-\d{2})\"?', "\n".join(header))
    if not date_match:
        return
    date_str = date_match.group(1)

    # Modify header content
    modified_header = ["---"]
    for line in header:
        if line.startswith('title:') or line.startswith('description:'):
            modified_header.append(line.replace('"', ''))
        elif line.startswith('categories:') or line.startswith('tags:'):
            modified_header.append(re.sub(r'["-]', '', line).replace('\n', '').replace('  ', ' ').replace(' ', ', ').replace(':,', ': [').strip() + "]")
        else:
            modified_header.append(line)
    modified_header.append("---\n")
    
    new_content = "\n".join(modified_header) + "\n".join(lines[len(header) + 2:])
    
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(new_content)
    
    # Rename file
    dir_name, file_name = os.path.split(file_path)
    file_name_without_ext = os.path.splitext(file_name)[0]
    new_file_name = f"{date_str}-{file_name_without_ext.lower().replace(' ', '_').replace('-', '_')}.md"
    os.rename(file_path, os.path.join(dir_name, new_file_name))

def process_directory(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.md'):
                process_markdown_file(os.path.join(root, file))

# Directory path where the markdown files are located
directory_path = r'C:\Users\Dell\OneDrive\Documents\Web_development\WebDev-Material\Fiverr\marianacosta\mrncstt.github.io\_posts'

process_directory(directory_path)