import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { CI_ACCENT } from "../../shared/ui/tokens.js";

export default function CMemoryLayout() {
  return (
    <div>
      <H2 accent={CI_ACCENT}>Organisation mémoire d'un programme C</H2>

      <P>
        Au lancement, le système donne au processus un espace mémoire découpé
        en segments. Du bas (adresses basses) vers le haut :
      </P>

      <H3>Les segments</H3>
      <Table
        head={["Segment", "Contient", "Notes"]}
        rows={[
          ["Text (code)", "les instructions compilées", "lecture seule, partageable"],
          ["Data", "variables globales/static initialisées ≠ 0", "taille fixe"],
          ["BSS", "variables globales/static à 0 ou non initialisées", "mises à 0 au démarrage"],
          ["Heap (tas)", "mémoire demandée à l'exécution (malloc)", "grandit vers le HAUT"],
          ["Stack (pile)", "variables locales, arguments, adresses de retour", "grandit vers le BAS"],
        ]}
      />
      <Code>{`  adresses hautes
┌────────────────────┐
│   arguments / env  │
│       Stack        │  ↓ grandit vers le bas
│         ...        │
│         ...        │
│        Heap        │  ↑ grandit vers le haut
├────────────────────┤
│        BSS         │  (globales non initialisées)
│        Data        │  (globales initialisées)
│    Text (code)     │
└────────────────────┘
  adresses basses`}</Code>

      <H3>Pile vs tas</H3>
      <Table
        head={["", "Pile (stack)", "Tas (heap)"]}
        rows={[
          ["Qui gère", "le compilateur, automatiquement", "le programmeur (malloc / free)"],
          ["Durée de vie", "le temps de l'appel de fonction", "jusqu'au free explicite"],
          ["Vitesse", "très rapide", "plus lente"],
          ["Risque", "débordement si récursion trop profonde", "fuite mémoire si on oublie free"],
        ]}
      />
      <Code>{`void f(void)
{
	int local = 3;              /* pile : disparaît au retour */
	int *p = malloc(sizeof(int)); /* tas : survit jusqu'à free(p) */

	*p = 3;
	free(p);
}`}</Code>

      <Note accent={CI_ACCENT}>
        Renvoyer l'adresse d'une variable locale (<InlineCode>return &amp;local;</InlineCode>)
        est un bug : la case de pile est réutilisée dès le retour.
      </Note>

      <H3>Storage : automatique vs statique</H3>
      <Ul>
        <li><strong>Automatique</strong> : locales sans <InlineCode>static</InlineCode> → pile, recréées à chaque appel.</li>
        <li><strong>Statique</strong> : globales et <InlineCode>static</InlineCode> → Data/BSS, une seule instance pour toute la vie du programme.</li>
      </Ul>

      <SourceLink href="https://aticleworld.com/memory-layout-of-c-program/">
        aticleworld.com — Memory layout of a C program
      </SourceLink>
    </div>
  );
}
