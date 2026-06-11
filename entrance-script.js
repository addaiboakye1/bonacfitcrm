// Get references to shared databases
let clientDatabase = JSON.parse(localStorage.getItem('clientDatabase')) || [];
let entranceLog = JSON.parse(localStorage.getItem('entranceLog')) || [];

// QR Scanner variables
let scanner = null;
let canvasElement = null;
let isScanning = false;

// ==================== INITIALIZATION ====================

document.addEventListener('DOMContentLoaded', function() {
  updateCurrentTime();
  setInterval(updateCurrentTime, 1000);
  
  displayDashboard();
  setInterval(displayDashboard, 5000); // Update every 5 seconds
  
  setupEventListeners();
});

function updateCurrentTime() {
  const now = new Date();
  document.getElementById('currentTime').innerText = now.toLocaleString();
}

function setupEventListeners() {
  document.getElementById('startScanner').addEventListener('click', startQRScanner);
  document.getElementById('stopScanner').addEventListener('click', stopQRScanner);
  document.getElementById('manualEntryForm').addEventListener('submit', handleManualEntry);
  document.getElementById('closePopup').addEventListener('click', closePopup);
}

// ==================== QR CODE SCANNER ====================

function startQRScanner() {
  isScanning = true;
  scanner = document.getElementById('scanner');
  canvasElement = document.getElementById('canvas');
  
  document.getElementById('startScanner').style.display = 'none';
  document.getElementById('stopScanner').style.display = 'block';
  
  // Request camera access
  navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
    .then(function(stream) {
      scanner.srcObject = stream;
      scanner.play();
      scanQRCode();
    })
    .catch(function(err) {
      alert('Cannot access camera. Please check permissions.');
      stopQRScanner();
    });
}

function stopQRScanner() {
  isScanning = false;
  if (scanner && scanner.srcObject) {
    const tracks = scanner.srcObject.getTracks();
    tracks.forEach(track => track.stop());
  }
  document.getElementById('startScanner').style.display = 'block';
  document.getElementById('stopScanner').style.display = 'none';
}

function scanQRCode() {
  if (!isScanning) return;

  const canvas = canvasElement.getContext('2d');
  canvasElement.width = scanner.videoWidth;
  canvasElement.height = scanner.videoHeight;
  
  canvas.drawImage(scanner, 0, 0, canvasElement.width, canvasElement.height);
  
  const imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
  const code = jsQR(imageData.data, imageData.width, imageData.height);
  
  if (code) {
    processScannedData(code.data);
    stopQRScanner();
  } else {
    requestAnimationFrame(scanQRCode);
  }
}

function processScannedData(data) {
  // QR data format: clientID:clientName
  const parts = data.split(':');
  const clientId = parseInt(parts[0]);
  
  const foundClient = clientDatabase.find(c => c.id === clientId);
  
  if (foundClient) {
    processClientEntry(foundClient);
  } else {
    showScanResult('error', '❌ Client Not Found', 'The scanned QR code does not match any registered client.');
  }
}

function showScanResult(type, title, message) {
  const resultDiv = document.getElementById('scanResult');
  resultDiv.innerHTML = `
    <div class="scan-result-${type}">
      <h3>${title}</h3>
      <p>${message}</p>
    </div>
  `;
  resultDiv.style.display = 'block';
  
  setTimeout(() => {
    resultDiv.style.display = 'none';
  }, 5000);
}

// ==================== MANUAL ENTRY ====================

function handleManualEntry(e) {
  e.preventDefault();
  const clientName = document.getElementById('manualClientName').value.toLowerCase();
  const foundClient = clientDatabase.find(c => c.name.toLowerCase().includes(clientName));
  
  if (foundClient) {
    processClientEntry(foundClient);
    document.getElementById('manualEntryForm').reset();
  } else {
    document.getElementById('manualMessage').innerText = '❌ Client not found. Please check the name.';
    document.getElementById('manualMessage').style.color = '#d32f2f';
  }
}

// ==================== PROCESS CLIENT ENTRY ====================

function processClientEntry(client) {
  const isActive = new Date(client.expiryDate) > new Date();
  const now = new Date();
  const daysLeft = Math.ceil((new Date(client.expiryDate) - now) / (1000 * 60 * 60 * 24));

  if (!isActive) {
    // Membership expired
    showEntryPopup('denied', client, 'Membership Expired', `This membership expired on ${client.expiryDate}. Client must renew.`);
    return;
  }

  // Check if already in facility (not checked out yet today)
  const todayDate = now.toISOString().split('T')[0];
  const existingEntry = entranceLog.find(e => 
    e.clientId === client.id && 
    e.date === todayDate && 
    !e.checkOutTime
  );

  if (existingEntry) {
    showEntryPopup('warning', client, 'Already Inside', `${client.name} is already inside the facility.`);
    return;
  }

  // Create entrance log entry
  const entryRecord = {
    id: Date.now(),
    clientId: client.id,
    clientName: client.name,
    phone: client.phone,
    membership: client.membership,
    entryTime: now.toLocaleString(),
    checkOutTime: null,
    duration: null,
    date: todayDate,
    method: 'scanned'
  };

  entranceLog.push(entryRecord);
  localStorage.setItem('entranceLog', JSON.stringify(entranceLog));

  // Show success popup
  showEntryPopup('granted', client, 'Entry Granted ✅', `Welcome ${client.name}! Duration: ${daysLeft} days valid`);
  
  displayDashboard();
}

