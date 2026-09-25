import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { TOOL_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={TOOL_ACCENT}>Python — doctest : la documentation qui se teste</H2>
      <P>
        Le module <InlineCode>doctest</InlineCode> exécute les exemples écrits
        dans les docstrings sous la forme d'une session interactive (
        <InlineCode>&gt;&gt;&gt;</InlineCode>) et compare la sortie à celle
        attendue. La doc et les tests ne peuvent plus diverger.
      </P>

      <H3>Écrire un doctest</H3>
      <Code>{`def my_function(a, b):
    """
    >>> my_function(2, 3)
    6
    >>> my_function('a', 3)
    'aaa'
    """
    return a * b

if __name__ == "__main__":
    import doctest
    doctest.testmod()           # silencieux si tout passe`}</Code>

      <H3>Lancer les tests</H3>
      <Code>{`python3 -m doctest -v mon_module.py      # -v : détail de chaque exemple
python3 mon_module.py -v                  # si testmod() est en bas du fichier
python3 -m doctest -v exemple.txt         # fichier texte
python3 -m doctest -o FAIL_FAST -o ELLIPSIS mon_module.py   # options (3.4+)`}</Code>

      <H3>Comment la sortie est comparée</H3>
      <Ul>
        <li>La sortie attendue suit immédiatement la ligne <InlineCode>&gt;&gt;&gt;</InlineCode> / <InlineCode>...</InlineCode> et s'étend jusqu'au prochain <InlineCode>&gt;&gt;&gt;</InlineCode> ou à une ligne blanche.</li>
        <li>La correspondance est <strong>exacte</strong> par défaut : un caractère de différence (espace final compris) fait échouer.</li>
        <li>Une ligne blanche dans la sortie s'écrit <InlineCode>&lt;BLANKLINE&gt;</InlineCode>.</li>
      </Ul>
      <Code>{`>>> print("hello")
hello
>>> print("a")
... print("b")
a
b`}</Code>

      <H3>Options et directives</H3>
      <Table
        head={["Option", "Effet"]}
        rows={[
          ["ELLIPSIS", "... remplace n'importe quelle sous-chaîne (adresses mémoire, valeurs variables)"],
          ["NORMALIZE_WHITESPACE", "Toutes les suites d'espaces / retours à la ligne sont équivalentes"],
          ["IGNORE_EXCEPTION_DETAIL", "Compare seulement le type de l'exception, pas son message"],
          ["SKIP", "N'exécute pas l'exemple"],
          ["DONT_ACCEPT_TRUE_FOR_1", "Refuse l'équivalence 1 / True, 0 / False"],
          ["REPORT_NDIFF / REPORT_UDIFF / REPORT_CDIFF", "Format du diff en cas d'échec"],
          ["REPORT_ONLY_FIRST_FAILURE / FAIL_FAST", "Limite les rapports / arrête au premier échec"],
        ]}
      />
      <Code>{`>>> print(list(range(20)))  # doctest: +ELLIPSIS
[0, 1, ..., 18, 19]

>>> print(list(range(20)))  # doctest: +NORMALIZE_WHITESPACE
[0,   1,  2,  3,  4,  5,  6,  7,  8,  9,
10,  11, 12, 13, 14, 15, 16, 17, 18, 19]

>>> print(list(range(20)))  # doctest: +ELLIPSIS, +NORMALIZE_WHITESPACE

# Ou globalement
doctest.testmod(optionflags=doctest.ELLIPSIS | doctest.NORMALIZE_WHITESPACE)`}</Code>

      <H3>Exceptions attendues</H3>
      <P>
        L'en-tête <InlineCode>Traceback (most recent call last):</InlineCode>{" "}
        est obligatoire ; le contenu de la pile est ignoré (on peut le
        remplacer par <InlineCode>...</InlineCode>) ; seuls le type et le
        message de l'exception sont vérifiés.
      </P>
      <Code>{`def diviser(a, b):
    """
    >>> diviser(1, 0)
    Traceback (most recent call last):
        ...
    ZeroDivisionError: division by zero
    """
    return a / b`}</Code>

      <H3>Sorties imprévisibles : les pièges</H3>
      <Code>{`# Dict / set : ordre non garanti -> comparer plutôt que d'afficher
>>> foo()
{"Hermione": "hippogryph", "Harry": "broomstick"}     # fragile
>>> foo() == {"Hermione": "hippogryph", "Harry": "broomstick"}
True                                                   # robuste

# Adresse d'objet -> ELLIPSIS
>>> C()  # doctest: +ELLIPSIS
<__main__.C object at 0x...>

# Flottants : arrondir
>>> print(round(1 / 7, 6))
0.142857`}</Code>

      <H3>Où placer les tests</H3>
      <Ul>
        <li>docstrings de fonctions, de méthodes, de classes et de module ;</li>
        <li>fichier texte externe : <InlineCode>doctest.testfile("example.txt")</InlineCode> ;</li>
        <li>dictionnaire <InlineCode>__test__</InlineCode> pour des jeux de tests privés ;</li>
        <li>intégration à unittest : <InlineCode>DocTestSuite(module)</InlineCode> et <InlineCode>DocFileSuite("file.txt")</InlineCode>.</li>
      </Ul>
      <Note accent={TOOL_ACCENT}>
        Idéal pour de petites fonctions pures ; pour des scénarios complexes,
        préférez unittest ou pytest.
      </Note>

      <SourceLink href="https://docs.python.org/3.4/library/doctest.html">
        docs.python.org — doctest
      </SourceLink>
      {" · "}
      <SourceLink href="https://pymotw.com/3/doctest/">
        PyMOTW — doctest
      </SourceLink>
    </div>
  );
}

export default function PyDoctest() {
  return <Fr />;
}
