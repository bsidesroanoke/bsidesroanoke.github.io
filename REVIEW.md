# BSides Roanoke Website - Review & Testing Guide

Thank you for volunteering to review the newly rebuilt BSides Roanoke website! This document will help you get set up and guide you through what to review.

---

## 🚀 Getting Started

### Running the Site Locally

Please see the **[README.md](./README.md)** for complete instructions on how to build and run the site locally. The quick version:

1. Install Node.js (LTS version from [nodejs.org](https://nodejs.org/))
2. Clone this repository
3. Run `npm install` in the project directory
4. Run `npm run dev` to start the development server
5. Open `http://localhost:4321` in your browser

---

## 🎭 Dummy/Test Content

The following content is placeholder or test data and should be ignored during your review:

### Featured Speakers from Previous Years
- Some speakers are marked as "featured" for past events (2023, 2024) to test the featured speaker display functionality
- These are real speakers but the "featured" designation is for testing purposes

### Speaker Spotlight Blog Post
- There is a blog post titled "Speaker Spotlight" that is sample content
- This demonstrates the blog functionality but is not final content

### 2026 CFP Link
- The Call for Papers (CFP) link for 2026 is currently a placeholder
- The CFP page exists but the submission link needs to be updated when the form is ready
---

## 📝 Pages Requiring Special Attention

While we appreciate feedback on the entire site, please pay **extra attention** to the following pages for wording, tone, and messaging:

### 1. **About Page** (`/about`)
- Review the mission statement and conference description
- Check that the tone is welcoming and inclusive
- Verify that the information accurately represents BSides Roanoke

### 2. **2026 Call for Papers** (`/cfp/2026`)
- Review the CFP description and requirements
- Check that submission guidelines are clear
- Verify dates and deadlines
- Ensure the tone encourages diverse submissions

### 3. **2026 Event Description** (Homepage `/`)
- Review the main event description for BSides Roanoke 2026
- Check that the messaging is exciting and inviting
- Verify that key information (date, location, etc.) is accurate
- Ensure it appeals to both newcomers and returning attendees

---

## 🧪 What to Test

### Navigation
- [ ] All navigation links work correctly

### Content Display
- [ ] Event pages load correctly (2023, 2024, 2026)
- [ ] Speaker profiles display properly with photos and bios
- [ ] Talk schedules show correct times and rooms
- [ ] Blog posts render correctly
- [ ] Venue/Parking information displays properly

### Responsive Design
- [ ] Site looks good on desktop
- [ ] All text is readable at different screen sizes

### Functionality
- [ ] Schedule filtering works (by room, track, search)
- [ ] Talk modals open and display full descriptions
- [ ] Links to speaker profiles work from talks
- [ ] Prior Events page shows past events correctly
- [ ] Current event (2026) does NOT appear on Prior Events page

---

## 💬 Providing Feedback

Please provide feedback on:

1. **Content & Messaging**
   - Wording, tone, clarity
   - Accuracy of information
   - Missing information

2. **User Experience**
   - Navigation ease
   - Information findability
   - Visual design and layout

3. **Technical Issues**
   - Broken links
   - Display problems
   - Functionality bugs

4. **Suggestions**
   - Features you'd like to see
   - Content improvements
   - Design enhancements

---

## 📧 How to Submit Feedback

### Option 1: Git PR
- make another branch with your changes
- create a pull request against the 2026-site-rebuild branch

### Option 2: Discord/Meeting Feedback
- Provide feedback in our discord channel or in the meeting notes for our next meeting

---

Thank you for taking the time to review the site! Your feedback is invaluable in making BSides Roanoke's web presence the best it can be.
