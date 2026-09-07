import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { AI_ACCENT } from "../../shared/ui/tokens.js";

export default function LlmArchitecture() {
  return (
    <div>
      <H2 accent={AI_ACCENT}>Architecture des LLMs — tokens & probabilités</H2>
      <P>
        Un <strong>Large Language Model</strong> (GPT, Claude…) n'a pas de base
        de données interne de vérités. C'est un moteur <strong>probabiliste et
        stochastique</strong> : il prédit le fragment de texte suivant le plus
        vraisemblable. Piloter la machine suppose d'en comprendre les engrenages.
      </P>

      <H3>1. La tokenization</H3>
      <P>
        L'IA ne lit ni des mots ni du code, mais des <strong>tokens</strong> :
        des fragments de mot ou de code, ~0,75 mot en moyenne. Les termes
        courants (<InlineCode>function</InlineCode>, <InlineCode>const</InlineCode>)
        tiennent souvent en un seul token ; un nom de variable exotique ou mal
        orthographié est découpé en plusieurs.
      </P>
      <Note accent={AI_ACCENT}>
        Le token est l'unité de facturation <em>et</em> l'unité de contexte.
        Plus le code source est « clean » et standardisé, moins l'IA consomme de
        tokens pour le lire : le Clean Code devient une exigence financière, pas
        seulement esthétique.
      </Note>

      <H3>2. Comment le code est généré</H3>
      <P>
        Imaginez un puzzle : le modèle pioche une pièce (un token) et la place
        là où elle s'emboîte statistiquement le mieux, compte tenu des pièces
        déjà posées. Il ne « voit » pas le tableau final à l'avance ; il calcule
        seulement la pièce suivante la plus logique.
      </P>
      <Code>{`// L'IA lit :
for (let i = 0; i <
// P(token suivant = "length") ≈ 0,99
// Le modèle ne "comprend" pas la boucle : il prédit mathématiquement sa fin.`}</Code>

      <H3>3. Les hallucinations</H3>
      <P>
        Demandez à l'IA une librairie interne qu'elle n'a jamais vue à
        l'entraînement : elle génère du code plausible en inventant des méthodes
        probables (<InlineCode>myLib.connect()</InlineCode>) qui n'existent pas.
        C'est une <strong>hallucination</strong> — la probabilité statistique qui
        comble un vide factuel.
      </P>
      <Table
        head={["Cause", "Contre-mesure"]}
        rows={[
          ["Lib absente du corpus d'entraînement", "Coller la doc / les signatures exactes dans le contexte"],
          ["Version d'API obsolète mémorisée", "Fournir le changelog ou le fichier de types courant"],
          ["Convention maison non standard", "Donner un exemple canonique du dépôt"],
          ["Question ambiguë", "Contraindre : « n'utilise que les symboles définis ci-dessus »"],
        ]}
      />
      <Note accent={AI_ACCENT}>
        Votre rôle : <strong>écraser la probabilité par une vérité factuelle</strong>.
        Une doc exacte dans le prompt vaut mieux qu'une correction après coup.
      </Note>

      <H3>Le vérifier soi-même</H3>
      <Ul>
        <li>
          Collez un extrait de votre code dans un tokenizer et comparez le
          nombre de tokens avant / après nettoyage des noms.
        </li>
        <li>
          Un identifiant <InlineCode>usrMgrSvc</InlineCode> coûte souvent plus de
          tokens que <InlineCode>userManagerService</InlineCode>, plus lisible et
          mieux segmenté.
        </li>
      </Ul>

      <SourceLink href="https://platform.openai.com/tokenizer">
        platform.openai.com/tokenizer — compter les tokens d'un texte
      </SourceLink>
      {" · "}
      <SourceLink href="https://github.com/openai/tiktoken">
        github.com/openai/tiktoken — le tokenizer BPE d'OpenAI
      </SourceLink>
      {" · "}
      <SourceLink href="https://web.stanford.edu/~jurafsky/slp3/">
        Speech and Language Processing (Jurafsky & Martin) — ch. tokenization & LM
      </SourceLink>
    </div>
  );
}
