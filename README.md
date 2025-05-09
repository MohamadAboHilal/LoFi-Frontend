# LoFi-Frontend

A modern frontend application for streaming LoFi music, built with React, Vite, and Tailwind CSS.

## Features

- **Responsive Design**: Ensures optimal viewing experience across various devices.
- **Fast Development Setup**: Utilizes Vite for rapid development and hot module replacement.
- **Styled with Tailwind CSS and some DaisyUI componenets**: Offers a utility-first approach to styling for quick UI development.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/MohamadAboHilal/LoFi-Frontend.git
   cd LoFi-Frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`.

## Project Structure

```
LoFi-Frontend/
├── public/             # Static assets
├── src/                # Source files
│   ├── components/     # Reusable components
│   ├── assets/         # Images and other assets
│   ├── App.jsx         # Root component
│   └── main.jsx        # Entry point
├── index.html          # HTML template
├── tailwind.config.js  # Tailwind CSS configuration
├── vite.config.js      # Vite configuration
└── package.json        # Project metadata and scripts
```

## Deployment

The application can be deployed using platforms like [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/). Ensure that the build command is set to `npm run build` and the output directory is `dist`.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.
