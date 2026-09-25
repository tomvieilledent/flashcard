import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { REACT_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={REACT_ACCENT}>JavaScript — requêtes réseau avec fetch</H2>
      <P>
        Une requête réseau permet à JavaScript de récupérer des données du
        serveur et de mettre à jour la page <strong>sans la recharger</strong>{" "}
        : mises à jour plus rapides, moins de bande passante (important sur
        mobile), meilleure expérience. Cette technique s'appelait AJAX
        (Asynchronous JavaScript and XML) ; aujourd'hui le format standard est
        JSON.
      </P>

      <H3>L'API fetch</H3>
      <Code>{`fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new Error(\`HTTP error: \${response.status}\`);   // toujours vérifier response.ok
    }
    return response.json();          // ou .text(), .blob()
  })
  .then((data) => {
    // utiliser data pour mettre à jour la page
  })
  .catch((error) => {
    console.error(\`Fetch problem: \${error.message}\`);
  });`}</Code>
      <Table
        head={["Méthode", "Contenu de la réponse"]}
        rows={[
          ["response.json()", "Analyse le corps comme du JSON (API)"],
          ["response.text()", "Texte brut"],
          ["response.blob()", "Données binaires (images, vidéo)"],
        ]}
      />
      <Note accent={REACT_ACCENT}>
        <InlineCode>fetch</InlineCode> ne rejette pas la promesse sur une
        réponse HTTP 404 ou 500 : c'est à vous de tester{" "}
        <InlineCode>response.ok</InlineCode>.
      </Note>

      <H3>Avec async / await</H3>
      <Code>{`async function loadProducts() {
  try {
    const response = await fetch("products.json");
    if (!response.ok) {
      throw new Error(\`HTTP error: \${response.status}\`);
    }
    const products = await response.json();
    initialize(products);
  } catch (err) {
    console.error(\`Fetch problem: \${err.message}\`);
  }
}`}</Code>

      <H3>Exemples</H3>
      <Code>{`// Texte : afficher un poème choisi dans une liste
const verseChoose = document.querySelector("select");
const poemDisplay = document.querySelector("pre");

verseChoose.addEventListener("change", () => updateDisplay(verseChoose.value));

function updateDisplay(verse) {
  verse = verse.replace(" ", "").toLowerCase();
  fetch(\`\${verse}.txt\`)
    .then((response) => {
      if (!response.ok) throw new Error(\`HTTP error: \${response.status}\`);
      return response.text();
    })
    .then((text) => { poemDisplay.textContent = text; })
    .catch((error) => { poemDisplay.textContent = \`Could not fetch verse: \${error}\`; });
}

// Blob : une image
fetch(url)
  .then((response) => response.blob())
  .then((blob) => {
    img.src = URL.createObjectURL(blob);
  });`}</Code>

      <H3>XMLHttpRequest (ancienne API)</H3>
      <Code>{`const request = new XMLHttpRequest();
request.open("GET", "products.json");
request.responseType = "json";
request.addEventListener("load", () => initialize(request.response));
request.addEventListener("error", () => console.error("XHR error"));
request.send();`}</Code>
      <Ul>
        <li>Déconseillée : <InlineCode>fetch</InlineCode> a une API plus simple, basée sur les promesses, avec une gestion d'erreur plus propre.</li>
        <li>Les navigateurs bloquent les requêtes HTTP depuis une page ouverte en <InlineCode>file://</InlineCode> : servir les exemples via un serveur local.</li>
      </Ul>

      <SourceLink href="https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Network_requests">
        MDN — Network requests
      </SourceLink>
      {" · "}
      <SourceLink href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch">
        MDN — Using the Fetch API
      </SourceLink>
    </div>
  );
}

export default function JsNetworkRequests() {
  return <Fr />;
}
