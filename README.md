# PDF Tools (Static Site)

This is a ready-to-deploy static website that provides client-side PDF tools:
- Test → PDF (create printable test papers)
- Merge multiple PDFs into grid A4 pages
- YouTube video transcript → PDF (paste transcript or use serverless helper)

## How to deploy (GitHub Pages)
1. Create a public GitHub repository.
2. Upload the files: `index.html`, `styles.css`, `script.js`.
3. In repository **Settings → Pages**, choose:
   - Source: Deploy from a branch
   - Branch: main
   - Folder: /(root)
4. Save. Your site will be live at `https://<username>.github.io/<repo>/`

## Serverless transcript helper (optional)
You can deploy a small serverless function to fetch YouTube transcripts reliably.

Example Node (Vercel/Netlify) `api/fetchTranscript.js`:
```js
// npm i youtube-transcript
const { getTranscript } = require('youtube-transcript');

module.exports = async (req, res) => {
  try {
    const videoId = req.query.videoId || req.body.videoId;
    if (!videoId) return res.status(400).json({ error: 'missing videoId' });
    const lines = await getTranscript(videoId);
    const text = lines.map(l => l.text).join('\n');
    res.json({ transcript: text });
  } catch (err) {
    res.status(500).json({ error: err.message || String(err) });
  }
};
```

## Notes & Limitations
- All PDF processing is client-side (privacy friendly).
- Large PDFs may be slow or fail on older devices.
- Automatic YouTube transcript fetching client-side may fail due to CORS — use serverless helper if needed.
