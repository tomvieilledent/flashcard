import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { CI_ACCENT } from "../../shared/ui/tokens.js";

export default function CDataStructures() {
  return (
    <div>
      <H2 accent={CI_ACCENT}>Structures de données — les bases</H2>

      <P>
        Une <em>structure de données</em> est une façon d'organiser des
        valeurs en mémoire pour les manipuler efficacement. Le choix dépend
        des opérations fréquentes : accès, insertion, suppression, parcours.
      </P>

      <H3>struct — regrouper des champs</H3>
      <P>
        <InlineCode>struct</InlineCode> assemble plusieurs valeurs de types
        différents sous un seul nom. C'est la brique de toutes les autres
        structures.
      </P>
      <Code>{`struct point
{
	int x;
	int y;
};

struct point a;

a.x = 3;
a.y = 4;

struct point *p = &a;
p->x = 10;        /* équivaut à (*p).x */`}</Code>

      <H3>Tableau vs liste chaînée</H3>
      <Table
        head={["", "Tableau", "Liste chaînée"]}
        rows={[
          ["Mémoire", "contiguë, taille fixe", "nœuds dispersés, reliés par pointeurs"],
          ["Accès à l'élément i", "immédiat — O(1)", "il faut parcourir — O(n)"],
          ["Insérer au début", "coûteux (décaler tout) — O(n)", "immédiat — O(1)"],
          ["Taille", "connue d'avance", "grandit tant qu'il reste de la mémoire"],
        ]}
      />
      <Code>{`struct node
{
	int value;
	struct node *next;   /* pointe sur le nœud suivant, ou NULL */
};`}</Code>
      <Note accent={CI_ACCENT}>
        Le dernier nœud d'une liste a <InlineCode>next == NULL</InlineCode> :
        c'est la condition d'arrêt du parcours
        (<InlineCode>while (n != NULL) n = n-&gt;next;</InlineCode>).
      </Note>

      <H3>Deux disciplines d'accès</H3>
      <Ul>
        <li><strong>Pile (stack)</strong> — LIFO : on ajoute et on retire par le même bout (dernier entré, premier sorti).</li>
        <li><strong>File (queue)</strong> — FIFO : on ajoute d'un côté, on retire de l'autre (premier entré, premier sorti).</li>
      </Ul>

      <SourceLink href="https://www.tutorialspoint.com/data_structures_algorithms/data_structures_basics.htm">
        tutorialspoint — Data structures basics
      </SourceLink>
      {" · "}
      <SourceLink href="https://www.geeksforgeeks.org/data-structures/">
        geeksforgeeks — Data Structures
      </SourceLink>
    </div>
  );
}
