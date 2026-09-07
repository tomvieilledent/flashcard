import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { AI_ACCENT } from "../../shared/ui/tokens.js";
import { useLang } from "../../i18n/lang.jsx";

const GPT_SNIPPET = `URL = "https://example.com"
OUTPUT_FILE = Path("data.json")

def scrape_page(url: str) -> list[dict]:
    try:
        response = requests.get(url, timeout=15, headers={"User-Agent": "Mozilla/5.0"})
        response.raise_for_status()
    except requests.exceptions.Timeout:
        logging.error("La requête a expiré.")
        return []
    except requests.exceptions.HTTPError as exc:
        logging.error("Erreur HTTP : %s", exc)
        return []
    except requests.exceptions.RequestException as exc:
        logging.error("Erreur réseau : %s", exc)
        return []

    soup = BeautifulSoup(response.text, "html.parser")
    results = []
    for item in soup.select(".item"):                 # <-- sélecteurs inventés
        title = item.select_one(".title")
        description = item.select_one(".description")
        results.append({
            "title": title.get_text(strip=True) if title else None,
            "description": description.get_text(" ", strip=True) if description else None,
        })
    return results`;

const CLAUDE_SNIPPET = `@dataclass
class Item:
    titre: str
    lien: str

def creer_session() -> requests.Session:
    session = requests.Session()
    session.headers.update({"User-Agent": USER_AGENT})
    retries = Retry(
        total=MAX_RETRIES, backoff_factor=BACKOFF_FACTOR,
        status_forcelist=[429, 500, 502, 503, 504], allowed_methods=["GET"],
    )
    adapter = HTTPAdapter(max_retries=retries)     # <-- relances automatiques
    session.mount("http://", adapter)
    session.mount("https://", adapter)
    return session

def parser_page(html: str, base_url: str) -> list[Item]:
    soup = BeautifulSoup(html, "html.parser")
    items = []
    for balise in soup.find_all("a", href=True):   # <-- cible = tous les liens
        titre = balise.get_text(strip=True)
        if not titre:
            continue
        items.append(Item(titre=titre, lien=urljoin(base_url, balise["href"])))
    return items`;

