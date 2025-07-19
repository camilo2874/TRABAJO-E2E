# Calculadora E2E - Proyecto de Pruebas End-to-End

## Descripción

Este proyecto implementa una **calculadora web** con **pruebas automatizadas E2E (End-to-End)** usando **Playwright**. Es ideal para aprender conceptos de testing automatizado, pruebas de interfaz de usuario y validación de flujos completos de aplicación.

## 🚀 Características

### Calculadora Web
- ✅ **Operaciones básicas**: Suma, resta, multiplicación, división
- ✅ **Interfaz intuitiva**: Campos de entrada, selector de operación, botones de acción
- ✅ **Validación en tiempo real**: El botón calcular se habilita solo cuando todos los campos están completos
- ✅ **Manejo de errores**: División por cero, números inválidos
- ✅ **Historial de operaciones**: Registro con timestamps de las últimas 10 operaciones
- ✅ **Función limpiar**: Reset de campos y resultados
- ✅ **Soporte de teclado**: Calcular con Enter
- ✅ **Diseño responsive**: Adaptable a diferentes tamaños de pantalla

### Pruebas E2E
- ✅ **Pruebas básicas**: Verificación de operaciones matemáticas
- ✅ **Pruebas de validación**: Campos vacíos, números inválidos
- ✅ **Pruebas de historial**: Registro y limpieza de operaciones
- ✅ **Casos extremos**: Números decimales, negativos, división con decimales
- ✅ **Múltiples navegadores**: Chrome, Firefox, Safari (WebKit)
- ✅ **Reportes HTML**: Resultados detallados con screenshots

## 📋 Estructura del Proyecto

```
E2E/
├── index.html              # Aplicación web principal
├── styles.css              # Estilos CSS
├── script.js               # Lógica de la calculadora
├── playwright.config.js    # Configuración de Playwright
├── package.json            # Dependencias y scripts
├── tests/                  # Directorio de pruebas E2E
│   ├── calculadora.spec.js # Pruebas básicas de operaciones
│   ├── historial.spec.js   # Pruebas del sistema de historial
│   └── casos-extremos.spec.js # Pruebas de casos límite
└── .github/
    └── copilot-instructions.md # Instrucciones para GitHub Copilot
```

## 🛠️ Instalación y Configuración

### Requisitos Previos
- Node.js 16+ instalado
- npm o yarn
- Git (opcional)

### Pasos de instalación

1. **Clonar o descargar el proyecto**
   ```bash
   # Si tienes git
   git clone <url-del-repositorio>
   cd E2E
   
   # O simplemente descargar y extraer el archivo ZIP
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Instalar navegadores de Playwright** (si no se hizo automáticamente)
   ```bash
   npx playwright install
   ```

## 🚀 Uso

### Ejecutar la Aplicación

```bash
# Iniciar servidor de desarrollo
npm run serve
```

La aplicación estará disponible en: http://localhost:3000

### Ejecutar Pruebas E2E

```bash
# Ejecutar todas las pruebas (headless)
npm test

# Ejecutar pruebas con interfaz gráfica
npm run test:headed

# Ejecutar pruebas en modo debug
npm run test:debug

# Ejecutar con interfaz de usuario interactiva
npm run test:ui

# Ver reporte de resultados
npm run test:report
```

## 📊 Ejemplos de Pruebas

### Prueba Básica de Suma
```javascript
test('Suma: 5 + 3 = 8', async ({ page }) => {
  await page.fill('#input1', '5');
  await page.fill('#input2', '3');
  await page.selectOption('#operacion', 'suma');
  await page.click('#calcular');
  
  await expect(page.locator('#resultado')).toHaveText('8');
});
```

### Prueba de Validación
```javascript
test('División por cero debe mostrar error', async ({ page }) => {
  await page.fill('#input1', '10');
  await page.fill('#input2', '0');
  await page.selectOption('#operacion', 'division');
  await page.click('#calcular');
  
  await expect(page.locator('#resultado'))
    .toContainText('Error: No se puede dividir entre cero');
});
```

## 🧪 Tipos de Pruebas Incluidas

### 1. Pruebas Básicas (`calculadora.spec.js`)
- Carga correcta de la página
- Operaciones matemáticas básicas (suma, resta, multiplicación, división)
- Validación de campos vacíos
- Función limpiar
- Soporte de teclado (Enter)

### 2. Pruebas de Historial (`historial.spec.js`)
- Registro de operaciones correctas
- Registro de errores
- Limpieza del historial
- Verificación de timestamps

### 3. Casos Extremos (`casos-extremos.spec.js`)
- Números decimales
- Números negativos
- Números muy grandes
- Validación de entradas no numéricas
- Operaciones múltiples consecutivas

## 🎯 Conceptos de Testing E2E Demostrados

### ¿Qué son las pruebas E2E?
Las pruebas **End-to-End** simulan el comportamiento real del usuario, verificando que todo el sistema funcione correctamente desde la interfaz hasta la lógica de negocio.

### Beneficios en este proyecto:
- **Confianza en el producto**: Aseguran que la calculadora funciona como espera un usuario real
- **Prevención de regresiones**: Detectan cuando cambios rompen funcionalidades existentes  
- **Documentación viva**: Las pruebas sirven como documentación de cómo debe comportarse la aplicación
- **Automatización**: Reducen el tiempo de testing manual

### Playwright vs otras herramientas:

| Característica | Playwright | Cypress | Selenium |
|----------------|------------|---------|----------|
| Múltiples navegadores | ✅ Chrome, Firefox, Safari | ❌ Solo Chrome | ✅ Todos |
| Velocidad | ⚡ Muy rápido | ⚡ Rápido | 🐌 Lento |
| Configuración | 🟢 Fácil | 🟢 Fácil | 🔴 Compleja |
| Debugging | 🟢 Excelente | 🟢 Excelente | 🟡 Básico |

## 📈 Mejoras Futuras

- [ ] Pruebas de rendimiento
- [ ] Pruebas de accesibilidad
- [ ] Integración con CI/CD
- [ ] Pruebas de múltiples dispositivos móviles
- [ ] Pruebas de carga con múltiples usuarios

## 🎓 Uso Educativo

Este proyecto es perfecto para:

### Estudiantes de Programación
- Aprender conceptos de testing automatizado
- Entender la diferencia entre tipos de pruebas
- Practicar con herramientas modernas de testing

### Profesores/Instructores
- Demostrar buenas prácticas de testing
- Explicar la importancia de la automatización
- Mostrar casos de uso reales de E2E testing

### Desarrolladores
- Referencia para implementar pruebas E2E
- Estructura de proyecto bien organizada
- Ejemplos prácticos de Playwright

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Puedes:

1. Agregar nuevas pruebas
2. Mejorar la interfaz de la calculadora
3. Optimizar las configuraciones de Playwright
4. Documentar nuevos casos de uso

## 📝 Licencia

MIT License - Libre para uso educativo y comercial.

---

## 📚 Recursos Adicionales

- [Documentación oficial de Playwright](https://playwright.dev)
- [Guía de testing E2E](https://martinfowler.com/articles/practical-test-pyramid.html)
- [Best practices para pruebas automatizadas](https://testingjavascript.com/)

¡Feliz testing! 🚀
