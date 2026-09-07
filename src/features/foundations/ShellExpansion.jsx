import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { TOOL_ACCENT } from "../../shared/ui/tokens.js";

export default function ShellExpansion() {
  return (
    <div>
      <H2 accent={TOOL_ACCENT}>Expansions et guillemets</H2>

      <P>
        Avant d'exécuter une ligne, le shell la <em>transforme</em> :
        il remplace des motifs par leur valeur. <InlineCode>echo</InlineCode>
        est l'outil idéal pour voir le résultat.
      </P>

      <H3>Les expansions</H3>
      <Table
        head={["Type", "Exemple", "Devient"]}
        rows={[
          ["Chemins (globbing)", "echo *.txt", "la liste des fichiers .txt"],
          ["Tilde", "echo ~", "/home/alice"],
          ["Accolades", "echo fichier{1,2,3}", "fichier1 fichier2 fichier3"],
          ["Arithmétique", "echo $((3 + 4 * 2))", "11"],
          ["Paramètre / variable", "echo $USER", "alice"],
          ["Substitution de commande", "echo $(date +%Y)", "2026"],
        ]}
      />
      <Code>{`mkdir -p projet/{src,tests,docs}
cp rapport.txt rapport.txt.bak.$(date +%F)
for i in {1..5}; do echo "ligne $i"; done`}</Code>

      <H3>Arithmétique</H3>
      <P>
        <InlineCode>$(( ... ))</InlineCode> évalue une expression entière
        (opérateurs <InlineCode>+ - * / % **</InlineCode>, comparaisons,
        <InlineCode> &amp;&amp; || </InlineCode>). Pas de décimales en bash
        (utiliser <InlineCode>bc</InlineCode> ou <InlineCode>awk</InlineCode>).
      </P>
      <Code>{`n=7
echo $((n * n))       # 49
echo $((10 / 3))      # 3   (division entière)
echo $((10 % 3))      # 1   (reste)`}</Code>

      <H3>Guillemets et échappement</H3>
      <Table
        head={["Forme", "Effet"]}
        rows={[
          ["\"double\"", "empêche le globbing et le découpage ; garde $, $(...), \\"],
          ["'simple'", "tout est littéral — aucune expansion"],
          ["\\c", "protège un seul caractère"],
        ]}
      />
      <Code>{`nom="Ada Lovelace"
echo "$nom"            # Ada Lovelace
echo '$nom'            # $nom
echo "Prix : 5\\$"      # Prix : 5$
touch "mon fichier"   # sans guillemets → deux fichiers`}</Code>
      <Note accent={TOOL_ACCENT}>
        Règle de survie : <strong>toujours guillemeter</strong> les
        variables — <InlineCode>"$var"</InlineCode>,
        <InlineCode> "$@"</InlineCode> — pour éviter qu'un espace ou un
        <InlineCode> *</InlineCode> dans la valeur ne casse la commande.
      </Note>

      <H3>Caractères spéciaux du shell</H3>
      <P>
        <InlineCode>{"espace  $  \"  '  \\  #  =  |  &  ;  < >  ( )  { }  [ ]  *  ?  ! ~"}</InlineCode>
        {" "}ont un sens pour le shell. Pour les utiliser littéralement, il
        faut les protéger. <InlineCode>#</InlineCode> commence un commentaire
        (jusqu'à la fin de ligne).
      </P>

      <H3>Le shebang</H3>
      <P>
        Première ligne d'un script : <InlineCode>#!</InlineCode> suivi de
        l'interpréteur. Le noyau la lit pour savoir quoi lancer.
      </P>
      <Code>{`#!/bin/bash
#!/usr/bin/env python3   # trouve python3 via le PATH (plus portable)`}</Code>
      <P>
        Le fichier doit être exécutable :
        <InlineCode> chmod +x script.sh</InlineCode>, puis
        <InlineCode> ./script.sh</InlineCode>.
      </P>

      <SourceLink href="https://linuxcommand.org/lc3_lts0080.php">
        linuxcommand.org — Expansion
      </SourceLink>
      {" · "}
      <SourceLink href="https://mywiki.wooledge.org/BashGuide/SpecialCharacters">
        wooledge — Special Characters
      </SourceLink>
      {" · "}
      <SourceLink href="https://tldp.org/LDP/Bash-Beginners-Guide/html/sect_03_01.html">
        TLDP — Bash Beginners Guide §3
      </SourceLink>
      {" · "}
      <SourceLink href="https://en.wikipedia.org/wiki/Shebang_(Unix)">
        Wikipedia — Shebang
      </SourceLink>
    </div>
  );
}
