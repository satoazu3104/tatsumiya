#!/bin/bash

# Description:
# This script removes all files in the specified directories and clears the .git directory.
# It is designed to run in a WSL environment.

log_file="cleanup.log"
exec > >(tee -a "$log_file") 2>&1

# Exit immediately if a command exits with a non-zero status
set -e

read -p "指定されたディレクトリを本当に削除しますか？この操作は取り消せません。(y/n): " confirm
if [[ "$confirm" != "y" ]]; then
  echo "操作を中止しました。"
  exit 0
fi

# Define the directories to clean
dirs_to_clean=(
  "./src/images/media/"
  "./src/images/common/"
)

# Define the .git directory
git_dir="./.git"

# Iterate through the directories and remove the files
# Iterate through the directories and remove the files
for dir in "${dirs_to_clean[@]}"; do
  if [ -d "$dir" ]; then
    echo "ディレクトリの中身を削除中: $dir"
    find "$dir" -mindepth 1 -exec rm -rf {} +
  else
    echo "ディレクトリが存在しません: $dir"
  fi
done

# Remove the .git directory if it exists
#
if [ -d "$git_dir" ]; then
  read -p ".gitディレクトリを削除しますか？(y/n): " git_confirm
  if [[ "$git_confirm" == "y" ]]; then
    echo ".gitディレクトリを削除中: $git_dir"
    rm -rf "$git_dir"
  else
    echo ".gitディレクトリの削除をスキップしました。"
  fi
else
  echo ".gitディレクトリが存在しません: $git_dir"
fi

echo "All specified directories have been cleaned."

# List of source and target file pairs
# Format: "source_file:target_file"
file_pairs=(
  "./src/scss/layout/_content_def.scss:./src/scss/layout/_content.scss"
  "./src/scss/layout/_header_def.scss:./src/scss/layout/_header.scss"
  "./src/scss/layout/_list_def.scss:./src/scss/layout/_list.scss"
  "./src/scss/layout/_section_def.scss:./src/scss/layout/_section.scss"
  "./src/scss/layout/_wrap_def.scss:./src/scss/layout/_wrap.scss"
  "./src/scss/object/component/_button_def.scss:./src/scss/object/component/_button.scss"
  "./src/scss/object/component/_card_def.scss:./src/scss/object/component/_card.scss"
  "./src/scss/object/component/_item_def.scss:./src/scss/object/component/_item.scss"
  "./src/scss/object/component/_splide_def.scss:./src/scss/object/component/_splide.scss"
  "./src/scss/object/project/_img_def.scss:./src/scss/object/project/_img.scss"
  "./src/scss/object/project/_texts_def.scss:./src/scss/object/project/_texts.scss"
  "./src/scss/object/project/_title_def.scss:./src/scss/object/project/_title.scss"
)

# Iterate through each pair and perform the copy and overwrite operation
for pair in "${file_pairs[@]}"; do
  # Split the pair into source and target
  IFS=":" read -r source_file target_file <<<"$pair"

  # Check if the source file exists
  if [ -f "$source_file" ]; then
    echo "Copying from $source_file to $target_file"

    # Ensure the target directory exists
    target_dir=$(dirname "$target_file")
    mkdir -p "$target_dir"

    # Copy the source file to the target location
    cp "$source_file" "$target_file"
    echo "Successfully copied to $target_file"
  else
    echo "Source file does not exist: $source_file"
  fi
done

echo "All specified files have been processed."
