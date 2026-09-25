import { Code, InlineCode, P, H2, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { REACT_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={REACT_ACCENT}>HTML — balises structurelles (header, main, footer, nav…)</H2>
      <P>
        Les balises sémantiques décrivent le <strong>rôle</strong> de chaque
        zone de la page, pour les navigateurs, les lecteurs d'écran et les
        moteurs de recherche.
      </P>
      <Code>{`<body>
  <header>
    <nav>
      <ul>
        <li><a href="#home">Accueil</a></li>
        <li><a href="#about">À propos</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <article>
      <h1>Titre de l'article</h1>
      <section>...</section>
    </article>
    <aside>Archives, catégories…</aside>
  </main>

  <footer>© 2026 — Mentions légales</footer>
</body>`}</Code>

      <Table
        head={["Balise", "Rôle", "Usages typiques"]}
        rows={[
          ["header", "Haut d'une page, d'un article ou d'une section ; en général identique sur toutes les pages", "Logo, navigation, formulaire de recherche"],
          ["main", "Contenu principal, généralement entre header et footer", "Le contenu propre à la page"],
          ["footer", "Bas d'une page, d'un article ou d'une section", "Copyright, auteur, navigation, icônes sociales"],
          ["aside", "Informations complémentaires liées au contenu principal", "Archives mensuelles, liste de catégories"],
          ["section", "Regroupe des éléments liés ; peut avoir son header / footer", "Chapitres, blocs thématiques"],
          ["article", "Contenu autonome, redistribuable comme une unité indépendante", "Billet de blog, actualité, fiche produit, message de forum"],
          ["nav", "Liens de navigation", "Menu principal, sommaire"],
        ]}
      />
      <Ul>
        <li>
          <InlineCode>main</InlineCode> n'est <strong>jamais</strong> descendant
          d'un <InlineCode>article</InlineCode>, <InlineCode>aside</InlineCode>,{" "}
          <InlineCode>header</InlineCode>, <InlineCode>footer</InlineCode> ou{" "}
          <InlineCode>nav</InlineCode>, et il n'y en a qu'un par page.
        </li>
        <li>
          <InlineCode>header</InlineCode> et <InlineCode>footer</InlineCode> ne
          sont pas réservés à la page : ils existent aussi dans un{" "}
          <InlineCode>article</InlineCode> ou une <InlineCode>section</InlineCode>.
        </li>
      </Ul>
      <Note accent={REACT_ACCENT}>
        Préférer ces balises à des <InlineCode>div</InlineCode> génériques : la
        structure devient lisible par les outils d'accessibilité.
      </Note>

      <SourceLink href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header">MDN — header</SourceLink>
      {" · "}
      <SourceLink href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/footer">MDN — footer</SourceLink>
      {" · "}
      <SourceLink href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section">MDN — section</SourceLink>
      {" · "}
      <SourceLink href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article">MDN — article</SourceLink>
      {" · "}
      <SourceLink href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav">MDN — nav</SourceLink>
    </div>
  );
}

export default function HtmlSemanticLayout() {
  return <Fr />;
}
