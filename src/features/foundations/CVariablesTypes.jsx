import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { CI_ACCENT } from "../../shared/ui/tokens.js";

export default function CVariablesTypes() {
  return (
    <div>
      <H2 accent={CI_ACCENT}>Variables, types et identificateurs</H2>

      <H3>Identificateurs</H3>
      <Ul>
        <li>Lettres, chiffres et <InlineCode>_</InlineCode> ; ne commence <em>jamais</em> par un chiffre.</li>
        <li>Sensible à la casse : <InlineCode>compteur</InlineCode> ≠ <InlineCode>Compteur</InlineCode>.</li>
        <li>Interdit d'utiliser un <strong>mot-clé</strong> réservé (<InlineCode>int</InlineCode>, <InlineCode>for</InlineCode>, <InlineCode>return</InlineCode>, <InlineCode>sizeof</InlineCode>, <InlineCode>struct</InlineCode>…).</li>
        <li>Convention Holberton/kernel : <InlineCode>snake_case</InlineCode>, noms courts mais parlants.</li>
      </Ul>

      <H3>Déclarer et initialiser</H3>
      <Code>{`int age;              /* déclaration : valeur indéterminée */
age = 32;             /* affectation */

int total = 0;        /* déclaration + initialisation */
char lettre = 'A';
unsigned int n = 10U;
const double PI = 3.14159;   /* constante : non modifiable */`}</Code>
      <Note accent={CI_ACCENT}>
        Une variable non initialisée contient un déchet mémoire, pas 0.
        L'initialiser à la déclaration évite une classe entière de bugs.
      </Note>

      <H3>Les types entiers</H3>
      <P>
        La norme fixe des tailles <em>minimales</em>, pas exactes. Sur une
        machine 64 bits typique (Linux) :
      </P>
      <Table
        head={["Type", "Taille usuelle", "Plage (signé)"]}
        rows={[
          ["char", "1 octet", "-128 … 127"],
          ["short", "2 octets", "-32 768 … 32 767"],
          ["int", "4 octets", "-2 147 483 648 … 2 147 483 647"],
          ["long", "8 octets", "≈ -9,2×10¹⁸ … 9,2×10¹⁸"],
          ["long long", "8 octets", "idem, garanti ≥ 64 bits"],
        ]}
      />
      <Ul>
        <li><InlineCode>signed</InlineCode> (défaut) accepte les négatifs ; <InlineCode>unsigned</InlineCode> double la borne positive et interdit le négatif.</li>
        <li><InlineCode>char</InlineCode> est un entier : <InlineCode>'A'</InlineCode> vaut 65 (ASCII).</li>
        <li><InlineCode>sizeof(type)</InlineCode> donne la taille réelle en octets sur la machine.</li>
        <li><InlineCode>&lt;limits.h&gt;</InlineCode> : <InlineCode>INT_MAX</InlineCode>, <InlineCode>CHAR_MIN</InlineCode>, etc.</li>
      </Ul>
      <Code>{`#include <stdio.h>
#include <limits.h>

int main(void)
{
    printf("int = %lu octets, max = %d\\n", sizeof(int), INT_MAX);
    return (0);
}`}</Code>

      <H3>Dépassement de capacité</H3>
      <P>
        Ajouter 1 à <InlineCode>INT_MAX</InlineCode> ne « plante » pas : la
        valeur repart au minimum (comportement indéfini en signé, modulo en
        <InlineCode> unsigned</InlineCode>). Choisir un type assez large.
      </P>

      <SourceLink href="https://publications.gbdirect.co.uk//c_book/chapter2/keywords_and_identifiers.html">
        The C Book — Keywords and identifiers
      </SourceLink>
      {" · "}
      <SourceLink href="https://publications.gbdirect.co.uk//c_book/chapter2/integral_types.html">
        The C Book — Integral types
      </SourceLink>
    </div>
  );
}
