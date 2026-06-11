# API Reference & Integration Guide
## WILLIAM BONAC FITNESS TEMPLE CRM

---

## 🔍 **Local Storage Structure**

All data is stored in browser's localStorage. Access via JavaScript:

### **1. Client Database**
```javascript
let clientDatabase = JSON.parse(localStorage.getItem('clientDatabase'));
```

**Structure:**
```json
{
  "id": 1623456789,
  "name": "John Doe",
  "phone": "0201234567",
  "membership": "monthly",
  "amount": 200,
  "paymentMethod": "momo",
  "expiryDate": "2026-07-11",
  "registeredBy": "admin",
  "registeredAt": "2026-06-11T10:30:00Z",
  "isActive": true
}
```

### **2. Staff Database**
```javascript
let staffDatabase = JSON.parse(localStorage.getItem('staffDatabase'));
```

**Structure:**
```json
{
  "username": {
    "password": "hashed_password",
    "role": "admin",
    "fullName": "Admin User",
    "email": "admin@wbft.com",
    "securityQuestion": "pet",
    "securityAnswer": "admin123",
    "registeredAt": "2026-06-11T10:30:00Z"
  }
}
```

### **3. Entrance Log**
```javascript
let entranceLog = JSON.parse(localStorage.getItem('entranceLog'));
```

**Structure:**
```json
{
  "id": 1623456789,
  "clientId": 1623456789,
  "clientName": "John Doe",
  "phone": "0201234567",
  "membership": "monthly",
  "entryTime": "6/11/2026, 10:30:45 AM",
  "checkOutTime": "6/11/2026, 11:30:45 AM",
  "duration": "1h 0m",
  "date": "2026-06-11",
  "method": "scanned"
}
```

### **4. Attendance Database**
```javascript
let attendanceDatabase = JSON.parse(localStorage.getItem('attendanceDatabase'));
```

**Structure:**
```json
{
  "id": 1623456789,
  "clientId": 1623456789,
  "clientName": "John Doe",
  "phone": "0201234567",
  "checkInTime": "6/11/2026, 10:30:45 AM",
  "checkOutTime": null,
  "duration": null,
  "date": "2026-06-11"
}
```

---

## 🔧 **JavaScript Functions Reference**

### **Client Functions**

#### Add Client
```javascript
// Auto-called when form submitted
// Data saved to localStorage
```

#### Display Clients
```javascript
displayClients(); // Refresh client table
```

#### View Client Details
```javascript
viewClientDetails(clientId); // Show popup with details
```

#### Check Client Access
```javascript
// Form submission triggers verification
// Checks membership status and expiry
```

### **QR Code Functions**

#### Generate QR Code
```javascript
// qr-generator.html
generateSingleQR(clientId);
generateBulkQR();
```

#### QR Data Format
```
Format: {clientID}:{clientName}
Example: 1623456789:John Doe
```

### **Entrance Portal Functions**

#### Start Scanner
```javascript
startQRScanner(); // Activate camera
stopQRScanner();  // Stop camera
scanQRCode();     // Process frames
```

#### Process Entry
```javascript
processClientEntry(client); // Check membership & log entry
processScannedData(data);   // Parse QR code
```

#### Dashboard Update
```javascript
displayDashboard();      // Refresh all stats
displayHourlyChart();    // Update traffic chart
displayEntriesLog();     // Show recent entries
```

#### Check In/Out
```javascript
quickCheckIn(clientName);  // Manual check-in
checkOut(attendanceId);    // Record exit time
```

### **Authentication Functions**

#### Login
```javascript
// Form submission validates against staffDatabase
// Sets currentUserRole and currentUsername
// Shows CRM content
```

#### Register Staff
```javascript
// Creates new staff entry in staffDatabase
// Validates passwords and security answers
// Auto-logs out after success
```

#### Reset Password
```javascript
// 3-step process:
// 1. Verify username/email
// 2. Answer security question
// 3. Set new password
```

