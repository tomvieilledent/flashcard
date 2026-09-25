import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { REACT_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={REACT_ACCENT}>HTML — images, vidéo, audio & iframe</H2>

      <H3>Image (img)</H3>
      <P>Élément en ligne, auto-fermant.</P>
      <Code>{`<img src="chat.jpg" alt="Un chat roux endormi sur un canapé" width="600" height="400">

<!-- Image décorative : alt vide -->
<img src="separateur.svg" alt="">`}</Code>
      <Ul>
        <li>
          Toujours un <InlineCode>alt</InlineCode> : avec du texte décrivant
          l'image, ou vide si elle est décorative. Jamais le titre de l'article
          ou un texte du même genre.
        </li>
        <li>
          Toujours renseigner <InlineCode>width</InlineCode> et{" "}
          <InlineCode>height</InlineCode> pour éviter les sauts de mise en page
          pendant le chargement.
        </li>
        <li>
          Images de substitution pour maquetter : placebear.com,
          picsum.photos, placehold.it.
        </li>
      </Ul>

      <H3>Formats d'image</H3>
      <Table
        head={["Format", "Usage habituel"]}
        rows={[
          ["JPEG", "Photographies (compression avec perte)"],
          ["PNG", "Images avec transparence, captures, aplats"],
          ["GIF", "Petites animations"],
          ["SVG", "Vectoriel : logos, icônes, illustrations ; s'adapte à toute taille"],
          ["WebP", "Format moderne, plus léger que JPEG / PNG"],
        ]}
      />
      <Note accent={REACT_ACCENT}>
        Chaque image doit être optimisée : il n'est pas rare de trouver des
        sites qui chargent plus de 1 Mo d'images, ce qui pénalise ceux qui
        naviguent en mobilité avec un forfait de données limité.
      </Note>

      <H3>picture : plusieurs sources</H3>
      <P>
        Enveloppe qui combine différentes versions d'une image, selon le format
        supporté ou l'appareil / l'affichage.
      </P>
      <Code>{`<picture>
  <source srcset="photo.avif" type="image/avif">
  <source srcset="photo.webp" type="image/webp">
  <source srcset="photo-mobile.jpg" media="(max-width: 600px)">
  <img src="photo.jpg" alt="Description" width="800" height="600">
</picture>`}</Code>

      <H3>Vidéo (video)</H3>
      <Code>{`<video controls width="640" poster="apercu.jpg">
  <source src="film.webm" type="video/webm">
  <source src="film.mp4" type="video/mp4">
  Votre navigateur ne gère pas la vidéo HTML5, mais vous pouvez
  <a href="film.mp4">la télécharger</a>.
</video>`}</Code>
      <Ul>
        <li>Toujours fournir un contenu de repli si la balise n'est pas supportée ou si la vidéo a disparu.</li>
        <li>Éviter <InlineCode>autoplay</InlineCode> : laisser l'utilisateur décider de lancer la lecture. Pour une vidéo d'arrière-plan, <InlineCode>autoplay</InlineCode> et <InlineCode>loop</InlineCode> sont en revanche essentiels.</li>
      </Ul>

      <H3>Audio (audio)</H3>
      <Code>{`<audio controls>
  <source src="son.ogg" type="audio/ogg">
  <source src="son.mp3" type="audio/mpeg">
  Votre navigateur ne gère pas l'audio HTML5.
</audio>`}</Code>

      <H3>iframe : contenu externe embarqué</H3>
      <Code>{`<iframe src="https://exemple.org/widget" title="Widget de démonstration"
        width="600" height="400">
  Texte de repli pour les navigateurs non compatibles
</iframe>`}</Code>
      <Ul>
        <li>Toujours un attribut <InlineCode>title</InlineCode> (accessibilité).</li>
        <li>À utiliser avec parcimonie : une iframe alourdit la page.</li>
      </Ul>

      <SourceLink href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img">MDN — img</SourceLink>
      {" · "}
      <SourceLink href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture">MDN — picture</SourceLink>
      {" · "}
      <SourceLink href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video">MDN — video</SourceLink>
      {" · "}
      <SourceLink href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio">MDN — audio</SourceLink>
      {" · "}
      <SourceLink href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe">MDN — iframe</SourceLink>
    </div>
  );
}

export default function HtmlMedia() {
  return <Fr />;
}
