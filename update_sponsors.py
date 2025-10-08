import os
import sys
import re

def update_sponsor_file(filepath, year):
    """
    Updates a single sponsor markdown file to the new frontmatter format.
    """
    with open(filepath, 'r') as f:
        content = f.read()

    # Use regex to find the frontmatter
    match = re.match(r'^---\s*\n(.*?)\n---\s*\n?(.*)', content, re.DOTALL)
    if not match:
        print(f"Could not find frontmatter in {filepath}")
        return

    frontmatter_str = match.group(1)
    body = match.group(2)

    # Simple parsing of frontmatter (assumes key: value)
    frontmatter = {}
    for line in frontmatter_str.split('\n'):
        if ':' in line:
            key, value = line.split(':', 1)
            frontmatter[key.strip()] = value.strip()

    # --- Transformation ---
    if 'title' not in frontmatter:
        print(f"Skipping {filepath}: does not seem to be an old sponsor file (no title).")
        return

    logo_path = frontmatter.get('logo')
    if logo_path and '"' in logo_path:
        logo_path = logo_path.replace('"', '')
    if logo_path and logo_path.startswith('/images/'):
        new_logo_path = logo_path.replace('/images/', '../../../public/images/')
    else:
        new_logo_path = logo_path

    new_frontmatter = {
        'name': frontmatter.get('title'),
        'logo': new_logo_path,
        'website': frontmatter.get('website'),
        'years': [str(year)],
        'rank': 99, # Default rank
    }

    # --- Construct new content ---
    new_frontmatter_lines = ['---']
    if new_frontmatter['name']:
        new_frontmatter_lines.append(f"name: {new_frontmatter['name']}")
    if new_frontmatter['logo']:
        new_frontmatter_lines.append(f"logo: {new_frontmatter['logo']}")
    if new_frontmatter['website']:
        new_frontmatter_lines.append(f"website: {new_frontmatter['website']}")
    
    new_frontmatter_lines.append(f"years: [\"{year}\"]")
    new_frontmatter_lines.append(f"rank: {new_frontmatter['rank']}")
    new_frontmatter_lines.append('---')

    new_content = '\n'.join(new_frontmatter_lines) + '\n' + body

    with open(filepath, 'w') as f:
        f.write(new_content)
    
    print(f"Updated {filepath}")


if __name__ == '__main__':
    if len(sys.argv) != 3:
        print("Usage: python update_sponsors.py <directory_path> <year>")
        sys.exit(1)

    directory = sys.argv[1]
    year_to_add = sys.argv[2]

    if not os.path.isdir(directory):
        print(f"Error: Directory not found at {directory}")
        sys.exit(1)

    for filename in os.listdir(directory):
        if filename.endswith('.md'):
            filepath = os.path.join(directory, filename)
            update_sponsor_file(filepath, year_to_add)
