import os

def list_directory_contents(start_path):
    """
    Recursively lists all folders and files within a given start_path,
    displaying them in a hierarchical, indented format.

    Args:
        start_path (str): The absolute path of the directory to start listing from.
    """
    if not os.path.exists(start_path):
        print(f"Error: The path '{start_path}' does not exist.")
        return
    if not os.path.isdir(start_path):
        print(f"Error: The path '{start_path}' is not a directory.")
        return

    print(f"Listing contents of: {start_path}\n")

    # os.walk generates the file names in a directory tree by walking the tree
    # top-down or bottom-up. For each directory in the tree rooted at the
    # directory top (including top itself), it yields a 3-tuple
    # (dirpath, dirnames, filenames).
    # dirpath: a string, the path to the directory.
    # dirnames: a list of the names of the subdirectories in dirpath.
    # filenames: a list of the names of the non-directory files in dirpath.
    for root, dirs, files in os.walk(start_path):
        # Calculate the current level's indentation.
        # This is based on how many "steps" down from the start_path we are.
        # os.path.relpath calculates the relative path from start_path to root.
        # Then, we count the number of directory separators (os.sep) to determine depth.
        # If root is the same as start_path, relpath will be '.', so level is 0.
        rel_path = os.path.relpath(root, start_path)
        level = rel_path.count(os.sep) if rel_path != '.' else 0
        indent = '    ' * level # 4 spaces per level for indentation

        # Print the current directory name
        # os.path.basename extracts the last component of a pathname.
        # If root is the start_path, it will print the base name of the start_path.
        print(f"{indent}📁 {os.path.basename(root)}/")

        # Print all files in the current directory, with an additional indent
        for f_name in files:
            print(f"{indent}    📄 {f_name}")

# Define the target directory path
# Use raw string (r"...") to avoid issues with backslashes being interpreted as escape sequences.
target_directory = r"C:\Users\ayub_\Desktop\scripts"

# Call the function to list the contents
list_directory_contents(target_directory)
