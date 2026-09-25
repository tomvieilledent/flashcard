import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { REACT_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={REACT_ACCENT}>JavaScript — le DOM : sélectionner, créer, modifier</H2>

      <H3>Qu'est-ce que le DOM ?</H3>
      <P>
        Le <strong>Document Object Model</strong> est la représentation en
        arbre du HTML construite par le navigateur : une hiérarchie d'objets
        que JavaScript peut lire et modifier après le chargement de la page.
      </P>
      <Table
        head={["Objet du navigateur", "Rôle"]}
        rows={[
          ["Window", "L'onglet du navigateur (innerWidth, innerHeight)"],
          ["Navigator", "Identité et état du navigateur"],
          ["Document", "La page chargée : celle qu'on manipule"],
        ]}
      />
      <Ul>
        <li><strong>Nœud racine</strong> : le sommet de l'arbre (l'élément html).</li>
        <li><strong>Enfant / descendant / parent / frère</strong> : les relations entre nœuds.</li>
      </Ul>

      <H3>Sélectionner des éléments</H3>
      <Code>{`const element = document.querySelector(".ma-classe");     // premier élément trouvé, ou null
const elements = document.querySelectorAll("p.warning, p.note");   // NodeList de tous

document.getElementById("myId");          // méthodes plus anciennes
document.getElementsByTagName("p");`}</Code>
      <Ul>
        <li>Les méthodes de l'API Selectors acceptent tout sélecteur CSS et des listes séparées par des virgules ; elles sont disponibles sur <InlineCode>Document</InlineCode> et sur <InlineCode>Element</InlineCode>.</li>
        <li><InlineCode>querySelectorAll()</InlineCode> renvoie une collection <strong>statique</strong> : elle ne suit pas les changements ultérieurs du DOM.</li>
        <li>Oublier le point d'une classe (<InlineCode>querySelector("lowOrHi")</InlineCode> au lieu de <InlineCode>".lowOrHi"</InlineCode>) cherche une balise, pas une classe.</li>
      </Ul>

      <H3>Créer, placer, déplacer, supprimer</H3>
      <Code>{`const para = document.createElement("p");
const text = document.createTextNode("Du texte");
para.appendChild(text);
parent.appendChild(para);          // ajoute comme dernier enfant

section.appendChild(existant);     // DÉPLACE l'élément (ne copie pas)
const clone = element.cloneNode(true);   // copie (true : avec les descendants)

element.remove();                  // moderne
parent.removeChild(child);         // ancien`}</Code>

      <H3>Texte, attributs, styles, classes</H3>
      <Code>{`link.textContent = "Nouveau texte";
link.href = "https://example.com";
element.getAttribute("href");
element.setAttribute("href", "https://example.com");

// Style en ligne : propriétés en camelCase
para.style.color = "white";
para.style.backgroundColor = "black";   // background-color → backgroundColor
para.style.textAlign = "center";

// Recommandé : basculer des classes CSS
para.classList.add("highlight");
para.classList.remove("highlight");
para.classList.toggle("highlight");`}</Code>

      <H3>Événements</H3>
      <Code>{`button.addEventListener("click", (event) => {
  event.preventDefault();          // empêche le comportement par défaut
  // ...
});

document.addEventListener("DOMContentLoaded", () => console.log("DOM prêt"));`}</Code>

      <H3>Exemple : une liste de courses dynamique</H3>
      <Code>{`const list = document.querySelector("ul");
const input = document.querySelector("input");
const button = document.querySelector("button");

button.addEventListener("click", (event) => {
  event.preventDefault();

  const myItem = input.value;
  input.value = "";

  const listItem = document.createElement("li");
  const listText = document.createElement("span");
  const listBtn = document.createElement("button");

  listItem.appendChild(listText);
  listText.textContent = myItem;
  listItem.appendChild(listBtn);
  listBtn.textContent = "Supprimer";
  list.appendChild(listItem);

  listBtn.addEventListener("click", () => list.removeChild(listItem));

  input.focus();
});`}</Code>

      <H3>Propriétés et méthodes essentielles</H3>
      <Table
        head={["Interface", "Éléments"]}
        rows={[
          ["Document", "documentElement, body, head, title, cookie, readyState ; getElementById, querySelector, createElement, createTextNode ; forms, links"],
          ["Element", "id, className, classList, attributes, innerHTML, textContent, children, tagName ; getAttribute, setAttribute, querySelector(All), closest, matches, append, remove, getBoundingClientRect, scroll, addEventListener"],
        ]}
      />
      <Note accent={REACT_ACCENT}>
        <InlineCode>closest(sélecteur)</InlineCode> remonte vers l'ancêtre le
        plus proche qui correspond ; <InlineCode>matches(sélecteur)</InlineCode>{" "}
        teste si l'élément lui-même correspond.
      </Note>

      <SourceLink href="https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/DOM_scripting">
        MDN — DOM scripting
      </SourceLink>
      {" · "}
      <SourceLink href="https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Selection_and_traversal_on_the_DOM_tree">
        MDN — Selection and traversal on the DOM tree
      </SourceLink>
      {" · "}
      <SourceLink href="https://developer.mozilla.org/en-US/docs/Web/API/Element">
        MDN — Element
      </SourceLink>
      {" · "}
      <SourceLink href="https://developer.mozilla.org/en-US/docs/Web/API/Document">
        MDN — Document
      </SourceLink>
    </div>
  );
}

export default function JsDom() {
  return <Fr />;
}
