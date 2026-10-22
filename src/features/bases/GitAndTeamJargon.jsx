import { InlineCode, P, H2, H3, Note, Table } from "../../shared/ui/primitives.jsx";
import { DEVOPS_ACCENT } from "../../shared/ui/tokens.js";

export default function GitAndTeamJargon() {
  return (
    <div>
      <H2 accent={DEVOPS_ACCENT}>Git et jargon d'équipe</H2>

      <H3>Le problème : des mots qu'on suppose connus</H3>
      <P>
        Dès le premier jour en équipe, on entend « fais une PR », « on merge
        après la CI », « c'est dans le sprint ». Personne n'explique ces mots.
      </P>

      <H3>La solution : un mini-glossaire</H3>
      <Table
        head={["Terme", "En une phrase"]}
        rows={[
          ["Repo (dépôt)", "Le dossier du projet suivi par Git, avec tout son historique"],
          ["Commit", "Un enregistrement daté d'un ensemble de modifications, avec un message"],
          ["Branche", "Une ligne de travail parallèle, pour ne pas toucher au code principal"],
          ["Merge", "Fusionner une branche dans une autre"],
          ["Pull request (PR)", "Demande de fusion, relue par l'équipe avant d'être acceptée"],
          ["Code review", "La relecture de la PR par un autre développeur"],
          ["Conflit", "Deux personnes ont modifié la même ligne ; il faut choisir à la main"],
          ["CI / CD", "Tests et déploiement lancés automatiquement à chaque changement"],
          ["Environnement", "Dev (chez vous), staging (répétition), production (les vrais utilisateurs)"],
          ["Variable d'environnement", "Réglage ou secret passé hors du code (ex. l'URL de la base)"],
          ["Bug / feature", "Un défaut à corriger / une nouvelle fonctionnalité"],
          ["Refactor", "Réécrire le code pour le clarifier, sans changer ce qu'il fait"],
          ["Dette technique", "Raccourcis pris aujourd'hui qui coûteront du temps plus tard"],
          ["MVP", "Version minimale d'un produit, pour tester l'idée rapidement"],
          ["Sprint", "Période courte (1 à 2 semaines) avec un objectif précis"],
        ]}
      />
      <Note accent={DEVOPS_ACCENT}>
        Les secrets (mots de passe, clés d'API) vont dans des variables
        d'environnement, jamais dans Git. Un fichier <InlineCode>.env</InlineCode>{" "}
        se met dans le <InlineCode>.gitignore</InlineCode>.
      </Note>
    </div>
  );
}
