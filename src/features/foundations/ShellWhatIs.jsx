import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { TOOL_ACCENT } from "../../shared/ui/tokens.js";

export default function ShellWhatIs() {
  return (
    <div>
      <H2 accent={TOOL_ACCENT}>Qu'est-ce que le shell ?</H2>

      <P>
        Le <em>shell</em> est un programme qui reçoit les commandes tapées au
        clavier et les donne au système d'exploitation. Presque toutes les
        distributions Linux fournissent <InlineCode>bash</InlineCode> (Bourne
        Again SHell). On y accède via un <em>émulateur de terminal</em>
        (GNOME Terminal, Konsole, xterm…) ou en console pure.
      </P>

      <H3>Le prompt</H3>
      <P>
        Le shell affiche une invite (<em>prompt</em>), souvent de la forme
        <InlineCode> alice@host:~$</InlineCode>. Le dernier caractère :
      </P>
      <Ul>
        <li><InlineCode>$</InlineCode> — utilisateur normal ;</li>
        <li><InlineCode>#</InlineCode> — superutilisateur (root).</li>
      </Ul>
      <Note accent={TOOL_ACCENT}>
        Si le prompt ne revient pas, une commande tourne encore.
        <InlineCode> Ctrl-C</InlineCode> interrompt la commande courante ;
        <InlineCode> Ctrl-D</InlineCode> envoie une fin de saisie (et ferme
        le shell s'il est vide).
      </Note>

      <H3>Premières commandes</H3>
      <Table
        head={["Commande", "Affiche"]}
        rows={[
          ["date", "la date et l'heure"],
          ["cal", "un calendrier du mois"],
          ["df", "l'espace disque libre par système de fichiers"],
          ["free", "l'utilisation de la mémoire"],
          ["whoami", "le nom de l'utilisateur courant"],
          ["exit", "ferme la session shell"],
        ]}
      />
      <P>
        L'historique se parcourt avec les flèches <InlineCode>↑</InlineCode> /
        <InlineCode> ↓</InlineCode>. Une ligne trop longue est simplement
        repliée par le terminal.
      </P>

      <H3>Essayer, sans casser</H3>
      <Ul>
        <li>Une commande mal tapée renvoie <InlineCode>command not found</InlineCode> — sans dommage.</li>
        <li>Copier/coller dans un terminal : souvent <InlineCode>Ctrl-Maj-V</InlineCode> (le <InlineCode>Ctrl-V</InlineCode> classique a un autre rôle).</li>
      </Ul>

      <H3>Pourquoi une version « LTS » ?</H3>
      <P>
        Ubuntu publie une version <strong>LTS</strong> (Long Term Support)
        tous les deux ans, maintenue 5 ans (voire plus). Les serveurs et les
        environnements de formation s'y tiennent : mises à jour de sécurité
        garanties, comportements stables, pas de montée de version surprise
        en plein projet.
      </P>

      <SourceLink href="https://linuxcommand.org/lc3_lts0010.php">
        linuxcommand.org — What is the Shell?
      </SourceLink>
      {" · "}
      <SourceLink href="https://wiki.ubuntu.com/LTS">
        wiki.ubuntu.com — LTS
      </SourceLink>
    </div>
  );
}
