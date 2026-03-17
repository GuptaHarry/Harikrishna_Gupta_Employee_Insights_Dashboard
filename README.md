# 📊 Employee Insights Dashboard

A React-based employee analytics dashboard demonstrating **data virtualization, camera capture, digital signatures, image processing, and geospatial visualization**.

The application fetches employee data from an API, renders a **virtualized table for performance**, allows **employee verification using photo capture and signature**, generates a **merged audit image**, and provides **analytics through charts and geospatial mapping**.

---

# 🚀 Features

### 1. Employee List with Virtualized Table
- Efficiently renders large datasets
- Only visible rows are mounted in the DOM
- Improves performance for large employee lists

### 2. Employee Verification
Users can:

- Capture a **photo using webcam**
- Provide a **digital signature**
- Generate a **merged audit image**

### 3. Employee Analytics
The analytics page includes:

- **Salary Distribution Chart**
- **Geospatial Employee Map**
- **Audit Image Preview**
  
---

# ⚡ Virtualized Table Implementation

Rendering large datasets can cause performance issues because the browser must maintain many DOM elements.

To solve this, the project implements **manual row virtualization**, where only the rows visible inside the scroll container are rendered.

Instead of rendering hundreds or thousands of rows, the system dynamically renders **only the rows currently in view**.

---

# 🧮 Virtualization Math

Key parameters:


rowHeight = 50px
containerHeight = 500px


The number of rows visible at once is calculated as:


visibleRows = containerHeight / rowHeight


Example:


500 / 50 = 10 rows visible


---

### Scroll Detection

The table listens to the scroll event:


scrollTop = vertical scroll position


Example:


scrollTop = 250px


---

### Start Index Calculation

The first visible row is determined using:


startIndex = Math.floor(scrollTop / rowHeight)


Example:


scrollTop = 250
rowHeight = 50

startIndex = 5


This means row **5** should appear at the top.

---

### Visible Range Calculation

To prevent rendering flicker during fast scrolling, a **buffer** is added.


visibleCount = containerHeight / rowHeight
buffer = 5

endIndex = startIndex + visibleCount + buffer


---

### Row Rendering

Only the visible rows are rendered:


visibleRows = rows.slice(startIndex, endIndex)


This drastically reduces the number of DOM nodes rendered.

---

# 📏 Offset Calculation

Since only a subset of rows is rendered, we must **visually place them in the correct scroll position**.

The full table height is simulated:


totalHeight = rows.length * rowHeight


This ensures the scrollbar behaves as if all rows are present.

---

### Row Positioning

The visible rows are shifted vertically using a CSS transform:


translateY(startIndex * rowHeight)


Example:


startIndex = 5
rowHeight = 50

offset = 250px


This places the first rendered row exactly where row 5 should appear.

---

# 📷 Camera Capture

The application captures employee photos using the browser Media API.


navigator.mediaDevices.getUserMedia()


A frame from the video stream is drawn to a canvas:


canvasContext.drawImage(video)


The image is exported using:


canvas.toDataURL()


---

# ✍️ Signature Capture

Users provide a signature using a drawing canvas.

Mouse events simulate handwriting:


mousedown
mousemove
mouseup


Drawing is implemented using:


ctx.lineTo()
ctx.stroke()


The signature is exported as an image using:


canvas.toDataURL()


---

# 🖼️ Image Merging

The application generates an **audit image** by merging:

- captured photo
- user signature

Both images are drawn onto a new canvas:


ctx.drawImage(photo)
ctx.drawImage(signature)


The merged output is exported as:


canvas.toDataURL()


This merged image is stored in:


localStorage


and displayed on the **analytics dashboard**.

---
# 📊 Salary Distribution Chart (SVG Implementation)

The analytics dashboard includes a **salary distribution chart by city**, implemented using **native SVG elements** instead of external charting libraries.

This approach demonstrates how data visualization can be built directly with browser primitives.

---

## Data Aggregation

Employee salary data is grouped by city before rendering the chart.

Each employee record contains:


emp[0] → Name
emp[1] → Role
emp[2] → City
emp[5] → Salary


Salary values arrive as formatted strings:


"$320,800"


To perform calculations, formatting characters are removed:

const salary = parseInt(emp[5].replace(/[$,]/g,""))

Then salaries are aggregated per city:

employees.forEach(emp => {

  const city = emp[2]
  const salary = parseInt(emp[5].replace(/[$,]/g,""))

  if(!citySalary[city]){
    citySalary[city] = 0
  }

  citySalary[city] += salary

})

Example aggregated structure:


{
Tokyo: 1250000,
Edinburgh: 980000,
New York: 1500000
}

Chart Scaling

To render proportional bars, the largest salary value is determined:

const maxSalary = Math.max(...Object.values(citySalary))

Each city's bar height is calculated relative to this maximum:


barHeight = (citySalary / maxSalary) * chartHeight


This normalizes the chart so the largest city fills the chart height.

---
# 🌍 Geospatial Mapping

Employee locations are visualized using:

- **React Leaflet**
- **OpenStreetMap**

Markers are placed based on the employee's city.

Each marker popup displays:

- Employee's of that city along with their names.
This provides a simple **geospatial overview of employee distribution**.

---

# ⚠️ Known Issue (Intentional Bug)

## Memory Leak in Camera Stream

The `CameraCapture` component starts the webcam using:


navigator.mediaDevices.getUserMedia()


However, the media stream is **not stopped when the component unmounts**.

Because of this, the browser may keep the webcam stream active even after navigating away from the page.

---

### Why This Happens

The `MediaStream` returned by `getUserMedia()` contains active tracks:


MediaStream
 ├── VideoTrack
 └── AudioTrack


**These tracks must be manually stopped using:**


stream.getTracks().forEach(track => track.stop())


Since the cleanup function is intentionally omitted from the React `useEffect` hook, the stream continues running.

---

### Potential Impact

This may cause:

- Webcam remaining active
- Increased CPU usage
- Browser resource leakage

---

### Intended Fix

Add a cleanup function inside `useEffect`:


return () => {
stream.getTracks().forEach(track => track.stop())
}


This bug is intentionally included to demonstrate awareness of **resource lifecycle management in React applications using browser APIs**.

---

# 🛠️ Installation

Install dependencies:


npm install


Run the development server:


npm run dev


The application will run at:


http://localhost:5173


---

# 🧠 Technologies Used

- React
- React Router
- React Leaflet
- HTML Canvas API
- OpenStreetMap
- JavaScript
- Vite

---

# 📌 Key Concepts Demonstrated

- Data Virtualization
- Canvas Image Processing
- Media Device APIs
- React State Management
- Geospatial Visualization
- Performance Optimization

---

# 📄 License

This project is created for demonstration and educational purposes.
