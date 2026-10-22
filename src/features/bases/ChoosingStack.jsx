import { InlineCode, P, H2, H3, Ul, Note } from "../../shared/ui/primitives.jsx";
import { TechTable } from "../../shared/ui/tech.jsx";
import { REACT_ACCENT } from "../../shared/ui/tokens.js";

export default function ChoosingStack() {
  return (
    <div>
      <H2 accent={REACT_ACCENT}>Choisir ses technos selon le projet</H2>

      <H3>Le problème : « quel framework prendre ? »</H3>
      <P>
        Il n'existe pas de meilleur framework dans l'absolu. Le bon choix
        dépend du type de projet, de l'équipe et du temps disponible. Voici les
        questions à se poser, puis des cas typiques.
      </P>

      <H3>Les 5 questions à se poser</H3>
      <Ul>
        <li>
          <strong>Quel type de projet ?</strong> Site vitrine, application
          riche, API seule, prototype ?
        </li>
        <li>
          <strong>Que sait déjà faire l'équipe ?</strong> Un langage maîtrisé
          bat presque toujours un framework à la mode.
        </li>
        <li>
          <strong>Quelle durée de vie ?</strong> Démo de 2 jours ou produit sur
          5 ans ?
        </li>
        <li>
          <strong>Quelle communauté ?</strong> Docs, tutoriels, réponses
          trouvables, mises à jour régulières.
        </li>
        <li>
          <strong>Quelles contraintes ?</strong> Référencement (SEO),
          performance, mobile, sécurité, hébergement.
        </li>
      </Ul>

      <H3>Frontend : quoi pour quoi</H3>
      <TechTable
        head={["Besoin", "Choix courant", "Pourquoi"]}
        rows={[
          ["Page statique, vitrine, blog", "HTML/CSS simple, ou Astro", "Pas de JavaScript lourd, rapide, bon SEO"],
          ["Application interactive (tableau de bord, chat)", "React ou Vue", "Composants, état, grosse communauté"],
          ["Débutant, projet de taille moyenne", "Vue", "Courbe d'apprentissage douce, doc claire"],
          ["Marché de l'emploi, écosystème énorme", "React", "Le plus demandé, énormément de bibliothèques"],
          ["Site à référencer avec contenu dynamique", "Next.js (React) ou Nuxt (Vue)", "Rendu côté serveur, donc SEO"],
          ["Petite appli légère et rapide", "Svelte", "Peu de code, bundle léger"],
          ["Appli mobile avec le même code web", "React Native, Flutter", "Un code pour iOS et Android"],
        ]}
      />

      <H3>Backend : quoi pour quoi</H3>
      <TechTable
        head={["Besoin", "Choix courant", "Pourquoi"]}
        rows={[
          ["Application complète, vite (admin, comptes, ORM)", "Django (Python) ou Laravel (PHP)", "Tout est inclus, productivité maximale"],
          ["API simple et rapide à écrire", "FastAPI (Python) ou Express (Node.js)", "Léger, peu de cérémonie, doc générée avec FastAPI"],
          ["Même langage que le front (JavaScript)", "Node.js : Express, NestJS", "Une seule langue pour toute l'équipe"],
          ["Grosse application d'entreprise", "Spring Boot (Java) ou .NET", "Robustesse, typage, écosystème pro"],
          ["Temps réel (chat, notifications)", "Node.js avec WebSocket", "Bon pour beaucoup de connexions simultanées"],
          ["Calcul, données, IA", "Python", "Écosystème scientifique imbattable"],
        ]}
      />

      <H3>Trois projets types</H3>
      <TechTable
        head={["Projet", "Stack raisonnable"]}
        rows={[
          ["Blog ou portfolio", "Astro ou HTML/CSS, hébergement statique, pas de base de données"],
          ["MVP d'une appli avec comptes et données", "Vue ou React + Django ou FastAPI + PostgreSQL"],
          ["Application temps réel (messagerie)", "React + Node.js (WebSocket) + PostgreSQL + Redis"],
        ]}
      />

      <Note accent={REACT_ACCENT}>
        En cas de doute : prenez ce que vous maîtrisez déjà ou ce qui a la
        meilleure documentation. Un projet qui avance avec une techno « moyenne »
        vaut mieux qu'un projet bloqué sur la techno parfaite. Pour une appli
        simple, <InlineCode>PostgreSQL</InlineCode> + un framework mûr est
        presque toujours un bon départ.
      </Note>
    </div>
  );
}
