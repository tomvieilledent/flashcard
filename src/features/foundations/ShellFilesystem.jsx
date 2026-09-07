import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { TOOL_ACCENT } from "../../shared/ui/tokens.js";

export default function ShellFilesystem() {
  return (
    <div>
      <H2 accent={TOOL_ACCENT}>L'arborescence Linux</H2>

      <P>
        Tout est rangé sous une racine unique <InlineCode>/</InlineCode>.
        L'organisation suit une norme, le <em>Filesystem Hierarchy
        Standard</em> (FHS) : chaque type de fichier a sa place attendue,
        quelle que soit la distribution.
      </P>

      <H3>Les répertoires à connaître</H3>
      <Table
        head={["Chemin", "Contenu"]}
        rows={[
          ["/bin, /usr/bin", "programmes de base accessibles à tous"],
          ["/sbin, /usr/sbin", "programmes d'administration système"],
          ["/etc", "fichiers de configuration du système (texte)"],
          ["/home", "répertoires personnels des utilisateurs"],
          ["/root", "répertoire personnel du superutilisateur"],
          ["/lib, /usr/lib", "bibliothèques partagées"],
          ["/var", "données variables : journaux, files, caches, /var/log"],
          ["/tmp", "fichiers temporaires (souvent vidés au redémarrage)"],
          ["/opt", "logiciels tiers installés « en bloc »"],
          ["/dev", "fichiers spéciaux représentant les périphériques"],
          ["/proc, /sys", "vues du noyau en mémoire (pas de vrais fichiers)"],
          ["/mnt, /media", "points de montage (disques, clés USB)"],
          ["/boot", "noyau et fichiers de démarrage"],
        ]}
      />

      <Note accent={TOOL_ACCENT}>
        <InlineCode>/usr</InlineCode> ne veut pas dire « user » mais
        <em> Unix System Resources</em> : programmes et données installés,
        non essentiels au tout premier démarrage.
      </Note>

      <H3>Monter, démonter</H3>
      <P>
        Un disque n'apparaît pas comme « lecteur » : il est <em>monté</em>
        sur un répertoire (ex. <InlineCode>/media/alice/USB</InlineCode>).
        <InlineCode> df -h</InlineCode> montre les montages et leur espace ;
        <InlineCode> lsblk</InlineCode> liste les périphériques bloc.
      </P>

      <H3>Liens symboliques dans l'arbre</H3>
      <P>
        Beaucoup d'emplacements « historiques » sont aujourd'hui des liens :
        <InlineCode> /bin</InlineCode> → <InlineCode>/usr/bin</InlineCode> sur
        les distributions récentes. <InlineCode>ls -l</InlineCode> les affiche
        avec une flèche.
      </P>
      <Code>{`ls -l /bin
lrwxrwxrwx  1 root root  7  ... /bin -> usr/bin`}</Code>

      <SourceLink href="https://linuxcommand.org/lc3_lts0040.php">
        linuxcommand.org — A Guided Tour
      </SourceLink>
      {" · "}
      <SourceLink href="https://www.linuxfoundation.org/blog/blog/classic-sysadmin-the-linux-filesystem-explained">
        linuxfoundation.org — The Linux Filesystem Explained
      </SourceLink>
    </div>
  );
}
