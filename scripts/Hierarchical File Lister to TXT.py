import os

def list_files_to_txt(start_path, output_filepath):
    """
    Recursively lists all files within subfolders of a given start_path,
    displaying them in a hierarchical, indented format, and writes the
    output to a specified text file.

    Args:
        start_path (str): The absolute path of the directory to start listing from.
        output_filepath (str): The absolute path where the output text file will be saved.
    """
    if not os.path.exists(start_path):
        print(f"Error: The path '{start_path}' does not exist. Please check the path and try again.")
        return
    if not os.path.isdir(start_path):
        print(f"Error: The path '{start_path}' is not a directory. Please provide a directory path.")
        return

    print(f"Starting to list files from '{start_path}' and saving to '{output_filepath}'...\n")

    try:
        # Open the output file in write mode ('w'). If it exists, it will be overwritten.
        # 'encoding="utf-8"' ensures proper handling of various characters.
        with open(output_filepath, 'w', encoding='utf-8') as f:
            f.write(f"File listing for: {start_path}\n\n")

            # os.walk generates the file names in a directory tree by walking the tree
            # top-down. For each directory in the tree rooted at the
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

                # Write the current directory name to the file
                # os.path.basename extracts the last component of a pathname.
                f.write(f"{indent}📁 {os.path.basename(root)}/\n")

                # Write all files in the current directory, with an additional indent
                # Sort files alphabetically for consistent output
                for f_name in sorted(files):
                    f.write(f"{indent}    📄 {f_name}\n")

        print(f"Successfully listed files to '{output_filepath}'")

    except Exception as e:
        print(f"An error occurred while listing files or writing to the file: {e}")

# Define the target directory path to scan
target_directory = r""

# Define the output file path. This will create 'crash_game_files.txt' on your Desktop.
output_file = os.path.join(os.path.expanduser("~"), "Desktop", "crash_game_files.txt")

# Call the function to list the files and save them to the text file
list_files_to_txt(target_directory, output_file)