---

## 📡 **QR Code Scanner Integration**

### Libraries Used
```html
<!-- QR Code Reader -->
<script src="https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js"></script>

<!-- QR Code Generator -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
```

### Scanner Workflow
```javascript
// 1. Request camera access
navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })

// 2. Capture video frames
video.play();

// 3. Scan for QR code
const code = jsQR(imageData, width, height);

// 4. Process data
processScannedData(code.data);
```

---

## 🔐 **Role-Based Access Control**

### Admin
```javascript
if (currentUserRole === 'admin') {
  // Can access:
  // - All client management
  // - Revenue dashboard
  // - Reports section
  // - Staff management
  // - All analytics
}
```

### Staff
```javascript
if (currentUserRole === 'staff') {
  // Can access:
  // - Door access control
  // - Attendance tracking
  // - Client access check
  // - Water sales
  // - Inventory
}
```

### Sales
```javascript
if (currentUserRole === 'sales') {
  // Can access:
  // - Water sales only
}
```

---

## 📊 **Data Export & Reporting**

### Export Entrance Report
```javascript
exportDailyReport(); // Downloads CSV file
```

**Report Format:**
```
ENTRANCE REPORT - 2026-06-11
Total Entries: 45
Currently Inside: 12

CLIENT ENTRIES:
Name | Entry Time | Exit Time | Duration
```

### Export Client Database
```javascript
// Manual export via console:
downloadJSON('clients.json', clientDatabase);
```

---

## 🌐 **PWA Integration**

### Service Worker
```javascript
// Register in HTML:
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}
```

### Offline Support
- All data stored locally
- Works without internet
- Service Worker caches assets
- Sync when back online

---

## 🔄 **Data Sync Strategy**

### Real-Time Updates
```javascript
// Dashboard updates every 5 seconds
setInterval(displayDashboard, 5000);
```

### localStorage Events
```javascript
window.addEventListener('storage', function(e) {
  // Triggered when data changes in other tabs
  displayClients();
});
```

---

## 🔗 **URL Routing**

### Single Page Application (SPA)
All routes redirect to `index.html` via `vercel.json`:

```
/                 → index.html (Main dashboard)
/entrance.html    → entrance.html (Door control)
/qr-generator.html → qr-generator.html (QR codes)
```

---

## 📱 **Browser APIs Used**

### LocalStorage
```javascript
localStorage.setItem('key', JSON.stringify(data));
let data = JSON.parse(localStorage.getItem('key'));
```

### Camera/Media
```javascript
navigator.mediaDevices.getUserMedia({
  video: { facingMode: 'environment' }
});
```

### Canvas API
```javascript
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.drawImage(video, 0, 0, width, height);
```

### Date/Time
```javascript
new Date().toLocaleString();
new Date().toISOString();
```

---

## 🚀 **Performance Tips**

✅ **Optimize for Speed:**
1. Clear old entrance logs monthly
2. Archive historical data
3. Use browser DevTools to monitor
4. Test on target devices

✅ **Reduce Data Size:**
1. localStorage limit ~10MB
2. Remove old attendance records
3. Archive client photos (if added)
4. Compress exported files

---

## 🔐 **Security Considerations**

⚠️ **localStorage is NOT encrypted**
- Don't store sensitive data
- Use HTTPS always
- Clear data on logout
- Regular data backups

✅ **Best Practices:**
- Use strong passwords
- Change default credentials
- Monitor access logs
- Regular security reviews

---

## 📝 **Extending the Application**

### Add New Field to Client
1. Update HTML form
2. Modify storage structure
3. Update display functions
4. Test thoroughly

### Add New Role
1. Update roleSelect in HTML
2. Add role check in setupRolePermissions()
3. Control which sections display
4. Test permissions

### Add New Page
1. Create new `.html` file
2. Link from navigation
3. Import shared script.js
4. Use same localStorage access

---

**Version:** 1.0.0  
**Last Updated:** June 11, 2026