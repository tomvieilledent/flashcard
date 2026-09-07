/* Navigation — 2 niveaux : catégorie → groupe → section.
   Chaque section est un fichier de src/features/, chargé à la demande. */
import { lazy } from "react";
import {
  BookOpen,
  Bot,
  Boxes,
  Brain,
  Building2,
  ClipboardCheck,
  Coins,
  Compass,
  Component,
  Container,
  Cpu,
  Database,
  FileCode,
  FileJson,
  Flame,
  GitBranch,
  GitPullRequest,
  Home,
  Infinity as InfinityIcon,
  KeyRound,
  Layers,
  LayoutGrid,
  Leaf,
  Library,
  ListChecks,
  Lock,
  Network,
  PlayCircle,
  Rocket,
  ScrollText,
  Server,
  Share2,
  ShieldCheck,
  Sparkles,
  Swords,
  Table2,
  Terminal,
  UploadCloud,
  Workflow,
  Wrench,
} from "lucide-react";
import {
  AI_ACCENT,
  API_ACCENT,
  ARCH_ACCENT,
  CI_ACCENT,
  DEVOPS_ACCENT,
  DOCKER_ACCENT,
  MERISE_ACCENT,
  REACT_ACCENT,
  SPEC_ACCENT,
  SVELTE_ACCENT,
  TOOL_ACCENT,
  UML_ACCENT,
  URBA_ACCENT,
  VUE_ACCENT,
} from "../shared/ui/tokens.js";

const loaders = import.meta.glob("../features/**/*.jsx");

