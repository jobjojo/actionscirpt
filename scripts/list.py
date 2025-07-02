import os

def list_first_level_folders(start_path):
    """
    Lists only the first-level folder names directly within a given start_path.

    Args:
        start_path (str): The absolute path of the directory to list subfolders from.
    """
    if not os.path.exists(start_path):
        print(f"Error: The path '{start_path}' does not exist.")
        return
    if not os.path.isdir(start_path):
        print(f"Error: The path '{start_path}' is not a directory.")
        return

    print(f"Listing first-level folders in: {start_path}\n")

    try:
        # Get all entries (files and directories) directly within the start_path
        entries = os.listdir(start_path)
        
        # Filter out only the directories
        first_level_folders = [
            entry for entry in entries
            if os.path.isdir(os.path.join(start_path, entry))
        ]

        if not first_level_folders:
            print("No subfolders found at the first level.")
            return

        # Print each folder name
        for folder_name in sorted(first_level_folders): # Sorting for a clean, alphabetical list
            print(f"📁 {folder_name}/")

    except Exception as e:
        print(f"An error occurred while listing folders: {e}")

# Define the target directory path
# Use raw string (r"...") to avoid issues with backslashes being interpreted as escape sequences.
target_directory = r""

# Call the function to list the first-level folder names
list_first_level_folders(target_directory)
