const skills = [
    Allosaurus = {
        id: 1,
        ativas: [
            {
                title: "Ataque carregado",
                desc: "O dinossauro prepara um ataque poderoso, desferindo-o em 5 segundos. Maior chance de infligir sangramento.",
                effect: null,
                dmg: 672,
                cd: 20,
                icon: "carregada"
            }
        ],
        passivas: [
            {
                title: "O poder do bando",
                desc: "O vigor recupera mais rápido quando há membros da matilha por perto.",
                effect: "Acumula 3 vezes, até +9% regeneração de vigor",
                cd: null,
                icon: "rebanhoC"
            },
            {
                title: "Bom sono",
                desc: "O consumo de vigor é reduzido caso o cansaço esteja acima de 80%.",
                effect: "-15% consumo de vigor",
                cd: null,
                icon: "rebanhoC"
            },
            {
                title: "Instinto Primordial",
                desc: "Enquanto seu dinossauro estiver sangrando, os ataques terão maior probabilidade de causar sangramento",
                effect: "+9% chnace de sangramento",
                cd: null,
                icon: "instinto"
            }
        ]
    },
    Amargasaurus = {
        id: 2,
        ativas: [
            {
                title: "Chicote de Cauda",
                desc: "Um golpe de cauda em área que causa repulsão. Pode causar sangramento.",
                effect: null,
                dmg: 300,
                cd: 2,
                icon: "cauda"
            },
            {
                title: "Ataque do Céu",
                desc: "Um ataque pesado com as patas dianteiras. Causa dano em área, repele e/ou atordoa inimigos.",
                effect: null,
                dmg: 0,
                cd: 0,
                icon: "pisaoA"
            }
        ],
        passivas: [
            {
                title: "O poder do bando",
                desc: "O consumo de vigor é reduzido quando há membros da matilha por perto.",
                effect: "Acumula 4 vezes, até -12% consumo de vigor",
                cd: null,
                icon: "rebanhoH"
            },
            {
                title: "Surto de poder",
                desc: "A defesa e chance de infligir sangramento são aumentadas quando com pouca vida.",
                effect: "+12% defesa, +4.5% sangramento",
                cd: null,
                icon: "surto"
            }
        ]
    },
    Ankylosaurus = {
        id: 3,
        ativas: [
            {
                title: "Martelo da Justiça",
                desc: "Quando de pé, executa um ataque em um ângulo de 90°. Quando agachado, causa dano em área. Pode repelir e/ou atordoar inimigos. Maiores chances de causar fratura.",
                effect: null,
                dmg: 420,
                cd: 7,
                icon: "martelo"
            },
            {
                title: "Ataque carregado",
                desc: "O dinossauro prepara um ataque poderoso, desferindo-o em 5 segundos.Causa repulsão e/ou atordoamento. Maiores chances de infligir fratura.",
                effect: "",
                dmg: 0,
                cd: 34,
                icon: "carregada"
            }
        ],
        passivas: [
            {
                title: "Pronto para a Batalha",
                desc: "A defesa e velocidade de giro aumentam quando agachado.",
                effect: "+15% defesa, giro aprimorado",
                cd: null,
                icon: "defesa"
            },
            {
                title: "Surto de Poder",
                desc: "O dano e chance de infligir fratura são aumentadas quando com pouca vida.",
                effect: "+15% dano, +7.5% chance de fratura",
                cd: null,
                icon: "surto"
            },
            {
                title: "Escudo Ósseo",
                desc: "Há a chance de ignorar 1 ponto de efeito negativo recebido.",
                effect: "-1 ponto de fratura ou sangramento",
                cd: null,
                icon: "escudo"
            }
        ]
    },
    Austroraptor = {
        id: 4,
        ativas: [
            {
                title: "Disparada",
                desc: "Salto para frente. Pode ser utilizado dentro da água.",
                effect: "",
                dmg: null,
                cd: 17,
                icon: "disparada"
            }, {
                title: "Ataque do Céu",
                desc: "Salto para frente, atacando. Há chances de reduzir a defesa do inimigo.",
                effect: "-15% defesa inimiga  durante 20 segundos.",
                dmg: 200,
                cd: 13,
                icon: "mordida"
            },
        ],
        passivas: [
            {
                title: "Vampirismo",
                desc: "Há chances de restaurar parte da vida perdida baseando-se no dano causado a um inimgo.",
                effect: "Vida: +25% do dano causado",
                cd: null,
                icon: "vamp"
            }, {
                title: "Juntos somos Fortes",
                desc: "O consumo de vigor é reduzido quando há membros da matilha por perto.",
                effect: "Acumula 3 vezes: até -15% consumo de vigor",
                cd: null,
                icon: "rebanhoC"
            }, {
                title: "Presente das Profundezas",
                desc: "O consumo de vigor é reduzido após alimentar-se de peixe.",
                effect: "-10% consumo de vigor durante 30 segundos",
                cd: 0,
                icon: "aquatico"
            }, {
                title: "Frescor Marinho",
                desc: "A velocidade é aumentada após sair da água.",
                effect: "+5% velocidade de nado e corrida",
                cd: 0,
                icon: "enativo"
            },
        ]
    },
    Barbarydactylus = {
        id: 5,
        ativas: [
            {
                title: "Grito Estridente",
                desc: "O pterossauro ruge, aumantando as chances de infligir sangramento durante 20 segundos",
                effect: "+1.2% chance de sangramento",
                dmg: null,
                cd: 0,
                icon: "sangra"
            }
        ],
        passivas: [
            {
                title: "Juntos somos Fortes",
                desc: "O consumo de vigor é reduzido quando há membros da matilha por perto.",
                effect: "Acumula 3 vezes: até -18% consumo de vigor",
                cd: null,
                icon: "rebanhoC"
            }, {
                title: "Presente das Profundezas",
                desc: "O consumo de vigor é reduzido após alimentar-se de peixe.",
                effect: "-10% consumo de vigor durante 30 segundos",
                cd: null,
                icon: "disparada"
            }
        ]
    },
    Carnotaurus = {
        id: 6,
        ativas: [
            {
                title: "Ataque carregado",
                desc: "O dinossauro prepara um ataque poderoso, desferindo-o em 5 segundos. Maior chance de infligir sangramento.",
                effect: null,
                dmg: 560,
                cd: 20,
                icon: "carregada"
            },
            {
                title: "Crânio de Ferro",
                desc: "Um ataque forte com a a cabeça. Maiores chances de infligir sangramento. Repele e/ou atordoa inimigos.",
                effect: null,
                dmg: 245,
                cd: 20,
                icon: "pisaoA"
            }
        ],
        passivas: [
            {
                title: "Sede de Sangue",
                desc: "Atingir inimigos em sequência garantirá aumento temporário na velocidade e chances de infligir sangramento.",
                effect: "Acumula 10 vezes, +3.6% chances de sangramento, +6% velocidade",
                cd: null,
                icon: "sedeSangue"
            }, {
                title: "Juntos somos Fortes",
                desc: "O consumo de vigor é reduzido quando há membros da matilha por perto.",
                effect: "Acumula 2 vezes: até -10% consumo de vigor",
                cd: null,
                icon: "rebanhoC"
            }
        ]
    },
    Ceratosaurus = {
        id: 7,
        ativas: [
            {
                title: "Ataque carregado",
                desc: "O dinossauro prepara um ataque poderoso, desferindo-o em 5 segundos. Maior chance de infligir sangramento.",
                effect: "",
                dmg: 616,
                cd: 20,
                icon: "carregada"
            }
        ],
        passivas: [
            {
                title: "Surto de poder",
                desc: "A defesa e chance de infligir sangramento são aumentadas quando com pouca vida.",
                effect: "+12% defesa, +3.6% sangramento",
                cd: null,
                icon: "surto"
            }, {
                title: "O poder do bando",
                desc: "A vida regenera mais rápido quando há membros da matilha por perto.",
                effect: "Acumula 2 vezes, até +20% regeneração de vida",
                cd: null,
                icon: "rebanhoC"
            }
        ]
    },
    Changyuraptor = {
        id: 8,
        ativas: [
            {
                title: "Disparada",
                desc: "Impulsione para mudar de direção enquanto estiver planando.",
                effect: null,
                dmg: null,
                cd: 20,
                icon: "impulso"
            }, {
                title: "Corrida alta",
                desc: "Executa um grande salto.",
                effect: null,
                dmg: null,
                cd: 15,
                icon: "puloC"
            }, {
                title: "Parkour",
                desc: "Escale ao pressionar o botão de salto próximo a uma superfície adequada.",
                effect: null,
                dmg: null,
                cd: null,
                icon: "park"
            }, {
                title: "Vento sob as asas",
                desc: "Enquanto estiver no ar, pressione o botão de salto para planar. Recupera vigor enquanto planando.",
                effect: null,
                dmg: null,
                cd: null,
                icon: "planar"
            }, {
                title: "Escalador",
                desc: "Quando no ar, precione o botão de salto para prender-se a uma superfície.",
                effect: null,
                dmg: null,
                cd: null,
                icon: "escalador"
            },
        ],
        passivas: [
            {
                title: "Juntos somos fortes!",
                desc: "O consumo de vigor é reduzido quando há membros da matilha por perto.",
                effect: "Acumula 3 vezes, até -35% consumo de vigor",
                cd: null,
                icon: "rebanhoC"
            }, {
                title: "Força das trevas",
                desc: "O consumo de vigor é reduzido durante a noite.",
                effect: "-20% consumo de vigor",
                cd: null,
                icon: "hora"
            }
        ]
    },
    Coelophysis = {
        id: 9,
        ativas: [
            {
                title: "Troféu de carne",
                desc: "O dinossauro desfere um golpe forte, retirando um pedaço de carne ao atingir um inimigo.",
                effect: null,
                dmg: 125,
                cd: 25,
                icon: "rebanhoC"
            }, {
                title: "Grito de guerra",
                desc: "O dinossauro ruge, aumentando o dano causado durante 25 segundos",
                effect: "+20% de dano",
                dmg: null,
                cd: 40,
                icon: "sangra"
            }
        ],
        passivas: [
            {
                title: "Juntos somos fortes!",
                desc: "O consumo de vigor é reduzido quando há membros da matilha por perto.",
                effect: "Acumula 3 vezes, até -15% consumo de vigor",
                cd: null,
                icon: "rebanhoC"
            }, {
                title: "Apetite louco",
                desc: "A velocidade é aumentada quando o dinossauro carrega alimento na boca.",
                effect: "+10% velocidade",
                cd: null,
                icon: "apetite"
            }, {
                title: "Surto de poder",
                desc: "A velocidade aumenta e o consumo de vigor é reduzido quando com pouca vida.",
                effect: "-20% consumo de vigor, +5% velocidade",
                cd: null,
                icon: "surto"
            }
        ]
    },
    Concavenator = {
        id: 10,
        ativas: [
            {
                title: "Ataque Pesado",
                desc: "O dinossauro desfere um golpe forte. As chances de infligir sangramento são aumentadas.",
                effect: null,
                dmg: 200,
                cd: null,
                icon: "surto"
            }
        ],
        passivas: [
            {
                title: "Surto de poder",
                desc: "O dano aumenta e o consumo de vigor é reduzido, quando com pouca vida.",
                effect: "+14% dano, -20% consumo de vigor",
                cd: null,
                icon: "surto"
            }, {
                title: "O poder do bando",
                desc: "A regeneração de vida aumenta,quando há membros da matilha por perto.",
                effect: "Acumula 3 vezes, até +20% regeneração de vida",
                cd: null,
                icon: "rebanhoC"
            },
        ]
    },
    Cristatusaurus = {
        id: 11,
        ativas: [
            {
                title: "Ataque carregado",
                desc: "O dinossauro prepara um ataque poderoso, desferindo-o em até 5 segundos.  Maiores chances de infligir sangramento.",
                effect: "",
                dmg: 615,
                cd: 20,
                icon: "carregada"
            }, {
                title: "Garras Afiadas",
                desc: "Executa um ataque de garras. Aumenta as chances de ifligir sangramento.",
                effect: "",
                dmg: 240,
                cd: 0,
                icon: "garras"
            }
        ],
        passivas: [
            {
                title: "O poder do bando",
                desc: "A defesa aumenta quando há membros da matilha por perto.",
                effect: "Acumula 2 vezes, até + 8% defesa",
                cd: null,
                icon: "rebanhoC"
            }, {
                title: "Elemento nativo",
                desc: "A velocidade aumenta e o consumo de vigor é reduzido, enquanto estiver dentro da água.",
                effect: "+5% velocidade, -20% consumo de vigor",
                cd: null,
                icon: "enativo"
            }, {
                title: "Presente das Profundezas",
                desc: "O consumo de vigor é reduzido após alimentar-se de peixe.",
                effect: "-10% consumo de vigor durante 30 segundos",
                cd: 0,
                icon: "aquatico"
            }
        ]
    },
    Deinocheirus = {
        id: 12,
        ativas: [
            {
                title: "Ataque carregado",
                desc: "O dinossauro prepara um ataque poderoso, desferindo-o em até 5 segundos.  Maiores chances de infligir sangramento e fratura.",
                effect: "",
                dmg: 812,
                cd: 20,
                icon: "carregada"
            }, {
                title: "Estrondo do lagarto",
                desc: "O dinossauro ruge, aumentando temporariamente a velocidade e defesa.",
                effect: "+15% defesa, +3% velocidade",
                dmg: null,
                cd: 0,
                icon: "buffS"
            }
        ],
        passivas: [
            {
                title: "O poder do bando",
                desc: "As chances de aplicar sangramento aumentam quando há membros da matilha por perto.",
                effect: "+2% chance de sangramento",
                cd: null,
                icon: "rebanhoH"
            }, {
                title: "Presente das Profundezas",
                desc: "O consumo de vigor é reduzido após alimentar-se de peixe.",
                effect: "-10% consumo de vigor durante 30 segundos",
                cd: 0,
                icon: "aquatico"
            }, {
                title: "Elemento nativo",
                desc: "A defesa aumenta enquanto estiver dentro da água.",
                effect: "+15% defesa",
                cd: null,
                icon: "enativo"
            }
        ]
    },
    Deinonychus = {
        id: 13,
        ativas: [
            {
                title: "Grito de Guerra",
                desc: "O dinossauro ruge, reduzindo o consumo de vigor durante 25 segundos.",
                effect: "-20% consumo de vigor",
                dmg: null,
                cd: 40,
                icon: "buffS"
            }, {
                title: "Lâminas Afiadas",
                desc: "Desfere um golpe com as patas traseiras. Pode atordoar dinossauros menores.",
                effect: null,
                dmg: 160,
                cd: 10,
                icon: "jump"
            }
        ],
        passivas: [
            {
                title: "O poder do bando",
                desc: "A defesa é aumentada, quando há membros da matilha por perto.",
                effect: "Acumula 3 vezes, até +9% defesa",
                cd: null,
                icon: "rebanhoC"
            }, {
                title: "Surto de poder",
                desc: "O dano e as chances de infligir sangramento aumentam, quando com pouca vida.",
                effect: "+20% dano, +4% chance de sangramento",
                cd: null,
                icon: "surto"
            }
        ]
    },
    Dilophosaurus = {
        id: 14,
        ativas: [
            {
                title: "Arranhão",
                desc: "Desfere um golpe com as patas dianteiras, com maiores chances de infligir sangramento e dano reduzido.",
                effect: null,
                dmg: 100,
                cd: 0,
                icon: "garras"
            },
            {
                title: "Chuva de Golpes",
                desc: "Desfere três mordidas rápidas com maiores chances de infligir sangramento e dano reduzido.",
                effect: null,
                dmg: 140,
                cd: 0,
                icon: "multbite"
            }
        ],
        passivas: [
            {
                title: "Sede de Sangue",
                desc: "Atingir inimigos em sequência garantirá aumento temporário na velocidade e chances de infligir sangramento.",
                effect: "Acumula 10 vezes, +3.6% chances de sangramento, +6% velocidade",
                cd: null,
                icon: "sedeSangue"
            }, {
                title: "O poder do bando",
                desc: "A recuperação de vigor acelera, quando há membros da matilha por perto.",
                effect: "Acumula 5 vezes, até +28% recuperação de vigor",
                cd: null,
                icon: "rebanhoC"
            }
        ]
    },
    Fasolasuchus = {
        id: 15,
        ativas: [
            {
                title: "Ataque carregado",
                desc: "O dinossauro prepara um ataque poderoso, desferindo-o em até 5 segundos.  Maiores chances de infligir sangramento e fratura.",
                effect: null,
                dmg: 686,
                cd: 20,
                icon: "carregada"
            },
            {
                title: "Capturar",
                desc: "Agarra uma presa com a boca, consumido vigor para segurá-la. Funciona apenas com animais menores. Reduz a velocidade.",
                effect: "-15% velocidade",
                dmg: 245,
                cd: 0,
                icon: "capturarF"
            }
        ],
        passivas: [
            {
                title: "Surto de poder",
                desc: "O consumo de vigor é reduzido e a velocidade aumenta, quando com pouca vida.",
                effect: "+5% velocidade, -25% consumo de vigor",
                cd: null,
                icon: "surto"
            }, {
                title: "O poder do bando",
                desc: "As chances de aplicar fratura aumentam, quando há membros da matilha por perto.",
                effect: "Acumula 3 vezes, até +1% chance de fratura",
                cd: null,
                icon: "rebanhoC"
            }
        ]
    },
    Giganotosaurus = {
        id: 16,
        ativas: [
            {
                title: "Mordida Dupla",
                desc: "Desfere duas mordidas rápidas, com maiores chances de infligir sangramento.",
                effect: null,
                dmg: 320,
                cd: 9,
                icon: "cranio"
            },
            {
                title: "Terremoto",
                desc: "Pisa no chão, causando dano em área e lentidão aos atingidos. Pode repelir e/ou atordoar inimigos menores.",
                effect: null,
                dmg: 0,
                cd: 12,
                icon: "terremoto"
            }
        ],
        passivas: [
            {
                title: "Fúria Insaciável",
                desc: "Ser atingido em sequência garantirá aumento temporário na defesa.",
                effect: "Acumula 8 vezes, +5% defesa",
                cd: null,
                icon: "furia"
            }, {
                title: "Sede de Sangue",
                desc: "Infligir sangramento em inmigos aumenta a velocidade e reduz o consumo de vigor.",
                effect: "+4% velocidade, -10% consumo de vigor",
                cd: null,
                icon: "sedeSangue"
            }, {
                title: "Armadu Resistente",
                desc: "Tem chances de roubar parte do vigor ao atacar um inimigo.",
                effect: "valor desconhecido",
                cd: null,
                icon: "armadura"
            }

        ]
    },
    Gigantoraptor = {
        id: 17,
        ativas: [
            {
                title: "Chute",
                desc: "Desfere um golpe com as patas traseiras. Pode repelir e/ou atordoar dinossauros menores.",
                effect: null,
                dmg: 250,
                cd: 0,
                icon: "chute"
            },
            {
                title: "Chuva de Golpes",
                desc: "Desfere quatro bicadas rápidas com maiores chances de infligir sangramento e dano reduzido. Ataques consecutivos reduzem o dano causado.",
                effect: null,
                dmg: 110,
                cd: 0,
                icon: "chuvagolpes"
            }
        ],
        passivas: [
            {
                title: "Instinto Materno",
                desc: "Quando próximo a um ninho, o dano é aumentado de acordo com a quantidade de ovos restantes",
                effect: "Acumula 3 vezes, até +18%",
                cd: null,
                icon: "ninho"
            }, {
                title: "O poder do bando",
                desc: "O dano aumenta, quando há membros da matilha por perto.",
                effect: "Acumula 2 vezes, até +18% dano",
                cd: null,
                icon: "rebanhoC"
            }
        ]
    },
    Guanlong = {
        id: 18,
        ativas: [
            {
                title: "Ataque carregado",
                desc: "O dinossauro prepara um ataque poderoso, desferindo-o em até 5 segundos.  Maiores chances de infligir sangramento.",
                effect: null,
                dmg: 336,
                cd: 20,
                icon: "carregada"
            }, {
                title: "Grito de Guerra",
                desc: "O dinossauro ruge, aumentando temporariamente as chances de infligir sangramento.",
                effect: "+15% chance de sangramento bruta",
                dmg: null,
                cd: 0,
                icon: "sangra"
            }
        ],
        passivas: [
            {
                title: "Poder do Bando",
                desc: "A defesa é aumentada, quando há membros da matilha por perto.",
                effect: "Acumula 3 vezes, até -13% consumo de vigor",
                cd: null,
                icon: "rebanhoC"
            }, {
                title: "Força das trevas",
                desc: "O consumo de vigor é reduzido durante a noite.",
                effect: "-20% consumo de vigor",
                cd: null,
                icon: "hora"
            }
        ]
    },
    Kentrosaurus = {
        id: 19,
        ativas: [
            {
                title: "Chuva de Golpes",
                desc: "Ataca três vezes com a cauda. As chances de infligir sangramento são maiores",
                effect: null,
                dmg: 230,
                cd: 35,
                icon: "tago"
            },
            {
                title: "Armadura",
                desc: "O dinossauro agita as placas, aumentando a defesa durante 20 segundos.",
                effect: "+25% defesa",
                cd: 50,
                icon: "defesa"
            }
        ],
        passivas: [
            {
                title: "Instinto Primordial",
                desc: "Enquanto seu dinossauro estiver sangrando, os ataques terão maior probabilidade de infligir sangramento",
                effect: "+9% chnace de sangramento",
                cd: null,
                icon: "instinto"
            }, {
                title: "Poder do Bando",
                desc: "As chances de infligir sangramento aumentadam, quando há membros da matilha por perto.",
                effect: "Acumula, até +4% chance de sangramento",
                cd: null,
                icon: "rebanhoC"
            }, {
                title: "Surto de poder",
                desc: "O consumo de vigor é reduzido e a velocidade aumenta, quando com pouca vida.",
                effect: "+5% velocidade, -20% consumo de vigor",
                cd: null,
                icon: "surto"
            }
        ]
    },
    Megaraptor = {
        id: 20,
        ativas: [
            {
                title: "Garras Afiadas",
                desc: "Desfere dois golpes com as patas dianteiras, com maiores chances de infligir sangramento.",
                effect: null,
                dmg: 245,
                cd: 0,
                icon: "garras"
            }, {
                title: "Rugido Aterrorizante",
                desc: "O dinossauro ruge, reduzindo o conforto de inimigos próximos continuadamente.",
                effect: "+30% conforto inimigo",
                dmg: null,
                cd: 0,
                icon: "rugido"
            }
        ],
        passivas: [
            {
                title: "Poder Acumulado",
                desc: "O primeiro ataque, após um periodo fora de combate, causa dano aumentado.",
                effect: "+30% dano",
                cd: 0,
                icon: "poderacumulado",
            },
            {
                title: "Força das trevas",
                desc: "Durante a noite, o consumo de vigor é reduzido e as chances de infligir sangramento são aumentadas.",
                effect: "+5% chance de sangramento, -15% consumo de vigor",
                cd: null,
                icon: "devorador"
            }, {
                title: "Poder do Bando",
                desc: "O consumo de vigor é reduzido, quando há membros da matilha por perto.",
                effect: "Acumula 2 vezes, até -10% consumo de vigor",
                cd: null,
                icon: "rebanhoC"
            }
        ]
    },
    Ornithomimus = {
        id: 21,
        ativas: [
            {
                title: "Incentivo",
                desc: "O dinossauro ruge, reduzindo o consumo de vigor durante 20 segundos.",
                effect: "-15% consumo de vigor",
                dmg: null,
                cd: 35,
                icon: "buffS"
            }, {
                title: "Chute",
                desc: "Desfere um golpe com as patas traseiras. Pode repelir e/ou atordoar dinossauros menores.",
                effect: null,
                dmg: 150,
                cd: 10,
                icon: "chute"
            }
        ],
        passivas: [
            {
                title: "Instinto Materno",
                desc: "Quando próximo ao ninho, o dano é aumentado de acordo com a quantidade de ovos restantes",
                effect: "Acumula 3 vezes, até +14% dano",
                cd: null,
                icon: "ninho"
            }, {
                title: "Corredor de Maratona",
                desc: "A recuperação de vigor aumenta, quando há membros da matilha por perto.",
                effect: "Acumula 2 vezes, até +15% regeneração de vigor",
                cd: null,
                icon: "rebanhoH"
            }, {
                title: "Surto de poder",
                desc: "A defesa aumenta, quando com pouca vida.",
                effect: "+15% vida",
                cd: null,
                icon: "surto"
            }
        ]
    },
    Pachycephalosaurus = {
        id: 22,
        ativas: [
            {
                title: "Ataque carregado",
                desc: "O dinossauro prepara um ataque poderoso, desferindo-o em até 5 segundos. Maiores chances de infligir fratura.",
                effect: null,
                dmg: 518,
                cd: 20,
                icon: "carregada"
            }, {
                title: "Investida",
                desc: "O dinossauro avança em alta velocidade durante seis segundos, apliacando dano ao se chocar com um inimigo. O dano aumenta conforme a distância. O raio de giro é reduzido. As chances de aplicar fratura são aumentadas.",
                effect: "+25% velocidade. +15% consumo de vigor",
                dmg: 457,
                cd: 45,
                icon: "investidaP"
            }
        ],
        passivas: [
            {
                title: "O Poder do Bando",
                desc: "A defesa aumenta, quando há membros da matilha por perto.",
                effect: "Acumula 3 vezes, até +13% defesa",
                cd: null,
                icon: "rebanhoH"
            }, {
                title: "Surto de poder",
                desc: "A velocidade e chances de infligir fratura aumentam, quando com pouca vida.",
                effect: "+5% velocidade e chance de fratura",
                cd: null,
                icon: "surtoP"
            }
        ]
    },
    Pachyrhinosaurus = {
        id: 23,
        ativas: [
            {
                title: "Investida",
                desc: "O dinossauro avança em alta velocidade durante seis segundos, apliacando dano ao se chocar com um inimigo. O dano aumenta conforme a distância. O raio de giro é reduzido durante o avanço. As chances de aplicar fratura são aumentadas.",
                effect: "+25% velocidade. +15% consumo de vigor",
                dmg: 0,
                cd: 0,
                icon: "investida"
            }, {
                title: "Terremoto",
                desc: "Ergue as patas dianteiras e pisa no chão, causando dano em área. Pode repelir e/ou atordoar inimigos menores.",
                effect: null,
                dmg: 0,
                cd: 12,
                icon: "terremoto"
            }

        ],
        passivas: [
            {
                title: "O Poder do Bando",
                desc: "A regeneração de vida aumenta, quando há membros da matilha por perto.",
                effect: "+20% regeneração de vida",
                cd: null,
                icon: "rebanhoH"
            }, {
                title: "Surto de poder",
                desc: "A velocidade aumenta e o consumo de vigor é reduzido, quando com pouca vida.",
                effect: "+5% velocidade, -20% gasto de vigor",
                cd: null,
                icon: "surto"
            }
        ]
    },
    Parasaurolophus = {
        id: 24,
        ativas: [
            {
                title: "Chute",
                desc: "Desfere um golpe com as patas traseiras. Pode repelir e/ou atordoar dinossauros menores.",
                effect: null,
                dmg: 350,
                cd: 7,
                icon: "coice"
            }, {
                title: "Rugido Intimidador",
                desc: "O dinossauro ruge, reduzindo o consumo a defesa inimiga durante 20 segundos.",
                effect: "-15% defesa inimiga",
                dmg: null,
                cd: 50,
                icon: "rugido"
            }
        ],
        passivas: [
            {
                title: "Surto de poder",
                desc: "A velocidade aumenta e o consumo de vigor é reduzido, quando com pouca vida.",
                effect: "+5% velocidade, -20% gasto de vigor",
                cd: null,
                icon: "surto"
            }
        ]
    },
    Plateosaurus = {
        id: 25,
        ativas: [
            {
                title: "Chicote de Cauda",
                desc: "Um golpe de cauda em área que causa repulsão. Pode causar sangramento.",
                effect: null,
                dmg: 220,
                cd: 2,
                icon: "cauda"
            }
        ],
        passivas: [
            {
                title: "O Poder do Bando",
                desc: "A defesa é aumentada, quando há membros da matilha por perto.",
                effect: "Acumula 2 vezes, até + 11% defesa",
                cd: null,
                icon: "rebanhoH"
            }, {
                title: "Surto de poder",
                desc: "A velocidade aumenta e o consumo de vigor é reduzido, quando com pouca vida.",
                effect: "+5% velocidade, -20% gasto de vigor",
                cd: null,
                icon: "surto"
            }
        ]
    },
    Psittacosaurus = {
        id: 36,
        ativas: [
            {
                title: "grito de Cura",
                desc: "O dinossauro ruge, aprimorando a regeneação de vida aliada durante 20 segundos.",
                effect: "+20% regeneração de vida",
                dmg: null,
                cd: 50,
                icon: "rugido"
            }
        ],
        passivas: [
            {
                title: "Surto de poder",
                desc: "A velocidade aumenta e o consumo de vigor é reduzido, quando com pouca vida.",
                effect: "+5% velocidade, -20% gasto de vigor",
                cd: null,
                icon: "surto"
            }, {
                title: "Instinto Materno",
                desc: "Quando próximo ao ninho, o dano é aumentado de acordo com a quantidade de ovos restantes",
                effect: "Acumula 3 vezes, até +14% dano",
                cd: null,
                icon: "ninho"
            }
        ]
    },
    Quetzalcoatlus = {
        id: 27,
        ativas: [
            {
                title: "Capturar",
                desc: "Agarra uma presa com a boca, consumido vigor para segurá-la. Funciona apenas com animais menores. Reduz a velocidade.",
                effect: "-15% velocidade",
                dmg: 160,
                cd: 0,
                icon: "capturarQ"
            }
        ], 
        passivas: [
            {
                title: "O poder do bando",
                desc: "O dano aumenta, quando há membros da matilha por perto.",
                effect: "Acumula 3 vezes, até +10% dano",
                cd: null,
                icon: "rebanhoC"
            }, {
                title: "Surto de poder",
                desc: "A velocidade aumenta e o consumo de vigor é reduzido, quando com pouca vida.",
                effect: "+5% velocidade, -20% gasto de vigor",
                cd: null,
                icon: "surto"
            }
        ]
    }, 
    Sarcosuchus = {
        id: 28,
        ativas: [
            {
                title: "Mordida Mortal",
                desc: "O dinossauro desfere um golpe forte. que reduz o vigor e oxigênio do atingido. As chances de infligir sangramento e fratura são aumentadas.",
                effect: null,
                dmg: 350,
                cd: 0,
                icon: "mordida"
            }, {
                title: "Capturar",
                desc: "Agarra uma presa com a boca, consumido vigor para segurá-la. Funciona apenas com animais menores. Reduz a velocidade.",
                effect: "-15% velocidade",
                dmg: 300,
                cd: 0,
                icon: "capturarS"
            }
        ], 
        passivas: [
            {
                title: "O poder do bando",
                desc: "As chances de aplicar fratura aumentam, quando há membros da matilha por perto.",
                effect: "Acumula 2 vezes, até +1% chance de fratura",
                cd: null,
                icon: "rebanhoC"
            }, {
                title: "Surto de poder",
                desc: "A defesa, quando com pouca vida.",
                effect: "+10% defesa",
                cd: null,
                icon: "surto"
            }, {
                title: "Presente das Profundezas",
                desc: "O consumo de vigor é reduzido após alimentar-se de peixe.",
                effect: "-10% consumo de vigor durante 30 segundos",
                cd: 0,
                icon: "aquatico"
            }, {
                title: "Elemento nativo",
                desc: "A defesa e o dano aumentam, enquanto estiver dentro da água.",
                effect: "+25% defesa, +10% dano",
                cd: null,
                icon: "enativo"
            }
        ]
    }
];