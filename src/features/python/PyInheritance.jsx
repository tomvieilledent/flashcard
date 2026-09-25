import { Code, InlineCode, P, H2, H3, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { TOOL_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={TOOL_ACCENT}>Python — héritage, MRO & classes abstraites</H2>

      <H3>Héritage simple</H3>
      <P>
        <InlineCode>class Derivee(Base):</InlineCode> : si un attribut est
        introuvable dans la classe dérivée, la recherche continue dans la
        classe de base, récursivement. Toutes les méthodes sont
        « virtuelles » : la dérivée peut les redéfinir.
      </P>
      <Code>{`class SchoolMember:
    def __init__(self, name, age):
        self.name, self.age = name, age

class Teacher(SchoolMember):
    def __init__(self, name, age, salary):
        super().__init__(name, age)      # constructeur du parent, à appeler explicitement
        self.salary = salary

class Animal:
    def speak(self):
        return "Un son"

class Dog(Animal):
    def speak(self):                     # redéfinition (override)
        return Animal.speak(self) + " — Wouf"   # ou super().speak()

isinstance(Dog(), Animal)                # True
issubclass(bool, int)                    # True
issubclass(float, int)                   # False`}</Code>
      <Note accent={TOOL_ACCENT}>
        Sans appel explicite au constructeur parent, les attributs de la base
        ne sont pas initialisés.
      </Note>

      <H3>Héritage multiple et MRO</H3>
      <P>
        <InlineCode>class D(B, C):</InlineCode> hérite de plusieurs bases.
        L'ordre de recherche (<strong>MRO</strong>, Method Resolution Order)
        suit l'algorithme <strong>C3</strong> : ordre gauche-droite respecté,
        chaque parent visité une seule fois, ordre monotone. Règle pratique :
        profondeur d'abord, de gauche à droite, sans revisiter une classe.
      </P>
      <Code>{`class A:
    def method(self): print("A")
class B(A):
    pass
class C(A):
    def method(self): print("C")
class D(B, C):
    pass

D.__mro__      # (D, B, C, A, object)
D().method()   # "C"  (B n'a pas method ; C passe avant A)`}</Code>

      <H3>Classes abstraites : le module abc</H3>
      <P>
        Une classe héritant de <InlineCode>ABC</InlineCode> (ou de métaclasse{" "}
        <InlineCode>ABCMeta</InlineCode>, équivalent) qui déclare des méthodes{" "}
        <InlineCode>@abstractmethod</InlineCode> ne peut pas être instanciée :
        chaque sous-classe doit les implémenter.
      </P>
      <Code>{`from abc import ABC, abstractmethod

class Forme(ABC):
    @abstractmethod
    def aire(self):
        ...

    @classmethod
    @abstractmethod                     # @abstractmethod toujours en dernier (le plus interne)
    def unite(cls): ...

class Carre(Forme):
    def __init__(self, c):
        self.c = c
    def aire(self):
        return self.c ** 2
    @classmethod
    def unite(cls):
        return "m²"

Forme()      # TypeError: Can't instantiate abstract class Forme with abstract methods aire, unite
Carre(2).aire()   # 4`}</Code>
      <Table
        head={["Fonction", "Effet"]}
        rows={[
          ["@property + @abstractmethod", "Propriété abstraite en lecture seule"],
          ["Classe.register(Autre)", "Sous-classe « virtuelle » : issubclass() est vrai, mais absente du MRO et sans méthodes héritées"],
          ["__subclasshook__", "Personnalise issubclass() sans enregistrement (True / False / NotImplemented)"],
        ]}
      />
      <Code>{`MyABC.register(tuple)
issubclass(tuple, MyABC)      # True
isinstance((), MyABC)         # True`}</Code>
      <Note accent={TOOL_ACCENT}>
        Une méthode abstraite peut avoir un corps, appelable via{" "}
        <InlineCode>super()</InlineCode>. C'est l'équivalent Python d'une
        interface (voir « Repository & inversion des dépendances »).
      </Note>

      <SourceLink href="https://docs.python.org/3/tutorial/classes.html#inheritance">
        docs.python.org — Inheritance
      </SourceLink>
      {" · "}
      <SourceLink href="https://docs.python.org/3/tutorial/classes.html#multiple-inheritance">
        docs.python.org — Multiple inheritance
      </SourceLink>
      {" · "}
      <SourceLink href="https://www.packtpub.com/en-us/learning/how-to-tutorials/inheritance-python/">
        Packt — Inheritance in Python
      </SourceLink>
      {" · "}
      <SourceLink href="https://docs.python.org/3/library/abc.html">
        docs.python.org — abc (Abstract Base Classes)
      </SourceLink>
    </div>
  );
}

export default function PyInheritance() {
  return <Fr />;
}
