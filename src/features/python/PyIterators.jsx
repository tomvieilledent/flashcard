import { Code, InlineCode, P, H2, H3, Note, SourceLink } from "../../shared/ui/primitives.jsx";
import { TOOL_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={TOOL_ACCENT}>Python — itérateurs, générateurs & expressions génératrices</H2>

      <H3>Le protocole d'itération</H3>
      <P>
        Un <strong>itérateur</strong> implémente <InlineCode>__iter__()</InlineCode>{" "}
        (renvoie l'itérateur, souvent <InlineCode>self</InlineCode>) et{" "}
        <InlineCode>__next__()</InlineCode> (valeur suivante,{" "}
        <InlineCode>StopIteration</InlineCode> à la fin). Une boucle{" "}
        <InlineCode>for</InlineCode> appelle <InlineCode>iter()</InlineCode>,
        puis <InlineCode>next()</InlineCode> jusqu'à <InlineCode>StopIteration</InlineCode>.
      </P>
      <Code>{`s = "abc"
it = iter(s)
next(it)   # 'a'
next(it)   # 'b'
next(it)   # 'c'
next(it)   # StopIteration

class Reverse:
    """Parcourt une séquence à l'envers."""
    def __init__(self, data):
        self.data = data
        self.index = len(data)
    def __iter__(self):
        return self
    def __next__(self):
        if self.index == 0:
            raise StopIteration
        self.index -= 1
        return self.data[self.index]

for char in Reverse("spam"):   # m a p s
    print(char)`}</Code>

      <H3>Générateurs</H3>
      <P>
        Une fonction avec <InlineCode>yield</InlineCode> produit un itérateur :{" "}
        <InlineCode>__iter__</InlineCode> et <InlineCode>__next__</InlineCode>{" "}
        sont créées automatiquement, l'état local est conservé entre les
        appels, et <InlineCode>StopIteration</InlineCode> est levée à la fin.
      </P>
      <Code>{`def reverse(data):
    for index in range(len(data) - 1, -1, -1):
        yield data[index]

for char in reverse("golf"):   # f l o g
    print(char)`}</Code>

      <H3>Expressions génératrices</H3>
      <P>
        Comme une compréhension de liste, mais avec des parenthèses : évaluation
        paresseuse, sans construire la liste en mémoire.
      </P>
      <Code>{`sum(i * i for i in range(10))                       # 285
sum(x * y for x, y in zip([10, 20, 30], [7, 5, 3]))  # 260 (produit scalaire)
unique_words = set(word for line in page for word in line.split())
best = max((s.gpa, s.name) for s in graduates)`}</Code>
      <Note accent={TOOL_ACCENT}>
        Plus compactes et plus économes en mémoire que les listes, mais à usage
        unique : idéales quand la fonction englobante consomme aussitôt le
        résultat.
      </Note>

      <SourceLink href="https://docs.python.org/3/tutorial/classes.html">
        docs.python.org — Classes (itérateurs, générateurs)
      </SourceLink>
    </div>
  );
}

export default function PyIterators() {
  return <Fr />;
}
