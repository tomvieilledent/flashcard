import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { CI_ACCENT } from "../../shared/ui/tokens.js";

export default function CFunctions() {
  return (
    <div>
      <H2 accent={CI_ACCENT}>Fonctions et fichiers d'en-tête</H2>

      <H3>Définir une fonction</H3>
      <Code>{`type_de_retour nom(liste de paramètres)
{
	/* corps */
	return (valeur);
}

int add(int a, int b)
{
	return (a + b);
}`}</Code>
      <Ul>
        <li><InlineCode>void</InlineCode> en retour = ne renvoie rien ; <InlineCode>void</InlineCode> en paramètre = n'en prend aucun.</li>
        <li>Les arguments sont passés <strong>par valeur</strong> : la fonction reçoit une copie, elle ne modifie pas la variable de l'appelant (sauf via un pointeur).</li>
      </Ul>

      <H3>Prototype (déclaration)</H3>
      <P>
        Le compilateur lit le fichier de haut en bas : il doit connaître une
        fonction <em>avant</em> son premier appel. Le prototype l'annonce
        sans la définir.
      </P>
      <Code>{`int add(int a, int b);        /* prototype — le nom des paramètres est optionnel */
int add(int, int);            /* valable aussi */`}</Code>
      <Note accent={CI_ACCENT}>
        Sans prototype, un appel à une fonction inconnue déclenche un
        avertissement (<InlineCode>implicit declaration</InlineCode>) — et une
        erreur avec <InlineCode>-Werror</InlineCode>.
      </Note>

      <H3>Fichiers d'en-tête (.h)</H3>
      <P>
        On regroupe les prototypes et les macros partagés dans un
        <InlineCode> .h</InlineCode>, inclus par chaque <InlineCode>.c</InlineCode>
        {" "}qui en a besoin. Toujours protégé contre les inclusions
        multiples.
      </P>
      <Code>{`/* main.h */
#ifndef MAIN_H
#define MAIN_H

int add(int a, int b);
int _putchar(char c);

#endif /* MAIN_H */

/* add.c */
#include "main.h"    /* guillemets : en-tête du projet */

int add(int a, int b)
{
	return (a + b);
}`}</Code>
      <Ul>
        <li><InlineCode>#include &lt;stdio.h&gt;</InlineCode> — en-têtes système (chemins standard).</li>
        <li><InlineCode>#include "main.h"</InlineCode> — en-têtes du projet (répertoire courant).</li>
      </Ul>

      <H3>Portée &amp; durée de vie</H3>
      <Table
        head={["Déclaration", "Visible", "Vit"]}
        rows={[
          ["variable dans une fonction", "cette fonction", "le temps de l'appel"],
          ["variable globale", "tout le fichier (et au-delà avec extern)", "toute l'exécution"],
          ["static (locale)", "cette fonction", "toute l'exécution (garde sa valeur)"],
          ["static (globale / fonction)", "ce fichier uniquement", "toute l'exécution"],
        ]}
      />

      <SourceLink href="https://www.tutorialspoint.com/cprogramming/c_functions.htm">
        tutorialspoint — Functions
      </SourceLink>
      {" · "}
      <SourceLink href="https://www.programiz.com/c-programming/c-user-defined-functions">
        programiz — User-defined functions
      </SourceLink>
      {" · "}
      <SourceLink href="https://www.tutorialspoint.com/cprogramming/c_header_files.htm">
        tutorialspoint — Header files
      </SourceLink>
    </div>
  );
}
