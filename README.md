# WILLIAM BONAC FITNESS TEMPLE CRM

🏋️ **A Professional Gym Management System**

Built with ❤️ by **Simon Addai Boakye**

---

## 🌐 Live Application
**Website:** https://williambonacfitnesstemple.com  
**Entrance Portal:** https://williambonacfitnesstemple.com/entrance.html  
**QR Generator:** https://williambonacfitnesstemple.com/qr-generator.html

---

## ✨ Features

### 🔐 **Authentication & Access Control**
- Secure admin login
- Staff self-registration with security questions
- Password reset functionality
- Role-based access (Admin, Staff, Sales)
- Session management

### 👥 **Client Management**
- Manual client registration
- CSV bulk import
- Membership types: Registration, Monthly, 3-Month, 6-Month, Yearly
- Payment tracking (MoMo, Bank Card)
- Automatic expiry calculation
- Real-time membership status
- Phone contact tracking

### 🚪 **Door Access Control**
- QR code scanning at entrance
- Manual name-based lookup
- Real-time membership verification
- Instant access grant/deny
- Entry/exit logging
- Duration tracking

### 📊 **Entrance Portal & Analytics**
- Live entrance dashboard
- Real-time client entry tracking
- Hourly traffic analytics
- Peak time identification
- Daily entry statistics
- Recent entries log
- Current occupancy tracking

### 🎫 **QR Code Management**
- Single QR code generation
- Bulk QR code generation for all clients
- Print-friendly ID cards
- Unique QR per client (ClientID:ClientName)
- Professional card layout

### ⏱️ **Attendance Tracking**
- Real-time check-in/check-out
- Duration calculation
- Daily attendance reports
- Attendance summary
- Historical tracking

### 💧 **Water Sales Tracking**
- Small bottle (3 GH₵)
- Medium bottle (5 GH₵)
- Large bottle (8 GH₵)
- Payment method tracking

### 📦 **Inventory Management**
- Add items with prices
- Track inventory
- Sales history

### 💰 **Revenue Dashboard** (Admin Only)
- Daily revenue calculation
- Visual charts
- Financial reports

### 📱 **Progressive Web App (PWA)**
- Works offline and online
- Installable on mobile and desktop
- Service Worker enabled
- Branded icons (192px, 512px, Apple Touch)
- Fast loading

### 🔔 **Notifications & Alerts**
- Membership expiry reminders (3 days before)
- Entry status notifications
- Real-time access alerts
- Successful check-in confirmations

---

## 🚀 **Getting Started**

### **Prerequisites**
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (or offline with PWA)
- Mobile device or tablet (for entrance portal)

### **Access the Application**

#### Main Dashboard
1. Go to https://williambonacfitnesstemple.com
2. Login with credentials:
   - **Username:** `admin`
   - **Password:** `fitness123`
3. Create staff accounts via "Sign Up as Staff"

#### Entrance Portal
1. Go to https://williambonacfitnesstemple.com/entrance.html
2. Click "Start Scanner"
3. Scan client QR codes or use manual entry

#### QR Code Generator
1. Go to https://williambonacfitnesstemple.com/qr-generator.html
2. Generate QR codes for clients
3. Print and distribute

---

## 📖 **How to Use**

### **1. Register a New Client**
1. Login to dashboard
2. Go to "Clients" section
3. Fill in client details:
   - Name
   - Phone number
   - Membership type
   - Payment method
4. Click "Add Client"
5. Client membership expiry is auto-calculated

### **2. Generate QR Codes**
1. Go to QR Generator page
2. Click "Generate QR for All Clients"
3. Print client ID cards
4. Distribute to members

### **3. Client Entry at Door**
1. Open Entrance Portal on tablet
2. Click "Start Scanner"
3. Client scans their QR code
4. System verifies membership:
   - ✅ Active → Instant check-in
   - ❌ Expired → Access denied
5. Dashboard updates automatically

