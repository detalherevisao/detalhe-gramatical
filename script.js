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
    },
    { 
        pergunta: "Complete: '___ você não veio à festa?'", 
        opcoes: ["Porque", "Por que", "Porquê", "Por quê"], 
        resposta: "Por que" 
    },
    { 
        pergunta: "Complete: 'Eu não fui ___ estava chovendo.'", 
        opcoes: ["Por quê", "Por que", "Porque", "Porquê"], 
        resposta: "Porque" 
    }
];

let pontuacao = 0;
let perguntaAtual = 0;
let nomeUsuario = "";

// Função para iniciar o quiz depois que o usuário digitar o nome
function iniciarQuiz() {
    nomeUsuario = document.getElementById("nomeUsuario").value.trim();
    if (nomeUsuario === "") {
        alert("Por favor, digite seu nome antes de iniciar o quiz.");
        return;
    }
    document.getElementById("inicio-quiz").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    carregarPergunta();
}

// Função para carregar perguntas e opções
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
        salvarRanking();
        exibirRanking();
    }
}

// Função para verificar resposta
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

// Exibir o ranking automaticamente quando o quiz termina
function exibirRanking() {
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("ranking-container").style.display = "block";

    let ranking = JSON.parse(localStorage.getItem("ranking")) || [];
    if (ranking.length === 0) {
        document.getElementById("ranking-lista").innerHTML = "<p>Ainda não há jogadores no ranking.</p>";
        return;
    }

    let rankingHTML = "";
    ranking.forEach((jogador, index) => {
        rankingHTML += `<li><strong>${index + 1}. ${jogador.nome}</strong> - ${jogador.pontuacao} pontos</li>`;
    });

    document.getElementById("ranking-lista").innerHTML = rankingHTML;
}

// Salvar o nome e pontuação no ranking
function salvarRanking() {
    let ranking = JSON.parse(localStorage.getItem("ranking")) || [];
    ranking.push({ nome: nomeUsuario, pontuacao: pontuacao });
    ranking.sort((a, b) => b.pontuacao - a.pontuacao);
    localStorage.setItem("ranking", JSON.stringify(ranking));
}

// Função para zerar o ranking com confirmação
function resetarRanking() {
    if (confirm("Tem certeza que deseja zerar o ranking? Esta ação não pode ser desfeita.")) {
        localStorage.removeItem("ranking");
        alert("Ranking zerado com sucesso!");
        location.reload();
    }
}

// Voltar ao quiz após visualizar o ranking
function voltarQuiz() {
    location.reload();
}

window.onload = function () {
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("ranking-container").style.display = "none";
};
