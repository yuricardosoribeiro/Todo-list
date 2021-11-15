// carrega as tasks que estão guardadas no LocalStorage sempre que abrimos a página
window.onload = carregaTasks;

// pega o evento de clique no documento e executa as funções de acordo com a classe do elemento clicado
document.addEventListener('click', (e) => {
    const elemento = e.target;

    if(elemento.classList.contains('add')) {
        adicionarTask();
    }
    if(elemento.classList.contains('deletar')) {
        deletarTask(elemento);
    }
    if(elemento.classList.contains('clear')) {
        limparTasks();
    }
})

// pega o evento de apertar a tecla Enter e executa a função adicionarTask
document.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
        adicionarTask();
    }
})

// adiciona o que está no input no localStorage
function adicionarTask() {
    const input = document.querySelector('.campo');
    if(input.value === '') return;

    const tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.push(input.value);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    input.value = '';

    // chama a função carregaTasks para carregar a task
    carregaTasks();
}

// carrega as tasks que estão guardadas no localStorage na tela
function carregaTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if(tasks === null) localStorage.setItem('tasks', JSON.stringify([]));

    const divTasks = document.querySelector('.tasks');
    divTasks.innerHTML = ''

    for(let i = 0; i < tasks.length; i++) {
        divTasks.innerHTML += `<div class="task">
        ${tasks[i]}
        <img src="./img/lixeira-de-reciclagem.png" class="deletar">
        </div>`
    }

    atualizaContagem();
}

// deleta uma task em específico
function deletarTask(elemento) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));

    for(let i = 0; i < tasks.length; i++) {
        if(elemento.parentElement.innerText === tasks[i]) {
            if(i === 0) tasks.shift(); 
            tasks.splice(i, i);
        }
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
    carregaTasks();
}

// limpa todas as tasks
function limparTasks() {
    localStorage.setItem('tasks', JSON.stringify([]));
    carregaTasks();
}

// atualiza a contagem das tasks restante
function atualizaContagem() {
    const restante = document.querySelector('.restante');
    const tasks = JSON.parse(localStorage.getItem('tasks'));

    restante.innerText = `You have ${tasks.length} pending tasks`;
}