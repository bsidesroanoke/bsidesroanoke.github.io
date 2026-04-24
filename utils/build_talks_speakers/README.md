# Build Talks & Speakers Utility

This utility automates the generation of markdown files for speakers and their talks based on the accepted CFP responses.

## Prerequisites & Setup

1. **Export CFP Data:** Export the "Talk Details" tab from the CFP responses Google Sheet as a CSV file.
2. **Update Script Variable:** Open `build_talks_speakers.py` and update the `CSV_FILE_PATH` variable to point to the location of the CSV file you just downloaded.

## Usage

1. Run the script:
   ```
   python build_talks_speakers.py
   ```
2. **Download Speaker Photo:** Download the speaker's photo from Google Drive (the link is in the CSV file).
3. **Rename & Place Photo:** Rename the photo to match the slugified speaker name (e.g., `jane-doe`) and place it in the `src/images/` directory.
4. **Check Photo Extension:** The script defaults to `.jpg` for the image path in the frontmatter. Ensure the photo's extension is `.jpg`. If it's another format like `.png`, you will need to update the extension in the generated speaker markdown file to match.
5. **Review Formatting:** Open the newly generated markdown files in `src/content/speakers/` and `src/content/talks/`. Review the bio and abstract content and update any markdown formatting as needed before committing and posting.
