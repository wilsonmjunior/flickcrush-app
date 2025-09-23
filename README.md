# 🎬 FlickCrush

> **Descubra, organize e agende seus filmes favoritos**

App mobile para cinéfilos desenvolvido em React Native/Expo com integração TMDB.

## Telas

<img width="300" alt="Simulator Screenshot - iPhone 16e - 2025-09-22 at 22 30 31" src="https://github.com/user-attachments/assets/57274e09-05f3-4718-b7d1-79ba94ab19a4" />
<img width="300" alt="Simulator Screenshot - iPhone 16e - 2025-09-22 at 22 30 27" src="https://github.com/user-attachments/assets/2d2d0585-00c8-4191-83af-67df7aadb1df" />
<img width="300" alt="Simulator Screenshot - iPhone 16e - 2025-09-22 at 22 30 22" src="https://github.com/user-attachments/assets/0fa3bdd9-2c99-49d0-b788-a9bebf5fbada" />
<img width="300" alt="Simulator Screenshot - iPhone 16e - 2025-09-22 at 22 30 24" src="https://github.com/user-attachments/assets/85c8e0fa-a958-4e22-a5dc-aac864356488" />
<img width="300" alt="Simulator Screenshot - iPhone 16e - 2025-09-22 at 22 30 18" src="https://github.com/user-attachments/assets/cd6841be-2105-4cb5-bd16-d7efe0a11f2b" />
<img width="300" alt="Simulator Screenshot - iPhone 16e - 2025-09-22 at 22 30 35" src="https://github.com/user-attachments/assets/ca8f1bd9-889d-4fd9-b1d2-38437a14f006" />
<img width="300" alt="Simulator Screenshot - iPhone 16e - 2025-09-22 at 22 30 42" src="https://github.com/user-attachments/assets/a296a517-034f-4e6a-8e35-9110b73ae17b" />
<img width="300" alt="Simulator Screenshot - iPhone 16e - 2025-09-22 at 22 46 08" src="https://github.com/user-attachments/assets/7208419e-3b6e-4084-8439-ce0f90030ff2" />

## ✨ Funcionalidades

- 🎯 **Descoberta** - Filmes populares, em cartaz e próximos lançamentos
- 🔍 **Busca** - Encontre filmes por título, gênero ou ano
- ❤️ **Favoritos** - Salve seus filmes preferidos
- 👀 **Assistidos** - Marque filmes já vistos
- 📅 **Agendamento** - Organize filmes para assistir depois
- 🌙 **Temas** - Modo claro e escuro
- ⚡ **Performance** - Carregamento rápido e cache inteligente

---

## 🚀 Quick Start

### **Pré-requisitos**

- Node.js 18+
- Expo CLI
- iOS Simulator ou Android Emulator

### **Instalação**

```bash
# Clone o repositório
git clone https://github.com/wilsonmjuniorx/flickcrush.git
cd flickcrush

# Instale dependências
yarn install

# Inicie o projeto
yarn start
```

### **Executar no Dispositivo**

```bash
# iOS
yarn ios

# Android
yarn android
```

---

## 🏗️ Arquitetura

### **Stack Tecnológica**

| Tecnologia                     | Versão   | Propósito                        |
| ------------------------------ | -------- | -------------------------------- |
| **React Native**               | 0.81.4   | Framework mobile                 |
| **Expo**                       | ~54.0.9  | Plataforma de desenvolvimento    |
| **TypeScript**                 | ~5.9.2   | Tipagem estática                 |
| **Expo Router**                | ~6.0.7   | Navegação baseada em arquivos    |
| **TanStack Query**             | ^5.89.0  | Gerenciamento de estado servidor |
| **Expo SQLite**                | ~16.0.8  | Banco de dados local             |
| **React Native Unistyles**     | ^3.0.13  | Sistema de estilos responsivo    |
| **Zod**                        | ^4.1.9   | Validação de schemas             |
| **React Native Reanimated**    | ^4.1.0   | Animações nativas                |
| **Expo Image**                 | ~3.0.8   | Otimização de imagens            |
| **React Native Toast Message** | ^2.3.3   | Notificações toast               |
| **Expo Calendar**              | ~15.0.7  | Integração com calendário        |
| **Expo Notifications**         | ~0.32.11 | Notificações push                |

### **Estrutura do Projeto**

