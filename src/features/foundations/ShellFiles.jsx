import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { TOOL_ACCENT } from "../../shared/ui/tokens.js";

export default function ShellFiles() {
  return (
    <div>
      <H2 accent={TOOL_ACCENT}>Manipuler fichiers et dossiers</H2>

      <Table
        head={["Commande", "Rôle"]}
        rows={[
          ["cp", "copier un fichier ou un dossier"],
          ["mv", "déplacer ou renommer"],
          ["rm", "supprimer (définitivement, pas de corbeille)"],
          ["mkdir", "créer un dossier"],
          ["ln", "créer un lien (physique ou symbolique)"],
        ]}
      />

      <H3>Jokers (wildcards)</H3>
      <P>
        Le shell développe ces motifs en liste de noms de fichiers
        <em> avant</em> d'exécuter la commande.
      </P>
      <Table
        head={["Motif", "Correspond à"]}
        rows={[
          ["*", "n'importe quelle suite de caractères"],
          ["?", "un seul caractère"],
          ["[abc]", "un caractère parmi a, b ou c"],
          ["[!abc]", "un caractère qui n'est ni a, ni b, ni c"],
          ["[a-z]", "un caractère dans l'intervalle"],
        ]}
      />
      <Code>{`cp *.txt sauvegarde/
rm rapport-202?.log
ls image[0-9].png`}</Code>

      <H3>cp et mv</H3>
      <Code>{`cp source.txt dest.txt        # copie vers un nouveau nom
cp fichier.txt dossier/       # copie dans un dossier
cp -r site/ site-backup/      # -r : dossier et son contenu
cp -i a.txt b.txt            # -i : demande avant d'écraser

mv brouillon.txt final.txt    # renommer
mv *.png images/              # déplacer plusieurs fichiers`}</Code>

      <H3>mkdir et rm</H3>
      <Code>{`mkdir projet
mkdir -p projet/src/api       # -p : crée les parents manquants

rm fichier.txt
rm -i *.tmp                   # -i : confirme chaque suppression
rm -r vieux-dossier/          # -r : récursif
rmdir dossier-vide            # ne supprime qu'un dossier vide`}</Code>
      <Note accent={TOOL_ACCENT}>
        <InlineCode>rm -rf</InlineCode> ne demande rien et ne pardonne rien.
        Vérifier le chemin <em>avant</em> d'appuyer sur Entrée ; se méfier
        d'un espace involontaire, par exemple <InlineCode>rm -rf / home</InlineCode>
        au lieu de <InlineCode>rm -rf /home</InlineCode>.
      </Note>

      <H3>Liens : physiques et symboliques</H3>
      <Ul>
        <li>
          <strong>Lien physique</strong> (<InlineCode>ln cible nom</InlineCode>) :
          un second nom pour les mêmes données. Impossible entre systèmes de
          fichiers ou vers un dossier.
        </li>
        <li>
          <strong>Lien symbolique</strong> (<InlineCode>ln -s cible nom</InlineCode>) :
          un petit fichier qui <em>pointe</em> vers un chemin. Se casse si la
          cible est déplacée ou supprimée.
        </li>
      </Ul>
      <Code>{`ln -s /opt/app/v2.3.1 /opt/app/current
ls -l /opt/app/current
lrwxrwxrwx  ... /opt/app/current -> /opt/app/v2.3.1`}</Code>

      <SourceLink href="https://linuxcommand.org/lc3_lts0050.php">
        linuxcommand.org — Manipulating Files
      </SourceLink>
    </div>
  );
}
