import { Code, InlineCode, P, H2, H3, Ul, Note } from "../../shared/ui/primitives.jsx";
import { TechTable } from "../../shared/ui/tech.jsx";
import { REACT_ACCENT } from "../../shared/ui/tokens.js";

export default function ChoosingProject() {
  return (
    <div>
      <H2 accent={REACT_ACCENT}>Démarrer un projet : choisir sa stack et la justifier</H2>

      <H3>Le problème : « je commence un projet, je prends quoi ? »</H3>
      <P>
        Une <strong>stack</strong> est l'ensemble des technos d'un projet :
        langage, framework front, framework back, base de données, hébergement.
        Choisir au hasard ou par effet de mode coûte cher plus tard. Il faut une
        méthode et une justification écrite.
      </P>

      <H3>La méthode en 6 étapes</H3>
      <Ul>
        <li>
          <strong>1. Décrire le besoin</strong> : qui l'utilise, pour faire
          quoi, sur quel support (web, mobile) ?
        </li>
        <li>
          <strong>2. Lister les contraintes</strong> : délai, budget, taille de
          l'équipe, compétences, référencement, temps réel, sécurité.
        </li>
        <li>
          <strong>3. Partir de ce qu'on connaît</strong> : une techno maîtrisée
          fait gagner des semaines.
        </li>
        <li>
          <strong>4. Choisir couche par couche</strong> : frontend, backend,
          base de données, authentification, hébergement.
        </li>
        <li>
          <strong>5. Vérifier la maturité</strong> : documentation, communauté,
          mises à jour récentes, facilité de recruter.
        </li>
        <li>
          <strong>6. Noter la décision</strong> : un court paragraphe « on
          prend X parce que Y », pour s'en souvenir et l'expliquer.
        </li>
      </Ul>

      <H3>Exemples de projets, stack et justification</H3>
      <TechTable
        head={["Projet", "Stack", "Pourquoi"]}
        rows={[
          ["Portfolio, blog, site vitrine", "HTML/CSS ou Astro, hébergement statique", "Pas de serveur ni de base : rapide, gratuit, bon SEO"],
          ["Boutique en ligne simple", "Shopify ou WooCommerce", "Paiement et catalogue déjà faits : inutile de tout coder"],
          ["MVP d'appli avec comptes et données", "Vue ou React + Django ou FastAPI + PostgreSQL", "Développement rapide, base solide, évolutif"],
          ["Application tout-en-un, petite équipe", "Next.js ou Laravel + PostgreSQL", "Une seule base de code, moins de pièces à gérer"],
          ["Messagerie, temps réel", "React + Node.js (WebSocket) + PostgreSQL + Redis", "Connexions permanentes, Redis pour diffuser les messages"],
          ["Appli mobile pour iOS et Android", "React Native ou Flutter + API REST", "Un seul code pour les deux plateformes"],
          ["Data, IA, tableau de bord", "Python (FastAPI) + PostgreSQL + front léger", "Écosystème data et IA de Python"],
          ["Outil interne d'entreprise", "Django (admin intégrée) ou Laravel", "Back-office généré, peu de front à écrire"],
        ]}
      />

      <H3>Exemple de décision rédigée</H3>
      <Code>{`Projet : application de rencontres par événements de groupe
Besoin : comptes, événements, inscriptions, chat ensuite
Équipe : 3 débutants, 8 semaines

Frontend  : Vue 3 + Tailwind   -> connu de l'équipe, doc claire
Backend   : Django REST        -> auth et admin inclus, gain de temps
Base      : PostgreSQL         -> données liées (users, events, inscriptions)
ORM       : Django ORM         -> fourni avec le framework
Temps réel: WebSocket (plus tard) -> pas nécessaire pour le MVP
Hébergement : Docker + VPS     -> simple et peu coûteux`}</Code>

      <Note accent={REACT_ACCENT}>
        Pour un MVP : choisissez ennuyeux et connu. Réservez les technos
        nouvelles aux projets d'apprentissage. On peut toujours changer une
        pièce plus tard (l'<InlineCode>ORM</InlineCode>, l'hébergement) ; les
        décisions difficiles à défaire sont le langage et le modèle de données.
      </Note>
      <P>
        Détails par couche : voir « Quelle techno pour quel projet ? »,
        « Quel langage de programmation ? », « Quelle base de données et quel
        ORM ? » et « Quelle API et quelle authentification ? ».
      </P>
    </div>
  );
}
