CSV_FILE_PATH = '/Users/lizz/Downloads/BSides Roanoke CFP 2026 (Responses) - Talk Details (1).csv'

import csv

with open(CSV_FILE_PATH, 'r') as file:
    csv_reader = csv.DictReader(file)
    for row in csv_reader:
        if row['Confirmed'] == 'TRUE' and row['Posted'] == 'FALSE':
            print(f"Found a talk to post: {row['Title']}")
            speaker_slug = row['Name'].replace(" ", "-").lower()
            talk_slug = row['Title'].replace(" ", "-").replace(":", "").lower()
            speaker_content = "---\n"
            speaker_content += f"name: {row.get('Name', '')}\n"
            speaker_content += f"title: {row.get('Title', '')}\n"
            speaker_content += f"company: {row.get('Company', '')}\n"
            speaker_content += f"location: {row.get('Location', '')}\n"
            speaker_content += f"photo: ../../../images/speakers/{speaker_slug}.jpg\n"
            if row.get('Pronouns', '') != '':
                speaker_content += f"pronouns: {row.get('Pronouns', '')}\n"
            speaker_content += f"website: {row.get('Website', '')}\n"
            speaker_content += "---\n"
            speaker_content += row.get('Bio', '')
            with open(f"src/content/speakers/{speaker_slug}.md", 'w') as speaker_file:
                speaker_file.write(speaker_content)
            print(f"Created speaker file: {talk_slug}.md")
            talk_content = "---\n"
            talk_content += f"title: {row.get('Title', '')}\n"
            talk_content += f"speakers: \n - {speaker_slug}\n"
            talk_content += "eventSlug: \"2026\"\n"
            talk_content += "featured: false\n"
            talk_content += "---\n"
            talk_content += row.get('Abstract', '')
            with open(f"src/content/talks/{talk_slug}.md", 'w') as talk_file:
                talk_file.write(talk_content)
            print(f"Created talk file: {talk_slug}.md")
 