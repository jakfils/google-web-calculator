# Google Web Calculator (Next.js)

## Overview

The **Google Web Calculator** is a responsive, feature-rich calculator application built with **Next.js**, **TypeScript**, and **Tailwind CSS**. It replicates the functionality of Google's web calculator. The app supports both basic arithmetic and complex mathematical operations with a clean, intuitive interface.

🔗 **Live Demo:** [https://google-web-calculator.vercel.app/](https://google-web-calculator.vercel.app/)

---

## Features

### 🧮 **Basic Operations**

- **Arithmetic:** `+`, `-`, `×`, `÷`
- **Percentage calculations** (`%`)
- **Decimal input** (`.`)
- **Parentheses** (`( )`) for complex expressions
- **Clear (AC)** and **backspace** functionality

### 🔬 **Advanced Scientific Functions**

- **Trigonometry:** `sin`, `cos`, `tan` (supports **Deg/Rad** modes)
- **Inverse Trigonometry:** `asin`, `acos`, `atan`
- **Logarithms:** `log` (base 10), `ln` (natural log)
- **Exponents:** `e^x`, `10^x`, `x^y`
- **Roots:** `√x` (square root), `∛x` (nth root)
- **Constants:** `π` (Pi), `e` (Euler’s number)
- **Random number generator** (`Rnd`)
- **Factorial** (`x!`)
- **Answer memory** (`Ans`)

### 🎨 **UI & UX Features**

- **Responsive design** (mobile & desktop optimized)
- **Toggle between basic & scientific modes** (mobile)
- **Degree/Radian mode** for trigonometric functions
- **Inverse function toggle** (`Inv`)
- **Cursor-aware editing** (precise expression modification)
- **Error handling** (invalid expressions show "Error")
- **Clean display** (shows both input expression and result)
- **Automatic dark/light mode** (adapts to system theme)

---

## 🛠️ Technical Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Math Evaluation:** `math.js`
- **Icons:** `react-icons`
- **Deployment:** Vercel

---

## 🚀 Installation & Local Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/jakfils/google-web-calculator.git
   cd google-web-calculator
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open in browser:**  
   Visit `http://localhost:3000`

---

## 🔍 Key Implementation Details

### **State Management**

- Uses React’s `useState` for:
  - Current expression
  - Result
  - Cursor position
  - Degree/Radian mode
  - FX (scientific mode) toggle on mobile

### **Dark/Light Mode**

- Automatically detects system color scheme (dark/light)

### **Math Evaluation**

- Safely evaluates expressions using `math.js` (`evaluate` function)
- Handles errors (e.g., division by zero, imaginary numbers)

### **Cursor & Editing Logic**

- Tracks cursor position for precise insertion/deletion
- Smart handling of parentheses and functions

### **Responsive Design**

- Mobile-friendly layout with a toggle between **basic** and **scientific** modes
- Desktop shows all buttons at once

---

## 🎮 How to Use

### **Basic Mode (Mobile/Desktop)**

1. Enter numbers (`0-9`) and operators (`+`, `-`, `×`, `÷`).
2. Use `( )` for complex expressions.
3. Press `=` to compute the result.

### **Scientific Mode (Toggle with "FX" on mobile)**

- **Trigonometric Functions:** `sin`, `cos`, `tan` (switch between **Deg/Rad**)
- **Inverse Functions:** Press `Inv` to access `sin⁻¹`, `cos⁻¹`, etc.
- **Logs & Exponents:** `ln`, `log`, `e^x`, `10^x`
- **Roots & Powers:** `√x`, `x²`, `x^y`

---

## ⚠️ Known Limitations

- ❌ **No support for complex numbers** (shows "Error").
- ❌ **No keyboard input** (click/touch only).
- ❌ **No calculation history** (planned feature).

---

## 📜 License

MIT License – Free to use, modify, and distribute.

---

## ✨ Credits

Developed as a showcase of **Next.js + TypeScript** skills, inspired by Google’s web calculator.

🚀 **Try it now:** [https://google-web-calculator.vercel.app/](https://google-web-calculator.vercel.app/)
