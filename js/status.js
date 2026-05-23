document.addEventListener('click', (e) => {
    if (window.location.hash && e.target && !e.target.closest('a')) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
    }
});

document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('tabelas-container');
    if (container && typeof dinosData !== 'undefined') {
        let dinoDbStatus = {};
        try {
            const response = await fetch('data/dinoDataBase.json');
            dinoDbStatus = await response.json();
        } catch (error) {
            console.error("Erro ao carregar dinoDataBase.json:", error);
        }

        const tierMap = { 5: [], 4: [], 3: [], 2: [], 1: [] };
        
        dinosData.forEach(dino => {
            if (dino.tier && tierMap[dino.tier]) {
                tierMap[dino.tier].push(dino);
            }
        });

        let html = '';
        for (let tier = 5; tier >= 1; tier--) {
            if (tierMap[tier].length === 0) continue;

            html += `
            <h2 class="tier-toggle collapsed" tabindex="0" role="button" aria-expanded="false">Tier ${tier}<span class="arrow"></span></h2>
            <div class="table-container hidden">
                <table>
                    <thead>
                        <tr class="head">
                            <th>Nome</th>
                            <th>HP</th>
                            <th>Dano base</th>
                            <th>Fratura</th>
                            <th>Sangramento</th>
                            <th>Velocidade: terra</th>
                            <th>Velocidade: água</th>
                            <th>Velocidade: ar</th>
                        </tr>
                    </thead>
                    <tbody>`;

            tierMap[tier].forEach(dino => {
                const dbKey = dino.nome.split(" ")[0];
                const info = dinoDbStatus[dbKey];
                const idStatus = info && info.idStatus ? info.idStatus : dbKey.toLowerCase();
                
                const dispHp = dino.hp || 'N/A';
                const dispDano = dino.dano_base || 'N/A';
                const dispFratura = dino.fratura !== undefined && dino.fratura !== null ? `${dino.fratura}%` : '0%';
                const dispSangramento = dino.sangramento !== undefined && dino.sangramento !== null ? `${dino.sangramento}%` : '0%';
                const dispVelTerra = dino.vel_terra || 'N/A';
                const dispVelAgua = dino.vel_agua || 'N/A';
                const dispVelAr = dino.vel_ar || 'N/A';

                html += `
                        <tr id="${idStatus}">
                            <td><a href="galeria.html#${idStatus}" class="dino-link">${dino.nome}</a></td>
                            <td>${dispHp}</td>
                            <td>${dispDano}</td>
                            <td>${dispFratura}</td>
                            <td>${dispSangramento}</td>
                            <td>${dispVelTerra}</td>
                            <td>${dispVelAgua}</td>
                            <td>${dispVelAr}</td>
                        </tr>`;
            });

            html += `
                    </tbody>
                </table>
            </div>`;
        }
        
        container.innerHTML = html;

        // Re-attach toggle events
        const headers = document.querySelectorAll('.tier-toggle');
        headers.forEach(header => {
            const toggleTier = () => {
                header.classList.toggle('collapsed');
                const tableContainer = header.nextElementSibling;
                if (tableContainer?.classList.contains('table-container')) {
                    const isHidden = tableContainer.classList.toggle('hidden');
                    header.setAttribute('aria-expanded', String(!isHidden));
                }
            };

            header.addEventListener('click', toggleTier);
            header.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    toggleTier();
                }
            });
        });
    }

    const hash = window.location.hash; 
    
    if (hash && /^#[a-zA-Z0-9_-]+$/.test(hash)) {
        try {
            const targetRow = document.querySelector(hash); 
            
            if (targetRow) {
                const tableContainer = targetRow.closest('.table-container');
                
                if (tableContainer) {
                    tableContainer.classList.remove('hidden');
                    
                    const header = tableContainer.previousElementSibling;
                    if (header?.classList.contains('tier-toggle')) {
                        header.classList.remove('collapsed');
                        header.setAttribute('aria-expanded', 'true');
                    }
                    
                    setTimeout(() => {
                        targetRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 150);
                }
            }
        } catch (error) {
            console.warn("Hash de URL inválido ou não encontrado:", hash);
        }
    }
});

