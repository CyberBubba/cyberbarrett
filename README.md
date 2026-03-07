# cyberbarrett.com

Personal site for Barrett Holt — Sailor. Builder. Explorer.

## Stack

Pure HTML / CSS / JavaScript. No frameworks, no dependencies, no build step.
Hosted on **GitHub Pages** with a custom domain via GoDaddy.

## Deployment

### 1. Create a new GitHub repo
Name it exactly: `cyberbarrett.com` (or `<yourusername>.github.io`)

### 2. Push this folder
```bash
git init
git add .
git commit -m "Initial commit — cyberbarrett.com v2"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/cyberbarrett.com.git
git push -u origin main
```

### 3. Enable GitHub Pages
- Go to your repo → **Settings** → **Pages**
- Source: `main` branch, `/ (root)` folder
- Save

### 4. Point your GoDaddy domain to GitHub Pages
In GoDaddy DNS settings, add these **A records**:
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```
And a **CNAME record**:
```
www  →  YOUR_USERNAME.github.io
```

### 5. Add custom domain in GitHub
- Repo → Settings → Pages → Custom domain → enter `cyberbarrett.com`
- Check "Enforce HTTPS" ✓

DNS propagation typically takes 10–30 minutes.

---

Built with ☕ and a love for clean code.
