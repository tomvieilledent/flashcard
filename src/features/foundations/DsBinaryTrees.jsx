import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { CI_ACCENT } from "../../shared/ui/tokens.js";

export default function DsBinaryTrees() {
  return (
    <div>
      <H2 accent={CI_ACCENT}>Arbres binaires & parcours</H2>

      <P>
        Un <strong>arbre binaire</strong> est un ensemble de nœuds où chaque
        nœud a au plus deux enfants (gauche, droite) et un seul parent. Le
        nœud sans parent est la <em>racine</em> ; les nœuds sans enfant sont
        les <em>feuilles</em>.
      </P>

      <H3>Vocabulaire</H3>
      <Table
        head={["Terme", "Définition"]}
        rows={[
          ["Profondeur d'un nœud", "nombre d'arêtes jusqu'à la racine"],
          ["Hauteur d'un nœud", "nombre d'arêtes jusqu'à la feuille la plus lointaine"],
          ["Taille", "nombre total de nœuds"],
          ["Arbre complet", "tous les niveaux pleins sauf peut-être le dernier, rempli à gauche"],
          ["Arbre parfait", "toutes les feuilles à la même profondeur"],
        ]}
      />

      <H3>Un nœud en C</H3>
      <Code>{`typedef struct binary_tree_s
{
	int n;
	struct binary_tree_s *parent;
	struct binary_tree_s *left;
	struct binary_tree_s *right;
} binary_tree_t;`}</Code>

      <H3>Les parcours (traversals)</H3>
      <Table
        head={["Parcours", "Ordre", "Usage"]}
        rows={[
          ["Préfixe (pre-order)", "racine, gauche, droite", "copier / sérialiser l'arbre"],
          ["Infixe (in-order)", "gauche, racine, droite", "sur un ABR : valeurs triées"],
          ["Postfixe (post-order)", "gauche, droite, racine", "libérer / calculer une expression"],
          ["Largeur (level-order)", "niveau par niveau", "utilise une file (queue)"],
        ]}
      />
      <Code>{`void in_order(const binary_tree_t *tree, void (*func)(int))
{
	if (tree == NULL)
		return;
	in_order(tree->left, func);
	func(tree->n);
	in_order(tree->right, func);
}`}</Code>

      <Note accent={CI_ACCENT}>
        Les parcours en profondeur (pré/in/post) s'écrivent naturellement en
        récursif ; le parcours en largeur se fait avec une file.
        <InlineCode> tree == NULL</InlineCode> est toujours le cas de base.
      </Note>

      <SourceLink href="https://en.wikipedia.org/wiki/Binary_tree">
        Wikipedia — Binary tree
      </SourceLink>
      {" · "}
      <SourceLink href="https://www.tutorialspoint.com/data_structures_algorithms/tree_data_structure.htm">
        tutorialspoint — Tree data structure
      </SourceLink>
      {" · "}
      <SourceLink href="https://www.tutorialspoint.com/data_structures_algorithms/tree_traversal.htm">
        tutorialspoint — Tree traversal
      </SourceLink>
    </div>
  );
}
