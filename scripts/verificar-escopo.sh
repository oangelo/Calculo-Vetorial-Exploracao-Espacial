#!/usr/bin/env bash
# verificar-escopo.sh — Verifica violações de escopo nos exercícios HTML
#
# Uso: ./scripts/verificar-escopo.sh <capitulo>
# Exemplo: ./scripts/verificar-escopo.sh 1
#
# Extrai TERMOS PROIBIDOS do checklist e verifica se aparecem
# nos arquivos HTML do capítulo (ignorando comentários e <script>).
#
# Exit: 0 = limpo, 1 = há violações

set -euo pipefail

if [ $# -ne 1 ]; then
    echo "Uso: $0 <capitulo: 0-9>"
    exit 2
fi

CAP="$1"

if ! [[ "$CAP" =~ ^[0-9]$ ]]; then
    echo "Erro: capítulo deve ser 0-9"
    exit 2
fi

# Resolve paths relative to this script's location
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
BASE_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
CHECKLIST="$BASE_DIR/exercicios/checklist-conceitos-permitidos.md"
CHAPTER_DIR="$BASE_DIR/exercicios/capitulo-${CAP}"

if [ ! -f "$CHECKLIST" ]; then
    echo "Erro: checklist não encontrado em $CHECKLIST"
    exit 2
fi

if [ ! -d "$CHAPTER_DIR" ]; then
    echo "Erro: diretório não encontrado: $CHAPTER_DIR"
    exit 2
fi

# Delegate to Python for robust HTML parsing
python3 - "$CHECKLIST" "$CHAPTER_DIR" "$CAP" << 'PYEOF'
import re
import sys
from pathlib import Path

checklist_path = Path(sys.argv[1])
chapter_dir = Path(sys.argv[2])
chapter_num = sys.argv[3]

def parse_chapter(content, num):
    """Extract text between ## Cap N and ## Cap N+1."""
    lines = content.split('\n')
    start = None
    end = len(lines)
    for i, line in enumerate(lines):
        m = re.match(rf'^##\s+Cap\s+{num}\b', line)
        if m and start is None:
            start = i
        if start is not None and i > start:
            m2 = re.match(r'^##\s+Cap\s+\d+\b', line)
            if m2:
                end = i
                break
    if start is None:
        return ''
    return '\n'.join(lines[start:end])

def extract_terms(section):
    """Extract all TERMOS PROIBIDOS from a chapter section."""
    terms = []
    lines = section.split('\n')
    for i, line in enumerate(lines):
        if 'TERMOS PROIBIDOS' in line:
            # Collect lines after the header until we hit an empty line or another section
            buf = []
            for j in range(i + 1, min(i + 5, len(lines))):
                l = lines[j].strip()
                if not l or l.startswith('**') or l.startswith('##') or l.startswith('---'):
                    break
                buf.append(l)
            group = ' '.join(buf).strip().rstrip('*').strip()
            if group:
                for term in group.split(','):
                    t = term.strip().strip('"').strip("'").strip()
                    if t and t != '(nenhum — capítulo final)':
                        terms.append(t)
    return list(dict.fromkeys(terms))

def find_violations(files, terms):
    """Check HTML files for forbidden terms outside comments and <script>."""
    violations = []
    seen = set()
    patterns = []
    for t in terms:
        escaped = re.escape(t)
        patterns.append((t, re.compile(r'\b' + escaped + r'\b', re.IGNORECASE)))

    for fpath in sorted(files):
        try:
            content = fpath.read_text(encoding='utf-8', errors='replace')
        except Exception:
            continue

        # Remove HTML comments (including multi-line)
        stripped = re.sub(r'<!--.*?-->', '', content, flags=re.DOTALL)
        # Remove <script> blocks
        stripped = re.sub(r'<script\b[^>]*>.*?</script>', '', stripped, flags=re.DOTALL | re.IGNORECASE)

        for line_num, line in enumerate(stripped.split('\n'), 1):
            for term, pat in patterns:
                if pat.search(line):
                    key = (str(fpath), line_num)
                    if key not in seen:
                        seen.add(key)
                        rel = fpath.relative_to(chapter_dir.parent)
                        violations.append((str(rel), line_num, term))

    return violations

# Main
content = checklist_path.read_text(encoding='utf-8')
section = parse_chapter(content, chapter_num)

if not section:
    print(f"Erro: capítulo {chapter_num} não encontrado no checklist", file=sys.stderr)
    sys.exit(2)

terms = extract_terms(section)

if not terms:
    print(f"Cap {chapter_num}: sem TERMOS PROIBIDOS — nada a verificar.")
    sys.exit(0)

# Find HTML files
html_files = list(chapter_dir.rglob('*.html'))

if not html_files:
    print(f"Cap {chapter_num}: nenhum arquivo HTML encontrado.")
    sys.exit(0)

violations = find_violations(html_files, terms)

if violations:
    for fpath, line_num, term in violations:
        print(f"VIOLACAO: {fpath}:{line_num}: termo proibido \"{term}\"")
    sys.exit(1)
else:
    print(f"OK — Nenhuma violacao de escopo encontrada (Cap {chapter_num}, {len(terms)} termos verificados)")
    sys.exit(0)
PYEOF
