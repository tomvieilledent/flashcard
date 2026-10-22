import { Code, InlineCode, P, H2, H3, Ul, Note, Table } from "../../shared/ui/primitives.jsx";
import { TOOL_ACCENT } from "../../shared/ui/tokens.js";

export default function PackageManagers() {
  return (
    <div>
      <H2 accent={TOOL_ACCENT}>Dépendances et gestionnaires de paquets</H2>

      <H3>Le problème : ne pas tout réécrire</H3>
      <P>
        Gérer des dates, envoyer des e-mails, chiffrer un mot de passe : du code
        existe déjà pour ça. Encore faut-il le récupérer, à la bonne version,
        sans le copier à la main.
      </P>

      <H3>La solution : un gestionnaire de paquets</H3>
      <Ul>
        <li>
          Une <strong>dépendance</strong> : un morceau de code externe dont
          votre projet a besoin.
        </li>
        <li>
          Un <strong>paquet</strong> (<em>package</em>) : une dépendance
          publiée, avec un nom et une version.
        </li>
        <li>
          Un <strong>gestionnaire de paquets</strong> : l'outil qui les
          télécharge et les met à jour.
        </li>
      </Ul>
      <Table
        head={["Écosystème", "Outil", "Fichier de dépendances"]}
        rows={[
          ["JavaScript", "npm, yarn, pnpm", "package.json"],
          ["Python", "pip", "requirements.txt"],
          ["PHP", "Composer", "composer.json"],
          ["Java", "Maven, Gradle", "pom.xml, build.gradle"],
        ]}
      />
      <Code>{`npm install react        # ajoute la dépendance
npm install              # installe tout ce que package.json liste
pip install -r requirements.txt`}</Code>
      <Ul>
        <li>
          <InlineCode>node_modules</InlineCode> : le dossier où npm télécharge
          les dépendances. On ne le committe pas.
        </li>
        <li>
          <strong>Lockfile</strong> (<InlineCode>package-lock.json</InlineCode>) :
          fige les versions exactes pour que tous aient les mêmes.
        </li>
        <li>
          <strong>Build / bundler</strong> (Vite, webpack) : transforme et
          regroupe le code pour le navigateur.
        </li>
      </Ul>
      <Note accent={TOOL_ACCENT}>
        Une dépendance est du code qu'on n'a pas écrit : on la choisit pour sa
        maintenance et sa fiabilité, car une faille dedans devient une faille
        dans votre appli.
      </Note>
    </div>
  );
}
