import { Code, InlineCode, P, H2, H3, Ul, Note, SourceLink } from "../../shared/ui/primitives.jsx";
import { REACT_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={REACT_ACCENT}>CSS avancé — modèle de boîte, flux & positionnement</H2>

      <H3>Le modèle de boîte (Box Model)</H3>
      <P>
        Fondamental : c'est la clé pour créer des mises en page et comprendre
        comment les éléments s'alignent. Une boîte a un contenu (
        <InlineCode>width</InlineCode>, <InlineCode>height</InlineCode>), un{" "}
        <InlineCode>padding</InlineCode>, une bordure et une{" "}
        <InlineCode>margin</InlineCode>.
      </P>
      <Code>{`/* box-sizing par défaut */
.box { box-sizing: content-box; }

/* valeur habituelle pour créer des layouts */
.box { box-sizing: border-box; }

/* une boîte avec dimensions, padding et marge */
.box-dimensions {
  width: 100px;
  height: 50px;
  padding-top: 30px;
  margin: 5px;
}`}</Code>

      <H3>Flux normal et display</H3>
      <P>
        Le <strong>flux normal</strong> (Flow Layout) est la façon dont les
        éléments de type bloc et en ligne s'affichent avant toute modification
        de leur mise en page.
      </P>

      <H3>Système de grille</H3>
      <P>
        Les grilles servaient à mettre en page livres et magazines, puis les
        sites web. Avant flexbox et CSS Grid, elles s'appuyaient sur les{" "}
        <InlineCode>float</InlineCode>.
      </P>
      <Note accent={REACT_ACCENT}>
        Avant CSS Grid, « grid » désignait déjà la grille responsive utilisée
        pour construire les sites (960 Grid System, frameworks CSS) : deux
        notions différentes.
      </Note>

      <H3>Position</H3>
      <P>
        Le positionnement combine plusieurs propriétés (
        <InlineCode>position</InlineCode>, <InlineCode>top</InlineCode>,{" "}
        <InlineCode>z-index</InlineCode>…) pour placer un élément dans la page.
      </P>
      <Code>{`/* support navigateur pas 100 % universel, utile dans certains cas */
.component {
  position: sticky;
  top: 0;
}`}</Code>

      <H3>À retenir</H3>
      <Ul>
        <li>
          <InlineCode>border-box</InlineCode> inclut padding et bordure dans
          la largeur déclarée : plus prévisible pour les layouts.
        </li>
        <li>
          Comprendre le flux normal avant de le modifier avec flexbox, grid ou{" "}
          <InlineCode>position</InlineCode>.
        </li>
      </Ul>

      <SourceLink href="https://codepen.io/chriscoyier/pen/JpLzjd">
        CodePen — Chris Coyier
      </SourceLink>
      {" · "}
      <SourceLink href="https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Box_model/Introduction">
        MDN — introduction au modèle de boîte
      </SourceLink>
      {" · "}
      <SourceLink href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/width">
        MDN — width
      </SourceLink>
      {" · "}
      <SourceLink href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/height">
        MDN — height
      </SourceLink>
      {" · "}
      <SourceLink href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/padding">
        MDN — padding
      </SourceLink>
      {" · "}
      <SourceLink href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/margin">
        MDN — margin
      </SourceLink>
      {" · "}
      <SourceLink href="https://cssreference.io/positioning/">
        CSS Reference — positioning
      </SourceLink>
      {" · "}
      <SourceLink href="https://www.impressivewebs.com/a-detailed-look-at-the-z-index-css-property/">
        Impressive Webs — z-index en détail
      </SourceLink>
      {" · "}
      <SourceLink href="https://medium.com/@elad/css-position-sticky-how-it-really-works-54cd01dc2d46">
        Elad Shechter — position: sticky
      </SourceLink>
    </div>
  );
}

export default function CssBoxLayout() {
  return <Fr />;
}
