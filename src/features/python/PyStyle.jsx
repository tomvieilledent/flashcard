import { Code, InlineCode, P, H2, H3, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { TOOL_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={TOOL_ACCENT}>Python — style PEP 8 & pycodestyle</H2>
      <P>
        <strong>PEP 8</strong> est le guide de style officiel de Python.{" "}
        <InlineCode>pycodestyle</InlineCode> (anciennement{" "}
        <InlineCode>pep8</InlineCode>) vérifie automatiquement le code : c'est
        l'équivalent de Betty pour le C. Un seul fichier Python, sans
        dépendance, avec une architecture à plugins pour ajouter ses propres
        vérifications.
      </P>

      <H3>Utilisation</H3>
      <Code>{`pip install pycodestyle
pycodestyle mon_fichier.py                     # vérifie un fichier
pycodestyle --first optparse.py                # première occurrence de chaque erreur
pycodestyle --show-source --show-pep8 fichier.py   # code fautif + règle PEP 8
pycodestyle --statistics -qq dossier/          # statistiques par type d'erreur
pycodestyle --max-line-length=100 src/         # ajuste une limite`}</Code>
      <P>Format de sortie : fichier, ligne, colonne, code, message.</P>
      <Code>{`optparse.py:69:11: E401 multiple imports on one line
optparse.py:77:1: E302 expected 2 blank lines, found 1
optparse.py:88:5: E301 expected 1 blank line, found 0`}</Code>

      <H3>Codes d'erreur fréquents</H3>
      <Table
        head={["Code", "Signification"]}
        rows={[
          ["E201", "Espace après une parenthèse ouvrante"],
          ["E301", "1 ligne vide attendue (entre méthodes)"],
          ["E302", "2 lignes vides attendues (entre fonctions / classes)"],
          ["E401", "Plusieurs imports sur une ligne"],
          ["E501", "Ligne trop longue (> 79 caractères)"],
          ["W…", "Avertissements (ex. espaces en fin de ligne)"],
        ]}
      />

      <H3>Règles principales de PEP 8</H3>
      <Table
        head={["Règle", "Détail"]}
        rows={[
          ["Indentation", "4 espaces, pas de tabulations"],
          ["Longueur de ligne", "79 caractères maximum"],
          ["Lignes vides", "2 entre fonctions / classes de haut niveau, 1 entre méthodes ; ponctuellement dans un bloc"],
          ["Commentaires", "Sur leur propre ligne quand c'est possible"],
          ["Imports", "Un par ligne, en haut du fichier (stdlib, tiers, local)"],
          ["Espaces", "Autour des opérateurs et après la virgule : a = f(1, 2) + g(3, 4)"],
          ["Nommage", "CapWords (classes), lowercase_with_underscores (fonctions, méthodes, variables), UPPER_CASE (constantes), self en premier argument des méthodes"],
          ["Encodage", "UTF-8 par défaut ; éviter les identifiants non ASCII"],
        ]}
      />
      <Code>{`# Mal
def Calcul( a,b ):
    x=a+b
    return x

# Bien
def calcul(a, b):
    total = a + b
    return total`}</Code>
      <P>
        Les docstrings suivent la convention PEP 257 : une première ligne de
        résumé courte (majuscule, point final), une ligne vide, puis le détail.
        Elles sont vérifiées par un outil distinct,{" "}
        <InlineCode>pydocstyle</InlineCode>.
      </P>

      <SourceLink href="https://pypi.org/project/pycodestyle/">
        pypi.org — pycodestyle
      </SourceLink>
      {" · "}
      <SourceLink href="https://docs.python.org/3/tutorial/controlflow.html">
        docs.python.org — Intermezzo : coding style
      </SourceLink>
    </div>
  );
}

export default function PyStyle() {
  return <Fr />;
}
