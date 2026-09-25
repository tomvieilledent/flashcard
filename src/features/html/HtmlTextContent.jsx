import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { REACT_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={REACT_ACCENT}>HTML — titres, texte, liens, listes & typographie</H2>

      <H3>Titres (h1 à h6)</H3>
      <Code>{`<h1>Titre de niveau 1</h1>
<h2>Titre de niveau 2</h2>`}</Code>
      <Ul>
        <li>Les navigateurs appliquent des tailles différentes par défaut : HTML décrit le contenu, pas le style.</li>
        <li>Garder un ordre descendant : jamais un <InlineCode>h4</InlineCode> après un <InlineCode>h2</InlineCode> (h1 &gt; h2 &gt; h3…).</li>
        <li>Les lecteurs d'écran s'en servent pour naviguer dans la page.</li>
        <li>Ne jamais mettre le logo ou le nom du site dans le <InlineCode>h1</InlineCode> : il doit refléter le contenu de la page. On peut le masquer visuellement, mais il doit exister dans le code.</li>
      </Ul>

      <H3>Paragraphe, div et span</H3>
      <Table
        head={["Balise", "Type", "Rôle"]}
        rows={[
          ["p", "Bloc", "Un paragraphe de texte. Pour un conteneur d'éléments, utiliser div"],
          ["div", "Bloc", "« Document division » : conteneur générique pour structurer la mise en page, sans sémantique"],
          ["span", "En ligne", "Conteneur générique pour du texte hors paragraphe ; à utiliser le moins possible"],
        ]}
      />
      <Code>{`<p>Lorem ipsum dolor sit amet.</p>
<div>Un bloc générique</div>
<span>Un texte en ligne</span>

<!-- Un commentaire : visible du développeur, pas de l'utilisateur -->`}</Code>

      <H3>Liens (a)</H3>
      <P>Trois types de cibles :</P>
      <Code>{`<a href="#section-2">Ancre : dans la même page</a>
<a href="/contact.html">URL relative : dans le même site</a>
<a href="https://exemple.org">URL absolue : vers un autre site</a>
<a href="mailto:contact@exemple.org">Lien mailto</a>

<!-- Nouvel onglet : ajouter rel pour la sécurité -->
<a href="https://exemple.org" target="_blank" rel="noopener noreferrer">Lien externe</a>`}</Code>
      <Table
        head={["rel", "Signification"]}
        rows={[
          ["noopener", "Empêche la page ouverte d'accéder à window.opener (à mettre avec target=_blank)"],
          ["sponsored", "Liens payants ou sponsorisés"],
          ["ugc", "Contenu généré par les utilisateurs"],
          ["nofollow", "Fourre-tout pour les liens non fiables"],
        ]}
      />

      <H3>Listes</H3>
      <Code>{`<ol>                       <!-- ordonnée : numérotée -->
  <li>Élément 1</li>
  <li>Élément 2</li>
</ol>

<ul>                       <!-- non ordonnée : puces -->
  <li>Premier point</li>
  <li>Deuxième point
    <ul>                   <!-- liste imbriquée -->
      <li>Sous-point</li>
    </ul>
  </li>
</ul>

<dl>                       <!-- liste de définitions -->
  <dt>Terme</dt>
  <dd>Définition du terme</dd>
</dl>`}</Code>

      <H3>Séparations : hr et br</H3>
      <Ul>
        <li><InlineCode>&lt;hr&gt;</InlineCode> (auto-fermante) : coupure sémantique entre deux blocs de texte.</li>
        <li><InlineCode>&lt;br&gt;</InlineCode> (auto-fermante) : retour à la ligne dans un texte. Jamais pour créer de l'espace entre éléments : espacement et mise en page relèvent du CSS.</li>
      </Ul>

      <H3>Citations</H3>
      <Code>{`<p>Selon le site de Mozilla, <q>Firefox 1.0 est sorti en 2004</q>.</p>

<blockquote cite="https://exemple.org/source">
  <p>Innovation is saying no to 1,000 things.</p>
  <footer>Steve Jobs — <cite>WWDC, 1997</cite></footer>
</blockquote>`}</Code>
      <P>
        <InlineCode>q</InlineCode> : citation en ligne, sans saut de paragraphe ;{" "}
        <InlineCode>blockquote</InlineCode> : citation multiligne, en bloc.
      </P>

      <H3>Texte et typographie sémantiques</H3>
      <Table
        head={["Balise", "Sens"]}
        rows={[
          ["em", "Emphase (accentuation)"],
          ["i", "Texte à part de la prose normale (mot étranger, terme technique)"],
          ["strong", "Forte importance"],
          ["b", "Attirer l'attention (mots-clés, noms de produits)"],
          ["small", "Remarque annexe, petits caractères (copyright, mentions légales)"],
          ["del / ins", "Texte supprimé / inséré"],
          ["s", "Texte barré (n'est plus exact)"],
          ["wbr", "Point de coupure de ligne possible"],
          ["mark", "Texte surligné pour référence (pertinence)"],
          ["cite", "Nom d'une œuvre (livre, pièce, chanson)"],
          ["dfn", "Première occurrence, définition d'un terme"],
          ["abbr", "Abréviation ou acronyme"],
          ["code", "Court fragment de code informatique"],
          ["time", "Date / heure précise"],
          ["address", "Coordonnées de contact (personne, organisation)"],
        ]}
      />
      <Code>{`<p>Le mot <i lang="fr">voilier</i> désigne un bateau à voile.</p>
<p><strong>Attention !</strong> Ceci n'est pas un exercice.</p>
<p>J'ai reçu <del>500 €</del> <ins>1000 €</ins> pour ce travail.</p>
<p><abbr title="HyperText Markup Language">HTML</abbr>, <code>console.log()</code></p>
<p><time datetime="2019-09-19">19 sept. 2019</time></p>
<address><a href="mailto:someone@example.com">someone@example.com</a></address>`}</Code>
      <Note accent={REACT_ACCENT}>
        <InlineCode>strong</InlineCode> et <InlineCode>b</InlineCode> peuvent
        avoir le même rendu : rappelez-vous que HTML parle de sens, pas
        d'aspect visuel.
      </Note>

      <SourceLink href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements">MDN — h1–h6</SourceLink>
      {" · "}
      <SourceLink href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a">MDN — a</SourceLink>
      {" · "}
      <SourceLink href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul">MDN — ul</SourceLink>
      {" · "}
      <SourceLink href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote">MDN — blockquote</SourceLink>
      {" · "}
      <SourceLink href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/em">MDN — em</SourceLink>
    </div>
  );
}

export default function HtmlTextContent() {
  return <Fr />;
}
