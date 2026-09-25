import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { REACT_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={REACT_ACCENT}>JavaScript — qu'est-ce que c'est, et comment l'ajouter à une page</H2>

      <H3>Le troisième pilier du web</H3>
      <P>
        JavaScript est un langage de script qui rend les pages dynamiques et
        interactives : c'est la troisième couche des technologies web standard,
        après HTML (contenu) et CSS (présentation). Il permet de :
      </P>
      <Ul>
        <li>mettre à jour dynamiquement le contenu ;</li>
        <li>contrôler le multimédia ;</li>
        <li>animer des images et des graphismes ;</li>
        <li>réagir aux actions de l'utilisateur.</li>
      </Ul>
      <Table
        head={["Élément du langage", "Exemples"]}
        rows={[
          ["Noyau du langage", "Variables, chaînes, code exécuté en réponse à des événements"],
          ["API du navigateur (intégrées)", "DOM (manipuler HTML / CSS), Geolocation, Canvas & WebGL, audio / vidéo, WebRTC"],
          ["API tierces", "Google Maps, OpenStreetMap, réseaux sociaux…"],
        ]}
      />

      <H3>Comment il s'exécute</H3>
      <Ul>
        <li>
          Côté client, <strong>dans l'onglet du navigateur</strong>, isolé des
          autres onglets et sites (modèle de sécurité en bac à sable).
        </li>
        <li>
          Le code est exécuté de haut en bas (avec quelques exceptions comme le
          <em> hoisting</em>).
        </li>
        <li>
          Langage <strong>interprété</strong> : le navigateur reçoit du texte et
          l'exécute. Les moteurs modernes utilisent la compilation à la volée
          (JIT) pour les performances.
        </li>
        <li>
          <strong>Dynamique</strong> (le contenu change selon les circonstances)
          par opposition au HTML statique.
        </li>
      </Ul>

      <H3>Ajouter du JavaScript à une page</H3>
      <Code>{`<!-- 1. Interne : en bas du <body>, pour que le HTML soit chargé avant -->
<script>
  function createParagraph() {
    const para = document.createElement("p");
    para.textContent = "Vous avez cliqué sur le bouton !";
    document.body.appendChild(para);
  }

  const buttons = document.querySelectorAll("button");
  for (const button of buttons) {
    button.addEventListener("click", createParagraph);
  }
</script>

<!-- 2. Externe : fichier script.js -->
<script type="module" src="script.js"></script>   <!-- dans le <head> -->
<script defer src="script.js"></script>            <!-- head ou fin de body -->

<!-- 3. Gestionnaire en ligne : à éviter -->
<button onclick="createParagraph()">Cliquez !</button>`}</Code>
      <Table
        head={["Méthode", "Placement", "Comportement"]}
        rows={[
          ["Script interne", "Bas du body", "S'exécute après le chargement du HTML"],
          ["type=\"module\"", "Dans le head", "Attend tout le HTML avant de s'exécuter"],
          ["defer", "Head ou bas du body", "S'exécute après l'analyse du HTML, dans l'ordre"],
          ["async", "Head", "S'exécute dès qu'il est chargé, sans ordre garanti (peut précéder le HTML)"],
        ]}
      />
      <Note accent={REACT_ACCENT}>
        Le gestionnaire en ligne (<InlineCode>onclick</InlineCode>) pollue le
        HTML, est inefficace et difficile à maintenir : préférez{" "}
        <InlineCode>addEventListener()</InlineCode>, qui s'applique à tous les
        boutons et sépare HTML et JavaScript.
      </Note>

      <H3>Commentaires</H3>
      <Code>{`// Commentaire sur une ligne

/*
  Commentaire
  sur plusieurs lignes
*/`}</Code>

      <SourceLink href="https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_is_JavaScript">
        MDN — What is JavaScript?
      </SourceLink>
    </div>
  );
}

export default function JsWhatIs() {
  return <Fr />;
}
