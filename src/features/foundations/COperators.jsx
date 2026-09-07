import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { CI_ACCENT } from "../../shared/ui/tokens.js";

export default function COperators() {
  return (
    <div>
      <H2 accent={CI_ACCENT}>Opérateurs</H2>

      <H3>Arithmétiques</H3>
      <Table
        head={["Opérateur", "Rôle", "Exemple"]}
        rows={[
          ["+ - *", "somme, différence, produit", "3 * 4 → 12"],
          ["/", "division", "7 / 2 → 3 (entière si les deux sont entiers)"],
          ["%", "reste (modulo), entiers uniquement", "7 % 2 → 1"],
        ]}
      />
      <Note accent={CI_ACCENT}>
        <InlineCode>7 / 2</InlineCode> vaut <InlineCode>3</InlineCode>, pas
        3,5 : sans nombre à virgule dans l'expression, C fait une division
        entière. Pour un résultat décimal :
        <InlineCode> 7.0 / 2</InlineCode> ou <InlineCode>(double)7 / 2</InlineCode>.
      </Note>

      <H3>Incrémentation / décrémentation</H3>
      <Code>{`int i = 5;
i++;        /* i vaut 6 */
int a = i++;  /* a = 6 puis i = 7  (post : on lit AVANT d'incrémenter) */
int b = ++i;  /* i = 8 puis b = 8  (pré : on incrémente AVANT de lire) */`}</Code>

      <H3>Relationnels — résultat 0 ou 1</H3>
      <Table
        head={["Opérateur", "Vrai si"]}
        rows={[
          ["==", "égaux"],
          ["!=", "différents"],
          ["< <= > >=", "comparaison d'ordre"],
        ]}
      />
      <Note accent={CI_ACCENT}>
        Piège classique : <InlineCode>if (x = 3)</InlineCode> <em>affecte</em>
        3 à x et est toujours vrai. Le test d'égalité est
        <InlineCode> ==</InlineCode>.
      </Note>

      <H3>Logiques — court-circuit</H3>
      <Table
        head={["Opérateur", "Rôle"]}
        rows={[
          ["&&", "ET — s'arrête si l'opérande gauche est faux (0)"],
          ["||", "OU — s'arrête si l'opérande gauche est vrai (≠ 0)"],
          ["!", "NON — inverse la vérité"],
        ]}
      />
      <Code>{`if (p != NULL && p->valeur > 0)   /* la 2e condition n'est testée
                                     que si p n'est pas NULL */`}</Code>

      <H3>Affectation composée & priorités</H3>
      <Code>{`x += 3;   /* x = x + 3 ; idem -= *= /= %= */`}</Code>
      <P>
        Ordre d'évaluation (du plus fort au plus faible, simplifié) :
        <InlineCode> ! ++ --</InlineCode> &gt; <InlineCode>* / %</InlineCode>
        {" "}&gt; <InlineCode>+ -</InlineCode> &gt;
        <InlineCode> &lt; &lt;= &gt; &gt;=</InlineCode> &gt;
        <InlineCode> == !=</InlineCode> &gt; <InlineCode>&amp;&amp;</InlineCode>
        {" "}&gt; <InlineCode>||</InlineCode> &gt;
        <InlineCode> = += …</InlineCode>. En cas de doute : parenthèses.
      </P>

      <SourceLink href="https://www.tutorialspoint.com/cprogramming/c_arithmetic_operators.htm">
        tutorialspoint — Arithmetic operators
      </SourceLink>
      {" · "}
      <SourceLink href="https://www.tutorialspoint.com/cprogramming/c_relational_operators.htm">
        Relational operators
      </SourceLink>
      {" · "}
      <SourceLink href="https://www.tutorialspoint.com/cprogramming/c_logical_operators.htm">
        Logical operators
      </SourceLink>
    </div>
  );
}