function Fr() {
  return (
    <div>
      <H2 accent={AI_ACCENT}>Confrontation de deux modèles — la dette sémantique en pratique</H2>
      <P>
        Cas d'étude qui prolonge{" "}
        <InlineCode>Intent-Driven Development</InlineCode> : on soumet un besoin
        <strong> volontairement flou</strong> à deux modèles, puis on compare les
        décisions d'architecture qu'ils prennent <em>à notre place</em> pour
        combler l'absence de contexte. L'objectif est de montrer qu'un LLM n'est
        pas un moteur de recherche mais un <strong>moteur de prédiction</strong>.
      </P>

      <Note accent={AI_ACCENT}>
        Prompt soumis aux deux modèles, mot pour mot :{" "}
        <em>« Écris un script pour scraper une page web et sauvegarder les
        données, en gérant les erreurs. »</em>
      </Note>

      <Table
        head={["Rôle", "Modèle", "Nature"]}
        rows={[
          ["Généraliste", "ChatGPT — GPT-5.6 « Luna »", "Assistant conversationnel polyvalent"],
          ["Spécialisé code", "Claude Sonnet 5", "Modèle orienté génération / raisonnement sur code"],
        ]}
      />

      <H3>Réponse du modèle généraliste</H3>
      <P>
        Script procédural minimal, <InlineCode>requests</InlineCode> +{" "}
        <InlineCode>BeautifulSoup</InlineCode>, <InlineCode>URL</InlineCode> et
        fichier de sortie codés en dur, sortie JSON unique.
      </P>
      <Code>{GPT_SNIPPET}</Code>

      <H3>Réponse du modèle spécialisé code</H3>
      <P>
        Architecture typée : <InlineCode>@dataclass</InlineCode>,{" "}
        <InlineCode>Session</InlineCode> réutilisable avec{" "}
        <InlineCode>Retry</InlineCode>/<InlineCode>backoff</InlineCode>, arguments
        CLI, double export CSV + JSON dans un dossier configurable.
      </P>
      <Code>{CLAUDE_SNIPPET}</Code>

      <H3>Ce qui a été choisi arbitrairement</H3>
      <Table
        head={["Critère", "Généraliste (GPT-5.6 Luna)", "Spécialisé code (Claude Sonnet 5)"]}
        rows={[
          ["Structure", "3 fonctions, aucune entrée CLI, valeurs en dur", "@dataclass, Session, args CLI (sys.argv), urljoin"],
          ["Réseau", "requests.get() unique — échec définitif dès la 1re erreur serveur", "HTTPAdapter + Retry — backoff sur 429/5xx"],
          ["Modèle de données", "Blocs .item avec .title + .description (contenu éditorial)", "Tous les liens <a href> de la page (titre + lien)"],
          ["Export", "Un seul fichier data.json", "resultats.csv ET resultats.json, dossier configurable"],
        ]}
      />
      <P>
        Aucun des deux modèles n'a posé de question. Chacun a{" "}
        <strong>inventé un besoin différent</strong> (contenu structuré vs
        annuaire de liens), un format de sortie différent et un niveau de
        résilience réseau différent — uniquement pour combler le vide. Les deux
        réponses sont plausibles, mutuellement incompatibles, et aucune n'est
        « la bonne » puisque la spécification n'existe pas.
      </P>

      <H3>Auto-évaluation : hallucinations d'architecture</H3>
      <Ul>
        <li>
          <strong>DOM inventé.</strong> Les sélecteurs{" "}
          <InlineCode>.item</InlineCode> / <InlineCode>.title</InlineCode> et le
          repli sur « toutes les balises <InlineCode>&lt;a&gt;</InlineCode> » ne
          viennent d'aucune page réelle : ce sont des motifs fréquents dans les
          tutoriels de scraping. Sur un vrai site, les deux <em>parsers</em>
          renvoient une liste vide <em>sans erreur</em> — échec silencieux.
        </li>
        <li>
          <strong>Hypothèse « site statique » non optimale.</strong> Les deux
          imposent <InlineCode>requests</InlineCode> +{" "}
          <InlineCode>BeautifulSoup</InlineCode>. Contenu rendu en JavaScript ou
          WAF (Cloudflare) ⇒ page vide ou HTTP 403. Un navigateur <em>headless</em>{" "}
          (<InlineCode>Playwright</InlineCode>) était la réponse adaptée, mais
          rien dans le prompt ne permettait de le savoir.
        </li>
        <li>
          <strong>Aucune couche sécurité / conformité.</strong> Ni lecture de{" "}
          <InlineCode>robots.txt</InlineCode>, ni <em>rate-limiting</em>, ni
          rotation de proxy, ni gestion de secret. En boucle, ce code mène à un
          bannissement d'IP, voire à un problème juridique. Le modèle spécialisé
          aggrave le risque en activant des <em>retries</em> automatiques : il
          martèle un serveur déjà en erreur.
        </li>
        <li>
          <strong>Dépendance implicite non déclarée.</strong>{" "}
          <InlineCode>apparent_encoding</InlineCode> s'appuie sur{" "}
          <InlineCode>charset-normalizer</InlineCode> /{" "}
          <InlineCode>chardet</InlineCode>, absents des instructions
          d'installation.
        </li>
      </Ul>

      <H3>Pourquoi un prompt flou est dangereux en production</H3>
      <P>
        Un prompt flou transfère la <strong>décision d'architecture</strong> du
        développeur vers le modèle, qui la prend par prédiction et non par
        analyse du besoin. On obtient un code syntaxiquement propre, doté de{" "}
        <InlineCode>try/except</InlineCode> rassurants, mais :
      </P>
      <Ul>
        <li>inadapté à la cible réelle (type de site, format attendu, volume) ;</li>
        <li>
          porteur de risques non traités (conformité <InlineCode>robots.txt</InlineCode>,
          rate-limiting, bannissement, données personnelles) ;
        </li>
        <li>
          faussement fiable : la gestion d'erreurs capture les exceptions mais
          masque le vrai problème (0 résultat = « succès »).
        </li>
      </Ul>
      <Note accent={AI_ACCENT}>
        Cette dette sémantique se paie plus tard : le script part en CI/CD,
        tourne en tâche planifiée, et l'écart entre ce que le modèle a supposé et
        ce que le métier voulait ne se révèle qu'en incident. La parade n'est pas
        un meilleur modèle mais un <strong>prompt spécifié</strong> : URL cible,
        structure DOM, format de sortie, contraintes légales et de charge.
      </Note>

      <SourceLink href="https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/be-clear-and-direct">
        docs.anthropic.com — Be clear, direct, and detailed
      </SourceLink>
      {" · "}
      <SourceLink href="https://www.robotstxt.org/robotstxt.html">
        robotstxt.org — The Robots Exclusion Protocol
      </SourceLink>
      {" · "}
      <SourceLink href="https://playwright.dev/python/docs/intro">
        playwright.dev — Scraping de pages rendues en JavaScript
      </SourceLink>
    </div>
  );
}

