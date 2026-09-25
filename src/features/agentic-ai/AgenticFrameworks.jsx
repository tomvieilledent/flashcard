import { P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { AI_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={AI_ACCENT}>L'écosystème open source — AutoGen, CrewAI, LangGraph, BMAD</H2>
      <P>
        Créer une équipe de 3 agents (PO, Dev, QA) à la main, en copiant des
        fichiers Markdown et en gérant le contexte soi-même, est un exercice
        pédagogique nécessaire pour comprendre le Prompt Chaining et l'isolation
        des contextes. Dans l'industrie, cette délégation est orchestrée par des
        frameworks qui gèrent la mémoire, le routage des messages et la
        tolérance aux pannes. Quatre philosophies d'orchestration :
      </P>

      <Table
        head={["Framework", "Philosophie", "Cas d'usage idéal"]}
        rows={[
          ["CrewAI", "Déterministe, orientée processus (hiérarchie d'entreprise)", "Pipelines de production prévisibles : article SEO, tests unitaires à la chaîne"],
          ["Microsoft AutoGen", "Probabiliste, conversationnelle (GroupChat)", "Problèmes complexes, data-science autonome, essais/erreurs dynamiques"],
          ["LangGraph", "Machine à états finis (graphe cyclique)", "Architectures d'entreprise complexes, Human-in-the-Loop"],
          ["BMAD Method", "« Agent as Code » dans l'IDE", "Standardiser la production assistée dans l'éditeur, avec contrôle du cycle de vie"],
        ]}
      />

      <H3>1. CrewAI — l'approche « processus »</H3>
      <Ul>
        <li>
          <strong>Architecture</strong> : des <em>Agents</em> (ex. Senior Python
          Developer avec une backstory détaillée), des <em>Tasks</em> (objectifs
          mesurables) et un <em>Crew</em> (l'équipe). Le workflow reproduit la
          chaîne hiérarchique d'une entreprise humaine.
        </li>
        <li>
          <strong>Délégation autonome</strong> : si l'Agent QA trouve un bug, le
          framework renvoie la tâche à l'Agent Dev d'origine avec un feedback
          contextuel, sans intervention humaine.
        </li>
      </Ul>

      <H3>2. Microsoft AutoGen — l'approche « conversationnelle »</H3>
      <Ul>
        <li>
          <strong>Architecture</strong> : plusieurs agents dans un salon virtuel
          (<em>GroupChat</em>) géré par un <em>GroupChatManager</em>, plutôt
          qu'un workflow linéaire A → B → C. Exécution de code sécurisée via
          Docker ; un <em>UserProxyAgent</em> représente l'humain, un{" "}
          <em>AssistantAgent</em> écrit le code.
        </li>
        <li>
          <strong>Résolution</strong> : le Proxy exécute réellement le script
          dans un conteneur ; en cas d'échec, la trace d'erreur revient dans le
          chat et l'Assistant corrige itérativement jusqu'au succès.
        </li>
      </Ul>

      <H3>3. LangGraph — l'approche « graphe d'états »</H3>
      <Ul>
        <li>
          <strong>Architecture</strong> : créé par les fondateurs de LangChain,
          il traite l'orchestration comme une machine à états. Les{" "}
          <em>nœuds</em> sont des fonctions Python ou des LLM ; les{" "}
          <em>arêtes</em> sont des conditions logiques de routage.
        </li>
        <li>
          <strong>Persistance</strong> : un <em>State</em> (objet JSON global)
          est mis à jour à chaque étape. Le « Time Travel » permet d'arrêter le
          workflow, d'inspecter l'état, de modifier une variable et de relancer
          : l'outil idéal pour le HITL.
        </li>
      </Ul>

      <H3>4. BMAD Method — « Agent as Code »</H3>
      <Ul>
        <li>
          <strong>Architecture</strong> : Build More Architect Dreams structure
          le développement <em>dans</em> l'IDE (Cursor, Windsurf, Claude Code)
          plutôt que dans un backend externe. Les agents (Architecte, Product
          Manager, Reviewer) sont des fichiers Markdown déclaratifs et
          versionnables ; la méthode impose 4 à 7 phases agiles strictes
          (Brainstorm, Plan, Architect, Develop, Deliver).
        </li>
        <li>
          <strong>Résolution</strong> : industrialise le Spec-Driven
          Development. L'Architecte ne code jamais : il produit PRD et User
          Stories isolées ; le Codeur s'appuie ensuite sur ces standards figés,
          ce qui évite le chaos des hallucinations.
        </li>
      </Ul>
      <Note accent={AI_ACCENT}>
        Déterminisme (CrewAI, LangGraph) ou exploration (AutoGen) : le choix
        dépend de la prévisibilité de la tâche et du besoin de contrôle humain.
      </Note>

      <SourceLink href="https://docs.crewai.com/">docs.crewai.com</SourceLink>
      {" · "}
      <SourceLink href="https://microsoft.github.io/autogen/0.2/docs/Use-Cases/agent_chat/">
        AutoGen — Multi-agent conversation framework
      </SourceLink>
      {" · "}
      <SourceLink href="https://docs.langchain.com/oss/python/langgraph/overview">
        LangGraph — Overview
      </SourceLink>
      {" · "}
      <SourceLink href="https://bmad.fr/">bmad.fr</SourceLink>
    </div>
  );
}

export default function AgenticFrameworks() {
  return <Fr />;
}
