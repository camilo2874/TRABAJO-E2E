// playwright.config.js
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  /* Configuración de tiempo máximo para cada prueba */
  timeout: 30 * 1000,
  expect: {
    /* Tiempo máximo para expects */
    timeout: 5000
  },
  /* Falla rápidamente en CI si alguna prueba falla */
  fullyParallel: true,
  /* Prohibir pruebas en paralelo en CI para debugging */
  forbidOnly: !!process.env.CI,
  /* Reintentos en CI */
  retries: process.env.CI ? 2 : 0,
  /* Configuración de workers */
  workers: process.env.CI ? 1 : undefined,
  /* Configuración de reportes */
  reporter: 'html',
  /* Configuración global para todos los proyectos */
  use: {
    /* URL base para usar en actions como `await page.goto('/')` */
    baseURL: 'http://localhost:3000',
    /* Capturar screenshots solo en fallas */
    screenshot: 'only-on-failure',
    /* Capturar videos solo en fallas */
    video: 'retain-on-failure',
  },

  /* Configurar proyectos para múltiples navegadores */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  /* Servidor de desarrollo local */
  webServer: {
    command: 'npm run serve',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
