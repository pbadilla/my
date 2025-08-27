import os
import json

PROJECT_DIR = "."
README_FILE = "README2.md"

def get_project_structure(startpath):
    tree = ""
    for root, dirs, files in os.walk(startpath):
        # Ignore node_modules
        if "node_modules" in dirs:
            dirs.remove("node_modules")
        level = root.replace(startpath, "").count(os.sep)
        indent = " " * 4 * level
        tree += f"{indent}- {os.path.basename(root)}/\n"
        subindent = " " * 4 * (level + 1)
        for f in files:
            tree += f"{subindent}- {f}\n"
    return tree

def get_dependencies():
    package_json_path = os.path.join(PROJECT_DIR, "package.json")
    if os.path.exists(package_json_path):
        with open(package_json_path, "r", encoding="utf-8") as f:
            data = json.load(f)
        deps = data.get("dependencies", {})
        dev_deps = data.get("devDependencies", {})
        return deps, dev_deps
    return {}, {}

def generate_summary_readme():
    deps, dev_deps = get_dependencies()
    
    readme_content = f"# Project Summary\n\n"

    readme_content += "## Project Structure\n\n```\n"
    readme_content += get_project_structure(PROJECT_DIR)
    readme_content += "```\n\n"

    readme_content += "## Dependencies\n\n"
    if deps:
        readme_content += "### Runtime\n"
        for lib, version in deps.items():
            readme_content += f"- {lib}: {version}\n"
    if dev_deps:
        readme_content += "\n### Development\n"
        for lib, version in dev_deps.items():
            readme_content += f"- {lib}: {version}\n"

    readme_content += "\n## Summary of Resources\n\n"
    readme_content += "- React 18\n- Redux Toolkit\n- Axios\n- SCSS\n- Vite\n- pnpm or yarn\n\n"

    readme_content += "## Notes\n\n- This is an automatically generated summary of the project.\n"

    with open(README_FILE, "w", encoding="utf-8") as f:
        f.write(readme_content)
    print(f"{README_FILE} generated successfully!")

if __name__ == "__main__":
    generate_summary_readme()
