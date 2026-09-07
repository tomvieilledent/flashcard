import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { CI_ACCENT } from "../../shared/ui/tokens.js";

export default function DsBst() {
  return (
    <div>
      <H2 accent={CI_ACCENT}>Arbres binaires de recherche (ABR)</H2>

      <P>
        Un <strong>ABR</strong> (<em>Binary Search Tree</em>) est un arbre
        binaire qui respecte, pour <em>chaque</em> nœud :
      </P>
      <Ul>
        <li>toutes les valeurs du sous-arbre <strong>gauche</strong> sont <strong>&lt;</strong> à celle du nœud ;</li>
        <li>toutes les valeurs du sous-arbre <strong>droit</strong> sont <strong>&gt;</strong> à celle du nœud ;</li>
        <li>en général, pas de doublons.</li>
      </Ul>
      <P>
        Conséquence : un parcours <em>infixe</em> restitue les valeurs
        <strong> triées</strong>.
      </P>

      <H3>Rechercher</H3>
      <Code>{`bst_t *bst_search(const bst_t *tree, int value)
{
	if (tree == NULL || tree->n == value)
		return ((bst_t *)tree);
	if (value < tree->n)
		return (bst_search(tree->left, value));
	return (bst_search(tree->right, value));
}`}</Code>
      <P>
        À chaque étape on élimine une moitié : recherche, insertion et
        suppression sont en <InlineCode>O(h)</InlineCode>, où
        <InlineCode> h</InlineCode> est la hauteur.
      </P>

      <H3>Insérer</H3>
      <Ul>
        <li>Descendre à gauche/droite selon la comparaison jusqu'à une place vide.</li>
        <li>Y accrocher le nouveau nœud comme feuille.</li>
      </Ul>

      <H3>Le problème de l'équilibre</H3>
      <Table
        head={["Forme", "Hauteur", "Recherche"]}
        rows={[
          ["ABR équilibré", "≈ log₂(n)", "O(log n)"],
          ["ABR dégénéré (valeurs insérées triées)", "n", "O(n) — comme une liste"],
        ]}
      />
      <Note accent={CI_ACCENT}>
        Insérer 1, 2, 3, 4, 5 dans cet ordre produit un « peigne » penché à
        droite. Les arbres auto-équilibrés (AVL, rouge-noir) réorganisent les
        nœuds pour garder <InlineCode>h ≈ log n</InlineCode>.
      </Note>

      <SourceLink href="https://en.wikipedia.org/wiki/Binary_search_tree">
        Wikipedia — Binary search tree
      </SourceLink>
    </div>
  );
}
