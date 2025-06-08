# 🚀 Advanced Feedback Management App

A modern, feature-rich feedback management application built with React and TypeScript. This app showcases advanced state management, animations, and AI integration.

## ✨ Features

### Core Functionality

- ✍️ Create and manage feedback entries
- 👍👎 Vote system (likes/dislikes)
- 🗑️ Delete feedback entries
- 📱 Responsive design

### Advanced Features

- 🤖 AI-powered feedback generation using OpenAI GPT-3.5
- 🔄 Drag-n-drop reordering with smooth animations
- 📊 Weekly statistics dashboard
- 🔍 Smart filtering system:
  - All feedback
  - Popular items
  - New items (last 24h)
- 📋 Sorting options:
  - By date
  - By popularity (likes)
- 💾 Import/Export functionality
  - Export feedback data as JSON
  - Import from JSON file

### UI/UX Features

- 🎯 Framer Motion animations
- 🎨 Modern gradient buttons
- 🔄 Loading states and indicators
- 👆 Interactive hover effects
- 📱 Mobile-friendly design

## 🛠️ Tech Stack

### Core Technologies

- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool

### State Management

- **React Context API** - Global state
- **useReducer** - State logic
- **Custom Hooks** - State abstraction

### UI Libraries

- **Framer Motion** - Animations
- **@dnd-kit** - Drag and drop functionality
  - Core
  - Sortable
  - Utilities

### AI Integration

- **OpenAI API** - GPT-3.5 for feedback generation

### Styling

- **CSS3**
  - Flexbox
  - Grid
  - Custom animations
  - CSS Variables

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 🔑 API Keys

To use the AI feedback generation feature, you'll need an OpenAI API key:

1. Get your API key from [OpenAI](https://platform.openai.com)
2. Click the "Generate AI Feedback" button
3. Enter your API key when prompted

## 🎯 Usage

### Basic Operations

- Add feedback using the form
- Vote using 👍/👎 buttons
- Delete using the delete button
- Drag and drop to reorder items

### AI Generation

- Click "Generate AI Feedback"
- Get randomly generated feedback with:
  - Realistic text
  - Random likes/dislikes
  - Automatic timestamps

### Data Management

- Export your data anytime
- Import previously saved data
- Auto-save functionality

## 🎨 Customization

The app uses CSS variables for easy theming. Main style configurations can be found in `App.css`.

## 📱 Responsive Design

The app is fully responsive and works great on:

- 💻 Desktop
- 📱 Mobile
- 📟 Tablet

## 🔧 Development Features

- TypeScript for type safety
- Modern React patterns
- Custom hooks
- Reusable components
- Performance optimizations

## Try yourself!

You can find dataExample.json file in the front directory and import the examples data to check it out yourself!
