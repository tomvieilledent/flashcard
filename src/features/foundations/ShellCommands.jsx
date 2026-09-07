import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { TOOL_ACCENT } from "../../shared/ui/tokens.js";

export default function ShellCommands() {
  return (
    <div>
      <H2 accent={TOOL_ACCENT}>Travailler avec les commandes</H2>

      <H3>Qu'est-ce qu'une commande ?</H3>
      <Ul>
        <li>un <strong>exécutable</strong> (fichier dans le <InlineCode>PATH</InlineCode>) ;</li>
        <li>une <strong>commande interne</strong> du shell (<em>builtin</em>, ex. <InlineCode>cd</InlineCode>) ;</li>
        <li>une <strong>fonction</strong> shell ;</li>
        <li>un <strong>alias</strong> défini par l'utilisateur.</li>
      </Ul>

      <H3>Identifier une commande</H3>
      <Table
        head={["Commande", "Réponse"]}
        rows={[
          ["type ls", "dit si c'est un alias, un builtin, un fichier…"],
          ["which python3", "chemin de l'exécutable trouvé dans le PATH"],
          ["help cd", "aide des commandes internes du shell"],
          ["man ls", "manuel complet d'un programme"],
          ["apropos copy", "cherche « copy » dans les descriptions du manuel"],
          ["whatis cp", "résumé d'une ligne"],
        ]}
      />

      <H3>Lire un manuel (<InlineCode>man</InlineCode>)</H3>
      <P>
        <InlineCode>man</InlineCode> ouvre la page dans un pager
        (<InlineCode>less</InlineCode> : <InlineCode>/</InlineCode> pour
        chercher, <InlineCode>q</InlineCode> pour sortir). Les pages sont
        classées en sections numérotées :
      </P>
      <Table
        head={["Section", "Sujet"]}
        rows={[
          ["1", "commandes utilisateur"],
          ["2", "appels système"],
          ["3", "fonctions de bibliothèque (C)"],
          ["5", "formats de fichiers (ex. man 5 passwd)"],
          ["8", "commandes d'administration"],
        ]}
      />
      <Code>{`man 1 printf     # la commande shell
man 3 printf     # la fonction C
man -k réseau    # équivalent d'apropos`}</Code>

      <H3>Alias</H3>
      <P>
        Un alias remplace un mot par une commande plus longue. Défini dans le
        shell courant, il disparaît à la fermeture — sauf s'il est écrit dans
        <InlineCode> ~/.bashrc</InlineCode>.
      </P>
      <Code>{`alias ll='ls -lah'
alias gs='git status'
alias ..='cd ..'

alias            # liste les alias actifs
unalias ll       # en retire un
\\ls             # contourne un alias ponctuellement`}</Code>
      <Note accent={TOOL_ACCENT}>
        Pour rendre un alias permanent : l'ajouter à
        <InlineCode> ~/.bashrc</InlineCode>, puis recharger avec
        <InlineCode> source ~/.bashrc</InlineCode>.
      </Note>

      <SourceLink href="https://linuxcommand.org/lc3_lts0060.php">
        linuxcommand.org — Working with Commands
      </SourceLink>
      {" · "}
      <SourceLink href="https://linuxcommand.org/lc3_man_pages/man1.html">
        linuxcommand.org — man pages (section 1)
      </SourceLink>
      {" · "}
      <SourceLink href="https://www.linfo.org/alias.html">
        linfo.org — alias
      </SourceLink>
    </div>
  );
}
