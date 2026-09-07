import { Code, InlineCode, P, H2, H3, Ul, Note, SourceLink } from "../../shared/ui/primitives.jsx";
import { CI_ACCENT } from "../../shared/ui/tokens.js";

export default function CStructsTypedef() {
  return (
    <div>
      <H2 accent={CI_ACCENT}>struct, typedef & alignement</H2>

      <H3>Déclarer une structure</H3>
      <Code>{`struct dog
{
	char *name;
	float age;
	char *owner;
};

struct dog d = {"Rex", 3.5, "Alice"};

d.age = 4;
struct dog *p = &d;
p->age = 5;             /* (*p).age */`}</Code>

      <H3>typedef — un alias de type</H3>
      <P>
        <InlineCode>typedef</InlineCode> crée un nom plus court pour un type
        existant. Très courant avec <InlineCode>struct</InlineCode>.
      </P>
      <Code>{`typedef struct dog dog_t;

dog_t d;                /* au lieu de : struct dog d; */

/* déclaration + typedef en une fois */
typedef struct point
{
	int x;
	int y;
} point_t;`}</Code>
      <Note accent={CI_ACCENT}>
        Convention Holberton / Betty : suffixe <InlineCode>_t</InlineCode> pour
        les types <InlineCode>typedef</InlineCode>, et un bloc de
        documentation décrivant chaque membre de la structure
        (<InlineCode>@name:</InlineCode>, <InlineCode>@age:</InlineCode>…).
      </Note>
      <Code>{`/**
 * struct dog - description d'un chien
 * @name: le nom
 * @age: l'âge
 * @owner: le nom du maître
 */`}</Code>

      <H3>Taille & alignement (padding)</H3>
      <P>
        Le compilateur insère des octets de bourrage pour aligner chaque
        membre sur une adresse multiple de sa taille. D'où
        <InlineCode> sizeof(struct)</InlineCode> ≥ somme des membres.
      </P>
      <Code>{`struct mixte
{
	char  c;    /* 1 octet  + 3 de padding */
	int   n;    /* 4 octets */
	char  c2;   /* 1 octet  + 3 de padding */
};              /* sizeof == 12, pas 6 */`}</Code>
      <Ul>
        <li>Ranger les membres du plus grand au plus petit réduit le padding.</li>
        <li>L'ordre des champs est une décision de performance/mémoire, pas seulement de style.</li>
      </Ul>

      <SourceLink href="https://en.wikipedia.org/wiki/Struct_(C_programming_language)">
        Wikipedia — struct (C)
      </SourceLink>
      {" · "}
      <SourceLink href="https://publications.gbdirect.co.uk//c_book/chapter8/typedef.html">
        The C Book — typedef
      </SourceLink>
      {" · "}
      <SourceLink href="http://www.catb.org/esr/structure-packing/">
        catb.org (ESR) — The Lost Art of Structure Packing
      </SourceLink>
      {" · "}
      <SourceLink href="https://github.com/hs-hq/Betty/wiki/Documentation:-Data-structures">
        Betty Wiki — Documentation: Data structures
      </SourceLink>
    </div>
  );
}
