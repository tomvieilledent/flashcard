import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { CI_ACCENT } from "../../shared/ui/tokens.js";

export default function CBetty() {
  return (
    <div>
      <H2 accent={CI_ACCENT}>Le style Betty</H2>

      <P>
        <strong>Betty</strong> est le vérificateur de style C imposé à
        Holberton, largement inspiré du <em>Linux kernel coding style</em>.
        Deux scripts :
      </P>
      <Ul>
        <li><InlineCode>betty-style</InlineCode> — la mise en forme du code ;</li>
        <li><InlineCode>betty-doc</InlineCode> — la documentation (commentaires, en-têtes).</li>
      </Ul>
      <Code>{`betty-style *.c *.h
betty-doc *.c *.h
# ou, une fois installé :
betty *.c`}</Code>

      <H3>Règles de mise en forme</H3>
      <Table
        head={["Règle", "Détail"]}
        rows={[
          ["Indentation", "tabulations, largeur 8 (pas d'espaces pour indenter)"],
          ["Largeur de ligne", "80 colonnes maximum"],
          ["Accolades", "style K&R : ouvrante en fin de ligne…"],
          ["…sauf fonctions", "l'accolade ouvrante d'une fonction va seule sur sa ligne"],
          ["Taille des fonctions", "40 lignes maximum (corps)"],
          ["Fonctions par fichier", "5 maximum"],
          ["Entre deux fonctions", "exactement une ligne vide"],
          ["Espaces", "un espace après if / for / while / return ; aucun en fin de ligne"],
          ["Fin de fichier", "une (et une seule) newline finale"],
        ]}
      />

      <H3>Documentation attendue (betty-doc)</H3>
      <Ul>
        <li>Chaque fichier <InlineCode>.c</InlineCode> : un commentaire de description en tête.</li>
        <li>Chaque fonction : un bloc de commentaire décrivant rôle, paramètres (<InlineCode>@nom:</InlineCode>) et valeur de retour (<InlineCode>Return:</InlineCode>).</li>
        <li>Les <InlineCode>.h</InlineCode> : <em>include guards</em> et prototypes de toutes les fonctions publiques.</li>
      </Ul>
      <Code>{`#include <stdio.h>

/**
 * add - additionne deux entiers
 * @a: premier terme
 * @b: second terme
 *
 * Return: la somme a + b
 */
int add(int a, int b)
{
	return (a + b);
}`}</Code>

      <H3>En-tête protégé</H3>
      <Code>{`#ifndef MAIN_H
#define MAIN_H

int add(int a, int b);

#endif /* MAIN_H */`}</Code>

      <Note accent={CI_ACCENT}>
        Betty ne juge pas la logique : un code peut compiler, marcher, et
        échouer au style. Le lancer <em>avant chaque commit</em> évite les
        allers-retours en correction.
      </Note>

      <SourceLink href="https://github.com/hs-hq/Betty/wiki">
        github.com — Betty Wiki
      </SourceLink>
    </div>
  );
}
