import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { TOOL_ACCENT } from "../../shared/ui/tokens.js";

export default function ShellPermissions() {
  return (
    <div>
      <H2 accent={TOOL_ACCENT}>Utilisateurs et permissions</H2>

      <P>
        Linux est multi-utilisateur. Chaque fichier a un <em>propriétaire</em>,
        un <em>groupe</em>, et trois jeux de droits :
        <strong> u</strong> (user), <strong>g</strong> (group),
        <strong> o</strong> (others).
      </P>

      <H3>Lire les droits</H3>
      <Code>{`-rwxr-x---
 │└┬┘└┬┘└┬┘
 │ u  g  o
 │
 └ type (- fichier, d dossier, l lien)`}</Code>
      <Table
        head={["Droit", "Sur un fichier", "Sur un dossier"]}
        rows={[
          ["r (4)", "lire le contenu", "lister les noms (ls)"],
          ["w (2)", "modifier le contenu", "créer / supprimer / renommer dedans"],
          ["x (1)", "exécuter", "entrer dedans (cd), traverser"],
        ]}
      />

      <H3>chmod — changer les droits</H3>
      <P><strong>Notation symbolique</strong> : <InlineCode>qui ± quoi</InlineCode>.</P>
      <Code>{`chmod u+x script.sh       # rendre exécutable pour le propriétaire
chmod go-w fichier        # retirer l'écriture au groupe et aux autres
chmod a+r fichier         # a = tout le monde
chmod -R o-rwx dossier/   # récursif`}</Code>
      <P><strong>Notation octale</strong> : un chiffre par jeu (r=4, w=2, x=1).</P>
      <Table
        head={["Octal", "Symbolique", "Usage typique"]}
        rows={[
          ["644", "rw-r--r--", "fichier de données"],
          ["755", "rwxr-xr-x", "script / dossier"],
          ["600", "rw-------", "fichier privé (clé, secret)"],
          ["700", "rwx------", "dossier privé"],
        ]}
      />
      <Code>{`chmod 755 deploy.sh
chmod 600 ~/.ssh/id_ed25519`}</Code>

      <H3>umask</H3>
      <P>
        Masque retranché des droits par défaut à la création.
        <InlineCode> umask 022</InlineCode> (courant) → fichiers en
        <InlineCode> 644</InlineCode>, dossiers en <InlineCode>755</InlineCode>.
      </P>

      <H3>Propriété : chown / chgrp</H3>
      <Code>{`sudo chown alice fichier
sudo chown alice:www-data site/
sudo chgrp -R developers projet/`}</Code>

      <H3>Devenir un autre utilisateur</H3>
      <Table
        head={["Commande", "Effet"]}
        rows={[
          ["su", "ouvre un shell root (demande le mot de passe de root)"],
          ["su - alice", "shell de connexion en tant qu'alice"],
          ["sudo commande", "exécute UNE commande en root (mot de passe de l'utilisateur)"],
          ["sudo -i", "shell root via sudo"],
        ]}
      />
      <Note accent={TOOL_ACCENT}>
        <InlineCode>sudo</InlineCode> est préféré à <InlineCode>su</InlineCode> :
        droits accordés commande par commande, tout est journalisé, pas
        besoin de partager le mot de passe root.
      </Note>

      <SourceLink href="https://linuxcommand.org/lc3_lts0090.php">
        linuxcommand.org — Permissions
      </SourceLink>
    </div>
  );
}
