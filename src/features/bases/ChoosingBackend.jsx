import { InlineCode, P, H2, H3, Ul, Note } from "../../shared/ui/primitives.jsx";
import { TechTable } from "../../shared/ui/tech.jsx";
import { REACT_ACCENT } from "../../shared/ui/tokens.js";

export default function ChoosingBackend() {
  return (
    <div>
      <H2 accent={REACT_ACCENT}>Quel backend choisir ?</H2>

      <H3>Le problème : où mettre la logique, les comptes, les données ?</H3>
      <P>
        Le backend applique les règles métier, parle à la base de données et
        protège les accès. Le choix dépend surtout du langage de l'équipe et de
        la quantité de fonctions déjà fournies.
      </P>

      <H3>Quoi pour quoi</H3>
      <TechTable
        cols={[1]}
        head={["Besoin", "Choix courant", "Pourquoi"]}
        rows={[
          ["Application complète, vite (admin, comptes, ORM)", "Django ou Laravel", "Tout est inclus, productivité maximale"],
          ["API simple et rapide à écrire", "FastAPI ou Express", "Léger, peu de configuration ; FastAPI génère la doc"],
          ["Même langage que le frontend", "Node.js (Express, NestJS)", "Un seul langage pour toute l'équipe"],
          ["Grosse application d'entreprise", "Spring Boot ou .NET", "Robustesse, typage, écosystème professionnel"],
          ["Temps réel (chat, notifications)", "Node.js avec WebSocket", "Bon avec beaucoup de connexions ouvertes"],
          ["Calcul, données, IA", "Python", "Écosystème scientifique imbattable"],
        ]}
      />

      <H3>Tout inclus ou léger ?</H3>
      <Ul>
        <li>
          <strong>Tout inclus</strong> (Django, Laravel) : authentification,
          ORM, administration fournis. Idéal pour un MVP et les petites équipes.
        </li>
        <li>
          <strong>Léger</strong> (Express, Flask, FastAPI) : on assemble ses
          briques. Plus de liberté, plus de décisions à prendre.
        </li>
      </Ul>
      <Note accent={REACT_ACCENT}>
        Le backend choisi impose souvent l'ORM (<InlineCode>Django</InlineCode>{" "}
        embarque le sien). Voir « Quelle base de données et quel ORM ? ».
      </Note>
    </div>
  );
}
