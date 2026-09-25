import { P, H2, H3, Ul, Note, SourceLink } from "../../shared/ui/primitives.jsx";
import { AI_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={AI_ACCENT}>Stratégie de réallocation et shift de valeur</H2>
      <P>
        Le <strong>paradoxe de Jevons</strong> : lorsqu'une avancée rend une
        ressource plus efficace et moins coûteuse, sa consommation globale
        tend à augmenter, pas à diminuer. Ici, l'IA rend le code très bon
        marché : les entreprises ne licencient pas leurs développeurs, elles
        exigent des architectures dix fois plus complexes, fiables et
        interconnectées.
      </P>
      <P>
        Si l'IA divise par 3 le temps d'écriture du code applicatif, que faire
        des 66 % de temps restants ? C'est la{" "}
        <strong>réallocation de la valeur</strong> : l'ingénieur passe de « Code
        Monkey » à <strong>Product Engineer</strong>.
      </P>

      <H3>1. Shift vers le System Design & l'architecture</H3>
      <Ul>
        <li>
          Le LLM excelle au niveau micro (une fonction de tri, un composant
          React) mais peine sur l'urbanisation macro d'un SI de bout en bout.
        </li>
        <li>
          <strong>Action</strong> : devenir architecte, utiliser l'IA comme{" "}
          <em>sounding board</em>.
        </li>
        <li>
          <strong>Livrables</strong> : arbitrer Event-Driven (Kafka) vs API
          REST ; générer des diagrammes Mermaid.js / PlantUML ; formaliser les
          choix dans des <strong>ADR</strong> (Architecture Decision Records) qui
          historisent le « pourquoi ».
        </li>
      </Ul>

      <H3>2. Shift vers la sécurité & le pentesting automatisé</H3>
      <Ul>
        <li>
          Le code généré est fonctionnel et rapide, mais souvent naïf face aux
          injections et aux failles de logique métier.
        </li>
        <li>
          <strong>Action</strong> : investir le temps gagné dans la « destruction
          » du logiciel (Shift-Left Security).
        </li>
        <li>
          <strong>Livrables</strong> : agents de Red Teaming qui attaquent votre
          propre code, fuzzers, tests aux limites (edge cases), audit des
          permissions IAM cloud.
        </li>
      </Ul>

      <H3>3. Shift vers l'empathie utilisateur (DDD)</H3>
      <Ul>
        <li>
          La plus belle architecture ne sert à rien si elle résout le mauvais
          problème. Autrefois, la dette technique laissait peu de temps pour
          parler aux clients.
        </li>
        <li>
          <strong>Action</strong> : quitter l'IDE pour échanger avec le Product
          Manager, le marketing et les utilisateurs finaux.
        </li>
        <li>
          <strong>Livrables</strong> : appliquer le Domain-Driven Design ;
          aligner le vocabulaire du code (<em>Ubiquitous Language</em>) sur le
          métier ; prototyper en quelques heures pour un feedback immédiat.
        </li>
      </Ul>
      <Note accent={AI_ACCENT}>
        Trois shifts : du micro au macro (architecture), de la construction à
        la destruction (sécurité), du code au problème métier (DDD).
      </Note>

      <SourceLink href="https://github.com/architecture-decision-record/architecture-decision-record">
        ADR — architecture-decision-record
      </SourceLink>
      {" · "}
      <SourceLink href="https://mermaid.js.org/">mermaid.js.org</SourceLink>
      {" · "}
      <SourceLink href="https://posthog.com/product-engineer/what-is-a-product-engineer">
        PostHog — What is a Product Engineer?
      </SourceLink>
    </div>
  );
}

export default function ValueShift() {
  return <Fr />;
}