```
src/
├── app/                    # 📱 Telas (Expo Router)
│   ├── (tabs)/            # Abas principais
│   │   ├── index.tsx      # 🏠 Home
│   │   ├── browser.tsx    # 🔍 Explorar
│   │   ├── my-list.tsx    # 📋 Minha Lista
│   │   └── schedule.tsx   # 📅 Agendados
│   └── movie/[id]/        # 🎬 Detalhes do filme
│
├── components/             # 🧩 Componentes
│   ├── ui/                # Design System
│   │   ├── Button.tsx     # Botões
│   │   ├── Card.tsx       # Cards de filme
│   │   └── Text.tsx       # Textos
│   └── features/          # Componentes específicos
│       ├── movies/        # Listas de filmes
│       └── schedule/      # Agendamento
│
├── api/                   # 🌐 Integração com APIs
│   ├── queries/           # Buscar dados (TMDB)
│   └── mutations/         # Salvar dados (favoritos)
│
├── database/              # 💾 Banco local (SQLite)
│   ├── useFavoriteMoviesDatabase.ts
│   └── useScheduledMoviesDatabase.ts
│
├── hooks/                 # 🎣 Lógica reutilizável
│   ├── useMovieDetails.ts
│   └── useScheduledMovies.ts
│
└── models/                # 📋 Validação (Zod)
    ├── MovieSchema.ts
    └── FavoriteMovieSchema.ts
```

## 🎨 Sistema de Design

### **Componentes UI**

Sistema de design consistente com componentes reutilizáveis:

#### **Button**

```typescript
<Button variant="filled" type="primary" size="md" onPress={handlePress}>
  <Button.Icon>
    <MaterialCommunityIcons name="heart" size={20} />
  </Button.Icon>
  <Button.Label>Favoritar</Button.Label>
</Button>
```

#### **Text**

```typescript
<Text variant="title" size="lg" color="primary">
  Título do Filme
</Text>
```

#### **Card**

```typescript
<Card onPress={onPress}>
  <Card.Image source={{ uri: movie.poster_path }} />
  <Card.Content>
    <Text variant="title">{movie.title}</Text>
  </Card.Content>
</Card>
```

### **Temas**

- **Light Theme** - Tema claro padrão
- **Dark Theme** - Tema escuro para uso noturno
- **Auto Theme** - Alternância automática baseada no sistema

---

## 🗄️ Banco de Dados

### **SQLite Local**

- **Favoritos** - Filmes marcados como favoritos
- **Assistidos** - Histórico de filmes assistidos
- **Agendados** - Filmes agendados para assistir

### **Hooks SQLite**

```typescript
// Hook para favoritos
const { addFavorite, removeFavorite, getFavorites } = useFavoriteMoviesDatabase();

// Hook para assistidos
const { markAsWatched, getWatched } = useWatchedMoviesDatabase();

// Hook para agendados
const { scheduleMovie, getScheduled } = useScheduledMoviesDatabase();
```

### **Hooks Customizados**

```typescript
// Hook para detalhes do filme
const { movie, trailerVideos, handleWatched, handleFavorite } = useMovieDetails({ movieId });

// Hook para agendamento
const { data: scheduledMovies, scheduleMovie, unscheduleMovie } = useScheduledMovies();

// Hook para favoritos
const { addFavorite, removeFavorite, isFavorite } = useFavoriteMovie();

// Hook para assistidos
const { markAsWatched, unmarkAsWatched, isWatched } = useWatchedMovie();

// Hook para integração com calendário
const { addToCalendar, removeFromCalendar } = useCalendarIntegration();
```

---

## 🔧 Desenvolvimento

### **Scripts Disponíveis**

```bash
# Desenvolvimento
yarn start          # Inicia o Expo
yarn ios            # Executa no iOS
yarn android        # Executa no Android

# Build
yarn build          # Build de produção
yarn build:ios      # Build para iOS
yarn build:android  # Build para Android

# Qualidade
yarn lint           # Verifica código
yarn lint:fix       # Corrige problemas
yarn type-check     # Verifica tipos TypeScript
```

---

## 📱 Funcionalidades Implementadas

### **🏠 Home (Tela Principal)**

- **Filmes em Cartaz** - Carrossel com filmes atualmente em exibição
- **Próximos Lançamentos** - Lista de filmes que serão lançados em breve
- **Filmes Populares** - Ranking dos filmes mais populares
- **Últimos Lançamentos** - Filmes recém-lançados
- **Navegação por Categorias** - Acesso rápido a diferentes seções

### **🔍 Explorar**

