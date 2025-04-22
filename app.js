const botoesOperacao =  document.querySelectorAll('[data-operator]');
const botaoIgual =  document.querySelector('[data-equals]');
const botaoDeleta =  document.querySelector('[data-delete]');
const botaoLimpa =  document.querySelector('[data-all-clear]');


function Calculadora(){
    this.operadorAtual = document.querySelector('[data-current-operand]');
    this.operadorAntes =  document.querySelector('[data-previus-operand]');

    this.valorAtual = '';
    this.valorAnterior = '';
    this.operadorUsado = false;

    this.inicia = () => {
        const botoesNumeros =  document.querySelectorAll('[data-number]');
        botoesNumeros.forEach((botao) => {
            botao.addEventListener('click', ()=>{
                console.log(botao.innerText);
                this.adicionaNumero(botao.innerText);
            })
        })

        botaoLimpa.addEventListener('click', () => {
            this.limparTudo();
        });

        botaoDeleta.addEventListener('click', () => {
            this.deletarUltimo();
        });

        botoesOperacao.forEach((botao) => {
            botao.addEventListener('click', () => {
                console.log(botao.innerText);
                this.adicionarOperador(botao.innerText);
            });
        });
        
        botaoIgual.addEventListener('click', ()=> {
            this.calcularResultado();
        })
    }

    this.adicionaNumero = (numero) =>{
        this.valorAtual += numero;
        this.atualizarDisplay();
    }

    this.limparTudo = () => {
        if(this.valorAtual === '') alert('Nada para limpar');
        this.valorAtual = '';
        this.atualizarDisplay();
        this.operadorUsado = false;
        if(this.valorAtual === ' '.trim()){
            this.operadorAntes.innerText = '';
            this.operadorAtual.innerText = '0';
        }
    }

    this.atualizarDisplay = () => {
        this.operadorAtual.innerText = this.valorAtual;
    }

    this.deletarUltimo = () => {
        const ultimoCaractere = this.valorAtual.slice(-1);

        if (ultimoCaractere === ' ') {
            this.valorAtual = this.valorAtual.slice(0, -3); 
            this.operadorUsado = false;
        } else {
            this.valorAtual = this.valorAtual.slice(0, -1); 
        }

        if (this.valorAtual === '') {
            this.valorAtual = '0'; 
            this.operadorAntes.innerText = ''; 
        }
        this.atualizarDisplay();
    }

    this.adicionarOperador = (operador) => {

        if (this.operadorUsado) return;
        const ultimoCaractere = this.valorAtual.slice(-1);
        
        if (ultimoCaractere === '+' || ultimoCaractere === '-' || ultimoCaractere === '*' || ultimoCaractere === '÷') {
            this.valorAtual = this.valorAtual.slice(0, -1) + operador;
        } else {
            this.valorAtual += ` ${operador} `;
            this.operadorAntes.innerText = this.valorAtual;
        }
        this.operadorUsado = true;
        this.atualizarDisplay();
    }
    
    this.calcularResultado = () => {
        console.log('Iniciando cálculo...');
        this.valorAntes = this.valorAtual;
        console.log('Valor antes:', this.valorAntes);
        this.operadorAntes.innerText = this.valorAntes;
        
        const operacao = this.valorAtual.split(' ');
        console.log('Operação dividida:', operacao);

        let num1 = parseFloat(operacao[0]);
        let operador = operacao[1];
        let num2 = parseFloat(operacao[2]);
        console.log('Número 1:', num1, 'Operador:', operador, 'Número 2:', num2);

        let resultado;

        switch (operador) {
            case '+':
                resultado = num1 + num2;
                break;
            case '-':
                resultado = num1 - num2;
                break;
            case '*':
                resultado = num1 * num2;
                break;
            case '÷':
                if (num2 === 0) {
                    alert('Divisão por zero não é permitida!');
                    this.operadorAntes.innerText = '';
                    this.valorAtual = '';
                    this.atualizarDisplay();
                    return;
                }
                resultado = num1 / num2;
                break;
            default:
                alert('Operador inválido');
                return;
        }

        console.log('Resultado:', resultado);
        this.valorAtual = resultado.toString();
        this.atualizarDisplay();
        this.operadorUsado = false;
    }
}

const calc = new Calculadora();
calc.inicia();