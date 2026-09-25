import { Code, InlineCode, P, H2, H3, Ul, Note, SourceLink } from "../../shared/ui/primitives.jsx";
import { TOOL_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={TOOL_ACCENT}>Python avancé — typage dynamique & annotations de type</H2>

      <H3>Un langage à typage dynamique</H3>
      <P>
        Les types des variables sont fixés <strong>à l'exécution</strong>, à
        l'affectation d'une valeur. Dans <InlineCode>fn(a, b)</InlineCode>, les
        types de <InlineCode>a</InlineCode> et <InlineCode>b</InlineCode> ne
        sont pas connus à la construction.
      </P>
      <Code>{`def fn(a, b):
    return a + b

fn("a", "b")       # 'ab'
fn("a", 1)         # aucune erreur avant l'exécution de cet appel
# Traceback (most recent call last):
# TypeError: can only concatenate str (not "int") to str`}</Code>

      <H3>Les annotations ne changent rien à l'exécution</H3>
      <P>
        En Python 3, les annotations de type n'altèrent pas ce comportement :
        le langage reste dynamique. Elles servent à deux choses.
      </P>
      <Ul>
        <li>
          <strong>Documentation du code</strong> : un développeur (vous ou un
          autre) sait exactement quel type chaque variable est censée avoir, ce
          qui réduit bogues et exceptions et accélère le cycle de
          développement.
        </li>
        <li>
          <strong>Linting et validation</strong> : éditeurs et pipelines CI
          valident le code annoté à la construction et attrapent les bogues
          avant la production.
        </li>
      </Ul>
      <Code>{`def fn(a: int, b: int) -> int:
    return a + b

fn("a", 1)         # s'exécute encore : Python n'applique pas les annotations
fn.__annotations__ # {'a': <class 'int'>, 'b': <class 'int'>, 'return': <class 'int'>}

# Types composés (3.9+) et optionnels (3.10+)
def moyenne(notes: list[float]) -> float: ...
def trouver(id: int) -> str | None: ...
noms: dict[str, int] = {}`}</Code>

      <H3>Vérifier avec un outil</H3>
      <Code>{`pip install mypy
mypy mon_module.py
# error: Argument 1 to "fn" has incompatible type "str"; expected "int"`}</Code>
      <Note accent={TOOL_ACCENT}>
        La vérification se fait <strong>avant</strong> l'exécution, par un
        outil (mypy, Pyright, l'éditeur) : sans lui, une annotation n'est que
        de la documentation.
      </Note>

      <SourceLink href="https://docs.python.org/3/library/typing.html">
        docs.python.org — typing
      </SourceLink>
      {" · "}
      <SourceLink href="https://docs.python.org/3/tutorial/controlflow.html#function-annotations">
        docs.python.org — Function annotations
      </SourceLink>
    </div>
  );
}

export default function PyTypeHints() {
  return <Fr />;
}
