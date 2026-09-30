#!/usr/bin/env python3
"""
Reorganiza exercícios de cálculo vetorial
Divide cada arquivo em: intro.html + exercícios individuais + index.html
"""

import os
import re
import shutil
from pathlib import Path
from bs4 import BeautifulSoup


def normalizar_codigo(codigo):
    """
    Normaliza código do exercício para nome de arquivo
    EXERCÍCIO VECTOR-2A → exercicio-vector-2a.html
    EXERCÍCIO 1 → exercicio-01.html
    """
    # Remover "EXERCÍCIO " e normalizar
    codigo = codigo.strip()
    codigo = codigo.replace('EXERCÍCIO ', '')
    
    # Lowercase
    codigo = codigo.lower()
    
    # Substituir espaços por hífen
    codigo = codigo.replace(' ', '-')
    
    # Se é numérico simples (ex: "1", "2"), adicionar zero à esquerda
    if re.match(r'^\d$', codigo):
        codigo = codigo.zfill(2)
    
    # Adicionar prefixo
    codigo = f'exercicio-{codigo}'
    
    return codigo + '.html'


def extrair_intro(soup):
    """Extrai intro.html: document-header + seção teórica (se existir)"""
    partes = []
    
    # 1. Document header (pode ser <div> ou <header>)
    header = soup.find(class_='document-header')
    if header:
        partes.append(str(header))
    
    # 2. Seção teórica (se existir)
    # Procurar por section-title ou concept-definition
    section_title = soup.find('div', class_='section-title')
    if section_title:
        # Capturar elementos até <main>
        current = section_title
        while current:
            # Parar se chegou no <main>
            if current.name == 'main':
                break
            
            # Adicionar elemento (exceto se for próprio section_title que já vamos adicionar)
            if current != section_title:
                partes.append(str(current))
            
            # Próximo sibling
            current = current.next_sibling
            
            # Pular NavigableStrings vazios
            while current and (not hasattr(current, 'name') or current.name is None):
                if str(current).strip():
                    partes.append(str(current))
                current = current.next_sibling if current else None
        
        # Adicionar section_title no início da teoria
        if len(partes) > 1:  # Se capturou algo além do header
            # Inserir section_title após header
            partes.insert(1 if header else 0, str(section_title))
    
    return '\n'.join(partes)


def extrair_exercicios(soup):
    """Extrai cada exercício como fragmento HTML"""
    exercicios = []
    
    for li in soup.find_all('li', class_='exercise-item'):
        # Extrair código do exercício
        exercise_number = li.find('div', class_='exercise-number')
        if exercise_number:
            codigo_texto = exercise_number.text.strip()
            arquivo = normalizar_codigo(codigo_texto)
            
            exercicios.append({
                'arquivo': arquivo,
                'codigo': codigo_texto,
                'conteudo': str(li)
            })
    
    return exercicios


def extrair_head(soup):
    """Extrai <head> completo"""
    head = soup.find('head')
    return str(head) if head else ''


def extrair_footer(soup):
    """Extrai footer do documento original"""
    footer_div = soup.find('div', class_='page-number')
    return str(footer_div) if footer_div else ''

    footer_stamp = soup.find('div', class_='footer-stamp')
    footer_stamp_str = str(footer_stamp) if footer_stamp else ''
    
    return footer_div_str + footer_stamp_str


def criar_index_html(head_content, exercicios_arquivos, footer_content):
    """Cria index.html que carrega intro + exercícios via fetch"""
    
    # Lista de arquivos de exercício para JavaScript
    exercicios_js_list = ',\n            '.join([f"'{f}'" for f in exercicios_arquivos])
    
    # Escapar footer para JavaScript
    footer_escaped = footer_content.replace('\n', '').replace("'", "\\'")
    
    index_html = f'''<!doctype html>
<html lang="pt-BR">
  {head_content}
  <body>
    <div class="container">
      <div id="intro"></div>
      
      <main>
        <ol class="exercise-list" id="exercises"></ol>
      </main>
      
      <div id="footer"></div>
    </div>

    <script>
      async function loadContent() {{
        try {{
          // Carregar intro
          const introResp = await fetch('intro.html');
          if (introResp.ok) {{
            document.getElementById('intro').innerHTML = await introResp.text();
          }}
          
          // Lista de exercícios em ordem
          const exercises = [
            {exercicios_js_list}
          ];
          
          const list = document.getElementById('exercises');
          
          // Carregar cada exercício
          for (const file of exercises) {{
            const resp = await fetch(file);
            if (resp.ok) {{
              list.innerHTML += await resp.text();
            }}
          }}
          
          // Footer
          document.getElementById('footer').innerHTML = `{footer_escaped}`;
          
          // Re-renderizar MathJax
          if (window.MathJax && window.MathJax.typesetPromise) {{
            MathJax.typesetPromise();
          }} else if (window.MathJax && window.MathJax.Hub) {{
            // MathJax 2.x
            MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
          }}
        }} catch (error) {{
          console.error('Erro ao carregar conteúdo:', error);
        }}
      }}
      
      loadContent();
    </script>
  </body>
</html>'''
    
    return index_html


