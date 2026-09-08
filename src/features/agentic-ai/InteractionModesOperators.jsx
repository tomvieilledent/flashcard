import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { AI_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={AI_ACCENT}>Modes d'interaction & opérateurs de ciblage</H2>
      <P>
        Piloter une IA dans un IDE, c'est arbitrer en permanence entre la
        pertinence du contexte et la saturation de la fenêtre d'attention. Trop
        d'informations globales : le modèle décroche au milieu (<em>lost in
        the middle</em>). Pas assez : il hallucine. Deux leviers structurent la
        requête — les <strong>modes d'interaction</strong> et les{" "}
        <strong>opérateurs de ciblage</strong>.
      </P>

      <H3>Les modes d'interaction</H3>
      <P>
        Ils déterminent l'amplitude de modification et la puissance
        algorithmique déployée (FIM synchrone, RAG local, ou boucles d'agents
        multi-fichiers).
      </P>
      <Table
        head={["Mode", "Portée du contexte", "Vitesse", "Usage idéal"]}
        rows={[
          [
            "Inline (ghost text)",
            "Fichier actif + onglets ouverts",
            "Ultra-rapide (< 200 ms)",
            "Lignes séquentielles, boilerplate, fermetures de blocs",
          ],
          [
            "Chat",
            "Opérateurs sélectionnés ou fenêtres ciblées",
            "Modérée (2–4 s)",
            "Explications, diagnostic d'erreurs, archi, scripts isolés",
          ],
          [
            "Agent (Edits)",
            "Workspace complet (multi-fichiers)",
            "Lente (analyse itérative)",
            "Refactoring transverse, migrations de patterns",
          ],
        ]}
      />

      <H3>Les participants au chat (préfixe @)</H3>
      <Note accent={AI_ACCENT}>
        <strong>Où est passé <InlineCode>@workspace</InlineCode> ?</strong> Les
        IDE modernes ont intégré le « contexte implicite » : l'IA analyse
        l'arborescence automatiquement en arrière-plan. Le rôle de l'architecte
        est désormais d'utiliser les opérateurs <InlineCode>#</InlineCode> pour{" "}
        <em>restreindre</em> son attention, pas de la lui ouvrir.
      </Note>
      <Ul>
        <li>
          <InlineCode>@terminal</InlineCode> — capture l'état du terminal actif,
          l'historique des commandes et les codes de retour. Pour expliquer ou
          résoudre une erreur de compilation, un crash, une exception.
          <br />
          <InlineCode>@terminal /explain pourquoi mon process plante sur cette erreur de connexion DB ?</InlineCode>
        </li>
        <li>
          <InlineCode>@git</InlineCode> — interroge l'index Git (staging,
          commits, branches). Pour générer des messages de commit, analyser la
          branche avant une PR, comprendre l'historique d'une feature.
          <br />
          <InlineCode>@git génère un message de commit conventionnel pour mes modifications actuelles</InlineCode>
        </li>
      </Ul>

      <H3>Les variables de contexte (préfixe #)</H3>
      <Ul>
        <li>
          <InlineCode>#file:chemin/du/fichier</InlineCode> — force l'injection
          de l'intégralité du fichier dans le contexte, en écrasant les filtres
          du RAG automatique. Pour référencer un contrat d'interface (type
          TypeScript, schéma Prisma) sans l'ouvrir.
        </li>
        <li>
          <InlineCode>#selection</InlineCode> — restreint l'attention aux seules
          lignes surlignées. Pour refactoriser un bloc précis au milieu d'une
          classe de 1000 lignes sans réécrire le reste.
        </li>
        <li>
          <InlineCode>#editor</InlineCode> — injecte tout le contenu du fichier
          visible au premier plan. Pour une revue globale ou la génération de
          tests unitaires du composant courant.
        </li>
        <li>
          <InlineCode>#terminalOutput</InlineCode> — capture le flux brut
          (stdout / stderr) visible dans le terminal. Pour donner une stack
          trace complexe à analyser.
        </li>
      </Ul>

      <H3>Pipeline de conception « AI-Ready »</H3>
      <P>
        <strong>1. Préparer le terrain sémantique.</strong> À la racine, créez{" "}
        <InlineCode>/specs/auth_workflow.md</InlineCode> avec les
        spécifications en Gherkin / BDD :
      </P>
      <Code>{`Feature: Authentification Utilisateur
  Scenario: Connexion réussie avec identifiants valides
    Given un utilisateur avec l'email "dev@entreprise.com" existe en base
    When l'utilisateur soumet ses identifiants valides
    Then le système doit générer un token JWT valide`}</Code>
      <P>
        <strong>2. Le prompt de liaison chirurgicale.</strong> Ouvrez le
        contrôleur cible, puis dans le chat :
      </P>
      <Code>{`Implémente la logique de la route POST /login au sein de #editor.
Suis strictement le scénario décrit dans #file:specs/auth_workflow.md.
Contraintes : clé secrète JWT via variables d'environnement, HTTP 200 en cas de succès.
Format : uniquement le code, sans explications.`}</Code>
      <P>
        <strong>3. Débriefing.</strong> Dans un dossier vide, l'agent génère un
        code surprenant : il recrée la signature JWT à la main avec le module
        natif <InlineCode>crypto</InlineCode> au lieu d'utiliser{" "}
        <InlineCode>jsonwebtoken</InlineCode>, et hardcode l'email{" "}
        <InlineCode>dev@entreprise.com</InlineCode> issu du Gherkin. Faute de{" "}
        <InlineCode>package.json</InlineCode> ou d'ORM, il refuse d'inventer des
        dépendances externes pour garantir un code exécutable immédiatement.
      </P>
      <Note accent={AI_ACCENT}>
        La leçon : l'IA fait exactement ce qu'on lui demande, avec les moyens
        qu'on lui donne. La qualité de sortie dépend de l'état de
        l'environnement de travail mis à disposition — un projet avec Prisma et
        un <InlineCode>package.json</InlineCode> complet aurait produit un
        résultat parfaitement intégré.
      </Note>

      <SourceLink href="https://code.visualstudio.com/docs/chat/chat-overview#_context-variables">
        code.visualstudio.com — Chat context variables reference
      </SourceLink>
      {" · "}
      <SourceLink href="https://github.blog/ai-and-ml/github-copilot/how-github-copilot-is-getting-better-at-understanding-your-code/">
        github.blog — How GitHub Copilot handles context under the hood
      </SourceLink>
    </div>
  );
}

export default function InteractionModesOperators() {
  return <Fr />;
}
