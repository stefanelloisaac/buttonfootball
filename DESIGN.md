---
name: Futebol de Botão
description: Nostalgia de mesa de feltro e madeira com lustro digital moderno.
---

<!-- SEED: re-run /impeccable document once there's code (CSS tokens, styled components) to capture the actual tokens and components. -->

# Design System: Futebol de Botão

## 1. Overview

**Creative North Star: "A Mesa de Domingo"**

O sistema visual recria a mesa de futebol de botão montada numa tarde de domingo:
o feltro tensionado que domina o campo, a madeira que emoldura, e o brilho discreto
de uma taça de latão sobre o aparador. É nostálgico sem ser empoeirado — a memória
afetiva do jogo físico (Subbuteo, mesa de botão real, troféu de latão) entregue com
o acabamento limpo e fluido de uma interface digital de 2026. A cor de feltro carrega
a tela; tudo o mais (HUD, menu) emoldura o campo e nunca compete com ele.

A personalidade é **nostálgica, artística e acolhedora**: charme manual, não kitsch.
O calor vem do material (feltro, madeira) e da tipografia, não de gradientes
decorativos. O sistema rejeita explicitamente a estética de cassino/apostas, o
dashboard SaaS genérico, o infantil/cartoon e o realismo 3D de estádio. Se a tela
parece um app de apostas esportivas — verde-neon, odds piscando, dourado berrante —
está errada.

**Key Characteristics:**

- Feltro como protagonista (cor committed, 30–60% da superfície).
- Madeira como moldura; latão como acento raro e nobre.
- Serifa de caráter nos títulos, sans limpa no corpo e no HUD.
- Movimento responsivo: feedback de toque e transições, sem coreografia exagerada.
- Times distinguíveis por forma e rótulo, nunca só por cor.

## 2. Colors

Paleta committed ancorada no feltro de mesa, emoldurada por madeira, com latão como
único acento de celebração. `[valores hex/oklch a resolver na implementação]`

### Primary

- **Feltro de Mesa** `[a resolver: verde de feltro ou bordo, oklch]`: a cor do campo;
  domina a superfície de jogo. É o palco — o protagonista cromático do sistema.

### Secondary

- **Madeira de Moldura** `[a resolver: castanho amadeirado, oklch]`: bordas do campo,
  molduras de painel, chrome do menu. Aquece e contém o feltro.

### Tertiary

- **Latão de Taça** `[a resolver: dourado-latão dessaturado, oklch]`: acento de
  celebração (gol, vitória, destaque da vez). Nobre e raro — nunca berrante.

### Neutral

- **Marfim de Linha** `[a resolver: off-white levemente quente, oklch]`: linhas do
  campo, texto sobre feltro/madeira, rótulos do HUD.
- **Tinta de Madeira** `[a resolver: castanho muito escuro, quase preto, oklch]`:
  texto principal, contornos, profundidade.

### Named Rules

**A Regra do Feltro Protagonista.** O feltro carrega a tela; madeira e marfim apenas
o emolduram. Nenhuma cor de UI compete com o campo em saturação.

**A Regra do Latão Raro.** O latão aparece em ≤ 10% de qualquer tela e só em momentos
de mérito (gol, vitória, vez ativa). Sua raridade é o que o torna nobre.

## 3. Typography

**Display Font:** `[serifa de caráter a escolher na implementação]` (com fallback `Georgia, serif`)
**Body Font:** `[sans limpa a escolher na implementação]` (com fallback `system-ui, sans-serif`)
**Label/Mono Font:** mesma sans do corpo, em peso/tracking distinto para o placar.

**Character:** uma serifa com ar de placa de troféu antiga nos títulos, contra uma
sans neutra e altamente legível no corpo e no HUD — o contraste clássico/moderno que
traduz "nostalgia com acabamento". `[pares de fontes a definir na implementação]`

### Hierarchy

- **Display** (título de tela / "Futebol de Botão"): serifa, peso alto, `[escala a definir]`.
- **Headline** (títulos de seção do menu): serifa ou sans pesada, `[a definir]`.
- **Title** (rótulos de grupo, nome de modo): sans, peso médio, `[a definir]`.
- **Body** (instruções, descrições): sans, regular; comprimento de linha 65–75ch.
- **Label** (placar, "Vez:", botões): sans, peso médio; números tabulares no placar.

### Named Rules

**A Regra do Placar Tabular.** Números do placar usam alinhamento tabular (largura
fixa), para não "dançar" quando os gols mudam.

## 4. Elevation

Sistema majoritariamente **plano com camadas tonais**, condizente com a energia de
movimento responsiva (não coreografada). Profundidade vem da moldura de madeira e de
sombras sutis e ambientes — nunca de glassmorphism ou sombras dramáticas. A mesa é
chapada e firme; o que se eleva é o que responde a estado.

### Named Rules

**A Regra do Plano em Repouso.** Superfícies são planas em repouso. Sombra só aparece
como resposta a estado (hover, vez ativa, botão pressionável).

## 5. Components

> Seed: ainda não há biblioteca de componentes estilizada (UI em stubs). As diretrizes
> abaixo são prescrições para a implementação, não extrações. Re-rodar `document` após
> estilizar para capturar tokens reais e gerar o sidecar `.impeccable/design.json`.

### Buttons

- **Caráter:** táteis e confiantes, como apertar um botão físico de mesa.
- **Shape:** cantos suavemente arredondados `[raio a definir]`.
- **Primary:** ação principal do menu (Iniciar) em latão ou madeira `[a resolver]`.
- **Hover / Focus:** leve elevação + foco visível com anel de alto contraste.

### Cards / Containers

- Evitar cards por reflexo. Painéis do menu são molduras de madeira, não cards SaaS.
- **Sem nested cards. Sem side-stripe borders.**

### Navigation

- Menu simples: escolher modo (local / vs CPU) e dificuldade. Estado selecionado
  reforçado por forma/rótulo, não só por cor.

### HUD (Signature Component)

- Placar + indicador de vez emoldurando o campo, em marfim sobre madeira.
- Números tabulares; a vez ativa destacada com latão (acento raro) + reforço de forma.

## 6. Do's and Don'ts

### Do:

- **Do** deixar o feltro carregar a tela (30–60% da superfície); UI emoldura, não compete.
- **Do** usar latão como acento raro (≤ 10%), só em gol/vitória/vez ativa.
- **Do** distinguir times (home/away) e goleiro por **forma e rótulo além da cor** (daltonismo).
- **Do** respeitar `prefers-reduced-motion`: toda animação tem alternativa crossfade/instantânea.
- **Do** garantir contraste WCAG AA (texto ≥ 4.5:1; texto grande ≥ 3:1), inclusive sobre feltro.
- **Do** usar números tabulares no placar.

### Don't:

- **Don't** cair na estética de **cassino/apostas**: verde-neon, dourado berrante, odds piscando, "aposte agora".
- **Don't** virar **dashboard SaaS genérico**: grids de cards idênticos, gradientes decorativos, hero-metric template, eyebrows minúsculos em maiúsculas sobre cada seção.
- **Don't** usar estética **infantil/cartoon** (mascotes, cores de doce) nem **realismo 3D de estádio**.
- **Don't** usar **gradient text** (`background-clip: text`) nem **glassmorphism** decorativo.
- **Don't** usar **side-stripe borders** (`border-left` colorido > 1px) em painéis, listas ou alertas.
- **Don't** deixar texto cinza-claro sobre feltro/madeira tingido; manter contraste real, não "elegância" ilegível.
