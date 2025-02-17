let perguntas = [
    { 
        pergunta: "Qual 'porquê' usamos no início de perguntas diretas?", 
        opcoes: ["Porque", "Porquê", "Por que", "Por quê"], 
        resposta: "Por que" 
    },
    { 
        pergunta: "Qual 'porquê' significa 'o motivo'?", 
        opcoes: ["Por quê", "Por que", "Porque", "Porquê"], 
        resposta: "Porquê" 
    },
    { 
        pergunta: "Qual 'porquê' usamos no final da frase em perguntas?", 
        opcoes: ["Porque", "Por que", "Porquê", "Por quê"], 
        resposta: "Por quê" 
    },
    { 
        pergunta: "Qual 'porquê' usamos para dar respostas?", 
        opcoes: ["Porque", "Por que", "Porquê", "Por quê"], 
        resposta: "Porque" 
    },
    { 
        pergunta: "Complete: 'Ele saiu cedo, não sei ___.''", 
        opcoes: ["Por quê", "Por que", "Porque", "Porquê"], 
        resposta: "Por quê" 
    },
    { 
        pergunta: "Complete: 'Ele explicou o ___ da demora.'", 
        opcoes: ["Porque", "Por que", "Porquê", "Por quê"], 
        resposta: "Porquê" 
    }
];

let pontuacao = 0;
let perguntaAtual = 0;

// Função para carregar as perguntas
function carregarPergunta() {
    if (perguntaAtual < perguntas.length) {
        let perguntaAtualObj = perguntas[perguntaAtual];
        document.getElementById("pergunta").innerText = perguntaAtualObj.pergunta;
        document.getElementById("feedback").innerText = "";
        document.getElementById("opcoes").innerHTML = "";

        perguntaAtualObj.opcoes.forEach(opcao => {
            let botao = document.createElement("button");
            botao.innerText = opcao;
            botao.classList.add("botao-opcao");
            botao.onclick = function() { verificarResposta(opcao); };
            document.getElementById("opcoes").appendChild(botao);
        });

        document.getElementById("pontuacao").innerText = `Pontuação: ${pontuacao}`;
    } else {
        exibirFormularioEmail();
    }
}

// Função para verificar a resposta do jogador
function verificarResposta(respostaUsuario) {
    let respostaCorreta = perguntas[perguntaAtual].resposta;

    if (respostaUsuario === respostaCorreta) {
        pontuacao++;
        document.getElementById("feedback").innerHTML = "<span style='color:green; font-weight: bold;'>✅ Resposta correta!</span>";
    } else {
        document.getElementById("feedback").innerHTML = `<span style='color:red; font-weight: bold;'>❌ Errado! A resposta correta é: ${respostaCorreta}</span>`;
    }

    perguntaAtual++;
    setTimeout(carregarPergunta, 1500);
}

// Função para exibir o formulário de captura de e-mail
function exibirFormularioEmail() {
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("email-container").style.display = "block";
}

// Função para "enviar" o e-mail (por enquanto apenas exibe uma mensagem)
function enviarEmail() {
    let email = document.getElementById("emailUsuario").value.trim();

    if (email === "" || !email.includes("@")) {
        alert("Por favor, insira um e-mail válido.");
        return;
    }

    alert(`Obrigado! O acesso antecipado ao material será enviado para ${email}.`);
    document.getElementById("email-container").innerHTML = `
        <h2>✅ E-mail registrado com sucesso!</h2>
        <p>Fique de olho na sua caixa de entrada para acessar o material!</p>
        <a href="index.html" class="botao">Voltar ao início</a>
    `;
}

window.onload = carregarPergunta;