function showEntryPopup(type, client, title, message) {
  const popup = document.getElementById('entryPopup');
  const popupBody = document.getElementById('popupBody');
  
  let typeEmoji = type === 'granted' ? '✅' : type === 'denied' ? '❌' : '⚠️';
  let backgroundColor = type === 'granted' ? '#4caf50' : type === 'denied' ? '#d32f2f' : '#ff9800';
  
  popupBody.innerHTML = `
    <div class="popup-header" style="background: ${backgroundColor};">
      <h2>${typeEmoji} ${title}</h2>
    </div>
    <div class="popup-details">
      <p><strong>Name:</strong> ${client.name}</p>
      <p><strong>Phone:</strong> ${client.phone}</p>
      <p><strong>Membership:</strong> ${client.membership}</p>
      <p><strong>Expiry:</strong> ${client.expiryDate}</p>
      <p style="margin-top: 15px; font-size: 16px; font-weight: bold;">${message}</p>
    </div>
  `;
  
  popup.style.display = 'flex';
  
  // Auto close after 4 seconds
  setTimeout(() => {
    popup.style.display = 'none';
  }, 4000);
}

function closePopup() {
  document.getElementById('entryPopup').style.display = 'none';
}

// ==================== DASHBOARD & ANALYTICS ====================

function displayDashboard() {
  const today = new Date().toISOString().split('T')[0];
  const todayEntries = entranceLog.filter(e => e.date === today);
  
  // Total Entries
  document.getElementById('totalEntries').innerText = todayEntries.length;
  
  // Currently Inside
  const currentlyInside = todayEntries.filter(e => !e.checkOutTime).length;
  document.getElementById('currentlyInside').innerText = currentlyInside;
  
  // Average Duration
  const completedEntries = todayEntries.filter(e => e.checkOutTime && e.duration);
  if (completedEntries.length > 0) {
    const totalMinutes = completedEntries.reduce((sum, e) => {
      const parts = e.duration.match(/(\d+)h\s*(\d+)m/);
      if (parts) {
        return sum + (parseInt(parts[1]) * 60 + parseInt(parts[2]));
      }
      return sum;
    }, 0);
    const avgMinutes = Math.round(totalMinutes / completedEntries.length);
    const hours = Math.floor(avgMinutes / 60);
    const minutes = avgMinutes % 60;
    document.getElementById('avgDuration').innerText = `${hours}h ${minutes}m`;
  }
  
  // Hourly Analytics
  displayHourlyChart(todayEntries);
  
  // Recent Entries Log
  displayEntriesLog(todayEntries);
}

function displayHourlyChart(entries) {
  const hourlyData = {};
  
  // Initialize all hours
  for (let i = 0; i < 24; i++) {
    hourlyData[i] = 0;
  }
  
  // Count entries by hour
  entries.forEach(entry => {
    const time = new Date(entry.entryTime);
    const hour = time.getHours();
    hourlyData[hour]++;
  });
  
  // Find max count for scaling
  const maxCount = Math.max(...Object.values(hourlyData), 1);
  
  let chartHTML = '<div class="hourly-bars">';
  for (let i = 0; i < 24; i++) {
    const count = hourlyData[i];
    const height = (count / maxCount) * 100;
    const isCurrentHour = new Date().getHours() === i ? ' current' : '';
    chartHTML += `
      <div class="hour-bar${isCurrentHour}">
        <div class="bar-fill" style="height: ${height}%;"></div>
        <span class="hour-label">${i}:00</span>
        <span class="hour-count">${count}</span>
      </div>
    `;
  }
  chartHTML += '</div>';
  
  document.getElementById('hourlyChart').innerHTML = chartHTML;
}

function displayEntriesLog(entries) {
  const logDiv = document.getElementById('entriesLog');
  
  if (entries.length === 0) {
    logDiv.innerHTML = '<p class="no-data">No entries yet today</p>';
    return;
  }
  
  // Show last 10 entries in reverse order
  const recentEntries = entries.slice(-10).reverse();
  
  let logHTML = '<table class="log-table"><tbody>';
  recentEntries.forEach(entry => {
    const status = entry.checkOutTime ? '✅ Out' : '🟢 In';
    const statusClass = entry.checkOutTime ? 'status-out' : 'status-in';
    logHTML += `
      <tr>
        <td><strong>${entry.clientName}</strong></td>
        <td>${entry.entryTime}</td>
        <td><span class="${statusClass}">${status}</span></td>
      </tr>
    `;
  });
  logHTML += '</tbody></table>';
  
  logDiv.innerHTML = logHTML;
}

// ==================== EXPORT & REPORTING ====================

function exportDailyReport() {
  const today = new Date().toISOString().split('T')[0];
  const todayEntries = entranceLog.filter(e => e.date === today);
  
  let report = `ENTRANCE REPORT - ${today}\n`;
  report += `Total Entries: ${todayEntries.length}\n`;
  report += `Currently Inside: ${todayEntries.filter(e => !e.checkOutTime).length}\n\n`;
  report += `CLIENT ENTRIES:\n`;
  report += `Name\tEntry Time\tExit Time\tDuration\n`;
  
  todayEntries.forEach(entry => {
    report += `${entry.clientName}\t${entry.entryTime}\t${entry.checkOutTime || '-'}\t${entry.duration || '-'}\n`;
  });
  
  // Download as text file
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(report));
  element.setAttribute('download', `entrance_report_${today}.txt`);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}