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
2. **Download Speaker Photo:** Download the speaker's photo from Google Drive (the link is in the CSV file/CFP responses sheet).
3. **Check the Speaker Photo Size:** If the photo is not a square, it may show up wonky or auto-crop in a weird spot.  Crop the photo to be a square before moving to the next step if it's not square(ish).
4. **Rename & Place Photo:** Rename the photo to match the slugified speaker name (e.g., `jane-doe`) and place it in the `images/speakers/` directory.
5. **Check Photo Extension:** The script defaults to `.jpg` for the image path in the frontmatter. Ensure the photo's extension is `.jpg`. If it's another format like `.png`, you will need to update the filename in the generated speaker markdown file to match the correct extension.
6. **Review Formatting:** Open the newly generated markdown files in `src/content/speakers/` and `src/content/talks/`. Review the bio and abstract content and update any markdown formatting as needed before committing and posting.
7. **Test Changes:** Run `npm run dev` and check the local site to ensure the talks and speakers are displayed correctly.
