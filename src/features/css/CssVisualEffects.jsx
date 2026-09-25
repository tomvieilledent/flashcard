import { Code, InlineCode, P, H2, H3, Note, SourceLink } from "../../shared/ui/primitives.jsx";
import { REACT_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={REACT_ACCENT}>CSS avancé — arrière-plan, bordures, transformations & animations</H2>

      <H3>Background</H3>
      <P>
        La propriété raccourcie <InlineCode>background</InlineCode> accepte
        notamment une couleur, une image ou un dégradé (
        <InlineCode>linear-gradient</InlineCode>).
      </P>

      <H3>Bordures</H3>
      <P>
        <InlineCode>border</InlineCode> est un raccourci pour la bordure d'un
        élément ; <InlineCode>border-radius</InlineCode> arrondit les coins, et{" "}
        <InlineCode>outline</InlineCode> trace un contour hors du modèle de
        boîte.
      </P>
      <Code>{`.box {
  display: block;
  padding: 1rem;
  border-width: 2px;
  border-style: double;
  border-color: orange;
  border-radius: 12px;
}

/* version raccourcie */
.box {
  display: block;
  padding: 1rem;
  border: 2px double orange;
  border-radius: 12px;
}`}</Code>

      <H3>Transformations</H3>
      <P>
        Les propriétés <InlineCode>transform</InlineCode> permettent de pivoter,
        redimensionner, incliner ou déplacer un élément.
      </P>
      <Code>{`transform: perspective(17px);
transform: rotate3d(1, 2.0, 3.0, 10deg);
transform: translate(12px, 50%);
transform: scale(2, 0.5);
transform: skew(30deg, 20deg);`}</Code>

      <H3>Animations</H3>
      <P>
        Les propriétés <InlineCode>animation</InlineCode> animent d'autres
        propriétés d'un élément, à partir d'un <InlineCode>@keyframes</InlineCode>.
      </P>
      <Code>{`@keyframes example {
  from { background-color: blue; }
  to   { background-color: red; }
}

.box {
  width: 10rem;
  height: 10rem;
  background-color: blue;
  animation-name: example;
  animation-duration: 3s;
}`}</Code>
      <Note accent={REACT_ACCENT}>
        <InlineCode>animation</InlineCode> est un raccourci : seuls{" "}
        <InlineCode>animation-name</InlineCode> et{" "}
        <InlineCode>animation-duration</InlineCode> sont obligatoires.
      </Note>

      <SourceLink href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/background">
        MDN — background
      </SourceLink>
      {" · "}
      <SourceLink href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/border">
        MDN — border
      </SourceLink>
      {" · "}
      <SourceLink href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/outline">
        MDN — outline
      </SourceLink>
      {" · "}
      <SourceLink href="https://css-tricks.com/almanac/properties/b/border-radius/">
        CSS-Tricks — border-radius
      </SourceLink>
      {" · "}
      <SourceLink href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/transform">
        MDN — transform
      </SourceLink>
      {" · "}
      <SourceLink href="https://css-transform.moro.es/">
        CSS Transform Functions Visualizer
      </SourceLink>
      {" · "}
      <SourceLink href="https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Animations">
        MDN — animations CSS
      </SourceLink>
      {" · "}
      <SourceLink href="https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Animations/Using">
        MDN — utiliser les animations CSS
      </SourceLink>
      {" · "}
      <SourceLink href="https://animate.style/">
        Animate.css
      </SourceLink>
      {" · "}
      <SourceLink href="https://www.creativebloq.com/inspiration/css-animation-examples">
        Creative Bloq — exemples d'animations CSS
      </SourceLink>
    </div>
  );
}

export default function CssVisualEffects() {
  return <Fr />;
}
