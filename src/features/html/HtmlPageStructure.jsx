import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { REACT_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={REACT_ACCENT}>HTML — la structure d'une page (doctype, head, meta)</H2>
      <P>
        HTML porte le <strong>contenu</strong> ; CSS s'occupe de l'apparence.
        Voici le socle de toute page.
      </P>
      <Code>{`<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Titre de la page</title>
    <meta name="description" content="Résumé de la page pour les moteurs de recherche">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  </head>
  <body>
    ...
  </body>
</html>`}</Code>

      <H3>Doctype</H3>
      <P>
        Obligatoire tout en haut de chaque page : il force le navigateur à
        rendre la page selon les spécifications actuelles. C'est le{" "}
        <strong>seul élément hors de la balise <InlineCode>html</InlineCode></strong>.
      </P>

      <H3>La balise html</H3>
      <P>
        Indique que le document est une page HTML et contient tous les autres
        éléments. L'attribut <InlineCode>lang</InlineCode> précise la langue ;{" "}
        <InlineCode>dir="rtl"</InlineCode> gère les langues qui se lisent de
        droite à gauche.
      </P>

      <H3>La balise head</H3>
      <P>
        Contient toutes les <strong>métadonnées</strong> de la page ; rien de
        ce qu'elle contient n'est affiché dans la fenêtre du navigateur.
      </P>
      <Ul>
        <li>le titre de la page ;</li>
        <li>les appels de scripts asynchrones ;</li>
        <li>les métadonnées ;</li>
        <li>du CSS embarqué (CSS critique) ;</li>
        <li>du JavaScript embarqué.</li>
      </Ul>
      <Note accent={REACT_ACCENT}>
        Ne pas confondre <InlineCode>head</InlineCode> (métadonnées de la page)
        et <InlineCode>header</InlineCode> (en-tête visible du contenu).
      </Note>

      <H3>Les balises meta essentielles</H3>
      <Table
        head={["Élément", "Rôle", "Conseil"]}
        rows={[
          ["meta charset", "Déclare l'encodage des caractères", "utf-8, en tout premier dans le head"],
          ["meta viewport", "Taille initiale de la zone d'affichage (mobiles uniquement)", "Jamais maximum-scale=1.0 : cela empêche de zoomer (accessibilité)"],
          ["title", "Titre de la page, visible dans l'onglet / la fenêtre", "Moins de 56 caractères"],
          ["meta description", "Résumé affiché par les moteurs de recherche", "Concis, unique par page"],
          ["link rel=icon", "Favicon et icônes d'application", "Prévoir plusieurs tailles / types selon les plateformes"],
        ]}
      />
      <Code>{`<!-- Favicons : navigateur, iOS, Android -->
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">`}</Code>

      <H3>Attributs de balise</H3>
      <P>
        Un attribut apporte une information ou une instruction supplémentaire
        à un élément ; il se place toujours dans la balise ouvrante. Le
        préfixe <InlineCode>data-</InlineCode> permet de déclarer n'importe
        quel attribut personnalisé.
      </P>
      <Code>{`<p data-user-id="42" data-role="admin">Du contenu</p>

<script>
  document.querySelector("p").dataset.userId;   // "42"
</script>`}</Code>

      <SourceLink href="https://developer.mozilla.org/en-US/docs/Glossary/Doctype">
        MDN — Doctype
      </SourceLink>
      {" · "}
      <SourceLink href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta">
        MDN — meta
      </SourceLink>
      {" · "}
      <SourceLink href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes">
        MDN — référence des attributs HTML
      </SourceLink>
      {" · "}
      <SourceLink href="https://htmlhead.dev/">htmlhead.dev — HEAD, a free guide to head elements</SourceLink>
    </div>
  );
}

export default function HtmlPageStructure() {
  return <Fr />;
}
