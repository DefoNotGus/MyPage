# MyPage
My Page

## Local Development & Testing

1. **Install a local server** (if you don't have one):
   - With Node.js: `npm install -g serve`
   - With Python 3: `python -m http.server 5000`
   - Or use `firebase-tools` if deploying to Firebase. 

2. **Run the server from the project root** (the folder containing `public/`):
   - With Node.js: `serve public`
   - With Python: `cd public && python -m http.server 5000`
   - With Firebase: `firebase serve`

3. **Open your browser** to `http://localhost:5000` (or the port your server uses).

4. **Do NOT open HTML files directly** (file://...), as fetch requests for JSON and other assets will fail due to browser security restrictions.

## Deployment

### Firebase Hosting (Recommended)
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize (first time): `firebase init hosting`
   - Set `public` as the public directory
   - Configure as a single-page app if using client-side routing
4. Deploy: `firebase deploy`

### Other Static Hosts
- Upload the contents of the `public/` folder to your static host (Netlify, Vercel, GitHub Pages, etc.).
- Ensure all asset paths (images, JSON, CSS, JS) are relative or match your host's structure.

## Customization
- Edit `public/data/projects.json` to add or change projects.
- Update images in `public/images/`.
- Edit styles in `public/css/styles.css`.
- Main logic is in `public/js/script.js`.

## Troubleshooting
- If projects or assets do not load, check the browser console for 404 errors and verify file paths.
- Always use a local server for testing, not file:// URLs.
- For emoji or Unicode issues, ensure your files are saved as UTF-8.

---

Feel free to fork and adapt this template for your own portfolio or teaching site!
