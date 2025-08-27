import os
import re
from pathlib import Path

# ---------- CONFIG ----------
ROOT_DIR = "./src"  # adjust to your project root
EXTENSIONS = [".ts", ".tsx", ".js", ".jsx"]

# Regex patterns to remove comments
SINGLE_LINE_COMMENT = re.compile(r"//.*")
MULTI_LINE_COMMENT = re.compile(r"/\*[\s\S]*?\*/")

# Regex to find import statements
IMPORT_RE = re.compile(r"^(import .*?;)", re.MULTILINE)

# Define import groups in order
IMPORT_GROUPS = [
    "react",                  # React
    "react-router-dom",        # React Router
    "react-toastify",          # Toasts / third party
    "@store",                  # Store
    "@pages",                  # Pages
    "@components",             # Components
    "react-icons",             # Icons
    "@styles",                 # Styles
    ""                         # Everything else
]

# ---------- FUNCTIONS ----------
def remove_comments(content: str) -> str:
    """Remove all single-line and multi-line comments"""
    content = SINGLE_LINE_COMMENT.sub("", content)
    content = MULTI_LINE_COMMENT.sub("", content)
    return content

def get_group(import_line: str) -> int:
    """Return the group index for an import line"""
    for i, pattern in enumerate(IMPORT_GROUPS):
        if pattern and pattern in import_line:
            return i
    return len(IMPORT_GROUPS) - 1  # default last group

def sort_imports(content: str) -> str:
    """Sort import statements into groups and alphabetically within groups"""
    imports = IMPORT_RE.findall(content)
    if not imports:
        return content

    # Remove original imports
    content_wo_imports = IMPORT_RE.sub("", content).lstrip()

    # Group imports
    grouped_imports = {i: [] for i in range(len(IMPORT_GROUPS))}
    for imp in imports:
        grouped_imports[get_group(imp)].append(imp)

    # Sort alphabetically within each group and join
    sorted_imports = []
    for i in range(len(IMPORT_GROUPS)):
        if grouped_imports[i]:
            sorted_imports.extend(sorted(grouped_imports[i], key=lambda x: x.lower()))
            sorted_imports.append("")  # empty line between groups

    # Remove last extra empty line
    if sorted_imports and sorted_imports[-1] == "":
        sorted_imports.pop()

    # Rebuild content
    new_content = "\n".join(sorted_imports) + "\n\n" + content_wo_imports
    return new_content

def process_file(file_path: Path):
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    content = remove_comments(content)
    content = sort_imports(content)

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"✅ Processed {file_path}")

# ---------- MAIN ----------
for subdir, _, files in os.walk(ROOT_DIR):
    for file in files:
        if any(file.endswith(ext) for ext in EXTENSIONS):
            process_file(Path(subdir) / file)

print("🎉 All files processed: comments removed + imports sorted into groups!")
