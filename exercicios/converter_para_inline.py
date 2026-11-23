#!/usr/bin/env python3
"""
Converte todos os index.html para o padrão inline (intro inline + exercícios via fetch)
"""

import os
import re
from pathlib import Path
from bs4 import BeautifulSoup

def extrair_intro(intro_path):
    """Extrai conteúdo do intro.html"""
    if not intro_path.exists():
        return None
    
    with open(intro_path, 'r', encoding='utf-8') as f:
        return f.read().strip()

def extrair_exercicios(index_path):
    """Extrai lista de exercícios do index.html atual"""
    with open(index_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Procurar array de exercícios
    match = re.search(r"const exercises = \[(.*?)\];", content, re.DOTALL)
    if match:
        # Extrair nomes dos arquivos
        exercises_text = match.group(1)
        # Encontrar todos os 'exercicio-*.html'
        exercises = re.findall(r"'([^']+\.html)'", exercises_text)
        return exercises
    
    return []

def extrair_footer_text(index_path):
    """Extrai texto do footer"""
    with open(index_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Procurar footer
    match = re.search(r"document\.getElementById\('footer'\)\.innerHTML\s*=\s*`(.+?)`;", content, re.DOTALL)
    if match:
        return match.group(1).strip()
    
    return '<div class="page-number">PÁGINA 1</div>'

def criar_index_inline(head_content, intro_content, exercises, footer_text):
    """Cria novo index.html com intro inline"""
    
    exercises_js = ',\n            '.join([f"'{ex}'" for ex in exercises])
    
    html = f'''<!doctype html>
<html lang="pt-BR">
  <head>
{head_content}
  </head>
  <body>
    <div class="container">
      <!-- INTRO - INLINE -->{intro_content}
      
      <main>
        <ol class="exercise-list" id="exercises"></ol>
      </main>
      
      {footer_text}
    </div>

    <script>
      async function loadExercises() {{
        try {{
          const exercises = [
            {exercises_js}
          ];
          
          const list = document.getElementById('exercises');
          
          for (const file of exercises) {{
            const resp = await fetch(file);
            if (resp.ok) {{
              list.innerHTML += await resp.text();
            }}
          }}
          
          if (window.MathJax && window.MathJax.Hub) {{
            MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
          }}
        }} catch (error) {{
          console.error('Erro ao carregar exercícios:', error);
        }}
      }}
      
      loadExercises();
    </script>
  </body>
</html>'''
    
    return html

def processar_index(index_path):
    """Processa um index.html"""
    
    # Ler arquivo atual
    with open(index_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Verificar se já tem intro inline
    if 'document-header' in content and '<div id="intro"></div>' not in content:
        print(f"  ⚠️  Já tem intro inline: {index_path}")
        return True
    
    # Verificar se tem intro.html
    intro_path = index_path.parent / 'intro.html'
    if not intro_path.exists():
        print(f"  ⚠️  Não tem intro.html: {index_path}")
        return False
    
    intro_content = extrair_intro(intro_path)
    if not intro_content:
        print(f"  ⚠️  intro.html vazio: {index_path}")
        return False
    
    # Extrair exercícios
    exercises = extrair_exercicios(index_path)
    if not exercises:
        print(f"  ⚠️  Sem exercícios: {index_path}")
        return False
    
    # Extrair head
    soup = BeautifulSoup(content, 'html.parser')
    head = soup.find('head')
    if not head:
        print(f"  ❌ Sem head: {index_path}")
        return False
    
    head_content = ''
    for child in head.children:
        if hasattr(child, 'name') and child.name:
            head_content += '    ' + str(child) + '\n'
    
    # Extrair footer
    footer_text = extrair_footer_text(index_path)
    
    # Criar novo HTML
    novo_html = criar_index_inline(head_content, intro_content, exercises, footer_text)
    
    # Salvar
    with open(index_path, 'w', encoding='utf-8') as f:
        f.write(novo_html)
    
    print(f"  ✅ Convertido: {index_path} ({len(exercises)} exercícios)")
    return True

def main():
    base_dir = Path(__file__).parent
    
    print("=" * 60)
    print("CONVERSÃO PARA PADRÃO INLINE")
    print("=" * 60)
    print()
    
    convertidos = 0
    ignorados = 0
    erros = 0
    
    for capitulo in sorted(base_dir.glob('capitulo-*')):
        for topico in sorted(capitulo.glob('*/')):
            index_path = topico / 'index.html'
            
            if not index_path.exists():
                continue
            
            print(f"Processando: {topico}")
            
            try:
                if processar_index(index_path):
                    convertidos += 1
                else:
                    ignorados += 1
            except Exception as e:
                print(f"  ❌ Erro: {e}")
                erros += 1
    
    print()
    print("=" * 60)
    print("RESUMO:")
    print(f"  ✅ Convertidos: {convertidos}")
    print(f"  ⚠️  Ignorados: {ignorados}")
    print(f"  ❌ Erros: {erros}")
    print("=" * 60)

if __name__ == '__main__':
    main()
