import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { TOOL_ACCENT } from "../../shared/ui/tokens.js";

export default function EditorVim() {
  return (
    <div>
      <H2 accent={TOOL_ACCENT}>vi / Vim</H2>

      <P>
        <InlineCode>vi</InlineCode> (et sa version moderne
        <InlineCode> vim</InlineCode>) est présent sur quasiment tout système
        Unix. C'est un éditeur <em>modal</em> : les touches font des choses
        différentes selon le mode.
      </P>

      <H3>Les modes</H3>
      <Table
        head={["Mode", "Rôle", "Y entrer", "En sortir"]}
        rows={[
          ["Normal", "se déplacer, éditer par commandes", "Échap", "—"],
          ["Insertion", "taper du texte", "i a o I A O", "Échap"],
          ["Commande", "sauver, quitter, rechercher/remplacer", ": (depuis Normal)", "Entrée ou Échap"],
          ["Visuel", "sélectionner", "v V Ctrl-v", "Échap"],
        ]}
      />
      <Note accent={TOOL_ACCENT}>
        En cas de doute, appuyer sur <InlineCode>Échap</InlineCode> : on revient
        toujours en mode Normal.
      </Note>

      <H3>Ouvrir, sauver, quitter</H3>
      <Code>{`vim fichier.txt     # ouvrir (ou créer)

:w                  # écrire (sauvegarder)
:w autre.txt        # écrire sous un autre nom
:q                  # quitter
:wq   ou  :x   ou  ZZ   # sauver puis quitter
:q!                 # quitter sans sauver
:qa                 # quitter tous les fichiers ouverts`}</Code>

      <H3>Se déplacer (mode Normal)</H3>
      <Table
        head={["Touche(s)", "Déplacement"]}
        rows={[
          ["h j k l", "gauche, bas, haut, droite"],
          ["w / b", "mot suivant / précédent"],
          ["0 / ^ / $", "début de ligne / 1er caractère / fin de ligne"],
          ["gg / G", "1re ligne / dernière ligne"],
          [":42", "aller à la ligne 42"],
          ["Ctrl-f / Ctrl-b", "page suivante / précédente"],
        ]}
      />

      <H3>Éditer</H3>
      <Table
        head={["Commande", "Effet"]}
        rows={[
          ["x", "supprimer le caractère"],
          ["dd", "supprimer (couper) la ligne"],
          ["dw", "supprimer jusqu'à la fin du mot"],
          ["yy", "copier (yank) la ligne"],
          ["p / P", "coller après / avant"],
          ["cw", "remplacer le mot (passe en Insertion)"],
          ["r", "remplacer un seul caractère"],
          ["u / Ctrl-r", "annuler / rétablir"],
          [".", "répéter la dernière modification"],
        ]}
      />
      <P>
        Beaucoup de commandes se préfixent d'un nombre :
        <InlineCode> 3dd</InlineCode> supprime 3 lignes,
        <InlineCode> 5j</InlineCode> descend de 5 lignes.
      </P>

      <H3>Rechercher / remplacer</H3>
      <Code>{`/motif        # chercher vers l'avant   (n / N : suivant / précédent)
?motif        # chercher vers l'arrière

:%s/ancien/nouveau/g     # remplacer partout dans le fichier
:%s/ancien/nouveau/gc    # ... en demandant confirmation`}</Code>

      <H3>Réglages utiles (<InlineCode>~/.vimrc</InlineCode>)</H3>
      <Code>{`set number          " numéros de ligne
set expandtab       " des espaces au lieu de tabulations
set tabstop=4       " largeur d'une tabulation
set shiftwidth=4
syntax on           " coloration syntaxique`}</Code>

      <SourceLink href="https://www.cs.colostate.edu/helpdocs/vi.html">
        cs.colostate.edu — vi reference
      </SourceLink>
    </div>
  );
}
