import { InlineCode, P, H2, H3, Ul, Note } from "../../shared/ui/primitives.jsx";
import { TechTable } from "../../shared/ui/tech.jsx";
import { REACT_ACCENT } from "../../shared/ui/tokens.js";

export default function ChoosingFrontend() {
  return (
    <div>
      <H2 accent={REACT_ACCENT}>Quel frontend choisir ?</H2>

      <H3>Le problème : trop de frameworks pour afficher une page</H3>
      <P>
        Le navigateur ne comprend que HTML, CSS et JavaScript. Les frameworks
        frontend ajoutent une structure pour construire des interfaces sans
        tout écrire à la main. Le bon choix dépend de ce que la page doit faire.
      </P>

      <H3>Quoi pour quoi</H3>
      <TechTable
        cols={[1]}
        head={["Besoin", "Choix courant", "Pourquoi"]}
        rows={[
          ["Page statique, vitrine, blog", "Astro, ou HTML/CSS simple", "Peu de JavaScript, rapide, bon SEO"],
          ["Application interactive (tableau de bord, chat)", "React ou Vue", "Composants, gestion d'état, grosse communauté"],
          ["Débutant, projet de taille moyenne", "Vue", "Courbe d'apprentissage douce, doc claire"],
          ["Marché de l'emploi, écosystème énorme", "React", "Le plus demandé, énormément de bibliothèques"],
          ["Contenu dynamique à référencer (SEO)", "Next.js ou Nuxt", "Rendu côté serveur : la page arrive déjà remplie"],
          ["Petite appli légère et rapide", "Svelte", "Peu de code, bundle léger"],
          ["Appli mobile avec le même code", "React Native ou Flutter", "Un code pour iOS et Android"],
        ]}
      />

      <H3>Rendre la page : navigateur ou serveur ?</H3>
      <Ul>
        <li>
          <strong>SPA</strong> (<em>Single Page Application</em>) : le
          navigateur construit la page. Fluide après le chargement, mais le
          référencement est plus difficile.
        </li>
        <li>
          <strong>SSR</strong> (rendu côté serveur) : le serveur envoie la page
          déjà construite. Meilleur pour le SEO et le premier affichage.
        </li>
        <li>
          <strong>Statique</strong> : pages générées à l'avance, sans serveur
          applicatif.
        </li>
      </Ul>
      <Note accent={REACT_ACCENT}>
        Pour styliser, <InlineCode>Tailwind</InlineCode> accélère le travail ;
        le CSS classique reste valable. Aucun framework n'est obligatoire : une
        page simple se fait très bien sans.
      </Note>
    </div>
  );
}
