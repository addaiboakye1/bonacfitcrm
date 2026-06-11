# WILLIAM BONAC FITNESS TEMPLE CRM
## Deployment & Setup Guide

---

## 🌐 **Your Live Domain**

**Website:** https://williambonacfitnesstemple.com

### Domain Information
- **Domain:** williambonacfitnesstemple.com
- **Host:** Vercel
- **SSL:** Automatic HTTPS
- **CDN:** Global Vercel network

---

## ✅ **Deployment Checklist**

### Step 1: Connect GitHub to Vercel
- [ ] Login to https://vercel.com
- [ ] Click "New Project"
- [ ] Select "Import Git Repository"
- [ ] Search for `addaiboakye1/bonacfitcrm`
- [ ] Click "Import"
- [ ] Click "Deploy"

### Step 2: Configure Custom Domain
- [ ] Go to project settings
- [ ] Click "Domains"
- [ ] Click "Add Domain"
- [ ] Enter `williambonacfitnesstemple.com`
- [ ] Note the DNS records shown by Vercel

### Step 3: Update DNS Records
**Contact your domain registrar and:**
- [ ] Add the CNAME record Vercel provides
- [ ] Add the TXT record (verification)
- [ ] Wait for DNS propagation (5-30 minutes)

### Step 4: Verify Domain
- [ ] Vercel will auto-verify once DNS propagates
- [ ] You'll see ✅ next to domain in Vercel
- [ ] Your site is now live!

---

## 🔗 **Access Your Application**

Once deployed:

| Page | URL |
|------|-----|
| **Main Dashboard** | https://williambonacfitnesstemple.com |
| **Entrance Portal** | https://williambonacfitnesstemple.com/entrance.html |
| **QR Generator** | https://williambonacfitnesstemple.com/qr-generator.html |

---

## 🔐 **Login Credentials**

**Default Admin Account:**
```
Username: admin
Password: fitness123
```

⚠️ **IMPORTANT:** Change this password immediately after first login!

---

## 📱 **Mobile App Installation**

Your CRM is a PWA (Progressive Web App).

### iOS (Safari)
1. Open https://williambonacfitnesstemple.com
2. Click Share button
3. Tap "Add to Home Screen"
4. App now on your home screen

### Android (Chrome)
1. Open https://williambonacfitnesstemple.com
2. Click 3-dot menu
3. Tap "Install app"
4. App now on your home screen

---

## 🚀 **Quick Start (After Deployment)**

### 1. Create QR Codes
1. Go to https://williambonacfitnesstemple.com/qr-generator.html
2. Click "Generate QR for All Clients"
3. Print all QR codes
4. Distribute to gym members

### 2. Set Up Entrance
1. Put tablet at gym door
2. Open https://williambonacfitnesstemple.com/entrance.html
3. Keep this page open
4. Staff can now scan QR codes

### 3. Monitor Dashboard
1. Go to main dashboard
2. Check attendance in real-time
3. View entrance analytics
4. Track daily entries

---

## ⚙️ **Vercel Configuration**

Your `vercel.json` includes:

✅ **Auto-deployment** - Changes push to live instantly  
✅ **Domain aliases** - Both www and non-www versions work  
✅ **Security headers** - HTTPS, frame options, etc.  
✅ **Caching** - 1-hour cache for performance  
✅ **SPA routing** - All routes go to index.html  

---

## 📊 **Monitor Your Application**

### Vercel Dashboard
1. Login to vercel.com
2. Click on your project
3. View:
   - Deployment status
   - Performance metrics
   - Analytics
   - Error logs

### Browser Console (for debugging)
- F12 → Console tab
- Check for errors
- View local storage data

---

## 🔄 **Updating Your Application**

To deploy new changes:

1. Make changes to code
2. Push to GitHub: `git push origin main`
3. Vercel auto-deploys (30 seconds)
4. Changes live at https://williambonacfitnesstemple.com

No manual deployment needed!

---

## 💾 **Data Backup**

All data is stored in browser localStorage.

### Manual Backup
1. Open browser console (F12)
2. Run: `copy(JSON.stringify(localStorage))`
3. Save to text file

### Automated Backup (Recommended)
1. Export entrance logs regularly
2. Save CSV files
3. Archive monthly

---

## 🆘 **Troubleshooting**

### Domain not working
- Check DNS records in registrar
- DNS can take 5-30 minutes
- Clear browser cache
- Try incognito window

### Site shows old version
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Clear browser cache
- Check Vercel deployment status

### QR Scanner not working
- Check camera permissions
- Use HTTPS (automatic on Vercel)
- Try different browser
- Use manual entry fallback

### Can't login
- Default: `admin` / `fitness123`
- Clear cookies and cache
- Try incognito window
- Reset password if forgotten

---

## 🔒 **Security Recommendations**

✅ **Essential:**
1. Change default admin password immediately
2. Create individual staff accounts
3. Don't share login credentials
4. Use strong passwords (min 8 chars)
5. Regularly review staff access

✅ **Best Practices:**
1. Regular backups of entrance logs
2. Monitor failed login attempts
3. Update staff roles as needed
4. Review attendance reports weekly
5. Test password reset functionality

---

## 📞 **Support**

**For Vercel Support:**
- https://vercel.com/support
- vercel@vercel.com

**For Domain Issues:**
- Contact your domain registrar
- Check DNS propagation at: https://dnschecker.org

**For Application Issues:**
- Review browser console (F12)
- Check localStorage for data
- Verify camera permissions
- Try different browser

---

## ✨ **Congratulations!**

Your WILLIAM BONAC FITNESS TEMPLE CRM is now live and ready to use!

📍 **Website:** https://williambonacfitnesstemple.com

Enjoy managing your gym with this professional system! 🏋️

---

**Last Updated:** June 11, 2026