- **Descoberta de Filmes** - Lista infinita de filmes com paginação
- **Filtros por Gênero** - Categorização por tipos de filme
- **Busca Avançada** - Pesquisa por título, gênero e ano
- **Interface Responsiva** - Adaptação para diferentes tamanhos de tela

### **📋 Minha Lista**

- **Favoritos** - Filmes marcados como favoritos
- **Assistidos** - Histórico de filmes já vistos
- **Alternância de Categorias** - Botões para alternar entre favoritos e assistidos
- **Visualização em Grid** - Layout otimizado para visualização

### **📅 Agendados**

- **Agendamento de Filmes** - Marcar filmes para assistir em data específica
- **Seleção de Data e Hora** - Interface para escolher quando assistir
- **Lista de Agendamentos** - Visualização de todos os filmes agendados
- **Integração com Calendário** - Sincronização com calendário do dispositivo
- **Estado Vazio** - Interface amigável quando não há agendamentos

### **🎬 Detalhes do Filme**

- **Header Animado** - Imagem de fundo com animações de scroll
- **Informações Completas** - Título, sinopse, gêneros, duração, avaliação
- **Trailers e Vídeos** - Reprodução de trailers do YouTube
- **Ações Rápidas** - Botões para favoritar, marcar como assistido e agendar
- **Site Oficial** - Link para página oficial do filme

### **🎨 Interface e UX**

- **Tema Escuro/Claro** - Alternância automática baseada no sistema
- **Animações Suaves** - Transições fluidas com React Native Reanimated
- **Skeleton Loading** - Estados de carregamento elegantes
- **Feedback Visual** - Toast notifications para ações do usuário
- **Navegação Intuitiva** - Expo Router com navegação baseada em arquivos
- **Design Responsivo** - Adaptação para diferentes dispositivos

---

## 🚀 Arquitetura Implementada

### **📁 Estrutura Modular**

- ✅ **Navegação por Arquivos** - Expo Router com estrutura baseada em pastas
- ✅ **Separação de Responsabilidades** - API, componentes, hooks e banco separados
- ✅ **Componentes Reutilizáveis** - Sistema de design consistente
- ✅ **Hooks Customizados** - Lógica de negócio encapsulada
- ✅ **Validação de Dados** - Schemas Zod para type safety

### **🗄️ Banco de Dados Local**

**Estrutura SQLite:**

- **Favoritos** - `useFavoriteMoviesDatabase.ts`
- **Assistidos** - `useWatchedMoviesDatabase.ts`
- **Agendados** - `useScheduledMoviesDatabase.ts`
- **Migrações** - Sistema de versionamento do banco

### **🎨 Sistema de Design**

**Componentes UI:**

- **Button** - Botões com variantes e tamanhos
- **Card** - Cards para filmes com imagens e conteúdo
- **Text** - Tipografia consistente
- **Header** - Cabeçalhos com ações
- **Input** - Campos de entrada
- **Skeleton** - Estados de carregamento

**Temas:**

- **Tema Escuro** - Cores cinematográficas
- **Tema Claro** - Interface moderna e limpa
- **Adaptativo** - Alternância automática baseada no sistema

### **🔌 Integração com APIs**

**TMDB (The Movie Database):**

- **Filmes Populares** - Lista de filmes em alta
- **Filmes em Cartaz** - Filmes atualmente em exibição
- **Próximos Lançamentos** - Filmes que serão lançados
- **Detalhes do Filme** - Informações completas
- **Trailers** - Vídeos do YouTube
- **Busca** - Pesquisa por título e filtros

**React Query:**

- **Cache Inteligente** - Otimização de requisições
- **Estados de Loading** - Feedback visual
- **Refetch Automático** - Atualização de dados
- **Mutations** - Operações de escrita

### **🧭 Navegação**

**Estrutura de Telas:**

- **Home** - Tela principal com filmes em destaque
- **Explorar** - Descoberta de filmes com filtros
- **Minha Lista** - Favoritos e assistidos
- **Agendados** - Filmes agendados para assistir
- **Detalhes** - Página individual do filme
- **Busca** - Tela de pesquisa avançada

**Navegação por Abas:**

- **Material Icons** - Ícones consistentes
- **Tema Adaptativo** - Cores que seguem o tema
- **Badges** - Indicadores de estado
- **Animações** - Transições suaves

---

## 📚 Documentação

- **`README.md`** - Documentação principal do projeto (este arquivo)
- **Código Comentado** - Documentação inline no código
- **TypeScript** - Tipagem para melhor documentação

---

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---
