# Rosário Vivo

> Plataforma espiritual católica para acompanhar a prática diária do Rosário, aprender os Mistérios e crescer na oração.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10-red?logo=nestjs)](https://nestjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green?logo=mongodb)](https://www.mongodb.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue?logo=docker)](https://www.docker.com/)
[![PWA](https://img.shields.io/badge/PWA-Enabled-purple?logo=pwa)](https://web.dev/progressive-web-apps/)

---

## Missão

**Rosário Vivo existe para ajudar católicos a rezar o Rosário fielmente, aprender seus mistérios profundamente e viver uma vida diária de oração e caridade em comunhão com a Igreja Universal.**

> "Nunca se perderá quem rezar o Rosário todos os dias. Esta é uma afirmação que assinavaria com meu sangue."  
> — **São Luís de Montfort**

> "O Rosário é a 'arma' para estes tempos."  
> — **São Padre Pio**

---

## ✨ O que está disponível

### Oração & Acompanhamento
- **Check-in diário** — registre sua oração com seleção de Mistério, intenções e reflexão
- **Histórico pessoal** — calendário semanal e linha do tempo das orações realizadas
- **Sequência (streak)** — acompanhamento da consistência de oração
- **Mistérios do dia** — rotação automática (Joyful/Sorrowful/Glorious/Luminous) com referências bíblicas

### Conteúdo & Formação
- **Como Rezar** — guia passo a passo completo
- **Orações Tradicionais** — textos completos (Ave Maria, Pai Nosso, Glória, Salve Rainha e mais)
- **Ensinamentos** — biblioteca com Escritura, Teologia, História, Maria, Sacramentos, Santos e Orações
- **Caminhos de Aprendizado** — trilhas Iniciante, Intermediário e Avançado com lições progressivas
- **Biblioteca de Recursos** — documentos papais, escritos de santos e links úteis
- **Ferramentas** — calculadora de novena e contador de terço

### Design & Experiência
- Tema **dark/light** com persistência — "Cathedral Night" e "Sacred Cream"
- Design system: glassmorfismo sagrado, dourado metálico, Cinzel + Manrope
- PWA instalável (service worker + manifest)
- Totalmente responsivo — mobile-first

---

## 🗂 Estrutura do Projeto

```
rosario-vivo/
├── frontend/               # Next.js 16 (App Router)
│   ├── src/
│   │   ├── app/            # Páginas e rotas
│   │   │   ├── dashboard/        # Painel do usuário
│   │   │   ├── ensinamentos/     # Biblioteca de conteúdo
│   │   │   ├── misterios-do-dia/ # Mistérios diários
│   │   │   ├── oracoes-tradicionais/
│   │   │   ├── como-rezar/
│   │   │   ├── recursos/
│   │   │   └── ferramentas/
│   │   ├── components/     # Componentes reutilizáveis
│   │   ├── providers/      # AuthProvider, ThemeProvider, QueryProvider
│   │   ├── services/       # API client + mock data (localStorage)
│   │   ├── hooks/          # use-rosary, use-toast
│   │   └── types/
│   └── Dockerfile
│
├── backend/                # NestJS 10
│   ├── src/modules/
│   │   ├── auth/           # JWT + Passport
│   │   ├── users/          # Perfis de usuário
│   │   ├── checkins/       # Registro de orações
│   │   └── prayers/        # Intenções de oração
│   └── Dockerfile
│
├── docker-compose.yml      # Dev local (full stack)
├── docker-compose.prod.yml # Produção
└── pnpm-workspace.yaml     # Monorepo
```

---

## 🚀 Início Rápido

### Pré-requisitos
- Node.js 20+
- pnpm 10+
- Docker & Docker Compose

### 1. Instalar dependências

```bash
pnpm install
```

### 2. Rodar ambiente completo (recomendado)

```bash
pnpm dev
```

Ou separadamente:

```bash
# Terminal 1 — Backend + MongoDB
docker-compose up -d mongodb
pnpm dev:backend

# Terminal 2 — Frontend
pnpm dev:frontend
```

### 3. Acessar

| Serviço  | URL                          |
|----------|------------------------------|
| Frontend | http://localhost:3000        |
| API      | http://localhost:3001/api    |
| Swagger  | http://localhost:3001/api/docs |

> **Nota MVP**: `AUTH_DISABLED=true` está ativo no frontend — todas as funcionalidades estão liberadas sem necessidade de login. Para ativar o fluxo de autenticação completo, altere o flag em `src/providers/auth-provider.tsx`.

---

## 🐳 Docker

```bash
# Dev local (full stack)
pnpm docker:dev

# Produção
pnpm docker:prod
```

---

## ☁️ Deploy com Coolify

1. Crie um recurso **Docker Compose** no Coolify
2. Aponte para `docker-compose.prod.yml`
3. Configure as variáveis de ambiente
4. Configure os domínios:

| Serviço  | Domínio              | Porta |
|----------|----------------------|-------|
| Frontend | seudominio.com       | 3000  |
| Backend  | api.seudominio.com   | 3001  |

### Variáveis de Ambiente Necessárias

```env
# MongoDB
MONGO_ROOT_USER=rosary_admin
MONGO_ROOT_PASSWORD=<senha-segura>

# Auth
JWT_SECRET=<segredo-min-32-caracteres>

# URLs
FRONTEND_URL=https://seudominio.com
NEXT_PUBLIC_API_URL=https://api.seudominio.com/api
```

> ⚠️ Nunca comite arquivos `.env`. Use senhas fortes em produção.

---

## 📡 API Reference

### Autenticação
| Método | Endpoint              | Descrição       |
|--------|-----------------------|-----------------|
| POST   | `/api/auth/register`  | Criar conta     |
| POST   | `/api/auth/login`     | Login           |

### Check-ins
| Método | Endpoint                    | Descrição             |
|--------|-----------------------------|-----------------------|
| POST   | `/api/checkins`             | Registrar oração      |
| GET    | `/api/checkins/today`       | Check-in de hoje      |
| GET    | `/api/checkins/my`          | Histórico pessoal     |
| GET    | `/api/checkins/feed`        | Feed da comunidade    |
| POST   | `/api/checkins/:id/amen`    | Toggle Amém           |

### Intenções de Oração
| Método | Endpoint                      | Descrição            |
|--------|-------------------------------|----------------------|
| POST   | `/api/prayers`                | Criar intenção       |
| GET    | `/api/prayers`                | Listar intenções     |
| POST   | `/api/prayers/:id/pray`       | Marcar que rezou     |
| POST   | `/api/prayers/:id/answered`   | Marcar como atendida |

### Usuário
| Método | Endpoint              | Descrição          |
|--------|-----------------------|--------------------|
| GET    | `/api/users/me`       | Perfil             |
| PUT    | `/api/users/me`       | Atualizar perfil   |
| GET    | `/api/users/me/stats` | Estatísticas       |

---

## 🛠 Stack Tecnológica

| Camada         | Tecnologia                                        |
|----------------|---------------------------------------------------|
| **Frontend**   | Next.js 16, TypeScript, Tailwind CSS, Radix UI    |
| **Estado**     | TanStack Query v5, localStorage (MVP)             |
| **Backend**    | NestJS 10, Mongoose, Passport JWT, Swagger        |
| **Banco**      | MongoDB 7                                         |
| **Deploy**     | Docker, Coolify                                   |
| **PWA**        | next-pwa, Workbox                                 |

---

## 🗺 Roadmap

### MVP — Em andamento (`feat/frontend-mvp`)
- [x] Check-in diário com seleção de Mistério e intenções
- [x] Dashboard com histórico pessoal e calendário semanal
- [x] Biblioteca completa de ensinamentos (7 temas + 3 trilhas)
- [x] Orações tradicionais e guia de oração
- [x] Design system: glassmorfismo, tema dark/light, animações
- [x] PWA instalável
- [x] Feature flag `AUTH_DISABLED` para MVP sem login

### Próximas fases
- [ ] Autenticação completa (registro, login, perfil)
- [ ] Persitência em backend (substituir localStorage)
- [ ] Feed da comunidade e intenções compartilhadas
- [ ] Guia interativo de oração com timer e passos
- [ ] Diário de reflexões espirituais
- [ ] Notificações push de lembrete
- [ ] Modo offline completo
- [ ] Animação do terço durante a oração

---

## 📖 Fontes de Conteúdo

Todo conteúdo religioso é baseado em fontes oficiais:

- **Santa Sé (Vaticano)**: [vatican.va/special/rosary](https://www.vatican.va/special/rosary/)
- **Rosarium Virginis Mariae** — Papa São João Paulo II (16 de outubro de 2002)
- **Catecismo da Igreja Católica** — §971, §2678
- **CNBB** — traduções para o português brasileiro

---

## 📄 Licença

MIT © 2026 Rosário Vivo
