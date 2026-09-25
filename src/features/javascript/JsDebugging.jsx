import { Code, InlineCode, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { REACT_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={REACT_ACCENT}>JavaScript — déboguer : quand ça ne marche pas</H2>

      <H3>Trois types d'erreurs</H3>
      <Table
        head={["Type", "Description", "Exemple"]}
        rows={[
          ["Erreur de syntaxe", "Faute d'écriture qui empêche le programme de s'exécuter ; généralement accompagnée d'un message", "guessSubmit.addeventListener() au lieu de addEventListener()"],
          ["Erreur d'exécution", "Syntaxe correcte, mais échec pendant l'exécution", "lowOrHi.textContent = ... alors que lowOrHi vaut null"],
          ["Erreur de logique", "Le code tourne mais produit un mauvais résultat ; aucun message, la plus difficile à trouver", "Math.floor(Math.random()) + 1 renvoie toujours 1"],
        ]}
      />

      <H3>La console du navigateur</H3>
      <Ul>
        <li>Ouvrir les outils de développement : <InlineCode>F12</InlineCode> ou clic droit → Inspecter, onglet <strong>Console</strong>.</li>
        <li>Les erreurs affichent le nom du fichier, le numéro de ligne et la position du caractère.</li>
      </Ul>
      <Code>{`Uncaught TypeError: guessSubmit.addeventListener is not a function
number-game-errors.html:87:19          ← ligne 87, caractère 19`}</Code>
      <Code>{`const lowOrHi = document.querySelector(".lowOrHi");
console.log(lowOrHi);        // affiche la valeur dans la console : est-elle bien un élément ?`}</Code>

      <H3>Messages d'erreur courants</H3>
      <Table
        head={["Message", "Cause probable", "Correction"]}
        rows={[
          ["TypeError: x is not a function", "Nom de méthode mal écrit (JavaScript est sensible à la casse)", "Vérifier l'orthographe exacte"],
          ["TypeError: x is null", "La variable ne référence aucun élément", "Vérifier le sélecteur (.classe et non classe)"],
          ["SyntaxError: missing ) after argument list", "Parenthèse fermante manquante", "Ajouter )"],
          ["SyntaxError: missing } after function body", "Accolade fermante manquante", "Ajouter }"],
          ["SyntaxError: string literal contains an unescaped line break", "Guillemet fermant oublié", "Fermer la chaîne avec \" ou '"],
        ]}
      />

      <H3>Exemple : corriger le jeu de devinette</H3>
      <Code>{`// ❌ Nom de méthode incorrect
guessSubmit.addeventListener("click", checkGuess);
// ✅
guessSubmit.addEventListener("click", checkGuess);

// ❌ Sélecteur de classe sans le point : cherche une balise
const lowOrHi = document.querySelector("lowOrHi");
// ✅
const lowOrHi = document.querySelector(".lowOrHi");

// ❌ Math.random() < 1, donc floor(...) = 0, +1 = toujours 1
let randomNumber = Math.floor(Math.random()) + 1;
// ✅
let randomNumber = Math.floor(Math.random() * 100) + 1;

// ❌ Affectation au lieu de comparaison
} else if (guessCount = 10) {
// ✅ Égalité stricte
} else if (guessCount === 10) {`}</Code>

      <H3>Méthode de travail</H3>
      <Ul>
        <li>Ouvrir la console et lire le message d'erreur avec son numéro de ligne.</li>
        <li>Chercher sur MDN les erreurs inconnues.</li>
        <li>Utiliser <InlineCode>console.log()</InlineCode> pour vérifier les valeurs des variables.</li>
        <li>Corriger <strong>une erreur à la fois</strong>, recharger, puis retester.</li>
      </Ul>
      <Note accent={REACT_ACCENT}>
        Une erreur en cache d'autres : après la première correction, de
        nouveaux messages peuvent apparaître.
      </Note>

      <SourceLink href="https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_went_wrong">
        MDN — What went wrong? Troubleshooting JavaScript
      </SourceLink>
    </div>
  );
}

export default function JsDebugging() {
  return <Fr />;
}