### **4. Manual Check-In (if QR fails)**
1. Use "Manual Entry" section
2. Type client name
3. System processes same as QR

### **5. Check Attendance**
1. Go to "Attendance Tracking"
2. View today's entries
3. Click "Check Out" to record exit
4. Duration auto-calculated

### **6. Staff Registration**
1. Click "Sign Up as Staff"
2. Fill all details:
   - Full Name
   - Email
   - Username
   - Password (min 6 chars)
   - Security Question & Answer
   - Role (Staff or Sales)
3. Click "Sign Up"
4. Login with new credentials

### **7. Password Reset**
1. Click "Forgot Password?"
2. Enter username and email
3. Answer security question
4. Create new password
5. Login with new password

---

## 🔐 **Security Features**

✅ **Authentication**
- Username/password login
- Security questions for password recovery
- Role-based access control
- Session management

✅ **Data Protection**
- Local storage encryption (browser-based)
- No server exposure
- HTTPS enforced
- Cache control headers
- Frame options protection

✅ **Access Control**
- Admin-only sections
- Staff permissions
- Sales-specific access
- Membership verification

---

## 📱 **Device Compatibility**

| Device | Support | Best For |
|--------|---------|----------|
| Desktop | ✅ Full | Dashboard & Reports |
| Tablet | ✅ Full | Entrance Portal |
| Mobile | ✅ Full | Admin, Staff Access |
| iOS | ✅ PWA | Installation as App |
| Android | ✅ PWA | Installation as App |

---

## 🛠️ **Tech Stack**

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Storage:** Browser LocalStorage (client-side)
- **PWA:** Service Worker, Manifest.json
- **QR Codes:** QRCode.js library
- **Deployment:** Vercel (serverless)
- **Version Control:** Git & GitHub

---

## 📊 **Data Management**

All data is stored locally in your browser:
- **Client Database** - Member information
- **Staff Database** - User accounts & credentials
- **Entrance Log** - Entry/exit records
- **Attendance Records** - Check-in/check-out times

### **Data Backup**
1. Export attendance records from entrance portal
2. Manually download from browser console
3. Regular backups recommended

---

## 🌐 **Hosting & Deployment**

**Platform:** Vercel (serverless)
- Automatic deployment from GitHub
- Global CDN
- Fast loading times
- HTTPS enabled
- Custom domain support

**Deploy New Changes:**
1. Push code to GitHub
2. Vercel auto-deploys
3. Live in seconds

---

## 📝 **License**

© 2026 **Simon Addai Boakye**. All rights reserved.

This project is proprietary software. Unauthorized copying, modification, or distribution is strictly prohibited.

Permission granted to William Bonac Fitness Temple staff and authorized users only.

---

## 👨‍💻 **Developer**

**Simon Addai Boakye**
- GitHub: https://github.com/addaiboakye1
- Project: William Bonac Fitness Temple CRM

---

## 📞 **Support & Troubleshooting**

### **Common Issues**

**❓ QR Scanner not working**
- Check camera permissions
- Ensure good lighting
- Use manual entry as fallback

**❓ Data not saving**
- Check browser storage space
- Clear browser cache and refresh
- Try different browser

**❓ Can't login**
- Check username spelling
- Verify password (case-sensitive)
- Use password reset function

**❓ Membership status not updating**
- Data updates in real-time
- Refresh page if needed
- Check system time

---

## 🚀 **Future Enhancements**

- Backend database integration
- SMS notifications
- Email reminders
- Advanced reporting
- Mobile app version
- Payment integration
- Trainer management
- Class scheduling

---

## 📈 **Version History**

**v1.0.0** - Initial Release (June 2026)
- Complete CRM system
- QR code scanning
- Attendance tracking
- Entrance portal
- Staff management
- PWA support

---

**Last Updated:** June 11, 2026

🎉 **Thank you for using WILLIAM BONAC FITNESS TEMPLE CRM!**