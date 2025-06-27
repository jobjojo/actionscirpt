import os
import shutil

def duplicate_txt_to_js(start_path):
    """
    Reads every .txt file within the start_path and its subdirectories,
    and creates a duplicate file with the same name but a .js extension.
    It skips duplication if a .js file of the same name already exists
    in the respective path.

    Args:
        start_path (str): The absolute path of the directory to process.
    """
    if not os.path.exists(start_path):
        print(f"Error: The path '{start_path}' does not exist. Please check the path and try again.")
        return
    if not os.path.isdir(start_path):
        print(f"Error: The path '{start_path}' is not a directory. Please provide a directory path.")
        return

    print(f"Starting duplication process for .txt files in: {start_path}\n")
    processed_count = 0
    skipped_count = 0
    error_count = 0

    # os.walk generates the file names in a directory tree by walking the tree
    # top-down. It yields a 3-tuple (dirpath, dirnames, filenames) for each directory.
    for root, _, files in os.walk(start_path):
        for filename in files:
            # Check if the file has a .txt extension (case-insensitive check for robustness)
            if filename.lower().endswith(".txt"):
                # Construct the full path to the current .txt file
                txt_filepath = os.path.join(root, filename)

                # Get the base name of the file (e.g., 'GameCharacter' from 'GameCharacter.txt')
                # and then append the new .js extension.
                base_name = os.path.splitext(filename)[0]
                js_filename = base_name + ".js"
                js_filepath = os.path.join(root, js_filename)

                # Check if the corresponding .js file already exists
                if os.path.exists(js_filepath):
                    print(f"Skipping: '{js_filepath}' already exists. No new file created.")
                    skipped_count += 1
                else:
                    try:
                        # Instead of copying content, create an empty .js file
                        # 'w' mode truncates the file to zero length or creates it if it doesn't exist.
                        with open(js_filepath, 'w') as f:
                            pass # This simply creates an empty file
                        print(f"Created blank: '{js_filepath}'")
                        processed_count += 1
                    except Exception as e:
                        print(f"Error creating blank file '{js_filepath}': {e}")
                        error_count += 1
    
    print(f"\nDuplication process completed.")
    print(f"Files created: {processed_count}")
    print(f"Files skipped (already existed): {skipped_count}")
    print(f"Errors encountered: {error_count}")


# Define the target directory path
# Use a raw string (r"...") to handle backslashes correctly in Windows paths.
target_directory = r"C:\Users\ayub_\Desktop\scripts"

# Call the function to start the duplication process
duplicate_txt_to_js(target_directory)
