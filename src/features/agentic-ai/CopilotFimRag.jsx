import { Code, InlineCode, P, H2, H3, Ul, Note, SourceLink } from "../../shared/ui/primitives.jsx";
import { AI_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={AI_ACCENT}>Les entrailles de Copilot — FIM & RAG local</H2>
      <P>
        Quand vous codez dans l'IDE, GitHub Copilot n'envoie pas simplement le
        texte situé au-dessus du curseur. S'il le faisait, il serait incapable
        de deviner la fermeture d'une fonction ou de rester cohérent avec le
        reste du fichier. Il s'appuie sur deux mécaniques : le{" "}
        <strong>Fill-In-the-Middle</strong> pour l'autocomplétion, et un{" "}
        <strong>RAG local</strong> pour le chat.
      </P>

      <H3>La mécanique du Fill-In-the-Middle (FIM)</H3>
      <P>
        L'extension découpe le document actif en temps réel en trois zones par
        rapport à la position du curseur :
      </P>
      <Ul>
        <li>
          <strong>Préfixe</strong> (prefix) : tout le code du début du fichier
          jusqu'à la ligne précédant le curseur.
        </li>
        <li>
          <strong>Suffixe</strong> (suffix) : tout le code situé juste sous le
          curseur jusqu'à la fin du fichier.
        </li>
        <li>
          <strong>Milieu</strong> (middle) : la zone vide que le modèle doit
          interpoler.
        </li>
      </Ul>
      <P>
        Le modèle est entraîné à générer <em>middle</em> en conditionnant sur{" "}
        <em>prefix</em> <strong>et</strong> <em>suffix</em> : il complète en
        fonction de ce qui vient après, pas seulement de ce qui précède.
      </P>

      <H3>Observer le FIM en action</H3>
      <P>
        Créez un fichier <InlineCode>fim_demo.js</InlineCode> et collez :
      </P>
      <Code>{`const database = require('./db');

async function processOrder(orderId) {
    const order = await database.findOrder(orderId);
    if (!order) {
        throw new Error("Order not found");
    }
    // placez le curseur ici

    return database.save(order);
}`}</Code>
      <P>
        Placez le curseur sur la ligne vide et tapez{" "}
        <InlineCode>order.status =</InlineCode>. Copilot propose aussitôt{" "}
        <InlineCode>"PAID"</InlineCode> ou une propriété cohérente avec l'objet{" "}
        <InlineCode>order</InlineCode>. Pourquoi ? Parce qu'il lit dans le
        suffixe la ligne <InlineCode>return database.save(order);</InlineCode> :
        il sait que l'objet doit être modifié avant d'être sauvegardé.
      </P>

      <H3>Le RAG local (Retrieval-Augmented Generation)</H3>
      <P>
        Dans le chat, Copilot ne peut pas envoyer tout le disque dur au LLM. Il
        fait un RAG local : il indexe temporairement les fichiers ouverts dans
        vos onglets et calcule un score de proximité sémantique (historique
        d'édition, similarité Jaccard / TF-IDF) pour choisir les morceaux de
        code à ajouter en arrière-plan dans le prompt.
      </P>
      <Note accent={AI_ACCENT}>
        <strong>Règle d'or :</strong> un fichier fermé est invisible pour
        l'autocomplétion standard. Garder ses fichiers de spécifications ou ses
        interfaces ouverts dans des onglets adjacents améliore nettement la
        pertinence des suggestions.
      </Note>

      <SourceLink href="https://arxiv.org/abs/2207.14255">
        arXiv:2207.14255 — Efficient Training of Language Models to Fill in the Middle
      </SourceLink>
      {" · "}
      <SourceLink href="https://github.blog/ai-and-ml/github-copilot/how-github-copilot-is-getting-better-at-understanding-your-code/">
        github.blog — How GitHub Copilot handles context under the hood
      </SourceLink>
    </div>
  );
}

export default function CopilotFimRag() {
  return <Fr />;
}
