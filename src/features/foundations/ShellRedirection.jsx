import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { TOOL_ACCENT } from "../../shared/ui/tokens.js";

export default function ShellRedirection() {
  return (
    <div>
      <H2 accent={TOOL_ACCENT}>Redirections et tubes</H2>

      <P>
        Chaque programme dispose de trois flux standard, identifiés par un
        numéro (<em>descripteur</em>) :
      </P>
      <Table
        head={["Flux", "N°", "Rôle par défaut"]}
        rows={[
          ["stdin", "0", "entrée — le clavier"],
          ["stdout", "1", "sortie normale — l'écran"],
          ["stderr", "2", "messages d'erreur — l'écran"],
        ]}
      />

      <H3>Rediriger vers / depuis un fichier</H3>
      <Code>{`commande > fichier      # stdout écrase le fichier
commande >> fichier     # stdout ajouté à la fin
commande 2> erreurs.log # stderr seulement
commande > out 2>&1     # stdout ET stderr dans le même fichier
commande &> tout.log    # raccourci bash équivalent
commande < entree.txt   # lit stdin depuis un fichier
commande 2> /dev/null   # jette les erreurs`}</Code>
      <Note accent={TOOL_ACCENT}>
        <InlineCode>&gt;</InlineCode> tronque le fichier <em>avant</em>
        d'exécuter la commande. <InlineCode>cmd &gt; f</InlineCode> puis une
        erreur = fichier vide. Utiliser <InlineCode>&gt;&gt;</InlineCode> pour
        conserver l'existant.
      </Note>

      <H3>Tubes (<InlineCode>|</InlineCode>)</H3>
      <P>
        Un tube branche le <InlineCode>stdout</InlineCode> d'une commande sur
        le <InlineCode>stdin</InlineCode> de la suivante — sans fichier
        intermédiaire.
      </P>
      <Code>{`ls -l /etc | less
history | grep ssh
cat access.log | cut -d' ' -f1 | sort | uniq -c | sort -rn | head`}</Code>

      <H3>Filtres courants</H3>
      <Table
        head={["Commande", "Rôle"]}
        rows={[
          ["cat", "concatène / affiche des fichiers"],
          ["sort", "trie les lignes (-n numérique, -r inverse, -u unique)"],
          ["uniq", "supprime les doublons consécutifs (-c compte)"],
          ["grep", "garde les lignes qui contiennent un motif"],
          ["wc", "compte lignes (-l), mots (-w), octets (-c)"],
          ["head / tail", "n premières / dernières lignes (tail -f suit)"],
          ["cut", "extrait des colonnes (-d délimiteur, -f champs)"],
          ["tr", "remplace / supprime des caractères"],
          ["tee", "écrit dans un fichier ET laisse passer vers stdout"],
        ]}
      />
      <Code>{`make 2>&1 | tee build.log     # voir la sortie et la garder`}</Code>

      <SourceLink href="https://linuxcommand.org/lc3_lts0070.php">
        linuxcommand.org — I/O Redirection
      </SourceLink>
    </div>
  );
}
