import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { TOOL_ACCENT } from "../../shared/ui/tokens.js";

export default function EditorVscode() {
  return (
    <div>
      <H2 accent={TOOL_ACCENT}>Visual Studio Code</H2>

      <P>
        Éditeur graphique gratuit et multiplateforme. Léger au départ, il se
        complète par des <em>extensions</em>. Sur les machines de l'école, on
        l'utilise souvent connecté à distance (extension
        <InlineCode> Remote - SSH</InlineCode>).
      </P>

      <H3>La palette de commandes</H3>
      <P>
        <InlineCode>F1</InlineCode> ou <InlineCode>Ctrl/Cmd + Maj + P</InlineCode> :
        accès à <em>toutes</em> les commandes par leur nom. Point d'entrée à
        connaître avant tous les raccourcis.
      </P>
      <Table
        head={["Raccourci", "Action"]}
        rows={[
          ["Ctrl/Cmd + P", "ouvrir un fichier par son nom (Quick Open)"],
          ["Ctrl/Cmd + Maj + P", "palette de commandes"],
          ["Ctrl/Cmd + `", "ouvrir/fermer le terminal intégré"],
          ["Ctrl/Cmd + B", "afficher/masquer la barre latérale"],
          ["Ctrl/Cmd + ,", "ouvrir les réglages (Settings)"],
          ["Ctrl/Cmd + Maj + X", "vue des extensions"],
          ["Ctrl/Cmd + Maj + G", "vue du contrôle de version (Git)"],
        ]}
      />

      <H3>Éditer plus vite</H3>
      <Table
        head={["Raccourci", "Effet"]}
        rows={[
          ["Alt + clic", "ajouter un curseur (multi-curseur)"],
          ["Ctrl/Cmd + D", "sélectionner l'occurrence suivante du mot"],
          ["Alt + ↑ / ↓", "déplacer la ligne"],
          ["Maj + Alt + ↑ / ↓", "dupliquer la ligne"],
          ["Ctrl/Cmd + /", "commenter / décommenter"],
          ["F2", "renommer un symbole partout"],
          ["Ctrl/Cmd + Maj + F", "rechercher dans tout le projet"],
        ]}
      />

      <H3>IntelliSense</H3>
      <P>
        Complétion de code, signatures de fonctions et documentation au
        survol. <InlineCode>Ctrl + Espace</InlineCode> force les suggestions ;
        <InlineCode> F12</InlineCode> saute à la définition,
        <InlineCode> Alt + F12</InlineCode> l'affiche en aperçu.
      </P>

      <H3>Réglages</H3>
      <P>
        Les préférences sont un fichier JSON. Réglages <em>utilisateur</em>
        (globaux) ou <em>workspace</em> (dans
        <InlineCode> .vscode/settings.json</InlineCode>, versionné avec le
        projet).
      </P>
      <Code>{`// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.tabSize": 2,
  "files.trimTrailingWhitespace": true,
  "files.eol": "\\n"
}`}</Code>
      <Note accent={TOOL_ACCENT}>
        Committer un <InlineCode>.vscode/settings.json</InlineCode> et une
        liste d'extensions recommandées
        (<InlineCode>.vscode/extensions.json</InlineCode>) donne le même
        confort d'édition à toute l'équipe.
      </Note>

      <H3>Terminal intégré & Git</H3>
      <Ul>
        <li>Le terminal intégré est un shell normal, ouvert dans le dossier du projet.</li>
        <li>La vue <em>Source Control</em> montre les fichiers modifiés, permet de <em>stager</em>, d'écrire un message et de committer sans quitter l'éditeur.</li>
        <li>Les indicateurs dans la marge (gutter) signalent les lignes ajoutées / modifiées / supprimées depuis le dernier commit.</li>
      </Ul>

      <SourceLink href="https://code.visualstudio.com/docs">
        code.visualstudio.com — Documentation
      </SourceLink>
    </div>
  );
}
