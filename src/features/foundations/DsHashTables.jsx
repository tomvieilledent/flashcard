import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { CI_ACCENT } from "../../shared/ui/tokens.js";

export default function DsHashTables() {
  return (
    <div>
      <H2 accent={CI_ACCENT}>Tables de hachage</H2>

      <P>
        Une table de hachage associe des <strong>clés</strong> à des
        <strong> valeurs</strong> avec un accès moyen en
        <InlineCode> O(1)</InlineCode>. Une <em>fonction de hachage</em>
        transforme la clé en indice d'un tableau (les <em>alvéoles</em>,
        <em> buckets</em>).
      </P>
      <Code>{`indice = hash(cle) % taille_du_tableau;`}</Code>

      <H3>La fonction de hachage</H3>
      <Ul>
        <li><strong>Déterministe</strong> : même clé → même indice.</li>
        <li><strong>Uniforme</strong> : répartit les clés sur tout le tableau.</li>
        <li><strong>Rapide</strong> à calculer.</li>
      </Ul>
      <P>Exemple classique pour des chaînes : <InlineCode>djb2</InlineCode>.</P>
      <Code>{`unsigned long hash_djb2(unsigned char *str)
{
	unsigned long hash = 5381;
	int c;

	while ((c = *str++))
		hash = ((hash << 5) + hash) + c;   /* hash * 33 + c */
	return (hash);
}`}</Code>

      <H3>Les collisions</H3>
      <P>
        Deux clés différentes peuvent tomber sur le même indice. Deux
        stratégies :
      </P>
      <Table
        head={["Méthode", "Principe"]}
        rows={[
          ["Chaînage séparé", "chaque alvéole est une liste chaînée de paires (clé, valeur)"],
          ["Adressage ouvert", "on cherche l'alvéole libre suivante (sondage linéaire, quadratique…)"],
        ]}
      />
      <Code>{`typedef struct hash_node_s
{
	char *key;
	char *value;
	struct hash_node_s *next;   /* chaînage en cas de collision */
} hash_node_t;

typedef struct hash_table_s
{
	unsigned long int size;
	hash_node_t **array;
} hash_table_t;`}</Code>

      <H3>Facteur de charge</H3>
      <P>
        <InlineCode>charge = éléments / taille</InlineCode>. Quand il
        approche de 1, les collisions explosent et l'accès dérive vers
        <InlineCode> O(n)</InlineCode> : on <em>redimensionne</em> (souvent
        ×2) et on <em>réinsère</em> tout.
      </P>
      <Note accent={CI_ACCENT}>
        L'ordre d'itération d'une table de hachage n'a aucun sens : il dépend
        de la fonction de hachage et de la taille du tableau, pas de l'ordre
        d'insertion.
      </Note>

      <SourceLink href="https://en.wikipedia.org/wiki/Hash_table">
        Wikipedia — Hash table
      </SourceLink>
    </div>
  );
}
