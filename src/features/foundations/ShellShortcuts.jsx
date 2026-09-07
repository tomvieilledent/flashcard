import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { TOOL_ACCENT } from "../../shared/ui/tokens.js";

export default function ShellShortcuts() {
  return (
    <div>
      <H2 accent={TOOL_ACCENT}>Raccourcis & historique bash</H2>

      <P>
        La ligne de commande est éditée par <em>Readline</em> (mode Emacs par
        défaut). Ces raccourcis évitent les allers-retours avec les flèches.
      </P>

      <H3>Déplacer le curseur</H3>
      <Table
        head={["Raccourci", "Action"]}
        rows={[
          ["Ctrl-A / Ctrl-E", "début / fin de ligne"],
          ["Alt-B / Alt-F", "mot précédent / suivant"],
          ["Ctrl-XX", "bascule entre le début de ligne et la position"],
        ]}
      />

      <H3>Éditer</H3>
      <Table
        head={["Raccourci", "Action"]}
        rows={[
          ["Ctrl-U", "efface du curseur jusqu'au début de ligne"],
          ["Ctrl-K", "efface du curseur jusqu'à la fin de ligne"],
          ["Ctrl-W", "efface le mot avant le curseur"],
          ["Alt-D", "efface le mot après le curseur"],
          ["Ctrl-Y", "recolle le dernier fragment effacé (yank)"],
          ["Ctrl-_", "annuler la dernière édition"],
          ["Alt-.", "insère le dernier argument de la commande précédente"],
        ]}
      />

      <H3>Contrôle du terminal</H3>
      <Table
        head={["Raccourci", "Action"]}
        rows={[
          ["Ctrl-C", "interrompt la commande en cours (SIGINT)"],
          ["Ctrl-D", "fin de saisie / ferme le shell si la ligne est vide"],
          ["Ctrl-Z", "suspend la commande (reprise : fg / bg)"],
          ["Ctrl-L", "efface l'écran (comme clear)"],
          ["Ctrl-S / Ctrl-Q", "gèle / dégèle l'affichage du terminal"],
        ]}
      />

      <H3>Historique</H3>
      <Table
        head={["Élément", "Effet"]}
        rows={[
          ["↑ / ↓", "commande précédente / suivante"],
          ["Ctrl-R", "recherche incrémentale dans l'historique (Ctrl-R répète)"],
          ["history", "affiche l'historique numéroté"],
          ["!!", "relance la dernière commande"],
          ["!ssh", "relance la dernière commande commençant par « ssh »"],
          ["!42", "relance la commande n° 42"],
          ["!$", "dernier argument de la commande précédente"],
          ["sudo !!", "relance la dernière commande, préfixée de sudo"],
        ]}
      />
      <Note accent={TOOL_ACCENT}>
        <InlineCode>Tab</InlineCode> complète commandes, chemins et
        variables ; <InlineCode>Tab Tab</InlineCode> liste toutes les
        possibilités. C'est le raccourci le plus rentable.
      </Note>

      <SourceLink href="https://www.howtogeek.com/181/keyboard-shortcuts-for-bash-command-shell-for-ubuntu-debian-suse-redhat-linux-etc/">
        howtogeek.com — Keyboard shortcuts for Bash
      </SourceLink>
    </div>
  );
}
