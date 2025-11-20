# 🚀 Portfolio Dashboard Application

This application is a financial dashboard built with **Next.js** and styled using **Tailwind CSS**. It fetches portfolio data using a **Mock Service Worker (MSW)** setup, allowing the application to be fully functional without relying on a real backend API during development.

## 💻 1. Installation

To get the project running locally, follow these steps.

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (version 18 or higher) and [npm](https://www.npmjs.com/) (or [Yarn/pnpm](https://pnpm.io/)) installed.

### Clone and Install Dependencies

1.  `git clone \[YOUR_REPOSITORY_URL\]cd \[PROJECT_FOLDER_NAME\]`
2.  ` npm install` or `yarn install` or `pnpm install`

## ▶️ 2. Running the Application

### Development Mode

Start the Next.js development server. This server automatically integrates the Mock Service Worker (MSW) to provide mock API data.

` npm run dev `

The application will be accessible at: **http://localhost:3000**

## ⚙️ 3. Key Technical Details

### Authentication & Routing

- The application uses client-side state for authentication, redirecting traffic from the root path (/).

  - **Unauthenticated** users are sent to /login.
  - **Authenticated** users are sent to /dashboard.

- **Credentials:** Use the following hardcoded credentials to log in:

  - **Username:** vega
  - **Password:** portfolio123

### Mocking Layer (MSW)

The application uses **Mock Service Worker (MSW)** to intercept all data fetching calls in development.

- **Data Source:** Mock data is located in src/mocks/data.ts.
- **Handler Logic:** API routing logic (e.g., filtering historical prices) is handled in src/mocks/handlers.ts.

## 🎨 4. White Labeling Instructions

The application is fully white-label ready, allowing the entire theme's primary color to be changed by modifying a single file.

### How to Change the Primary Theme Color

All primary colors (buttons, chart strokes, focus rings) are derived from custom CSS variables defined as global styles.

1.  All primary colors (buttons, chart strokes, focus rings) are derived from the custom properties defined in **src/app/globals.css**.
2.  Locate the primary color definitions under `:root`. These values are in RGB format (e.g., `59 130 246` for blue-500).

```css
:root {
  /* ... other variables ... */
  --color-primary-500: 59 130 246; /* Base color */
  --color-primary-600: 37 99 235; /* Darker shade */
  /* ... */
}
```

3.  **Example:**

Example: To change the theme from Blue to Green, you would update the values:

```css
--color-primary-500: 34 197 94; /* Green-500 RGB */
--color-primary-600: 22 163 74; /* Green-600 RGB */
```

4.  Save the file. Tailwind CSS will automatically recompile and apply the new primary color across all themed components.