export const NAV = [
  {
    category: "Shell & éditeurs",
    icon: Terminal,
    accent: TOOL_ACCENT,
    groups: [
      {
        group: "Ligne de commande",
        accent: TOOL_ACCENT,
        icon: Terminal,
        items: [
          { id: "shell-what-is", label: "Qu'est-ce que le shell ?", icon: Terminal, file: "foundations/ShellWhatIs.jsx" },
          { id: "shell-navigation", label: "Naviguer dans le système", icon: Compass, file: "foundations/ShellNavigation.jsx" },
          { id: "shell-looking-around", label: "Observer : ls, less, file", icon: BookOpen, file: "foundations/ShellLookingAround.jsx" },
          { id: "shell-filesystem", label: "L'arborescence Linux", icon: Layers, file: "foundations/ShellFilesystem.jsx" },
          { id: "shell-files", label: "Manipuler fichiers & dossiers", icon: Boxes, file: "foundations/ShellFiles.jsx" },
          { id: "shell-commands", label: "Travailler avec les commandes", icon: Wrench, file: "foundations/ShellCommands.jsx" },
          { id: "shell-redirection", label: "Redirections & tubes", icon: Workflow, file: "foundations/ShellRedirection.jsx" },
          { id: "shell-expansion", label: "Expansions & guillemets", icon: Sparkles, file: "foundations/ShellExpansion.jsx" },
          { id: "shell-permissions", label: "Utilisateurs & permissions", icon: Lock, file: "foundations/ShellPermissions.jsx" },
          { id: "shell-shortcuts", label: "Raccourcis & historique bash", icon: Rocket, file: "foundations/ShellShortcuts.jsx" },
        ],
      },
      {
        group: "Éditeurs de texte",
        accent: TOOL_ACCENT,
        icon: FileCode,
        items: [
          { id: "editor-vim", label: "vi / Vim", icon: FileCode, file: "foundations/EditorVim.jsx" },
          { id: "editor-emacs", label: "Emacs", icon: FileCode, file: "foundations/EditorEmacs.jsx" },
          { id: "editor-vscode", label: "VS Code", icon: FileCode, file: "foundations/EditorVscode.jsx" },
        ],
      },
    ],
  },
  {
    category: "Programmation bas niveau",
    icon: Cpu,
    accent: CI_ACCENT,
    groups: [
      {
        group: "Le langage C",
        accent: CI_ACCENT,
        icon: Cpu,
        items: [
          { id: "c-intro", label: "Le langage C", icon: BookOpen, file: "foundations/CIntro.jsx" },
          { id: "c-betty", label: "Le style Betty", icon: ShieldCheck, file: "foundations/CBetty.jsx" },
          { id: "c-variables-types", label: "Variables, types & identificateurs", icon: Table2, file: "foundations/CVariablesTypes.jsx" },
          { id: "c-operators", label: "Opérateurs", icon: ListChecks, file: "foundations/COperators.jsx" },
          { id: "c-control-flow", label: "Conditions & boucles", icon: Workflow, file: "foundations/CControlFlow.jsx" },
          { id: "c-functions", label: "Fonctions & fichiers d'en-tête", icon: Component, file: "foundations/CFunctions.jsx" },
          { id: "c-recursion", label: "Récursivité", icon: Share2, file: "foundations/CRecursion.jsx" },
          { id: "c-argc-argv", label: "Arguments de main (argc, argv)", icon: ListChecks, file: "foundations/CArgcArgv.jsx" },
        ],
      },
      {
        group: "Pointeurs, tableaux & mémoire",
        accent: CI_ACCENT,
        icon: Layers,
        items: [
          { id: "c-arrays", label: "Tableaux", icon: Table2, file: "foundations/CArrays.jsx" },
          { id: "c-pointers", label: "Pointeurs", icon: Share2, file: "foundations/CPointers.jsx" },
          { id: "c-multidim-pointers", label: "Tableaux 2D & pointeurs de pointeurs", icon: Layers, file: "foundations/CMultidimPointers.jsx" },
          { id: "c-strings", label: "Chaînes de caractères", icon: ScrollText, file: "foundations/CStrings.jsx" },
          { id: "c-memory-layout", label: "Organisation mémoire", icon: Boxes, file: "foundations/CMemoryLayout.jsx" },
          { id: "c-malloc", label: "Mémoire dynamique : malloc, free", icon: Boxes, file: "foundations/CMalloc.jsx" },
        ],
      },
      {
        group: "Types composés & E/S",
        accent: CI_ACCENT,
        icon: Boxes,
        items: [
          { id: "c-structs-typedef", label: "struct, typedef & alignement", icon: Database, file: "foundations/CStructsTypedef.jsx" },
          { id: "c-function-pointers", label: "Pointeurs de fonction", icon: Share2, file: "foundations/CFunctionPointers.jsx" },
          { id: "c-variadic", label: "Fonctions variadiques", icon: ListChecks, file: "foundations/CVariadic.jsx" },
          { id: "c-file-io", label: "E/S bas niveau & descripteurs", icon: FileCode, file: "foundations/CFileIo.jsx" },
        ],
      },
      {
        group: "Structures de données",
        accent: CI_ACCENT,
        icon: Database,
        items: [
          { id: "c-data-structures", label: "Les bases", icon: Boxes, file: "foundations/CDataStructures.jsx" },
          { id: "ds-binary-trees", label: "Arbres binaires & parcours", icon: GitBranch, file: "foundations/DsBinaryTrees.jsx" },
          { id: "ds-bst", label: "Arbres binaires de recherche", icon: GitBranch, file: "foundations/DsBst.jsx" },
          { id: "ds-hash-tables", label: "Tables de hachage", icon: KeyRound, file: "foundations/DsHashTables.jsx" },
        ],
      },
      {
        group: "Algorithmes",
        accent: CI_ACCENT,
        icon: Workflow,
        items: [
          { id: "algo-big-o", label: "Complexité & notation Big O", icon: Rocket, file: "foundations/AlgoBigO.jsx" },
          { id: "algo-sorting", label: "Algorithmes de tri", icon: ListChecks, file: "foundations/AlgoSorting.jsx" },
        ],
      },
    ],
  },
  {
    category: "Frontend",
    icon: LayoutGrid,
    accent: REACT_ACCENT,
    groups: [
      {
        group: "React",
        accent: REACT_ACCENT,
        icon: Component,
        items: [
          { id: "react-basics", label: "Les bases", icon: BookOpen, file: "react/ReactBasics.jsx" },
          { id: "react-setup", label: "Monter le projet", icon: Wrench, file: "react/ReactSetup.jsx" },
          { id: "react-deploy", label: "Déploiement", icon: UploadCloud, file: "react/ReactDeploy.jsx" },
        ],
      },
      {
        group: "Vue.js",
        accent: VUE_ACCENT,
        icon: Leaf,
        items: [
          { id: "vue-basics", label: "Les bases", icon: BookOpen, file: "vue/VueBasics.jsx" },
          { id: "vue-setup", label: "Monter le projet", icon: Wrench, file: "vue/VueSetup.jsx" },
          { id: "vue-deploy", label: "Déploiement", icon: UploadCloud, file: "vue/VueDeploy.jsx" },
        ],
      },
      {
        group: "Svelte",
        accent: SVELTE_ACCENT,
        icon: Flame,
        items: [
          { id: "svelte-basics", label: "Les bases", icon: BookOpen, file: "svelte/SvelteBasics.jsx" },
          { id: "svelte-setup", label: "Monter le projet", icon: Wrench, file: "svelte/SvelteSetup.jsx" },
          { id: "svelte-deploy", label: "Déploiement", icon: UploadCloud, file: "svelte/SvelteDeploy.jsx" },
        ],
      },
      {
        group: "Outillage",
        accent: TOOL_ACCENT,
        icon: Terminal,
        items: [
          { id: "tooling", label: "Vite · ESLint · Tailwind · Lucide", icon: Wrench, file: "tooling/CommonTooling.jsx" },
        ],
      },
    ],
  },
  {
    category: "Backend",
    icon: Server,
    accent: SPEC_ACCENT,
    groups: [
      {
        group: "Bases de données",
        accent: MERISE_ACCENT,
        icon: Database,
        items: [
          { id: "merise-entities", label: "Entités & propriétés", icon: BookOpen, file: "merise/MeriseEntities.jsx" },
          { id: "merise-cardinalities", label: "Associations & cardinalités", icon: GitBranch, file: "merise/MeriseCardinalities.jsx" },
          { id: "merise-porteuse", label: "L'association porteuse", icon: Boxes, file: "merise/MeriseAssociationPorteuse.jsx" },
          { id: "merise-normalization", label: "Normalisation (1NF–3NF)", icon: ShieldCheck, file: "merise/MeriseNormalization.jsx" },
        ],
      },
      {
        group: "Modélisation des données",
        accent: MERISE_ACCENT,
        icon: Table2,
        items: [
          { id: "data-business-rules", label: "Règles de gestion & MCD", icon: Table2, file: "data-modeling/DataBusinessRules.jsx" },
          { id: "data-normalization-strict", label: "Normalisation stricte", icon: ShieldCheck, file: "data-modeling/DataNormalizationStrict.jsx" },
          { id: "data-physical-model", label: "Schéma SQL de production", icon: KeyRound, file: "data-modeling/DataPhysicalModel.jsx" },
        ],
      },
      {
        group: "API & contrats",
        accent: API_ACCENT,
        icon: Network,
        items: [
          { id: "rest-principles", label: "Principes REST", icon: Network, file: "api-rest/RestPrinciples.jsx" },
          { id: "openapi-spec", label: "OpenAPI (Swagger)", icon: FileJson, file: "api-rest/OpenApiSpec.jsx" },
          { id: "json-schema-validation", label: "Validation JSON Schema", icon: ListChecks, file: "api-rest/JsonSchemaValidation.jsx" },
        ],
      },
    ],
  },
  {
    category: "DevOps",
    icon: InfinityIcon,
    accent: DOCKER_ACCENT,
    groups: [
      {
        group: "Docker",
        accent: DOCKER_ACCENT,
        icon: Container,
        items: [
          { id: "docker-basics", label: "Les bases", icon: BookOpen, file: "docker/DockerBasics.jsx" },
          { id: "docker-dockerfile", label: "Le Dockerfile", icon: FileCode, file: "docker/DockerDockerfile.jsx" },
          { id: "docker-compose", label: "Docker Compose", icon: Boxes, file: "docker/DockerCompose.jsx" },
          { id: "docker-security", label: "Volumes, réseaux & sécurité", icon: Lock, file: "docker/DockerSecurity.jsx" },
        ],
      },
      {
        group: "Intégration & déploiement continus",
        accent: CI_ACCENT,
        icon: PlayCircle,
        items: [
          { id: "ci-basics", label: "GitHub Actions — les bases", icon: BookOpen, file: "cicd/CIBasics.jsx" },
          { id: "ci-secrets-matrix", label: "Secrets, cache & matrices", icon: Lock, file: "cicd/CISecretsMatrix.jsx" },
          { id: "ci-publish-docker", label: "Publier une image Docker", icon: UploadCloud, file: "cicd/CIPublishDocker.jsx" },
        ],
      },
      {
        group: "Culture & Git",
        accent: DEVOPS_ACCENT,
        icon: GitBranch,
        items: [
          { id: "devops-culture", label: "Culture DevOps (CALMS)", icon: ShieldCheck, file: "devops/DevOpsCulture.jsx" },
          { id: "devops-metrics", label: "Métriques DORA", icon: Rocket, file: "devops/DevOpsMetrics.jsx" },
          { id: "git-workflows", label: "Workflows Git & commits", icon: GitBranch, file: "devops/GitWorkflows.jsx" },
        ],
      },
    ],
  },
  {
    category: "IA & agents",
    icon: Bot,
    accent: AI_ACCENT,
    groups: [
      {
        group: "Piloter l'IA agentique",
        accent: AI_ACCENT,
        icon: Sparkles,
        items: [
          { id: "intent-driven-development", label: "Intent-Driven Development & dette sémantique", icon: Compass, file: "agentic-ai/IntentDrivenDevelopment.jsx" },
          { id: "model-confrontation", label: "Confrontation de deux modèles (cas pratique)", icon: Swords, file: "agentic-ai/ModelConfrontation.jsx" },
          { id: "llm-architecture", label: "Architecture des LLMs (tokens & probabilités)", icon: Cpu, file: "agentic-ai/LlmArchitecture.jsx" },
          { id: "context-window", label: "Fenêtre de contexte & amnésie", icon: Brain, file: "agentic-ai/ContextWindow.jsx" },
          { id: "ai-finops", label: "Modèle économique (FinOps 101)", icon: Coins, file: "agentic-ai/AiFinops.jsx" },
        ],
      },
    ],
  },
  {
    category: "Documentation & méthode",
    icon: Library,
    accent: DEVOPS_ACCENT,
    groups: [
      {
        group: "Architecture",
        accent: ARCH_ACCENT,
        icon: Layers,
        items: [
          { id: "arch-repository", label: "Repository & inversion des dépendances", icon: Boxes, file: "architecture/ArchRepository.jsx" },
          { id: "arch-dynamic-diagrams", label: "Diagrammes de séquence & d'états", icon: Workflow, file: "architecture/ArchDynamicDiagrams.jsx" },
        ],
      },
      {
        group: "Modélisation UML",
        accent: UML_ACCENT,
        icon: Share2,
        items: [
          { id: "uml-class-diagram", label: "Diagramme de classes", icon: Share2, file: "uml/UmlClassDiagram.jsx" },
        ],
      },
      {
        group: "Spécifier le besoin",
        accent: SPEC_ACCENT,
        icon: ClipboardCheck,
        items: [
          { id: "spec-prd-user-story", label: "PRD & User Stories (INVEST)", icon: ClipboardCheck, file: "specs-bdd/SpecPrdUserStory.jsx" },
          { id: "bdd-gherkin", label: "BDD & Gherkin", icon: ScrollText, file: "specs-bdd/BddGherkin.jsx" },
          { id: "bdd-scenario-outline", label: "Scénarios paramétrés", icon: Table2, file: "specs-bdd/BddScenarioOutline.jsx" },
        ],
      },
      {
        group: "Cohérence & documentation",
        accent: URBA_ACCENT,
        icon: Building2,
        items: [
          { id: "urban-information", label: "Aligner les modèles", icon: Building2, file: "urbanization/UrbanInformation.jsx" },
          { id: "inter-model-consistency", label: "Cohérence entre modèles", icon: GitPullRequest, file: "urbanization/InterModelConsistency.jsx" },
          { id: "docs-as-code-ssot", label: "Documentation as Code (SSOT)", icon: FileCode, file: "urbanization/DocsAsCodeSsot.jsx" },
        ],
      },
    ],
  },
];

