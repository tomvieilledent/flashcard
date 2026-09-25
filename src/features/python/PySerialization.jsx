import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { TOOL_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={TOOL_ACCENT}>Marshaling et sérialisation</H2>
      <P>
        Deux techniques qui transforment la représentation mémoire d'un objet
        en un format facile à stocker ou à transmettre, puis à reconstruire.
        Les termes sont souvent employés l'un pour l'autre, mais ils diffèrent
        par des nuances.
      </P>

      <H3>Sérialisation vs marshaling</H3>
      <Table
        head={["", "Sérialisation", "Marshaling"]}
        rows={[
          ["Définition", "Convertir l'état d'un objet (ses données) en flux d'octets ou en format stockable / transmissible", "Plus complet : représente aussi les définitions de type et d'autres informations"],
          ["But principal", "Persistance (sauvegarder l'état) ou envoi sur un réseau", "Recréer l'objet dans un autre environnement ou un autre langage"],
          ["Usage typique", "Fichiers, bases, échanges de données", "Appels de procédure distante (RPC)"],
        ]}
      />

      <H3>Sérialiser en Python avec pickle</H3>
      <Code>{`import pickle

# Sérialisation d'un dictionnaire
data = {"name": "John", "age": 30, "city": "New York"}

with open("data.pkl", "wb") as file:        # mode binaire
    pickle.dump(data, file)

# Désérialisation
with open("data.pkl", "rb") as file:
    loaded_data = pickle.load(file)

print(loaded_data)`}</Code>
      <Note accent={TOOL_ACCENT}>
        <InlineCode>pickle</InlineCode> est propre à Python et peut exécuter du
        code arbitraire au chargement : ne chargez jamais un pickle de source
        non fiable. Pour échanger avec d'autres langages, préférez JSON.
      </Note>

      <H3>Marshaling en C</H3>
      <P>
        C n'a pas de mécanisme de marshaling intégré. Le cas de base est la
        conversion des entiers en ordre réseau (<InlineCode>htonl</InlineCode>{" "}
        / <InlineCode>ntohl</InlineCode>) : voir la section « C — marshaling et
        ordre des octets ».
      </P>

      <H3>Bénéfices et précautions</H3>
      <Table
        head={["", "Détail"]}
        rows={[
          ["Interopérabilité", "Des systèmes ou langages différents comprennent et traitent la donnée"],
          ["Persistance", "Stockage non volatil, relecture sans perte d'information"],
          ["Transmission", "Envoi sur un réseau ou entre processus"],
          ["Performance", "Le processus peut être coûteux en calcul"],
          ["Sécurité", "Des données sérialisées peuvent être attaquées si elles ne sont pas protégées"],
          ["Versionnage", "Modifier une structure peut rendre inutilisables les données déjà sérialisées"],
        ]}
      />
      <Ul>
        <li>Toujours valider / vérifier la source avant de désérialiser.</li>
        <li>Versionner le format (champ <InlineCode>version</InlineCode>) pour évoluer sans casser l'existant.</li>
      </Ul>

      <SourceLink href="https://docs.python.org/3/library/pickle.html">
        docs.python.org — pickle
      </SourceLink>
      {" · "}
      <SourceLink href="https://en.wikipedia.org/wiki/Remote_procedure_call">
        Wikipedia — Remote procedure call
      </SourceLink>
    </div>
  );
}

export default function PySerialization() {
  return <Fr />;
}
