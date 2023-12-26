# Mini App Builder

A simple project using Vite, React, TypeScript, and SWC for drag and dropping presdescribed elements for people who are not into tech but still they can build UI using this elements.

**Current Version:** 1.0.0

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Configuration](#configuration)
- [Scripts](#scripts)
- [Contributing](#contributing)

## Overview

This project is a minimal setup using Vite as the build tool, React as the UI library, TypeScript for type-checking, and SWC as the JavaScript/TypeScript compiler.

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/project-name.git

   ```

2. Navigate to the folder:

   ```bash
    cd project-name

   ```

3. Install dependencies:

```bash
  npm install

```

### Usage

1. Run the development server:

```bash
  npm run dev

```

Open your browser and visit http://localhost:3000 to see the application.

## Folder Structure

- `src`: Contains the source code for the project.
  - `components`: React components.
  - `styles`: Stylesheets (CSS, SCSS, etc.).
  - `App.tsx`: Main React component.
  - `index.tsx`: Entry point of the application.
- `public`: Static assets.

## Configuration

- Vite configuration is in the `vite.config.js` file.
- SWC configuration is in the `swc.config.js` file.
- Additional configuration options for React and TypeScript can be found in their respective configuration files (`tsconfig.json`, `react-app-env.d.ts`).

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the project for production.
- `npm run serve`: Serve the production build locally.