const DEFESA_MULTIPLICADORES = {
    1: 0.80,
    2: 1.00,
    3: 1.20
};

function calcularDano(idAtacante, idAlvo, tipoDefesa) {
    const atacante = dinosData[idAtacante];
    const alvo = dinosData[idAlvo];

    if (!atacante || !alvo) {
        throw new Error("Dinossauro não encontrado na base de dados.");
    }

    const proporcaoPeso = atacante.peso / alvo.peso;
    const multiplicadorFinal = Math.max(0.75, proporcaoPeso);
    const danoBruto = atacante.dano_base * multiplicadorFinal;
    
    const multiplicadorDefesa = DEFESA_MULTIPLICADORES[tipoDefesa];
    if (multiplicadorDefesa === undefined) {
        throw new Error("Valor de defesa inválido.");
    }

    return Math.round(danoBruto * multiplicadorDefesa);
}

function defender(botaoClicado) {
    const selecionado = document.querySelector('.alvo.active');
    if (selecionado) {
        selecionado.classList.remove('active');
    }
    botaoClicado.classList.add('active');
    
    atualizarInterface();
}

function inicializarInterface() {
    const selectA = document.getElementById('combat-species-a');
    const selectB = document.getElementById('combat-species-b');
    const resultsDiv = document.getElementById('results');
    
    if (!selectA || !selectB || !resultsDiv) {
        return;
    }

    if (typeof dinosData === 'undefined' || !Array.isArray(dinosData)) {
        console.error("Dados de dinossauros não encontrados. Verifique se data/data.js foi carregado corretamente.");
        resultsDiv.innerHTML = '<div class="error">Dados de dinossauros não encontrados.</div>';
        return;
    }

    const optionsHtml = dinosData.map((dino, index) => {
        let nick = dino.nome.split(" ")[0];
        
        return `<option value="${index}">${nick}</option>`;
    }).join('');

    selectA.innerHTML = optionsHtml;
    selectB.innerHTML = optionsHtml;
    selectB.selectedIndex = Math.min(1, selectB.options.length - 1);

    selectA.addEventListener('change', atualizarInterface);
    selectB.addEventListener('change', atualizarInterface);
    
    atualizarInterface();
}

function atualizarInterface() {
    const selectA = document.getElementById('combat-species-a');
    const selectB = document.getElementById('combat-species-b');
    const botaoAtivo = document.querySelector('.alvo.active');
    const resultsDiv = document.getElementById('results');

    if (!selectA || !selectB || !resultsDiv) {
        return;
    }

    const idAtacante = selectA.value;
    const idAlvo = selectB.value;
    const tipoDefesa = botaoAtivo ? parseInt(botaoAtivo.value) : 1;
    
    if (!idAtacante || !idAlvo) return;

    try {
        const toma = calcularDano(idAtacante, idAlvo, tipoDefesa);
        const atacante = dinosData[idAtacante];
        const alvo = dinosData[idAlvo];
        
        const nomeAtacante = atacante.nome;
        const nomeAlvo = alvo.nome;



        resultsDiv.innerHTML = `
            <div class="result-row">
                <span class="fw-bold">${nomeAtacante}</span> <span> Dano base ${atacante.dano_base}</span>
            </div>
            <div class="result-row">
                <span class="fw-bold">${nomeAlvo}</span> <span>Dano recebido ${toma}</span>
            </div>
        `;
    } catch (e) {
        console.error(`Erro ao atualizar interface: ${e.message}`);
        resultsDiv.innerHTML = `<div class="error">Erro: ${e.message}</div>`;
    }
}

document.addEventListener('DOMContentLoaded', inicializarInterface);
