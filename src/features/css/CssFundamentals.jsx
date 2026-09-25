import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { REACT_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={REACT_ACCENT}>CSS — les fondamentaux</H2>
      <P>
        CSS (Cascading Style Sheets) sert à styliser le HTML. Le principe :{" "}
        <strong>sélectionner</strong> un élément HTML, <strong>choisir une
        propriété</strong> à modifier, lui <strong>appliquer une valeur</strong>.
      </P>

      <H3>Syntaxe</H3>
      <Code>{`selecteur-d-element {
  une-propriete: valeur;
  une-autre-propriete: valeur;
}`}</Code>
      <P>
        Une propriété + sa valeur forment une <strong>déclaration</strong> (ex.{" "}
        <InlineCode>text-align: center;</InlineCode>). Par lisibilité, une
        déclaration par ligne : plus facile à lire, et à étendre plus tard,
        même quand la règle n'en contient qu'une seule.
      </P>

      <H3>Appliquer du CSS au HTML</H3>
      <Table
        head={["Méthode", "Où", "Remarque"]}
        rows={[
          ["Feuille externe", "Fichier .css séparé, lié depuis le HTML", "La plus courante ; un seul fichier peut styliser plusieurs pages"],
          ["Feuille interne", "Élément <style> dans le <head>", "Propre à un seul document HTML"],
          ["Style en ligne", "Attribut style d'un élément", "Ne touche qu'un élément ; prime sur toute autre feuille"],
        ]}
      />
      <Code>{`<!-- Externe : dans le <head> -->
<link rel="stylesheet" href="styles.css">

/* styles.css */
h1 {
  color: deepskyblue;
  text-align: center;
}

<!-- Interne -->
<head>
  <style>
    h1 { color: deepskyblue; text-align: center; }
  </style>
</head>

<!-- En ligne -->
<h1 style="color: deepskyblue;">Hello CSS!</h1>`}</Code>
      <Note accent={REACT_ACCENT}>
        Un style en ligne l'emporte toujours sur les feuilles de style.
      </Note>

      <H3>CSS invalide</H3>
      <Ul>
        <li>
          Propriété ou valeur inconnue (faute de frappe, ou trop récente pour
          le navigateur) : la <strong>déclaration est ignorée</strong>, le
          navigateur passe à la suivante.
        </li>
        <li>
          Sélecteur inconnu : la <strong>règle entière est ignorée</strong>.
        </li>
        <li>
          D'où l'intérêt de valider son CSS ; les outils de développement du
          navigateur signalent aussi les propriétés ou valeurs invalides.
        </li>
      </Ul>

      <SourceLink href="https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics">
        MDN — CSS first steps / Styling basics
      </SourceLink>
    </div>
  );
}

export default function CssFundamentals() {
  return <Fr />;
}
