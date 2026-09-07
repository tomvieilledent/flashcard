import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { TOOL_ACCENT } from "../../shared/ui/tokens.js";

export default function ShellLookingAround() {
  return (
    <div>
      <H2 accent={TOOL_ACCENT}>Observer : ls, less, file</H2>

      <H3>ls — lister</H3>
      <P>
        <InlineCode>ls</InlineCode> accepte plusieurs répertoires et de
        nombreuses options, combinables.
      </P>
      <Table
        head={["Option", "Effet"]}
        rows={[
          ["-l", "format long : droits, propriétaire, taille, date"],
          ["-a", "affiche aussi les fichiers cachés (commençant par .)"],
          ["-t", "trie par date de modification (récent d'abord)"],
          ["-S", "trie par taille (gros d'abord)"],
          ["-r", "inverse l'ordre du tri"],
          ["-h", "tailles lisibles (Ko, Mo…) avec -l"],
          ["-F", "ajoute un suffixe : / dossier, * exécutable, @ lien"],
          ["-R", "parcourt les sous-répertoires (récursif)"],
        ]}
      />
      <Code>{`ls -lh /usr
ls -lat        # options groupées : long + cachés + tri par date
ls ~ /etc      # deux répertoires d'un coup`}</Code>

      <H3>Lire une ligne de <InlineCode>ls -l</InlineCode></H3>
      <Code>{`-rw-r--r--  1  alice  staff  428  12 mai 09:14  notes.txt

-rw-r--r--   type + droits (voir ci-dessous)
1            nombre de liens physiques
alice        utilisateur propriétaire
staff        groupe propriétaire
428          taille en octets
12 mai 09:14 date de dernière modification
notes.txt    nom`}</Code>
      <Ul>
        <li>1er caractère : <InlineCode>-</InlineCode> fichier, <InlineCode>d</InlineCode> dossier, <InlineCode>l</InlineCode> lien symbolique.</li>
        <li>Puis 3 blocs de <InlineCode>rwx</InlineCode> : droits du propriétaire, du groupe, des autres.</li>
      </Ul>

      <H3>less — parcourir un fichier texte</H3>
      <P>
        <InlineCode>less</InlineCode> affiche un fichier page par page sans le
        charger entièrement en mémoire. On en sort avec <InlineCode>q</InlineCode>.
      </P>
      <Table
        head={["Touche", "Action"]}
        rows={[
          ["Espace / b", "page suivante / précédente"],
          ["flèches", "ligne par ligne"],
          ["g / G", "début / fin du fichier"],
          ["/motif", "rechercher vers l'avant (n = occurrence suivante)"],
          ["q", "quitter"],
        ]}
      />
      <Note accent={TOOL_ACCENT}>
        « less is more » : <InlineCode>less</InlineCode> est une version plus
        souple de l'ancien pager <InlineCode>more</InlineCode> (retour en
        arrière possible, recherche…).
      </Note>

      <H3>file — deviner le type d'un fichier</H3>
      <P>
        L'extension d'un fichier n'a pas de sens imposé sous Linux.
        <InlineCode> file</InlineCode> examine le contenu pour annoncer sa
        nature — pratique avant d'ouvrir un fichier inconnu.
      </P>
      <Code>{`file /etc/passwd
/etc/passwd: ASCII text

file /bin/ls
/bin/ls: ELF 64-bit LSB executable`}</Code>

      <SourceLink href="https://linuxcommand.org/lc3_lts0030.php">
        linuxcommand.org — Looking Around
      </SourceLink>
    </div>
  );
}
