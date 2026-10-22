import { InlineCode, P, H2, H3, Ul, Note, Table } from "../../shared/ui/primitives.jsx";
import { TOOL_ACCENT } from "../../shared/ui/tokens.js";

export default function ChoosingLanguage() {
  return (
    <div>
      <H2 accent={TOOL_ACCENT}>Choisir son langage de programmation</H2>

      <H3>Le problème : par quel langage commencer, et lequel pour ce projet ?</H3>
      <P>
        Il existe des centaines de langages. Chacun a été pensé pour des usages
        précis. Le bon choix dépend de ce qu'on veut construire, pas d'un
        classement de popularité.
      </P>

      <H3>Quel langage pour quel usage ?</H3>
      <Table
        head={["Langage", "Sert surtout à", "Points forts", "Limites"]}
        rows={[
          ["JavaScript / TypeScript", "Web (front, et back avec Node.js)", "Seul langage du navigateur, écosystème immense", "Pièges historiques ; TypeScript ajoute du typage et aide beaucoup"],
          ["Python", "Backend, scripts, données, IA, automatisation", "Lisible, idéal pour débuter, bibliothèques partout", "Moins rapide à l'exécution"],
          ["PHP", "Sites web, WordPress, Laravel", "Hébergement partout, très répandu", "Image vieillissante, mais moderne avec Laravel"],
          ["Java / Kotlin", "Entreprise, Android", "Robuste, typé, très demandé", "Plus verbeux, démarrage lourd"],
          ["C#", "Entreprise (.NET), jeux (Unity)", "Complet, outillage excellent", "Écosystème surtout Microsoft"],
          ["Go", "Services backend, outils, cloud", "Simple, rapide, concurrence facile", "Moins de bibliothèques que Python ou JS"],
          ["Rust", "Systèmes, performance, sécurité mémoire", "Rapide et sûr", "Courbe d'apprentissage raide"],
          ["C / C++", "Systèmes, embarqué, jeux, performance", "Contrôle total, très rapide", "Gestion de la mémoire à la main, plus risqué"],
          ["Swift", "Applications iOS natives", "Intégration parfaite à la plateforme", "Limité à la plateforme Apple"],
          ["SQL", "Interroger les bases de données", "Incontournable pour les données", "Ce n'est pas un langage généraliste"],
        ]}
      />

      <H3>Selon votre objectif</H3>
      <Table
        head={["Objectif", "Choix conseillé"]}
        rows={[
          ["Premier langage, apprendre à programmer", "Python, ou JavaScript si vous visez le web"],
          ["Devenir développeur web", "JavaScript (+ TypeScript), puis un backend : Node.js ou Python"],
          ["Data, IA, automatisation", "Python"],
          ["Application mobile native", "Kotlin (Android), Swift (iOS) ; ou React Native / Flutter pour les deux"],
          ["Jeux vidéo", "C# (Unity) ou C++ (Unreal)"],
          ["Programmation système, embarqué", "C, puis Rust"],
          ["Travailler en grande entreprise", "Java ou C#"],
        ]}
      />

      <H3>Typé ou non ?</H3>
      <Ul>
        <li>
          <strong>Typage dynamique</strong> (Python, JavaScript) : on écrit
          vite, les erreurs de type se voient à l'exécution.
        </li>
        <li>
          <strong>Typage statique</strong> (TypeScript, Java, Go, Rust) : le
          compilateur signale les erreurs avant l'exécution, utile dès que le
          projet grandit.
        </li>
        <li>
          <strong>Compilé</strong> (C, Go, Rust) ou <strong>interprété</strong>{" "}
          (Python, JavaScript) : le premier est plus rapide à l'exécution, le
          second plus souple à développer.
        </li>
      </Ul>

      <Note accent={TOOL_ACCENT}>
        Le premier langage compte moins qu'on le croit : une fois les notions
        de base acquises (variables, boucles, fonctions, structures de
        données), changer de langage prend des semaines, pas des années.
        Choisissez-en un, restez-y assez longtemps pour faire de vrais projets,
        et évitez de comparer sans cesse (<InlineCode>Python</InlineCode> ou{" "}
        <InlineCode>JavaScript</InlineCode> suffisent pour débuter).
      </Note>
    </div>
  );
}
