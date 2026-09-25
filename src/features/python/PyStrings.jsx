import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { TOOL_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={TOOL_ACCENT}>Python — formatage de chaînes</H2>
      <P>
        Trois générations de formatage coexistent. Les f-strings (3.6+) sont la
        forme recommandée : lisibles et les plus rapides.
      </P>
      <Table
        head={["Style", "Exemple"]}
        rows={[
          ["% (historique)", '"%s a %d ans" % (nom, age)'],
          ["str.format()", '"{} a {} ans".format(nom, age)'],
          ["f-string (3.6+)", 'f"{nom} a {age} ans"'],
        ]}
      />

      <H3>str.format()</H3>
      <P>
        Les accolades <InlineCode>{"{}"}</InlineCode> sont des emplacements,
        remplis par position, par index ou par nom.
      </P>
      <Code>{`"{} et {}".format("a", "b")              # a et b     (dans l'ordre)
"{0} {1} {0}".format("a", "b")           # a b a       (par index)
"{nom} a {age} ans".format(nom="Ada", age=36)   # par nom`}</Code>

      <H3>Spécification de format : {"{valeur:spec}"}</H3>
      <Code>{`# [[remplissage]alignement][signe][0][largeur][,][.précision][type]

"{:>8}".format("ab")        # '      ab'  aligné à droite
"{:<8}".format("ab")        # 'ab      '  à gauche
"{:^8}".format("ab")        # '   ab   '  centré
"{:*^8}".format("ab")       # '***ab***'  remplissage personnalisé
"{:05d}".format(42)         # '00042'     entier sur 5 chiffres
"{:.2f}".format(3.14159)    # '3.14'      2 décimales
"{:,}".format(1234567)      # '1,234,567' séparateur de milliers
"{:b} {:x} {:o}".format(10, 255, 8)   # binaire, hexa, octal
"{:.1%}".format(0.256)      # '25.6%'`}</Code>

      <H3>f-strings</H3>
      <P>
        Le préfixe <InlineCode>f</InlineCode> évalue les expressions entre
        accolades ; après <InlineCode>:</InlineCode>, la même spécification de
        format que <InlineCode>str.format()</InlineCode>.
      </P>
      <Code>{`nom, pi, n = "Ada", 3.14159, 42

f"{nom.upper()}"          # 'ADA'   expression quelconque
f"{pi:.2f}"               # '3.14'
f"{n:05d}"                # '00042'
f"{n:>8}"                 # '      42'
f"{n * 2}"                # '84'
f"{n=}"                   # 'n=42'  affichage de débogage (3.8+)
f"{nom!r}"                # "'Ada'" conversion repr() ; !s : str()

largeur, prec = 10, 3
f"{pi:{largeur}.{prec}f}"   # champs imbriqués : '     3.142'`}</Code>
      <Ul>
        <li>Dans une f-string, utiliser une autre sorte de guillemets que celle qui l'entoure (avant 3.12).</li>
        <li>Une f-string multiligne s'écrit avec des triples guillemets.</li>
        <li>Pour afficher une accolade littérale, la doubler : <InlineCode>{'f"{{x}}"'}</InlineCode>.</li>
      </Ul>
      <Note accent={TOOL_ACCENT}>
        Pour un message de log ou une requête SQL, ne construisez pas la chaîne
        vous-même : passez les valeurs en paramètres (log paresseux, requête
        préparée).
      </Note>

      <SourceLink href="https://www.digitalocean.com/community/tutorials/how-to-use-string-formatters-in-python-3">
        DigitalOcean — How to use string formatters in Python 3
      </SourceLink>
      {" · "}
      <SourceLink href="https://realpython.com/python-f-strings/">
        Real Python — f-strings
      </SourceLink>
    </div>
  );
}

export default function PyStrings() {
  return <Fr />;
}
