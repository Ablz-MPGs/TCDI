const skills = [
    //allosaurus
    {
        id : 1,
        ativas : [
            {
                title : "Ataque carregado",
                desc :  "O dinossauro prepara um ataque poderoso, desferindo-o em 5 segundos. Maior chance de infligir sangramento.",
                effect : "", 
                dmg : 672,
                cd : 20,
                icon : "carregada"
            }
        ],
        passivas : [
            {
                title : "O poder do bando",
                desc : "O vigor recupera mais rápido quando há membros da matilha por perto.",
                effect : "Acumula 3 vezes, até +9% regeneração de vigor", 
                cd : null,
                icon : "rebanhoC"
            },
            {
                title : "Bom sono",
                desc : "O consumo de vigor é reduzido caso o cansaço esteja acima de 80%.",
                effect : "-15% consumo de vigor", 
                cd : null,
                icon : "rebanhoC"
            },
            {
                title : "Instinto Primordial",
                desc : "Enquanto seu dinossauro estiver sangrando, os ataques terão maior probabilidade de causar sangramento",
                effect : "+9% chnace de sangramento", 
                cd : null,
                icon : "instinto"
            }
        ]
    },
    //Amargasaurus
    {
        id :2,
        ativas : [
            {
                title : "Chicote de Cauda",
                desc :  "Um golpe de cauda em área que causa repulsão. Pode causar sangramento.",
                effect : "", 
                dmg : 300,
                cd : 2,
                icon : "cauda"
            },
            {
                title : "Ataque do Céu",
                desc :  "Um ataque pesado com as patas dianteiras. Causa dano em área, repele e/ou atordoa inimigos.",
                effect : "", 
                dmg : 0,
                cd : 0,
                icon : "pisaoA"
            }            
        ],
        passivas : [
            {
                title : "O poder do bando",
                desc : "O consumo de vigor é reduzido quando há membros da matilha por perto.",
                effect : "Acumula 4 vezes, até -12% consumo de vigor", 
                cd : null,
                icon : "rebanhoH"
            },
            {
                title : "Surto de poder",
                desc : "A defesa e chance de infligir sangramento são aumentadas quando com pouca vida.",
                effect : "+12% defesa, +4.5% sangramento", 
                cd : null,
                icon : "poucoHp"
            }   
        ]
    },
    //Ankylosaurus
    {
        id : 3,
        ativas : [
            {
                title : "Martelo da Justiça",
                desc :  "Quando de pé, executa um ataque em um ângulo de 90°. Quando agachado, causa dano em área. Maiores chances de causar fratura.",
                effect : "", 
                dmg : 420,
                cd : 7,
                icon : "martelo"
            },
            {
                title : "Ataque carregado",
                desc :  "O dinossauro prepara um ataque poderoso, desferindo-o em 5 segundos.Causa repulsão e/ou atordoamento. Maiores chances de infligir fratura.",
                effect : "", 
                dmg : 0,
                cd : 34,
                icon : "carregada"
            }
        ],
        passivas : [
            {
                title : "Pronto para a Batalha",
                desc :  "A defesa e velocidade de giro aumentam quando agachado.",
                effect : "+15% defesa, giro aprimorado",
                cd : null,
                icon : "defesa"
            },
            {
                title : "Surto de Poder",
                desc : "O dano e chance de infligir fratura são aumentadas quando com pouca vida.",
                effect : "+15% dano, +7.5% chance de fratura", 
                cd : null,
                icon : "poucoHp"
            },
            {
                title : "Escudo Ósseo",
                desc : "Há a chance de ignorar 1 ponto de efeito negativo recebido.",
                effect : "-1 ponto de fratura ou sangramento", 
                cd : null,
                icon : "escudo"
            }
        ]
    },
    //Austroraptor
    {
        id : 4,
        ativas : [
            {
                title : "Disparada",
                desc :  "Salto para frente. Pode ser utilizado dentro da água.",
                effect : "", 
                dmg : null,
                cd : 17,
                icon : "disparada"
            },{
                title : "Ataque do Céu",
                desc :  "Salto para frente, atacando. Há chances de reduzir a defesa do inimigo.",
                effect : "-15% defesa inimiga  durante 20 segundos.", 
                dmg : 200,
                cd : 13,
                icon : "mordida"
            },
        ],
        passivas : [
            {
                title : "Vampirismo",
                desc :  "Há chances de restaurar parte da vida perdida baseando-se no dano causado a um inimgo.",
                effect : "Vida: +25% do dano causado", 
                cd : null,
                icon : "vamp"
            },{
                title : "Juntos somos Fortes",
                desc :  "O consumo de vigor é reduzido quando há membros da matilha por perto.",
                effect : "Acumula 3 vezes: até -15% consumo de vigor", 
                cd : null,
                icon : "rebanhoC"
            },{
                title : "Presente das Profundezas",
                desc : "O consumo de vigor é reduzido após alimentar-se de peixe.",
                effect : "-10% consumo de vigor durante 30 segundos", 
                cd : 0,
                icon : "disparada"
            },{
                title : "Frescor Marinho",
                desc :  "A velocidade é aumentada após sair da água.",
                effect : "+5% velocidade de nado e corrida", 
                cd : 0,
                icon : "enativo"
            },
        ]
    },
    //Barbarydactylus
    {
        id:5,
        ativas : [
            {
                title : "Grito Estridente",
                desc: "O pterossauro ruge, aumantando as chances de infligir sangramento durante 20 segundos",
                effect: "+1.2% chance de sangramento",
                dmg: null,
                cd: 0,
                icon: "sangra"
            }
        ],
        passivas: [
            {
                title : "Juntos somos Fortes",
                desc :  "O consumo de vigor é reduzido quando há membros da matilha por perto.",
                effect : "Acumula 3 vezes: até -18% consumo de vigor", 
                cd : null,
                icon : "rebanhoC"
            },{
                title : "Presente das Profundezas",
                desc : "O consumo de vigor é reduzido após alimentar-se de peixe.",
                effect : "-10% consumo de vigor durante 30 segundos", 
                cd : null,
                icon : "disparada"
            }
        ]
    },
    //Carnotaurus
    {
        id:6,
        ativas:[
            {
                title : "Ataque carregado",
                desc :  "O dinossauro prepara um ataque poderoso, desferindo-o em 5 segundos. Maior chance de infligir sangramento.",
                effect : "", 
                dmg : 560,
                cd : 20,
                icon : "carregada"
            },
            {
                title : "Crânio de Ferro",
                desc :  "Um ataque forte com a a cabeça. Maiores chances de infligir sangramento. Repele e/ou atordoa inimigos.",
                effect : "", 
                dmg : 245,
                cd : 20,
                icon : "pisaoA"
            }  
        ],
        passivas:[
            {
                title : "Sede de Sangue",
                desc : "Atingir inimigos em sequência garantirá aumento temporário na velocidade e chances de infligir sangramento.",
                effect : "Acumula 10 vezes, +3.6% chances de sangramento, +6 velocidade", 
                cd : null,
                icon : "sedeSangue"
            },{
                title : "Juntos somos Fortes",
                desc :  "O consumo de vigor é reduzido quando há membros da matilha por perto.",
                effect : "Acumula 2 vezes: até -10% consumo de vigor", 
                cd : null,
                icon : "rebanhoC"
            }
        ]
    },
    //Ceratosaurus
    {
        id:7,
        ativas:[
            {
                title : "Ataque carregado",
                desc :  "O dinossauro prepara um ataque poderoso, desferindo-o em 5 segundos. Maior chance de infligir sangramento.",
                effect : "", 
                dmg : 616,
                cd : 20,
                icon : "carregada"
            }
        ],
        passivas:[
            {
                title : "Surto de poder",
                desc : "A defesa e chance de infligir sangramento são aumentadas quando com pouca vida.",
                effect : "+12% defesa, +3.6% sangramento", 
                cd : null,
                icon : "poucoHp"
            }, {
                title : "O poder do bando",
                desc : "A vida regenera mais rápido quando há membros da matilha por perto.",
                effect : "Acumula 2 vezes, até +20% regeneração de vida", 
                cd : null,
                icon : "rebanhoC"
            }
        ]
    },
    //Changyuraptor
    {
        id : 8,
        ativas : [
            {
                title : "Disparada",
                desc :  "Impulsione para mudar de direção enquanto estiver planando.",
                effect : null, 
                dmg : null,
                cd : 20,
                icon : "impulso"
            }, {
                title : "Corrida alta",
                desc : "Executa um grande salto.",
                effect : null, 
                dmg : null,
                cd : 15,
                icon : "puloC"
            }, {
                title : "Parkour",
                desc :  "Escale ao pressionar o botão de salto próximo a uma superfície adequada.",
                effect : null, 
                dmg : null,
                cd : null,
                icon : "park"
            }, {
                title : "Vento sob as asas",
                desc :  "Enquanto estiver no ar, pressione o botão de salto para planar. Recupera vigor enquanto planando.",
                effect : null, 
                dmg : null,
                cd : null,
                icon : "planar"
            }, {
                title : "Escalador",
                desc :  "Quando no ar, precione o botão de salto para prender-se a uma superfície.",
                effect : null, 
                dmg : null,
                cd : null,
                icon : "escalador"
            },
        ],
        passivas : [
            {
                title : "Juntos somos fortes!",
                desc : "O consumo de vigor é reduzido quando há membros da matilha por perto.",
                effect : "Acumula 3 vezes, até -35% consumo de vigor", 
                cd : null,
                icon : "rebanhoC"
            }, {
                title : "Força das trevas",
                desc :  "O consumo de vigor é reduzido durante a noite.",
                effect : "-20% consumo de vigor",
                cd : null,
                icon : "hora"
            }
        ]
    },
    //Coelophysis
    {
        id: 9,
        ativas : [
            {
                title : "Troféu de carne",
                desc : "O dinossauro desfere um golpe forte, retirando um pedaço de carne ao atingir um inimigo.",
                effect : null, 
                dmg : 125,
                cd : 25,
                icon : "rebanhoC"
            }, {
                title : "Grito de guerra",
                desc: "O dinossauro ruge, aumentando o dano causado durante 25 segundos",
                effect: "+20% de dano",
                dmg: null,
                cd: 40,
                icon: "sangra"
            }
        ],
        passivas : [
            {
                title : "Juntos somos fortes!",
                desc : "O consumo de vigor é reduzido quando há membros da matilha por perto.",
                effect : "Acumula 3 vezes, até -15% consumo de vigor", 
                cd : null,
                icon : "rebanhoC"
            }, {
                title : "Apetite louco",
                desc : "A velocidade é aumentada quando o dinossauro carrega alimento na boca.",
                effect : "+10% velocidade", 
                cd : null,
                icon : "apetite"
            }, {
                title : "Surto de poder",
                desc : "A velocidade aumenta e o consumo de vigor é reduzido quando com pouca vida.",
                effect : "-20% consumo de vigor, +5% velocidade", 
                cd : null,
                icon : "poucoHp"
            }         
        ]
    }, 
    //Concavenator
    
];