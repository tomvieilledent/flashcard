import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { REACT_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={REACT_ACCENT}>CSS avancé — sélecteurs, couleurs, unités & texte</H2>

      <H3>Balise, classe, id</H3>
      <P>
        On cible de moins en moins les <InlineCode>id</InlineCode> : un id doit
        être unique dans la page, alors que des classes seules maximisent la
        flexibilité et la réutilisation des morceaux d'interface.
      </P>
      <Code>{`* { }                       /* tous les éléments */
section { }                 /* toutes les balises section */
.my-class { }               /* tous les éléments avec cette classe */
.my-block > .my-title { }   /* enfant direct */
.my-block + .my-title { }   /* frère immédiatement suivant */
.my-block ~ .my-title { }   /* tous les frères suivants */
#my-div { }                 /* l'élément avec cet id */`}</Code>

      <H3>Combinateurs</H3>
      <Table
        head={["Combinateur", "Symbole", "Exemple"]}
        rows={[
          ["Descendant", "espace", "div p : tout p dans un div"],
          ["Enfant direct", ">", "div > p"],
          ["Frère suivant immédiat", "+", "h1 + p"],
          ["Frères suivants", "~", "h1 ~ p"],
        ]}
      />
      <P>
        Autres pseudo-classes utiles : <InlineCode>:focus</InlineCode>,{" "}
        <InlineCode>:checked</InlineCode>, <InlineCode>:first-child</InlineCode>,{" "}
        <InlineCode>:last-child</InlineCode>, <InlineCode>:nth-child(n)</InlineCode>,{" "}
        <InlineCode>:not(…)</InlineCode>, <InlineCode>:is(…)</InlineCode>,{" "}
        <InlineCode>:has(…)</InlineCode>. Pseudo-éléments : <InlineCode>::before</InlineCode>,{" "}
        <InlineCode>::after</InlineCode>, <InlineCode>::first-line</InlineCode>,{" "}
        <InlineCode>::selection</InlineCode>, <InlineCode>::placeholder</InlineCode>. La
        <strong> spécificité</strong> décide quelle règle l'emporte quand
        plusieurs sélecteurs ciblent le même élément. Les mêmes sélecteurs
        servent en JavaScript avec <InlineCode>querySelector()</InlineCode>.
      </P>

      <H3>Sélecteurs d'attribut</H3>
      <Code>{`/* Liens contenant "facebook" dans l'URL */
a[href*="facebook"] { color: #3C5A99; }
/* Liens internes, commençant par "#" */
a[href^="#"] { background-color: gold; }
/* Liens finissant par ".org" */
a[href$=".org"] { color: red; }`}</Code>

      <H3>Pseudo-classes et pseudo-éléments</H3>
      <P>
        Une <strong>pseudo-classe</strong> (un seul <InlineCode>:</InlineCode>)
        cible un état de l'élément ; un <strong>pseudo-élément</strong> (
        <InlineCode>::</InlineCode>) cible une partie de l'élément. Ne pas les
        confondre.
      </P>
      <Code>{`/* Ordre LVHA : Link, Visited, Hover, Active ("LoVe, HAte") */
a:link    { color: green; }
a:visited { color: cadetblue; }
a:hover   { text-decoration: underline; }
a:active  { color: darkcyan; }

/* Pseudo-éléments */
a::after { content: '→'; }
p::first-letter { font-size: 130%; }`}</Code>

      <H3>Couleurs</H3>
      <P>
        La propriété <InlineCode>color</InlineCode> définit la couleur du
        texte. Une couleur s'exprime par un nom, en hexadécimal, en RGB ou en
        HSL.
      </P>
      <Code>{`p { color: red; }
p { color: #f00; }
p { color: #ff0000; }
p { color: rgb(255, 0, 0); }
p { color: rgb(100%, 0%, 0%); }
p { color: hsl(0, 100%, 50%); }`}</Code>
      <Note accent={REACT_ACCENT}>
        Accessibilité : les navigateurs modernes indiquent dans leurs outils de
        développement si une couleur est suffisamment contrastée.
      </Note>

      <H3>Variables CSS</H3>
      <P>
        Les propriétés personnalisées (« variables CSS ») contiennent une valeur
        réutilisable dans plusieurs déclarations.
      </P>
      <Code>{`:root {
  --main-bg-color: blue;
}
body {
  color: var(--main-bg-color);
}`}</Code>

      <H3>Unités et valeurs</H3>
      <Ul>
        <li>
          <InlineCode>px</InlineCode> : unité <strong>absolue</strong>, la plus
          courante ; <InlineCode>rem</InlineCode> : unité <strong>relative</strong>.
        </li>
        <li>
          <InlineCode>rem</InlineCode> pour les tailles de police, paddings et
          marges ; <InlineCode>em</InlineCode> pour les media queries.
        </li>
      </Ul>
      <Note accent={REACT_ACCENT}>
        Attention : <InlineCode>rem</InlineCode> est relatif à l'élément racine,
        la balise <InlineCode>&lt;html&gt;</InlineCode>, pas à{" "}
        <InlineCode>&lt;body&gt;</InlineCode>.
      </Note>
      <Code>{`font-size: 2rem;
padding: 1.2rem 2rem;`}</Code>

      <H3>Typographie</H3>
      <Table
        head={["Propriété", "Rôle", "Exemple"]}
        rows={[
          ["line-height", "Hauteur entre les lignes de texte", "line-height: 1.5;"],
          ["text-decoration", "Lignes décoratives sur le texte", "text-decoration: line-through;"],
          ["text-align", "Alignement horizontal d'un élément de type bloc", "text-align: center;"],
          ["text-transform", "Change la casse du texte", "text-transform: lowercase;"],
          ["letter-spacing", "Espacement entre les caractères", "letter-spacing: -0.4rem;"],
        ]}
      />
      <Note accent={REACT_ACCENT}>
        Accessibilité : un <InlineCode>line-height</InlineCode> d'au moins{" "}
        <strong>1,5</strong> pour le contenu principal aide les personnes
        malvoyantes à lire.
      </Note>

      <H3>Reset / Normalize</H3>
      <P>
        Le « CSS reset » vient d'Eric Meyer (2007) : réduire les incohérences
        entre navigateurs. Depuis : Normalize.css, sanitize.css, Reboot
        (Bootstrap)…
      </P>

      <SourceLink href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/color">
        MDN — color
      </SourceLink>
      {" · "}
      <SourceLink href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value">
        MDN — valeurs de couleur
      </SourceLink>
      {" · "}
      <SourceLink href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/line-height">
        MDN — line-height
      </SourceLink>
      {" · "}
      <SourceLink href="https://clrs.cc/">clrs.cc</SourceLink>
      {" · "}
      <SourceLink href="https://htmlcolorcodes.com/color-names/">htmlcolorcodes.com</SourceLink>
      {" · "}
      <SourceLink href="https://colours.neilorangepeel.com/">colours.neilorangepeel.com</SourceLink>
      {" · "}
      <SourceLink href="https://projects.verou.me/css-colors/#slategray">projects.verou.me/css-colors</SourceLink>
      {" · "}
      <SourceLink href="https://uxdesign.cc/chrome-devtools-accessible-colors-300ec462a63c?gi=ce0deff98f21">
        Chrome DevTools — couleurs accessibles
      </SourceLink>
      {" · "}
      <SourceLink href="https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Selectors">
        MDN — CSS selectors
      </SourceLink>
      {" · "}
      <SourceLink href="https://flukeout.github.io/">
        CSS Diner — s'entraîner aux sélecteurs
      </SourceLink>
      {" · "}
      <SourceLink href="https://iamvdo.me/en/blog/css-font-metrics-line-height-and-vertical-align">
        iamvdo.me — font metrics, line-height & vertical-align
      </SourceLink>
      {" · "}
      <SourceLink href="https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/">
        meyerweb.com — unitless line-heights
      </SourceLink>
      {" · "}
      <SourceLink href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-decoration">
        MDN — text-decoration
      </SourceLink>
      {" · "}
      <SourceLink href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-align">
        MDN — text-align
      </SourceLink>
      {" · "}
      <SourceLink href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-transform">
        MDN — text-transform
      </SourceLink>
      {" · "}
      <SourceLink href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/letter-spacing">
        MDN — letter-spacing
      </SourceLink>
      {" · "}
      <SourceLink href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/Pseudo-classes">
        MDN — pseudo-classes
      </SourceLink>
      {" · "}
      <SourceLink href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:active">
        MDN — :active
      </SourceLink>
      {" · "}
      <SourceLink href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:hover">
        MDN — :hover
      </SourceLink>
      {" · "}
      <SourceLink href="https://meyerweb.com/eric/tools/css/reset/">
        meyerweb.com — CSS reset
      </SourceLink>
      {" · "}
      <SourceLink href="https://elad.medium.com/normalize-css-or-css-reset-9d75175c5d1e">
        Elad Shechter — Normalize CSS or CSS Reset?
      </SourceLink>
      {" · "}
      <SourceLink href="https://css-tricks.com/reboot-resets-reasoning/">
        CSS-Tricks — Reboot, resets and reasoning
      </SourceLink>
      {" · "}
      <SourceLink href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/Pseudo-elements">
        MDN — pseudo-éléments
      </SourceLink>
      {" · "}
      <SourceLink href="https://dev.to/ferueda/before-and-after-pseudo-elements-explained-156">
        DEV — ::before et ::after expliqués
      </SourceLink>
      {" · "}
      <SourceLink href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::after">
        MDN — ::after
      </SourceLink>
      {" · "}
      <SourceLink href="https://a.singlediv.com/">
        A Single Div
      </SourceLink>
      {" · "}
      <SourceLink href="https://nicolasgallagher.com/micro-clearfix-hack/">
        Nicolas Gallagher — micro clearfix hack
      </SourceLink>
      {" · "}
      <SourceLink href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/Attribute_selectors">
        MDN — sélecteurs d'attribut
      </SourceLink>
      {" · "}
      <SourceLink href="https://css-tricks.com/almanac/selectors/a/attribute/">
        CSS-Tricks — attribute
      </SourceLink>
      {" · "}
      <SourceLink href="https://www.smashingmagazine.com/2018/10/attribute-selectors-splicing-html-dna-css/">
        Smashing Magazine — attribute selectors
      </SourceLink>
      {" · "}
      <SourceLink href="https://tympanus.net/codrops/css_reference/attribute-selectors/">
        Codrops — attribute selectors
      </SourceLink>
    </div>
  );
}

export default function CssSelectorsText() {
  return <Fr />;
}
