import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { CI_ACCENT } from "../../shared/ui/tokens.js";

export default function CFileIo() {
  return (
    <div>
      <H2 accent={CI_ACCENT}>Entrées/sorties bas niveau & descripteurs</H2>

      <P>
        Sous Unix, un fichier ouvert est repéré par un <strong>descripteur
        de fichier</strong> (<em>file descriptor</em>, <InlineCode>fd</InlineCode>) :
        un simple entier, index dans la table des fichiers du processus.
      </P>
      <Table
        head={["fd", "Flux"]}
        rows={[
          ["0", "entrée standard (stdin)"],
          ["1", "sortie standard (stdout)"],
          ["2", "sortie d'erreur (stderr)"],
        ]}
      />
      <P>
        Le premier <InlineCode>open</InlineCode> renvoie en général le plus
        petit fd libre (3, puis 4…).
      </P>

      <H3>Les appels système</H3>
      <Table
        head={["Appel", "Rôle"]}
        rows={[
          ["open(path, flags, mode)", "ouvre/crée, renvoie un fd (ou -1)"],
          ["read(fd, buf, n)", "lit au plus n octets, renvoie le nombre lu (0 = fin)"],
          ["write(fd, buf, n)", "écrit n octets, renvoie le nombre écrit"],
          ["close(fd)", "libère le descripteur"],
        ]}
      />
      <Code>{`#include <fcntl.h>
#include <unistd.h>

int fd, r;
char buf[1024];

fd = open("notes.txt", O_RDONLY);
if (fd == -1)
	return (1);

while ((r = read(fd, buf, sizeof(buf))) > 0)
	write(1, buf, r);        /* recopie vers stdout */

close(fd);`}</Code>

      <H3>Drapeaux d'ouverture (combinés par |)</H3>
      <Ul>
        <li><InlineCode>O_RDONLY</InlineCode> / <InlineCode>O_WRONLY</InlineCode> / <InlineCode>O_RDWR</InlineCode> — mode d'accès.</li>
        <li><InlineCode>O_CREAT</InlineCode> — crée si absent (fournir <InlineCode>mode</InlineCode>, ex. <InlineCode>0644</InlineCode>).</li>
        <li><InlineCode>O_TRUNC</InlineCode> — vide le fichier ; <InlineCode>O_APPEND</InlineCode> — écrit à la fin.</li>
      </Ul>
      <Code>{`fd = open("log", O_WRONLY | O_CREAT | O_APPEND, 0644);`}</Code>

      <Note accent={CI_ACCENT}>
        Bas niveau (<InlineCode>open/read/write</InlineCode>, appels système)
        vs <InlineCode>&lt;stdio.h&gt;</InlineCode>
        (<InlineCode>fopen/fread/printf</InlineCode>, <InlineCode>FILE *</InlineCode>,
        avec tampon). Le second est bâti sur le premier.
      </Note>

      <SourceLink href="https://en.wikipedia.org/wiki/File_descriptor">
        Wikipedia — File descriptor
      </SourceLink>
      {" · "}
      <SourceLink href="https://medium.com/@muirujackson/how-to-use-the-i-o-system-calls-open-close-read-and-write-f6f80dc61e2a">
        Medium — I/O system calls: open, close, read, write
      </SourceLink>
      {" · "}
      <SourceLink href="https://sourceware.org/glibc/manual/">
        The GNU C Library manual
      </SourceLink>
    </div>
  );
}
