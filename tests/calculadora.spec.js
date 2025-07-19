// tests/calculadora.spec.js
const { test, expect } = require('@playwright/test');

test.describe('Calculadora E2E - Pruebas Básicas', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navegar a la página de la calculadora antes de cada prueba
    await page.goto('/');
    
    // Verificar que la página se cargó correctamente
    await expect(page).toHaveTitle('Calculadora E2E');
    await expect(page.locator('h1')).toHaveText('Calculadora E2E');
  });

  test('Debe cargar la página correctamente', async ({ page }) => {
    // Verificar que todos los elementos principales están presentes
    await expect(page.locator('#input1')).toBeVisible();
    await expect(page.locator('#input2')).toBeVisible();
    await expect(page.locator('#operacion')).toBeVisible();
    await expect(page.locator('#calcular')).toBeVisible();
    await expect(page.locator('#limpiar')).toBeVisible();
    await expect(page.locator('#resultado')).toBeVisible();
    
    // Verificar estado inicial
    await expect(page.locator('#resultado')).toHaveText('-');
    await expect(page.locator('#calcular')).toBeDisabled();
  });

  test('Suma: 5 + 3 = 8', async ({ page }) => {
    // Llenar los campos
    await page.fill('#input1', '5');
    await page.fill('#input2', '3');
    await page.selectOption('#operacion', 'suma');
    
    // Verificar que el botón se habilita
    await expect(page.locator('#calcular')).toBeEnabled();
    
    // Hacer clic en calcular
    await page.click('#calcular');
    
    // Verificar el resultado
    await expect(page.locator('#resultado')).toHaveText('8');
    await expect(page.locator('#display')).toHaveValue('5 + 3 = 8');
  });

  test('Resta: 10 - 4 = 6', async ({ page }) => {
    await page.fill('#input1', '10');
    await page.fill('#input2', '4');
    await page.selectOption('#operacion', 'resta');
    
    await page.click('#calcular');
    
    await expect(page.locator('#resultado')).toHaveText('6');
    await expect(page.locator('#display')).toHaveValue('10 - 4 = 6');
  });

  test('Multiplicación: 7 × 6 = 42', async ({ page }) => {
    await page.fill('#input1', '7');
    await page.fill('#input2', '6');
    await page.selectOption('#operacion', 'multiplicacion');
    
    await page.click('#calcular');
    
    await expect(page.locator('#resultado')).toHaveText('42');
    await expect(page.locator('#display')).toHaveValue('7 × 6 = 42');
  });

  test('División: 15 ÷ 3 = 5', async ({ page }) => {
    await page.fill('#input1', '15');
    await page.fill('#input2', '3');
    await page.selectOption('#operacion', 'division');
    
    await page.click('#calcular');
    
    await expect(page.locator('#resultado')).toHaveText('5');
    await expect(page.locator('#display')).toHaveValue('15 ÷ 3 = 5');
  });

  test('División por cero debe mostrar error', async ({ page }) => {
    await page.fill('#input1', '10');
    await page.fill('#input2', '0');
    await page.selectOption('#operacion', 'division');
    
    await page.click('#calcular');
    
    // Verificar que se muestra el error
    await expect(page.locator('#resultado')).toContainText('Error: No se puede dividir entre cero');
    await expect(page.locator('#display')).toHaveValue(/Error: No se puede dividir entre cero/);
  });

  test('Validación de campos vacíos', async ({ page }) => {
    // Intentar calcular sin llenar campos
    await expect(page.locator('#calcular')).toBeDisabled();
    
    // Llenar solo un campo
    await page.fill('#input1', '5');
    await expect(page.locator('#calcular')).toBeDisabled();
    
    // Llenar segundo campo pero sin operación
    await page.fill('#input2', '3');
    await expect(page.locator('#calcular')).toBeDisabled();
    
    // Seleccionar operación - ahora debería habilitarse
    await page.selectOption('#operacion', 'suma');
    await expect(page.locator('#calcular')).toBeEnabled();
  });

  test('Función limpiar debe resetear todos los campos', async ({ page }) => {
    // Llenar todos los campos y calcular
    await page.fill('#input1', '8');
    await page.fill('#input2', '2');
    await page.selectOption('#operacion', 'suma');
    await page.click('#calcular');
    
    // Verificar que hay datos
    await expect(page.locator('#resultado')).toHaveText('10');
    
    // Limpiar
    await page.click('#limpiar');
    
    // Verificar que todo se resetea
    await expect(page.locator('#input1')).toHaveValue('');
    await expect(page.locator('#input2')).toHaveValue('');
    await expect(page.locator('#operacion')).toHaveValue('');
    await expect(page.locator('#resultado')).toHaveText('-');
    await expect(page.locator('#display')).toHaveValue('');
    await expect(page.locator('#calcular')).toBeDisabled();
  });

  test('Calcular con Enter (teclado)', async ({ page }) => {
    await page.fill('#input1', '12');
    await page.fill('#input2', '8');
    await page.selectOption('#operacion', 'resta');
    
    // Presionar Enter en lugar de hacer clic
    await page.press('body', 'Enter');
    
    await expect(page.locator('#resultado')).toHaveText('4');
  });

});
