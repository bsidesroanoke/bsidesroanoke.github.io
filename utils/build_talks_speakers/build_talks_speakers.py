"""
This utility automates the generation of markdown files for speakers and their
talks based on the accepted CFP responses.

python3 build_talks_speakers.py path/to/speakers.csv
"""
import csv

def main(csv_file, dry_run):
    with open(csv_file, 'r') as file:
        csv_reader = csv.DictReader(file)
        for row in csv_reader:
            if row['Confirmed'] == 'TRUE' and \
               (row.get('Posted', 'FALSE') == 'FALSE' or\
                not row.get("Posted", '')):

                print(f"\n# Found a talk to post: {row['Title']}")
                speaker_slug = row['Name'].replace(" ", "-").lower()
                talk_slug = row['Title'].replace(" ", "-").replace(":", "").lower()
                speaker_content = "---\n"
                speaker_content += f"name: {row.get('Name', '')}\n"
                speaker_content += f"title: {row.get('Job Title', '')}\n"
                speaker_content += f"company: {row.get('Company', '')}\n"
                speaker_content += f"location: {row.get('Location', '')}\n"
                speaker_content += f"photo: ../../../images/speakers/{speaker_slug}.jpg\n"

                if row.get('Pronouns', ''):
                    speaker_content += f"pronouns: {row.get('Pronouns', '')}\n"

                if row.get('Website'):
                    speaker_content += f"website: {row.get('Website', '')}\n"

                speaker_content += "---\n"
                speaker_content += row.get('Bio', '')
                if not dry_run:
                    with open(f"src/content/speakers/{speaker_slug}.md", 'w') as speaker_file:
                        speaker_file.write(speaker_content)
                    print(f"Created speaker file: {speaker_slug}.md")
                else:
                    print(f"Would create speaker file: {speaker_slug}.md")
                talk_content = "---\n"
                talk_content += f"title: {row.get('Title', '')}\n"
                talk_content += f"speakers: \n - {speaker_slug}\n"
                talk_content += "eventSlug: \"2026\"\n"
                talk_content += "featured: false\n"
                talk_content += "---\n"
                talk_content += row.get('Abstract', '')

                if not dry_run:
                    with open(f"src/content/talks/{talk_slug}.md", 'w') as talk_file:
                        talk_file.write(talk_content)
                    print(f"Created talk file: {talk_slug}.md")
                else:
                    print(f"Would create talk file: {talk_slug}.md")

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(
        formatter_class=argparse.RawDescriptionHelpFormatter,
        description=__doc__,
    )
    parser.add_argument("csv_file",
                        help="Path to CSV File")
    parser.add_argument("--dry-run",
                        action="store_true",
                        help="Run through the list, don't write files")
    args = parser.parse_args()

    main(args.csv_file, args.dry_run)
