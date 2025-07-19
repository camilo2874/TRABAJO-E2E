// tests/casos-extremos.spec.js
const { test, expect } = require('@playwright/test');

test.describe('Calculadora E2E - Casos Extremos', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Números decimales', async ({ page }) => {
    await page.fill('#input1', '3.14');
    await page.fill('#input2', '2.86');
    await page.selectOption('#operacion', 'suma');
    await page.click('#calcular');
    
    // Verificar resultado redondeado
    await expect(page.locator('#resultado')).toHaveText('6');
  });

  test('Números negativos', async ({ page }) => {
    await page.fill('#input1', '-5');
    await page.fill('#input2', '3');
    await page.selectOption('#operacion', 'suma');
    await page.click('#calcular');
    
    await expect(page.locator('#resultado')).toHaveText('-2');
  });

  test('Números muy grandes', async ({ page }) => {
    await page.fill('#input1', '999999');
    await page.fill('#input2', '1');
    await page.selectOption('#operacion', 'suma');
    await page.click('#calcular');
    
    await expect(page.locator('#resultado')).toHaveText('1000000');
  });

  test('División con resultado decimal', async ({ page }) => {
    await page.fill('#input1', '7');
    await page.fill('#input2', '3');
    await page.selectOption('#operacion', 'division');
    await page.click('#calcular');
    
    // 7/3 = 2.333... -> redondeado a 2.33
    await expect(page.locator('#resultado')).toHaveText('2.33');
  });

  test('Cero como primer número', async ({ page }) => {
    await page.fill('#input1', '0');
    await page.fill('#input2', '5');
    await page.selectOption('#operacion', 'multiplicacion');
    await page.click('#calcular');
    
    await expect(page.locator('#resultado')).toHaveText('0');
  });

  test('Validación de entradas no numéricas', async ({ page }) => {
    // Cambiar los inputs a type="text" temporalmente para probar validación
    await page.evaluate(() => {
      document.getElementById('input1').type = 'text';
      document.getElementById('input2').type = 'text';
    });
    
    // Intentar ingresar texto en campos numéricos
    await page.fill('#input1', 'abc');
    await page.fill('#input2', '5');
    await page.selectOption('#operacion', 'suma');
    await page.click('#calcular');
    
    // Debería mostrar error de números válidos
    await expect(page.locator('#resultado')).toContainText('Error: Por favor, ingrese números válidos');
  });

  test('Operaciones múltiples consecutivas', async ({ page }) => {
    // Primera operación
    await page.fill('#input1', '10');
    await page.fill('#input2', '5');
    await page.selectOption('#operacion', 'division');
    await page.click('#calcular');
    await expect(page.locator('#resultado')).toHaveText('2');
    
    // Segunda operación sin limpiar
    await page.fill('#input1', '8');
    await page.fill('#input2', '4');
    await page.selectOption('#operacion', 'resta');
    await page.click('#calcular');
    await expect(page.locator('#resultado')).toHaveText('4');
    
    // Verificar que el historial tiene ambas operaciones
    const historialItems = page.locator('#historial-lista li');
    await expect(historialItems).toHaveCount(2);
  });

});
