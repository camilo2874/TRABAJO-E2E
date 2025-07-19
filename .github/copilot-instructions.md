<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Instrucciones para GitHub Copilot

Este es un proyecto de pruebas End-to-End (E2E) que incluye:

## Estructura del proyecto:
- **index.html**: Aplicación web de calculadora
- **styles.css**: Estilos CSS para la interfaz de usuario
- **script.js**: Lógica JavaScript de la calculadora
- **tests/**: Directorio con las pruebas E2E usando Playwright
- **playwright.config.js**: Configuración de Playwright

## Tecnologías utilizadas:
- **Frontend**: HTML5, CSS3, JavaScript vanilla
- **Testing**: Playwright para pruebas E2E
- **Servidor**: http-server para desarrollo local

## Convenciones de código:
- Usar nombres descriptivos en español para funciones y variables
- Incluir comentarios explicativos en el código
- Mantener las pruebas organizadas por funcionalidad
- Usar selectores específicos para elementos del DOM en las pruebas

## Comandos importantes:
- `npm run serve`: Inicia el servidor de desarrollo
- `npm test`: Ejecuta todas las pruebas E2E
- `npm run test:headed`: Ejecuta pruebas con interfaz gráfica
- `npm run test:debug`: Ejecuta pruebas en modo debug

## Buenas prácticas para pruebas E2E:
- Cada test debe ser independiente
- Usar `test.beforeEach()` para configuración común
- Verificar tanto el estado inicial como el final
- Incluir casos de error y validaciones
- Mantener los tests legibles y bien documentados