function En() {
  return (
    <div>
      <H2 accent={AI_ACCENT}>Two models compared — semantic debt in practice</H2>
      <P>
        A case study extending{" "}
        <InlineCode>Intent-Driven Development</InlineCode>: we submit a{" "}
        <strong>deliberately vague</strong> requirement to two models, then
        compare the architecture decisions they make <em>on our behalf</em> to
        fill the missing context. The point is to show that an LLM is not a
        search engine but a <strong>prediction engine</strong>.
      </P>

      <Note accent={AI_ACCENT}>
        Prompt submitted to both models, verbatim (in French):{" "}
        <em>"Écris un script pour scraper une page web et sauvegarder les
        données, en gérant les erreurs."</em> — "Write a script to scrape a web
        page and save the data, handling errors."
      </Note>

      <Table
        head={["Role", "Model", "Nature"]}
        rows={[
          ["Generalist", "ChatGPT — GPT-5.6 “Luna”", "All-purpose conversational assistant"],
          ["Code-specialized", "Claude Sonnet 5", "Model geared towards code generation / reasoning"],
        ]}
      />

      <H3>Generalist model's answer</H3>
      <P>
        A minimal procedural script, <InlineCode>requests</InlineCode> +{" "}
        <InlineCode>BeautifulSoup</InlineCode>, <InlineCode>URL</InlineCode> and
        output file hard-coded, a single JSON output.
      </P>
      <Code>{GPT_SNIPPET}</Code>

      <H3>Code-specialized model's answer</H3>
      <P>
        A typed architecture: <InlineCode>@dataclass</InlineCode>, a reusable{" "}
        <InlineCode>Session</InlineCode> with <InlineCode>Retry</InlineCode>/
        <InlineCode>backoff</InlineCode>, CLI arguments, dual CSV + JSON export
        into a configurable folder.
      </P>
      <Code>{CLAUDE_SNIPPET}</Code>

      <H3>What was chosen arbitrarily</H3>
      <Table
        head={["Criterion", "Generalist (GPT-5.6 Luna)", "Code-specialized (Claude Sonnet 5)"]}
        rows={[
          ["Structure", "3 functions, no CLI input, hard-coded values", "@dataclass, Session, CLI args (sys.argv), urljoin"],
          ["Network", "Single requests.get() — final failure on the first server error", "HTTPAdapter + Retry — backoff on 429/5xx"],
          ["Data model", "Blocks .item with .title + .description (editorial content)", "Every <a href> link on the page (title + link)"],
          ["Export", "One data.json file", "resultats.csv AND resultats.json, configurable folder"],
        ]}
      />
      <P>
        Neither model asked a question. Each one{" "}
        <strong>invented a different need</strong> (structured content vs a link
        directory), a different output format and a different level of network
        resilience — purely to fill the gap. Both answers are plausible, mutually
        incompatible, and neither is "the right one" because no specification
        exists.
      </P>

      <H3>Self-assessment: architecture hallucinations</H3>
      <Ul>
        <li>
          <strong>Invented DOM.</strong> The selectors{" "}
          <InlineCode>.item</InlineCode> / <InlineCode>.title</InlineCode> and
          the fallback to "every <InlineCode>&lt;a&gt;</InlineCode> tag" come
          from no real page: they are common patterns in scraping tutorials. On
          a real site, both <em>parsers</em> return an empty list{" "}
          <em>with no error</em> — a silent failure.
        </li>
        <li>
          <strong>Sub-optimal "static site" assumption.</strong> Both impose{" "}
          <InlineCode>requests</InlineCode> + <InlineCode>BeautifulSoup</InlineCode>.
          Content rendered in JavaScript, or a WAF (Cloudflare) ⇒ an empty page
          or HTTP 403. A <em>headless</em> browser
          (<InlineCode>Playwright</InlineCode>) was the right answer, but nothing
          in the prompt made that knowable.
        </li>
        <li>
          <strong>No security / compliance layer at all.</strong> No reading of{" "}
          <InlineCode>robots.txt</InlineCode>, no <em>rate-limiting</em>, no
          proxy rotation, no secret handling. Run in a loop, this code leads to
          an IP ban, or even a legal problem. The specialized model makes it
          worse by enabling automatic <em>retries</em>: it hammers a server
          that is already erroring.
        </li>
        <li>
          <strong>Undeclared implicit dependency.</strong>{" "}
          <InlineCode>apparent_encoding</InlineCode> relies on{" "}
          <InlineCode>charset-normalizer</InlineCode> /{" "}
          <InlineCode>chardet</InlineCode>, missing from the install
          instructions.
        </li>
      </Ul>

      <H3>Why a vague prompt is dangerous in production</H3>
      <P>
        A vague prompt shifts the <strong>architecture decision</strong> from the
        developer to the model, which makes it by prediction rather than by
        analysis of the need. You get syntactically clean code, with reassuring{" "}
        <InlineCode>try/except</InlineCode> blocks, but:
      </P>
      <Ul>
        <li>unfit for the real target (type of site, expected format, volume);</li>
        <li>
          carrying untreated risks (<InlineCode>robots.txt</InlineCode>{" "}
          compliance, rate-limiting, banning, personal data);
        </li>
        <li>
          falsely reliable: error handling catches the exceptions but hides the
          real problem (0 results = "success").
        </li>
      </Ul>
      <Note accent={AI_ACCENT}>
        This semantic debt is paid later: the script ships to CI/CD, runs as a
        scheduled job, and the gap between what the model assumed and what the
        business wanted only surfaces as an incident. The fix is not a better
        model but a <strong>specified prompt</strong>: target URL, DOM
        structure, output format, legal and load constraints.
      </Note>

      <SourceLink href="https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/be-clear-and-direct">
        docs.anthropic.com — Be clear, direct, and detailed
      </SourceLink>
      {" · "}
      <SourceLink href="https://www.robotstxt.org/robotstxt.html">
        robotstxt.org — The Robots Exclusion Protocol
      </SourceLink>
      {" · "}
      <SourceLink href="https://playwright.dev/python/docs/intro">
        playwright.dev — Scraping JavaScript-rendered pages
      </SourceLink>
    </div>
  );
}

export default function ModelConfrontation() {
  return useLang().lang === "en" ? <En /> : <Fr />;
}
