# Futebol de Botão — Documento de Design

Definições da fase de concepção do jogo. Este documento cobre **o que** o jogo é e
**quais regras** ele segue — não cobre arquitetura de código nem implementação.

## 1. Visão geral

Jogo de futebol de botão para a web. Visão de cima (top-down), simples e direto.
O objetivo é recriar a sensação do futebol de botão de mesa: mirar, dar o toque e
ver os botões deslizarem e colidirem até tudo parar.

## 2. Modos de jogo

- **2 jogadores local** — duas pessoas no mesmo computador, alternando a vez.
- **vs Computador** — partida contra uma IA.

Roda 100% no frontend (sem servidor / sem multiplayer online nesta fase).

## 3. Controle

- **Arrasta-e-solta (estilingue)**: o jogador puxa o botão para trás com o
  mouse/dedo e solta. O gesto define **direção** e **força** de uma só vez.
- A força tem um teto máximo (limite no tamanho do arraste).
- Funciona em desktop (mouse) e mobile (toque).

## 4. Times e botões

- **7 botões por time**: 6 de linha + 1 goleiro.
- O **goleiro** só pode se mover dentro da sua área.

## 5. Regras de turno

- **1 toque por vez**: o jogador joga um único botão por jogada.
- **Fim da jogada**: a vez termina quando todos os botões e a bola param de se mover.
- **Toque extra**: se o botão jogado encostar na bola, o mesmo jogador joga de novo.
  Se não tocar a bola, a vez passa ao adversário.

## 6. Condição de vitória

- **Primeiro a X gols** vence a partida.
- Valor padrão: **5 gols** (ajustável).

## 7. Tecnologia

- **Vite + React 19 + TypeScript** (base do projeto).
- **Canvas 2D** para renderização.
- **Física caseira**: círculos com colisão elástica e atrito.

## 8. Fora de escopo (por agora)

- Multiplayer online (pela internet, com salas/servidor).
- Regras oficiais completas (impedimento, faltas, laterais detalhados).
- Sons e efeitos sonoros.
