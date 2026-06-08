async function calcularPrecos() {
    document.getElementById("gema").innerText = "0";
    document.getElementById("moeda").innerText = "0";
    document.getElementById("gratis").innerText = "0";


    try {
        const response = await fetch('data/dinoDataBase.json');
        const dinoDb = await response.json();
        
        const listaDeDinos = Object.values(dinoDb);
        
        let somaGemas = 0;
        let somaMoedas = 0;

        let numGemas = 0;
        let numMoedas = 0;
        let numGratis = 0;

        let id = 1;
        listaDeDinos.forEach(dino => {
            const indicador = dino.prices.price;            
            const precoString = dino.stats.price;
            
            if (indicador === "free") {
                numGratis++;
            } else if (precoString && precoString !== "N/A") {             
                const preco = parseInt(precoString);
                if (!isNaN(preco)) {
                    if (indicador === "gema") {
                        numGemas++;
                        somaGemas += Number(precoString);
                    } else if (indicador === "moeda") {
                        numMoedas++;
                        somaMoedas += Number(precoString);
                    }
                }              
            }
        });

        document.getElementById("gratis").innerText = numGratis + " dinos: "+ 0;
        document.getElementById("gema").innerText = numGemas + " dinos:  "+  somaGemas;
        document.getElementById("moeda").innerText = numMoedas + " dinos:  "+ somaMoedas;
        
    } catch (error) {
        console.error("Erro ao ler o JSON:", error);
    }
}

calcularPrecos();