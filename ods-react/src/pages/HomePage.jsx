const releaseOrder = [
  ["Giganotosaurus", 1],
  ["Changyuraptor", 2],
  ["Stegosaurus", 3],
  ["Megaraptor", 4],
  ["Austroraptor", 5],
  ["Deinonychus", 6],
  ["Dilophosaurus", 7],
  ["Carnotaurus", 8],
  ["Styracosaurus", 8],
  ["Suchomimus", 9],
  ["Fasolasuchus", 10],
  ["Amargasaurus", 10],
  ["Psittacosaurus", 11],
  ["Gigantoraptor", 11],
  ["Deinocheirus", 12],
  ["Concavenator", 13],
  ["Therizinosaurus", 14],
  ["Quetzalcoatlus", 15],
  ["Barbaridactylus", 16],
  ["Spinosaurus", 17],
  ["Triceratops", 17],
  ["Tyrannosaurus", 17],
  ["Ceratosaurus", 18],
  ["Allosaurus", 18],
  ["Plateosaurus", 19],
  ["Parasaurolophus", 19],
  ["Coelophysis", 20],
  ["Guanlong", 20],
  ["Pachyrhinosaurus", 21],
  ["Ornithomimus", 22],
  ["Pachycephalosaurus", 22],
  ["Kentrosaurus", 22],
  ["Sarcosuchus", 23],
  ["Tarchia", 24],
]

export default function HomePage() {
  return (
    <>
      <h1>The Cursed Isle</h1>

      <section className="info-jogo">
        <h2>O que é The Cursed Isle?</h2>
        <div className="texto-info">
          <p>
            The Cursed Dinosaur Isle (TCI) ou Online Dinosaur Simulator é um simulador de
            sobrevivência com proposta realista focado em dispositivos móveis, onde os jogadores
            assumem o papel de criaturas pré-históricas em um ecossistema online.
          </p>
        </div>
      </section>

      <section className="content-section">
        <div className="texto-info">
          <p>
            Esta tabela representa a ordem na qual os modelos atuais chegaram ao jogo, sendo o
            número 1 o modelo adicionado mais recentemente.
          </p>
        </div>

        <div className="table-container">
          <table className="tabela-simples">
            <thead>
              <tr>
                <th>Dinossauro</th>
                <th>Idade</th>
              </tr>
            </thead>
            <tbody>
              {releaseOrder.map(([name, age]) => (
                <tr key={`${name}-${age}`}>
                  <td>{name}</td>
                  <td>{age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
