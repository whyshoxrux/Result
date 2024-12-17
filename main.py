import os
import shutil

def delete_folders(root_folder, folders_to_delete):
    # Rekursiv tarzda barcha papkalarni ko'rib chiqish
    for dirpath, dirnames, filenames in os.walk(root_folder):
        # Har bir papka ichidagi papkalarni tekshirish
        for folder_name in folders_to_delete:
            folder_path = os.path.join(dirpath, folder_name)
            if os.path.exists(folder_path):
                try:
                    # Papkani o'chirish
                    shutil.rmtree(folder_path)
                    print(f"Deleted: {folder_path}")
                except Exception as e:
                    print(f"Error deleting {folder_path}: {e}")

if __name__ == "__main__":
    root_directory = input("Root papka manzilini kiriting: ")  # Boshlang'ich papkani kiriting
    folders_to_remove = ["node_modules", ".git"]  # O'chirilishi kerak bo'lgan papkalar

    delete_folders(root_directory, folders_to_remove)
