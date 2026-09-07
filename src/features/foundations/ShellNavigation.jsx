import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { TOOL_ACCENT } from "../../shared/ui/tokens.js";

export default function ShellNavigation() {
  return (
    <div>
      <H2 accent={TOOL_ACCENT}>Naviguer dans le système de fichiers</H2>

      <P>
        Le <em>shell</em> est le programme qui lit les commandes tapées au
        clavier et les transmet au système. Sur la plupart des distributions
        Linux, c'est <InlineCode>bash</InlineCode>. L'invite (<em>prompt</em>)
        se termine en général par <InlineCode>$</InlineCode> pour un
        utilisateur normal, <InlineCode>#</InlineCode> pour l'administrateur.
      </P>

      <H3>Une arborescence unique</H3>
      <P>
        Sous Linux il n'y a pas de « lecteur C: ». Tous les fichiers sont
        rangés dans un seul arbre dont la racine est <InlineCode>/</InlineCode>.
        Les périphériques (disques, clés USB…) sont <em>montés</em> quelque
        part dans cet arbre.
      </P>

      <H3>Les trois commandes de base</H3>
      <Table
        head={["Commande", "Rôle"]}
        rows={[
          ["pwd", "print working directory — affiche le répertoire courant"],
          ["cd", "change directory — se déplace dans l'arbre"],
          ["ls", "list — liste le contenu d'un répertoire"],
        ]}
      />
      <P>
        À l'ouverture d'une session, le répertoire courant est le
        <em> répertoire personnel</em> de l'utilisateur, noté
        <InlineCode> ~</InlineCode> (par exemple <InlineCode>/home/alice</InlineCode>).
      </P>
      <Code>{`pwd
/home/alice

cd /usr/bin
ls`}</Code>

      <H3>Chemins absolus et chemins relatifs</H3>
      <Ul>
        <li>
          <strong>Absolu</strong> : part de la racine, commence par
          <InlineCode> /</InlineCode> — ex. <InlineCode>/usr/share/doc</InlineCode>.
          Il désigne toujours le même endroit.
        </li>
        <li>
          <strong>Relatif</strong> : part du répertoire courant — ex.
          <InlineCode> doc</InlineCode> ou <InlineCode>../lib</InlineCode>.
        </li>
      </Ul>
      <Table
        head={["Raccourci", "Signifie"]}
        rows={[
          [".", "le répertoire courant"],
          ["..", "le répertoire parent"],
          ["~", "mon répertoire personnel"],
          ["-", "le répertoire précédent (cd -)"],
        ]}
      />
      <Code>{`cd            # sans argument → retourne au répertoire personnel
cd ..         # remonte d'un niveau
cd ../..      # remonte de deux niveaux
cd ~/projets  # chemin relatif au répertoire personnel
cd -          # revient au répertoire d'où l'on vient`}</Code>

      <Note accent={TOOL_ACCENT}>
        La complétion par <kbd>Tab</kbd> complète les noms de fichiers et de
        commandes. Appuyer deux fois affiche toutes les possibilités. C'est
        le meilleur remède contre les fautes de frappe dans les chemins.
      </Note>

      <H3>Quelques faits utiles</H3>
      <Ul>
        <li>Linux distingue les majuscules des minuscules : <InlineCode>Documents</InlineCode> ≠ <InlineCode>documents</InlineCode>.</li>
        <li>Les fichiers dont le nom commence par un point sont « cachés » ; <InlineCode>ls -a</InlineCode> les montre.</li>
        <li>Éviter les espaces dans les noms de fichiers ; sinon il faut les protéger (<InlineCode>"mon fichier"</InlineCode> ou <InlineCode>mon\ fichier</InlineCode>).</li>
      </Ul>

      <SourceLink href="https://linuxcommand.org/lc3_lts0020.php">
        linuxcommand.org — Navigation
      </SourceLink>
    </div>
  );
}
