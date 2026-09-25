import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { TOOL_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={TOOL_ACCENT}>Python — objets, identité, alias, mutable vs immuable</H2>

      <H3>Valeur et identité</H3>
      <Table
        head={["Opérateur", "Teste"]}
        rows={[
          ["==", "L'égalité : mêmes valeurs"],
          ["is", "L'identité : le même objet en mémoire (id() identique)"],
        ]}
      />
      <Code>{`a = "banana"
b = "banana"
a == b          # True
a is b          # True  (chaînes identiques : objet partagé, optimisation de Python)

a = [1, 2, 3]
b = [1, 2, 3]
a == b          # True   même valeur
a is b          # False  deux objets distincts`}</Code>
      <P>
        Ne comptez jamais sur <InlineCode>is</InlineCode> pour comparer des
        valeurs : réservez-le à <InlineCode>is None</InlineCode>.
      </P>

      <H3>Alias</H3>
      <P>
        Plusieurs variables qui référencent le <strong>même objet</strong> sont
        des alias. Sur un objet mutable, modifier via l'un modifie l'autre.
      </P>
      <Code>{`a = [1, 2, 3]
b = a
a is b          # True : alias
b[0] = 5
print(a)        # [5, 2, 3]  ← a a changé aussi`}</Code>

      <H3>Cloner une liste</H3>
      <Code>{`a = [1, 2, 3]
b = a[:]              # tranche : nouvelle liste
b[0] = 5
print(a)              # [1, 2, 3]  inchangée

list(a)               # constructeur : copie superficielle
a.copy()              # idem

import copy
matrice = [[1, 2], [3, 4]]
copie = list(matrice)          # superficielle : les sous-listes sont partagées
copie[0][0] = 99               # modifie aussi matrice[0][0] !
profonde = copy.deepcopy(matrice)   # copie récursive : tout est dupliqué`}</Code>
      <Note accent={TOOL_ACCENT}>
        Une copie superficielle (<InlineCode>[:]</InlineCode>,{" "}
        <InlineCode>list()</InlineCode>, <InlineCode>copy()</InlineCode>)
        sépare la liste mais partage les objets imbriqués. Pour des structures
        imbriquées : <InlineCode>copy.deepcopy</InlineCode>.
      </Note>

      <H3>Mutable ou immuable</H3>
      <Table
        head={["Immuables", "Mutables"]}
        rows={[
          ["int, float, bool, str, tuple, frozenset, bytes, None", "list, dict, set, bytearray, objets de classes utilisateur"],
        ]}
      />
      <Ul>
        <li>Un objet immuable ne change jamais : « modifier » revient à créer un nouvel objet (<InlineCode>s = s + "x"</InlineCode>). Python peut donc le partager sans risque.</li>
        <li>Un objet mutable se modifie sur place (<InlineCode>append</InlineCode>, <InlineCode>pop</InlineCode>, <InlineCode>remove</InlineCode>, <InlineCode>extend</InlineCode>…) : chaque affectation de liste crée un objet distinct pour éviter les alias involontaires.</li>
        <li>Les clés d'un dictionnaire doivent être immuables (donc hachables).</li>
        <li>Un tuple est immuable, mais un élément mutable qu'il contient peut changer : <InlineCode>t = ([1], 2); t[0].append(9)</InlineCode> est permis.</li>
      </Ul>

      <H3>Passage d'arguments : par référence d'objet</H3>
      <P>
        Une fonction reçoit une <strong>référence</strong> vers l'objet, pas une
        copie : elle peut modifier un argument mutable.
      </P>
      <Code>{`def double_stuff(a_list):
    for index, value in enumerate(a_list):
        a_list[index] = 2 * value

things = [2, 5, "Spam", 9.5]
double_stuff(things)
print(things)         # [4, 10, 'SpamSpam', 19.0]  ← l'argument a été modifié

def ajouter(x, L=[]):     # piège : valeur par défaut mutable partagée
    L.append(x)
    return L`}</Code>
      <Note accent={TOOL_ACCENT}>
        Pour ne pas altérer l'argument, travaillez sur une copie ou renvoyez une
        nouvelle liste ; utilisez <InlineCode>None</InlineCode> comme valeur par
        défaut plutôt qu'une liste vide.
      </Note>

      <SourceLink href="https://www.openbookproject.net/thinkcs/python/english2e/ch09.html#objects-and-values">
        Think CS — Objects and values
      </SourceLink>
      {" · "}
      <SourceLink href="https://www.openbookproject.net/thinkcs/python/english2e/ch09.html#aliasing">
        Think CS — Aliasing
      </SourceLink>
      {" · "}
      <SourceLink href="https://www.openbookproject.net/thinkcs/python/english2e/ch09.html#cloning-lists">
        Think CS — Cloning lists
      </SourceLink>
      {" · "}
      <SourceLink href="https://composingprograms.com/pages/24-mutable-data.html#sequence-objects">
        Composing Programs — Mutable data
      </SourceLink>
      {" · "}
      <SourceLink href="https://stackoverflow.com/questions/8056130/immutable-vs-mutable-types">
        Stack Overflow — immutable vs mutable types
      </SourceLink>
    </div>
  );
}

export default function PyMutability() {
  return <Fr />;
}
