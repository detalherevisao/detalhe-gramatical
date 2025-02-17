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
    }
];

let pontuacao = 0;
let perguntaAtual = 0;
let premioRecebido = localStorage.getItem("premioRecebido");

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
        verificarVitoria();
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

// Função para verificar se o jogador ganhou o prêmio
function verificarVitoria() {
    document.getElementById("quiz-container").style.display = "none";

    if (pontuacao === perguntas.length && !premioRecebido) {
        document.getElementById("premio-container").style.display = "block";
    } else {
        document.getElementById("premio-container").innerHTML = `
            <h2>🏆 Quiz concluído! Mas o prêmio já foi entregue ao primeiro vencedor.</h2>
            <a href="index.html" class="botao">Voltar ao início</a>
        `;
    }
}

// Função para enviar o prêmio via Pix
function enviarPremio() {
    let chavePix = document.getElementById("chavePix").value.trim();

    if (chavePix === "") {
        alert("Por favor, insira uma chave Pix válida.");
        return;
    }

    // Simulação de pagamento via API
    fetch("https://api.pagamento.com/pagar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chave: chavePix,
            valor: 5.00,
            descricao: "Prêmio do Quiz - Detalhe Gramatical"
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.sucesso) {
            alert("Pagamento realizado com sucesso! 🎉");
            localStorage.setItem("premioRecebido", "true");
            document.getElementById("premio-container").innerHTML = `
                <h2>✅ Prêmio enviado!</h2>
                <p>O valor foi transferido para sua conta via Pix.</p>
                <a href="index.html" class="botao">Voltar ao início</a>
            `;
        } else {
            alert("Erro ao processar o pagamento. Tente novamente mais tarde.");
        }
    })
    .catch(error => console.error("Erro no pagamento:", error));
}

window.onload = carregarPergunta;
