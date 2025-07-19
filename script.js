// script.js - Lógica de la calculadora
class Calculadora {
    constructor() {
        this.historial = [];
        this.initEventListeners();
    }

    initEventListeners() {
        const calcularBtn = document.getElementById('calcular');
        const limpiarBtn = document.getElementById('limpiar');
        const limpiarHistorialBtn = document.getElementById('limpiar-historial');

        calcularBtn.addEventListener('click', () => this.calcular());
        limpiarBtn.addEventListener('click', () => this.limpiar());
        limpiarHistorialBtn.addEventListener('click', () => this.limpiarHistorial());

        // Permitir calcular con Enter
        document.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.calcular();
            }
        });

        // Validación en tiempo real
        const inputs = document.querySelectorAll('#input1, #input2');
        inputs.forEach(input => {
            input.addEventListener('input', () => this.validarInputs());
        });

        const operacionSelect = document.getElementById('operacion');
        operacionSelect.addEventListener('change', () => this.validarInputs());
    }

    validarInputs() {
        const input1 = document.getElementById('input1').value;
        const input2 = document.getElementById('input2').value;
        const operacion = document.getElementById('operacion').value;
        const calcularBtn = document.getElementById('calcular');

        const inputsCompletos = input1 !== '' && input2 !== '' && operacion !== '';
        calcularBtn.disabled = !inputsCompletos;
    }

    calcular() {
        const input1 = parseFloat(document.getElementById('input1').value);
        const input2 = parseFloat(document.getElementById('input2').value);
        const operacion = document.getElementById('operacion').value;
        const resultadoDiv = document.getElementById('resultado');
        const displayInput = document.getElementById('display');

        // Validaciones
        if (isNaN(input1) || isNaN(input2)) {
            this.mostrarError('Por favor, ingrese números válidos');
            return;
        }

        if (!operacion) {
            this.mostrarError('Por favor, seleccione una operación');
            return;
        }

        let resultado;
        let simboloOperacion;
        let operacionTexto;

        try {
            switch (operacion) {
                case 'suma':
                    resultado = this.sumar(input1, input2);
                    simboloOperacion = '+';
                    break;
                case 'resta':
                    resultado = this.restar(input1, input2);
                    simboloOperacion = '-';
                    break;
                case 'multiplicacion':
                    resultado = this.multiplicar(input1, input2);
                    simboloOperacion = '×';
                    break;
                case 'division':
                    if (input2 === 0) {
                        throw new Error('No se puede dividir entre cero');
                    }
                    resultado = this.dividir(input1, input2);
                    simboloOperacion = '÷';
                    break;
                default:
                    throw new Error('Operación no válida');
            }

            // Redondear resultado a 2 decimales si es necesario
            resultado = Math.round(resultado * 100) / 100;

            // Mostrar resultado
            resultadoDiv.textContent = resultado;
            resultadoDiv.className = 'resultado-display success';
            displayInput.value = `${input1} ${simboloOperacion} ${input2} = ${resultado}`;

            // Agregar al historial
            operacionTexto = `${input1} ${simboloOperacion} ${input2} = ${resultado}`;
            this.agregarAlHistorial(operacionTexto);

        } catch (error) {
            this.mostrarError(error.message);
        }
    }

    sumar(a, b) {
        return a + b;
    }

    restar(a, b) {
        return a - b;
    }

    multiplicar(a, b) {
        return a * b;
    }

    dividir(a, b) {
        return a / b;
    }

    mostrarError(mensaje) {
        const resultadoDiv = document.getElementById('resultado');
        const displayInput = document.getElementById('display');
        
        resultadoDiv.textContent = `Error: ${mensaje}`;
        resultadoDiv.className = 'resultado-display error';
        displayInput.value = `Error: ${mensaje}`;
        
        // Agregar al historial
        this.agregarAlHistorial(`Error: ${mensaje}`);
    }

    limpiar() {
        document.getElementById('input1').value = '';
        document.getElementById('input2').value = '';
        document.getElementById('operacion').value = '';
        document.getElementById('resultado').textContent = '-';
        document.getElementById('resultado').className = 'resultado-display';
        document.getElementById('display').value = '';
        
        this.validarInputs();
    }

    agregarAlHistorial(operacion) {
        const timestamp = new Date().toLocaleTimeString();
        this.historial.unshift(`[${timestamp}] ${operacion}`);
        
        // Mantener solo las últimas 10 operaciones
        if (this.historial.length > 10) {
            this.historial = this.historial.slice(0, 10);
        }
        
        this.actualizarHistorialUI();
    }

    actualizarHistorialUI() {
        const historialLista = document.getElementById('historial-lista');
        historialLista.innerHTML = '';
        
        this.historial.forEach(operacion => {
            const li = document.createElement('li');
            li.textContent = operacion;
            if (operacion.includes('Error:')) {
                li.style.color = '#dc3545';
            }
            historialLista.appendChild(li);
        });
    }

    limpiarHistorial() {
        this.historial = [];
        this.actualizarHistorialUI();
    }
}

// Inicializar la calculadora cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const calculadora = new Calculadora();
    
    // Validación inicial
    calculadora.validarInputs();
    
    console.log('Calculadora E2E inicializada correctamente');
});
