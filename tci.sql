create database if not exists tciStatus;

use tciStatus;

create table if not exists playble(
	nome varchar(25),
    versao varchar(20),
    hp int,
    dano int,
    pesoCombate int,
    velocidade int,
    natacao int,
    voo int,       
    pesoSugerido int,
    defesa decimal(5, 4),
    tempoCrescimento int,         
    sangramento int,
    fratura int
);

insert into playble
values
("Allo", "v1.0", 3300, 240, 1350, 1500, 550, null, 1.00, 38, 29, 0),
("Amarga", "v1.0", 4000, 250, 1500, 1390, 500, null, 1.00, 48, 20, 5),
("Austroraptor", "v1.0", 1550, 150, 1200, 1820, 780, null, 1.00, 24, 18, 0),
("Barbaridactylus", "v1.0", 1000, 120, 1000, 1200, 600, 2800, 1.00, 31, 8, 0),
("Carnotaurus", "v1.0", 3000, 200, 1350, 1800, 500, null, 1.00, 29, 24, 0),
("Changyuraptor", "v1.0", 400, 60, 750, 2050, 280, null, 1.00, 12, 25, 0),
("Ceratosaurus", "v1.0", 2650, 220, 1200, 1700, 650, null, 1.00, 39, 24, 0),
("Coelophysis", "v1.0", 550, 80, 750, 2050, 350, null, 1.00, 15, 28, 0),
("Concavenator", "v1.0", 2200, 140, 1250, 1720, 630, null, 1.00, 32, 25, 0),
("Deinocheirus", "v1.0", 4375, 250, 1650, 1310, 800, null, 1.00, 48, 28, 4),
("Deinonychus", "v1.0", 850, 120, 950, 1900, 400, null, 1.00, 18, 21, 0),
("Dilophosaurus", "v1.0", 1800, 160, 1200, 1750, 550, null, 1.00, 28, 33, 0),
("Fasolasuchus", "v1.0", 3000, 245, 1250, 1500, 625, null, 1.00, 29, 12, 15),
("Giganotosaurus", "v1.0", 4450, 280, 1750, 1335, 520, null, 1.00, 48, 34, 3),
("Gigantoraptor", "v1.0", 3100, 180, 1350, 1700, 480, null, 1.00, 42, 15, 0),
("Guanlong", "v1.0", 1150, 120, 1000, 1880, 500, null, 1.00, 28, 24, 0),
("Kentrosaurus", "v1.0", 2700, 250, 1500, 1480, 500, null, 1.00, 39, 30, 0),
("Megaraptor", "v1.0", 2845, 245, 1300, 1660, 550, null, 1.00, 38, 25, 0),
("Ornithomimus", "v1.0", 1200, 100, 900, 2000, 450, null, 1.00, 17, 11, 0),
("Pachycephalosaurus", "v1.0", 2000, 185, 1100, 1650, 400, null, 1.00, 28, 0, 14),
("Pachyrhinosaurus", "v1.0", 3600, 250, 1500, 1370, 500, null, 1.00, 36, 0, 13),
("Parasaurolophus", "v1.0", 3600, 200, 1550, 1500, 500, null, 1.00, 29, 0, 7),
("Plateosaurus", "v1.0", 3450, 180, 1500, 1500, 700, null, 1.00, 31, 10, 0),
("Psittacosaurus", "v1.0", 980, 110, 1000, 1880, 400, null, 1.00, 20, 14, 0),
("Quetzalcoatlus", "v1.0", 1800, 160, 1150, 1400, 600, 2200, 1.00, 41, 9, 0),
("Sarcosuchus", "v1.0", 3650, 300, 1500, 1100, 2100, null, 1.00, 48, 21, 11),
("Spinosaurus", "v1.0", 4440, 265, 1750, 1250, 1250, null, 1.00, 48, 25, 2),
("Stegosaurus", "v1.0", 3900, 300, 1500, 1310, 450, null, 1.00, 40, 18, 6),
("Styracosaurus", "v1.0", 3000, 220, 1400, 1450, 500, null, 1.00, 39, 23, 0),
("Suchomimus", "v1.0", 3700, 210, 1450, 1425, 850, null, 1.00, 41, 25, 2),
("Tarchia", "v1.0", 3735, 325, 1500, 1215, 400, null, 1.00, 39, 0, 25),
("Therizinosaurus", "v1.0", 3700, 305, 1500, 1365, 450, null, 1.00, 48, 19, 0),
("Triceratops", "v1.0", 4875, 270, 1650, 1265, 450, null, 1.00, 48, 22, 5),
("Tyrannosaurus", "v1.0", 4500, 340, 1750, 1285, 450, null, 1.00, 56, 4, 22);