def processar_arquivo(arquivo_path, backup_dir):
    """Processa um arquivo HTML e cria estrutura de pastas"""
    
    print(f"\nProcessando: {arquivo_path}")
    
    # Ler arquivo
    with open(arquivo_path, 'r', encoding='utf-8') as f:
        conteudo = f.read()
    
    # Parse HTML
    soup = BeautifulSoup(conteudo, 'html.parser')
    
    # Determinar nome da pasta
    arquivo_nome = arquivo_path.stem  # ex: "rotacional" sem .html
    capitulo_nome = arquivo_path.parent.name  # ex: "capitulo-1"
    
    pasta_destino = arquivo_path.parent / arquivo_nome
    backup_capitulo = backup_dir / capitulo_nome
    
    # Criar pastas
    pasta_destino.mkdir(exist_ok=True)
    backup_capitulo.mkdir(parents=True, exist_ok=True)
    
    # Mover arquivo original para backup
    backup_arquivo = backup_capitulo / arquivo_path.name
    shutil.move(str(arquivo_path), str(backup_arquivo))
    print(f"  ✓ Backup: {backup_arquivo}")
    
    # Extrair componentes
    head_content = extrair_head(soup)
    intro_content = extrair_intro(soup)
    exercicios = extrair_exercicios(soup)
    footer_content = extrair_footer(soup)
    
    # Salvar intro.html
    if intro_content.strip():
        intro_path = pasta_destino / 'intro.html'
        with open(intro_path, 'w', encoding='utf-8') as f:
            f.write(intro_content)
        print(f"  ✓ Criado: {intro_path}")
    
    # Salvar cada exercício
    exercicios_arquivos = []
    for ex in exercicios:
        ex_path = pasta_destino / ex['arquivo']
        with open(ex_path, 'w', encoding='utf-8') as f:
            f.write(ex['conteudo'])
        exercicios_arquivos.append(ex['arquivo'])
        print(f"  ✓ Criado: {ex_path} ({ex['codigo']})")
    
    # Criar index.html
    index_content = criar_index_html(head_content, exercicios_arquivos, footer_content)
    index_path = pasta_destino / 'index.html'
    with open(index_path, 'w', encoding='utf-8') as f:
        f.write(index_content)
    print(f"  ✓ Criado: {index_path}")
    
    print(f"  → {len(exercicios)} exercícios extraídos")


def main():
    """Função principal"""
    base_dir = Path(__file__).parent
    backup_dir = base_dir / '_backup'
    
    print("=" * 60)
    print("REORGANIZAÇÃO DE EXERCÍCIOS")
    print("=" * 60)
    
    # Coletar todos os arquivos HTML (exceto template.html)
    arquivos = []
    for capitulo in sorted(base_dir.glob('capitulo-*')):
        for arquivo in sorted(capitulo.glob('*.html')):
            arquivos.append(arquivo)
    
    print(f"\nEncontrados {len(arquivos)} arquivos para processar\n")
    
    # Processar cada arquivo
    for i, arquivo in enumerate(arquivos, 1):
        print(f"[{i}/{len(arquivos)}]", end='')
        try:
            processar_arquivo(arquivo, backup_dir)
        except Exception as e:
            print(f"  ✗ ERRO: {e}")
            import traceback
            traceback.print_exc()
    
    print("\n" + "=" * 60)
    print("REORGANIZAÇÃO CONCLUÍDA!")
    print("=" * 60)
    print(f"\nArquivos originais movidos para: {backup_dir}")
    print(f"Estrutura criada em: {base_dir}/capitulo-*/topico/")


if __name__ == '__main__':
    main()
