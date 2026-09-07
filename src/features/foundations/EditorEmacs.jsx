import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { TOOL_ACCENT } from "../../shared/ui/tokens.js";

export default function EditorEmacs() {
  return (
    <div>
      <H2 accent={TOOL_ACCENT}>Emacs</H2>

      <P>
        Emacs n'est pas modal : on tape du texte normalement, et les
        commandes passent par des <em>raccourcis</em>. Notation :
        <InlineCode> C-x</InlineCode> = Ctrl enfoncé + x ;
        <InlineCode> M-x</InlineCode> = Meta (Alt, ou Échap tapé avant) + x.
      </P>

      <H3>Survie</H3>
      <Table
        head={["Raccourci", "Action"]}
        rows={[
          ["C-g", "annuler la commande en cours (le réflexe de secours)"],
          ["C-x C-s", "sauvegarder le fichier"],
          ["C-x C-c", "quitter Emacs"],
          ["C-x C-f", "ouvrir un fichier (find-file)"],
          ["C-/  (ou C-x u)", "annuler (undo)"],
          ["C-h t", "tutoriel interactif intégré"],
          ["C-h k", "décrire ce que fait une touche"],
        ]}
      />
      <Note accent={TOOL_ACCENT}>
        Toute commande a un nom. <InlineCode>M-x</InlineCode> puis le nom
        (ex. <InlineCode>M-x replace-string</InlineCode>) exécute n'importe
        quelle commande sans raccourci.
      </Note>

      <H3>Se déplacer</H3>
      <Table
        head={["Raccourci", "Déplacement"]}
        rows={[
          ["C-f / C-b", "un caractère avant / arrière"],
          ["C-n / C-p", "ligne suivante / précédente"],
          ["C-a / C-e", "début / fin de ligne"],
          ["M-f / M-b", "un mot avant / arrière"],
          ["M-< / M->", "début / fin du buffer"],
          ["M-g M-g", "aller à un numéro de ligne"],
        ]}
      />

      <H3>Éditer : couper / coller</H3>
      <P>
        Le texte supprimé va dans le <em>kill-ring</em> ; on le récupère avec
        <InlineCode> C-y</InlineCode> (yank).
      </P>
      <Table
        head={["Raccourci", "Effet"]}
        rows={[
          ["C-k", "couper de la position jusqu'à la fin de ligne"],
          ["C-espace puis déplacement", "poser une marque et sélectionner"],
          ["C-w / M-w", "couper / copier la région sélectionnée"],
          ["C-y", "coller le dernier élément coupé"],
          ["M-y", "après C-y : parcourir l'historique du kill-ring"],
        ]}
      />

      <H3>Rechercher</H3>
      <Code>{`C-s   recherche incrémentale vers l'avant  (C-s à nouveau : occurrence suivante)
C-r   recherche incrémentale vers l'arrière
M-%   remplacer interactivement (query-replace)`}</Code>

      <H3>Buffers, fenêtres, fichiers</H3>
      <Table
        head={["Raccourci", "Action"]}
        rows={[
          ["C-x b", "changer de buffer"],
          ["C-x C-b", "lister les buffers"],
          ["C-x 2 / C-x 3", "diviser la fenêtre horizontalement / verticalement"],
          ["C-x o", "passer à l'autre fenêtre"],
          ["C-x 1", "ne garder que la fenêtre courante"],
          ["C-x 0", "fermer la fenêtre courante"],
        ]}
      />

      <SourceLink href="https://www.gnu.org/software/emacs/tour/">
        gnu.org — A Guided Tour of Emacs
      </SourceLink>
    </div>
  );
}