/* Résolution du composant paresseux depuis le fichier de la section. */
for (const cat of NAV) {
  for (const group of cat.groups) {
    for (const item of group.items) {
      const key = `../features/${item.file}`;
      const loader = loaders[key];
      if (!loader) throw new Error(`Section introuvable : ${key}`);
      item.Component = lazy(loader);
    }
  }
}

/* Entrée d'accueil : hors catégories, section par défaut. */
export const HOME = {
  id: "home",
  label: "Accueil",
  icon: Home,
  file: "home/Home.jsx",
  Component: lazy(loaders["../features/home/Home.jsx"]),
};

export const ALL_IDS = [
  HOME.id,
  ...NAV.flatMap((cat) =>
    cat.groups.flatMap((group) => group.items.map((item) => item.id))
  ),
];

export const DEFAULT_ID = HOME.id;

export function findEntry(id) {
  if (id === HOME.id) {
    return { ...HOME, group: null, groupAccent: null, category: null };
  }
  for (const cat of NAV) {
    for (const group of cat.groups) {
      const hit = group.items.find((i) => i.id === id);
      if (hit) {
        return { ...hit, group: group.group, groupAccent: group.accent, category: cat.category };
      }
    }
  }
  return { ...HOME, group: null, groupAccent: null, category: null };
}

export function findComponent(id) {
  return findEntry(id).Component;
}
