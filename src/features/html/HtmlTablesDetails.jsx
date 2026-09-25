import { Code, InlineCode, P, H2, H3, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { REACT_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={REACT_ACCENT}>HTML — tableaux et details</H2>

      <H3>Anatomie d'un tableau</H3>
      <P>
        L'élément <InlineCode>table</InlineCode> enveloppe des données
        tabulaires organisées en lignes et en colonnes.
      </P>
      <Table
        head={["Élément", "Rôle"]}
        rows={[
          ["caption", "Titre du tableau"],
          ["thead", "Regroupe les lignes d'en-tête de colonnes"],
          ["tbody", "Regroupe les lignes du corps"],
          ["tfoot", "Regroupe les lignes de pied"],
          ["tr", "Une ligne de cellules"],
          ["th", "Cellule d'en-tête d'un groupe de cellules"],
          ["td", "Cellule de données"],
          ["colgroup / col", "Définit un groupe de colonnes / une colonne"],
        ]}
      />
      <Code>{`<table>
  <caption>Le tableau</caption>
  <thead>
    <tr>
      <th scope="col">En-tête 1</th>
      <th scope="col">En-tête 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Corps 1</td>
      <td>Corps 2</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td>Pied 1</td>
      <td>Pied 2</td>
    </tr>
  </tfoot>
</table>`}</Code>
      <Note accent={REACT_ACCENT}>
        Accessibilité : toujours mettre un <InlineCode>caption</InlineCode>{" "}
        pour aider à comprendre le contenu du tableau. Un tableau sert aux
        données, pas à la mise en page.
      </Note>

      <H3>details : un accordéon natif</H3>
      <Code>{`<details>
  <summary>Détails</summary>
  <p>Quelque chose d'assez petit pour échapper à un regard distrait.</p>
</details>`}</Code>
      <P>
        Sans JavaScript, <InlineCode>summary</InlineCode> est le titre cliquable
        qui déplie ou replie le contenu : la façon la plus simple de faire un
        accordéon.
      </P>

      <SourceLink href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table">MDN — table</SourceLink>
      {" · "}
      <SourceLink href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/thead">MDN — thead</SourceLink>
      {" · "}
      <SourceLink href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details">MDN — details</SourceLink>
      {" · "}
      <SourceLink href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/summary">MDN — summary</SourceLink>
    </div>
  );
}

export default function HtmlTablesDetails() {
  return <Fr />;
}
