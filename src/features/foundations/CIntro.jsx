import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { CI_ACCENT } from "../../shared/ui/tokens.js";

export default function CIntro() {
  return (
    <div>
      <H2 accent={CI_ACCENT}>Les bases</H2>

      <H3>D'où il vient</H3>
      <Ul>
        <li>Créé par <strong>Dennis Ritchie</strong> aux Bell Labs (1972) pour réécrire le système <strong>Unix</strong>.</li>
        <li>Référence historique : <em>The C Programming Language</em> de Kernighan &amp; Ritchie (« K&amp;R », 1978).</li>
        <li>Normalisé ensuite : ANSI C (C89), puis C99, C11, C17.</li>
      </Ul>
      <P>
        C est un langage <em>compilé</em>, proche de la machine mais portable :
        assez bas niveau pour écrire un noyau, assez lisible pour être
        maintenu. C'est pour ça qu'on l'apprend en premier — on voit ce que
        fait vraiment le programme (mémoire, types, taille).
      </P>
      <Note accent={CI_ACCENT}>
        La lecture provocatrice « Linus Torvalds sur le C++ » (harmful.cat-v)
        sert de mise en bouche : l'idée défendue est qu'un langage simple et
        explicite force un code simple et explicite.
      </Note>

      <H3>Un premier programme</H3>
      <Code>{`#include <stdio.h>

int main(void)
{
    printf("Hello, World\\n");
    return (0);
}`}</Code>
      <Ul>
        <li><InlineCode>#include &lt;stdio.h&gt;</InlineCode> — donne accès à <InlineCode>printf</InlineCode>.</li>
        <li><InlineCode>int main(void)</InlineCode> — point d'entrée ; <InlineCode>void</InlineCode> = aucun paramètre.</li>
        <li><InlineCode>return (0);</InlineCode> — code de sortie 0 = succès (récupérable ensuite avec <InlineCode>echo $?</InlineCode>).</li>
        <li><InlineCode>\\n</InlineCode> — passage à la ligne.</li>
      </Ul>

      <H3>De la source à l'exécutable</H3>
      <Table
        head={["Étape", "Rôle", "Produit"]}
        rows={[
          ["Préprocesseur", "traite les #include, #define, #if", "code C « à plat »"],
          ["Compilation", "traduit le C en assembleur", "fichier .s"],
          ["Assemblage", "assembleur → code machine", "fichier objet .o"],
          ["Édition de liens", "assemble les .o + bibliothèques", "exécutable"],
        ]}
      />
      <Code>{`gcc main.c -o hello        # compile tout d'un coup
./hello

# options utiles à Holberton
gcc -Wall -Werror -Wextra -pedantic -std=gnu89 main.c -o hello
gcc -E main.c              # s'arrêter après le préprocesseur
gcc -c main.c             # s'arrêter au fichier objet`}</Code>

      <SourceLink href="https://en.wikipedia.org/wiki/Dennis_Ritchie">
        Wikipedia — Dennis Ritchie
      </SourceLink>
      {" · "}
      <SourceLink href="http://harmful.cat-v.org/software/c++/linus">
        harmful.cat-v.org — Linus Torvalds on C++
      </SourceLink>
      {" · "}
      <SourceLink href="https://www.cprogramming.com/tutorial/c/lesson2.html">
        cprogramming.com — C tutorial
      </SourceLink>
    </div>
  );
}
