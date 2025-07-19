// tests/historial.spec.js
const { test, expect } = require('@playwright/test');

test.describe('Calculadora E2E - Pruebas de Historial', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('El historial debe registrar operaciones correctas', async ({ page }) => {
    // Realizar varias operaciones
    await page.fill('#input1', '5');
    await page.fill('#input2', '3');
    await page.selectOption('#operacion', 'suma');
    await page.click('#calcular');
    
    await page.click('#limpiar');
    
    await page.fill('#input1', '10');
    await page.fill('#input2', '2');
    await page.selectOption('#operacion', 'multiplicacion');
    await page.click('#calcular');
    
    // Verificar que el historial contiene las operaciones
    const historialItems = page.locator('#historial-lista li');
    await expect(historialItems).toHaveCount(2);
    
    // La operación más reciente debe aparecer primero
    await expect(historialItems.first()).toContainText('10 × 2 = 20');
    await expect(historialItems.nth(1)).toContainText('5 + 3 = 8');
  });

  test('El historial debe registrar errores', async ({ page }) => {
    // Generar un error
    await page.fill('#input1', '10');
    await page.fill('#input2', '0');
    await page.selectOption('#operacion', 'division');
    await page.click('#calcular');
    
    // Verificar que el error aparece en el historial
    const historialItems = page.locator('#historial-lista li');
    await expect(historialItems.first()).toContainText('Error: No se puede dividir entre cero');
  });

  test('Limpiar historial debe vaciar la lista', async ({ page }) => {
    // Realizar una operación
    await page.fill('#input1', '7');
    await page.fill('#input2', '3');
    await page.selectOption('#operacion', 'suma');
    await page.click('#calcular');
    
    // Verificar que hay una entrada en el historial
    await expect(page.locator('#historial-lista li')).toHaveCount(1);
    
    // Limpiar historial
    await page.click('#limpiar-historial');
    
    // Verificar que el historial está vacío
    await expect(page.locator('#historial-lista li')).toHaveCount(0);
  });

  test('El historial debe mostrar timestamps', async ({ page }) => {
    await page.fill('#input1', '4');
    await page.fill('#input2', '4');
    await page.selectOption('#operacion', 'suma');
    await page.click('#calcular');
    
    // Verificar que la entrada del historial incluye timestamp (formato AM/PM)
    const historialItem = page.locator('#historial-lista li').first();
    await expect(historialItem).toContainText(/\[\d{1,2}:\d{2}:\d{2} (AM|PM)\]/); // Formato [H:MM:SS AM/PM]
  });

});
