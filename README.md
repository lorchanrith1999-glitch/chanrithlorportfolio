# Lor Chanrith – Portfolio Website

Plain HTML, CSS and JavaScript. No installs, no paid services.

## Files
- `index.html` – page structure
- `style.css` – colours and layout (colours are at the top)
- `script.js` – **all your content** (top of the file)
- `assets/` – put your photos and CV here

## Run on your computer
Unzip the folder, then double-click `index.html`. It opens in your browser.
Edit files in VS Code (or Notepad), save, and refresh the browser.

## Replace these placeholders (yellow text on the site)
1. `script.js` → `SITE`: your email, LinkedIn link, CV file name
2. Education: institution, dates, courses, certificates
3. Work: position, company, dates, duties, tools, verified results
4. Sport: team, years, role, tournaments (only real ones)
5. Journey: the five dates
6. Projects: the four example projects (title, description, your role, images)
7. Skills: set each level to Learning, Working knowledge or Proficient
8. Portrait: save a photo as `assets/portrait.jpg`, then in `index.html` replace the `<div class="portrait">…</div>` line with `<img class="portrait" src="assets/portrait.jpg" alt="Lor Chanrith">`
9. Hero photo: `assets/hero.jpg` is a temporary bridge image cropped from the design mockup. Replace it with your own photo of the same name (about 1600×700 px).

## Add your CV
Save your PDF as `assets/Lor-Chanrith-CV.pdf`, then set `cvFile: "assets/Lor-Chanrith-CV.pdf"` in `script.js`. Until then the button shows a message instead of a fake download.

## Contact
There is no form, because a static site cannot send messages by itself. The “Send an Email” button opens the visitor’s email app once you add your email.

## Publish free on GitHub Pages
1. Create an account at github.com.
2. Click **New repository**, name it (for example `portfolio`), choose **Public**, click **Create**.
3. Click **uploading an existing file**, drag in the *contents* of this folder (`index.html`, `style.css`, `script.js`, `assets`), then **Commit changes**.
4. Check that `index.html` is at the top level of the repository, not inside another folder.
5. Go to **Settings → Pages**. Under **Branch**, choose `main` and `/ (root)`, then **Save**.
6. Wait 1–3 minutes and refresh the Pages screen.
7. Open the link shown (`https://YOUR-NAME.github.io/portfolio/`) and test every menu item.

## Edit without coding (Portfolio Editor)
1. Unzip the project. Double-click `admin.html` (keep it in the same folder as `content.js`).
2. Pick a tab (Courses, Projects, Work…), edit the forms, use **+ Add new**, ↑ ↓ and **Delete**.
3. Click **Download content.js**.
4. On github.com open your repository, click **Add file → Upload files**, drop the new `content.js`, then **Commit changes**. The live site updates in 1–3 minutes.
5. Photos and your CV: upload them to the `assets` folder the same way, then type the path in the form, for example `assets/project-a.jpg`.
Do not upload `admin.html` unless you want it public. It cannot change the live site by itself.

## Pictures and videos on every item
Every card (education, work, sport, journey, project, course, skill group) has a **Pictures & videos** box in the editor. Put one item per line:
- a photo: `assets/site-visit.jpg`
- a video file: `assets/clip.mp4` (keep it small, under 25 MB)
- a YouTube or Vimeo link: `https://www.youtube.com/watch?v=...`
Upload the photo or video file into the `assets` folder on GitHub first. Click a photo on the site to enlarge it. Only add pictures and videos you have permission to show, and nothing confidential.

## Home and About are editable too
Open `admin.html` and use the **Home** and **About** tabs. For your portrait, upload the photo to `assets` on GitHub, then type `assets/portrait.jpg` in the About tab. Upload `defaults.js` once, along with `index.html` and `script.js`.

## Easy upload from the admin
In `admin.html` click **⚙ GitHub setup** once and paste a fine-grained token (Contents: Read and write, for your portfolio repository only). After that, every picture/video box has an **Upload picture / video** button, and **Publish to website** saves your content to GitHub in one click. Photos are shrunk to 1600 px automatically. Videos must be under 25 MB, or use a YouTube link.
