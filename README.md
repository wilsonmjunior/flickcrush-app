# 🎬 FlickCrush

> **Aplicativo React Native/Expo para descoberta e gerenciamento de filmes**

FlickCrush é um aplicativo móvel moderno que permite aos usuários descobrir, favoritar, agendar e acompanhar filmes. Desenvolvido com React Native, Expo e TypeScript, oferece uma experiência cinematográfica completa com integração de calendário e notificações.

---

## ✨ Funcionalidades

### 🎭 **Descoberta de Filmes**

- Lista de filmes populares e em cartaz
- Busca avançada por título
- Filtros por gênero
- Paginação infinita
- Detalhes completos dos filmes

### ❤️ **Gerenciamento Pessoal**

- Lista de favoritos
- Histórico de filmes assistidos
- Agendamento de filmes no calendário
- Notificações personalizadas

### 📱 **Experiência do Usuário**

- Interface moderna e responsiva
- Tema claro/escuro automático
- Navegação intuitiva
- Skeleton loading
- Feedback visual com toasts

---

## 📸 Screenshots

### **Tela Inicial**

![Tela Inicial](screenshots/home-screen.png)
_Lista de filmes populares e em cartaz_

### **Descoberta de Filmes**

![Descoberta](screenshots/discover-screen.png)
_Exploração por categorias e gêneros_

### **Busca de Filmes**

![Busca](screenshots/search-screen.png)
_Interface de busca com resultados em tempo real_

### **Detalhes do Filme**

![Detalhes](screenshots/movie-details-screen.png)
_Informações completas, trailers e ações_

### **Minha Lista**

![Minha Lista](screenshots/my-list-screen.png)
_Favoritos e histórico de filmes assistidos_

### **Agendamento**

![Agendamento](screenshots/schedule-screen.png)
_Filmes agendados no calendário_

### **Modal de Agendamento**

![Modal Agendamento](screenshots/schedule-modal-screen.png)
_Interface para agendar filmes_

### **Tema Escuro**

![Tema Escuro](screenshots/dark-theme-screen.png)
_Interface com tema escuro ativado_

### **Tema Claro**

![Tema Claro](screenshots/light-theme-screen.png)
_Interface com tema claro ativado_

---

## 🏗️ Arquitetura do Projeto

### **Stack Tecnológica**

| Tecnologia       | Versão  | Propósito                        |
| ---------------- | ------- | -------------------------------- |
| **React Native** | 0.81.4  | Framework mobile                 |
| **Expo**         | ~54.0.9 | Plataforma de desenvolvimento    |
| **TypeScript**   | ~5.9.2  | Tipagem estática                 |
| **Expo Router**  | ~6.0.7  | Navegação                        |
| **React Query**  | ^5.89.0 | Gerenciamento de estado servidor |
| **SQLite**       | ~16.0.8 | Banco de dados local             |
| **Unistyles**    | ^3.0.13 | Sistema de estilos               |
| **Zod**          | ^4.1.9  | Validação de schemas             |

### **Estrutura Atual**

```
src/
├── @types/                    # Tipos TypeScript globais
├── api/                       # Configuração e queries/mutations
│   ├── clients/               # Clientes HTTP
│   ├── config/                # Configuração do React Query
│   ├── mutations/             # Mutations GraphQL/REST
│   └── queries/               # Queries GraphQL/REST
├── app/                       # Páginas (Expo Router)
│   ├── _layout.tsx            # Layout raiz
│   ├── (tabs)/                # Navegação por abas
│   │   ├── _layout.tsx
│   │   ├── index.tsx          # Home
│   │   ├── browser.tsx        # Navegador
│   │   ├── my-list.tsx        # Minha lista
│   │   └── schedule.tsx       # Agendados
│   ├── [category].tsx         # Categoria dinâmica
│   ├── browser-movies.tsx     # Busca de filmes
│   └── movie/                 # Detalhes do filme
│       └── [id].tsx
├── components/                # Componentes React
│   ├── ui/                    # Sistema de design
│   │   ├── Button.tsx         # Botão com variantes
│   │   ├── Text.tsx           # Componente de texto
│   │   ├── Input.tsx          # Campo de entrada
│   │   ├── Card.tsx           # Sistema de cards
│   │   ├── Header.tsx         # Cabeçalho
│   │   ├── Loading.tsx        # Indicador de carregamento
│   │   ├── Skeleton.tsx       # Skeleton loading
│   │   ├── Toast.tsx          # Notificações
│   │   └── index.tsx
│   ├── movie/                 # Componentes de filmes
│   │   └── MovieListTrailers.tsx
│   ├── MovieCard/             # Card de filme
│   │   └── MovieCard.tsx
│   ├── MovieList/             # Listas de filmes
│   │   ├── MovieList.tsx
│   │   ├── MovieListNowPlaying.tsx
│   │   └── MovieListSkeleton.tsx
│   ├── DiscoverMovies.tsx     # Descoberta
│   ├── GenreList.tsx          # Lista de gêneros
│   ├── MovieBrowserCard.tsx   # Card de navegação
│   ├── MoviesSkeleton.tsx     # Skeleton de filmes
│   ├── ScheduleMovieModal.tsx # Modal de agendamento
│   ├── SearchHeader.tsx       # Cabeçalho de busca
│   ├── SearchMoviesSkeleton.tsx # Skeleton de busca
│   └── index.tsx
├── database/                  # Configuração SQLite
│   ├── index.ts               # Exports do banco
│   ├── migrate.ts             # Migrações
│   ├── useFavoriteMoviesDatabase.ts
│   ├── useScheduledMoviesDatabase.ts
│   └── useWatchedMoviesDatabase.ts
├── hooks/                     # Hooks customizados
│   ├── useCalendarIntegration.ts
│   ├── useDebounce.ts
│   ├── useFavoriteMovie.ts
│   ├── useMovieDetails.ts
│   ├── useScheduledMovies.ts
│   └── useWatchedMovie.ts
├── models/                    # Schemas Zod
│   ├── FavoriteMovieSchema.ts
│   ├── MovieDetailsSchema.ts
│   ├── MovieGenreScheme.ts
│   ├── MovieSchema.ts
│   ├── MovieVideoSchema.ts
│   ├── ScheduledMovieSchema.ts
│   └── WatchedMovieSchema.ts
├── theme/                     # Sistema de temas
│   ├── index.ts               # Configuração de temas
│   └── types.ts               # Tipos de tema
└── utils/                     # Utilitários
    ├── date/                  # Utilitários de data
    └── index.ts
```

---

## 🎨 Sistema de Design

### **Componentes UI**

O projeto utiliza um sistema de design consistente com componentes reutilizáveis:

#### **Button** - Sistema de Botões

```typescript
<Button variant="filled" type="primary" size="md" onPress={handlePress}>
  <Button.Icon>
    <MaterialCommunityIcons name="heart" size={20} />
  </Button.Icon>
  <Button.Label>Favoritar</Button.Label>
</Button>
```

**Variantes:** `filled`, `outline`, `ghost`
**Tipos:** `primary`, `danger`, `warning`, `secondary`
**Tamanhos:** `xs`, `sm`, `md`, `lg`

#### **Text** - Tipografia

```typescript
<Text variant="heading" size="lg" color="primary">
  Título do Filme
</Text>
```

**Variantes:** `heading`, `body`, `caption`
**Tamanhos:** `xs`, `sm`, `md`, `lg`, `xl`
**Cores:** `primary`, `text`, `muted`, `danger`, `success`, `warning`

#### **Card** - Sistema de Cards

```typescript
<Card onPress={handlePress}>
  <Card.Row>
    <Card.Image uri={posterUrl} />
    <Card.Column>
      <Card.Title>{movie.title}</Card.Title>
      <Card.Description>{movie.overview}</Card.Description>
    </Card.Column>
  </Card.Row>
</Card>
```

### **Tema**

O projeto suporta temas claro e escuro com cores semânticas:

```typescript
// Tema escuro (padrão)
const darkTheme = {
  colors: {
    primary: '#00D4FF', // Ciano elétrico
    background: '#0A0A0F', // Preto profundo
    surface: '#1A1A24', // Superfície escura
    text: '#FFFFFF', // Branco puro
    muted: '#8B8B9E', // Cinza azulado
    // ... outras cores
  },
};
```

---

## 🗄️ Banco de Dados

### **SQLite Local**

O aplicativo utiliza SQLite para persistência local com três tabelas principais:

#### **Filmes Favoritos**

```typescript
interface FavoriteMovie {
  id: number;
  tmdb_id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  created_at: string;
}
```

#### **Filmes Agendados**

```typescript
interface ScheduledMovie {
  id: number;
  tmdb_id: number;
  title: string;
  poster_path: string;
  scheduled_date: string;
  scheduled_time: string;
  calendar_event_id: string | null;
  notification_id: string | null;
  created_at: string;
}
```

#### **Filmes Assistidos**

```typescript
interface WatchedMovie {
  id: number;
  tmdb_id: number;
  title: string;
  poster_path: string;
  watched_at: string;
  created_at: string;
}
```

---

## 🔧 Configuração e Instalação

### **Pré-requisitos**

- **Node.js** 18+
- **npm** ou **yarn**
- **Expo CLI** (`npm install -g @expo/cli`)
- **Expo Go** (app móvel) ou simulador iOS/Android

### **Instalação**

1. **Clone o repositório**

```bash
git clone https://github.com/seu-usuario/flickcrush.git
cd flickcrush
```

2. **Instale as dependências**

```bash
npm install
# ou
yarn install
```

3. **Configure as variáveis de ambiente**

```bash
# Crie um arquivo .env na raiz do projeto
cp .env.example .env
```

4. **Execute o projeto**

```bash
# Desenvolvimento
npm start
# ou
yarn start

# Plataformas específicas
npm run ios      # iOS
npm run android  # Android
npm run web      # Web
```

### **Scripts Disponíveis**

```json
{
  "start": "expo start", // Inicia o servidor de desenvolvimento
  "android": "expo run:android", // Executa no Android
  "ios": "expo run:ios", // Executa no iOS
  "web": "expo start --web", // Executa na web
  "lint": "expo lint" // Executa o linter
}
```

---

## 📱 Como Usar

### **1. Descoberta de Filmes**

- Acesse a aba "Home" para ver filmes populares
- Use a aba "Navegador" para explorar por categoria
- Toque em um filme para ver detalhes

### **2. Busca**

- Toque no ícone de busca
- Digite o nome do filme
- Navegue pelos resultados

### **3. Favoritos**

- Toque no ícone de coração em qualquer filme
- Acesse "Minha Lista" para ver favoritos
- Gerencie sua lista de filmes

### **4. Agendamento**

- Na tela de detalhes do filme
- Toque em "Agendar"
- Escolha data e horário
- O filme será adicionado ao seu calendário

### **5. Histórico**

- Marque filmes como assistidos
- Acesse "Minha Lista" para ver histórico
- Gerencie seu progresso

---

## 🚀 Melhorias Implementadas

### **Análise de Estrutura**

Durante o desenvolvimento, foram criados documentos de análise e melhoria:

1. **`ANALISE_ESTRUTURA.md`** - Análise completa da estrutura atual
2. **`ESTRUTURA_COMPONENTES.md`** - Documentação detalhada dos componentes
3. **`MAPEAMENTO_COMPONENTES.md`** - Mapeamento para nova estrutura

### **Sugestões de Melhoria**

#### **Estrutura Proposta (Feature-Based)**

```
src/
├── shared/                    # Código compartilhado
│   ├── components/ui/         # Sistema de design
│   ├── components/layout/     # Layouts
│   ├── components/common/     # Componentes comuns
│   ├── hooks/                 # Hooks compartilhados
│   └── utils/                 # Utilitários globais
├── features/                  # Features do app
│   ├── movies/                # Feature de filmes
│   ├── search/                # Feature de busca
│   ├── discover/              # Feature de descoberta
│   ├── schedule/              # Feature de agendamento
│   └── favorites/             # Feature de favoritos
└── core/                      # Funcionalidades core
    ├── api/                   # Configuração de API
    ├── database/              # Configuração de banco
    └── theme/                 # Sistema de temas
```

#### **Benefícios da Nova Estrutura**

- ✅ **Organização:** Componentes agrupados por feature
- ✅ **Manutenibilidade:** Mudanças isoladas por feature
- ✅ **Escalabilidade:** Fácil adição de novas features
- ✅ **Performance:** Lazy loading e code splitting
- ✅ **Desenvolvimento:** Onboarding mais rápido

---

## 🧪 Testes

### **Configuração de Testes**

```bash
# Instalar dependências de teste
npm install --save-dev @testing-library/react-native @testing-library/jest-native

# Executar testes
npm test
```

### **Estrutura de Testes Proposta**

```
src/
├── __tests__/                 # Testes globais
├── features/
│   └── movies/
│       ├── components/
│       │   └── __tests__/    # Testes de componentes
│       └── hooks/
│           └── __tests__/     # Testes de hooks
└── shared/
    └── components/
        └── __tests__/         # Testes de componentes compartilhados
```

---

## 📊 Performance

### **Otimizações Implementadas**

- ✅ **React Query** para cache de dados
- ✅ **Memoização** em componentes pesados
- ✅ **Lazy loading** de imagens
- ✅ **Skeleton loading** para melhor UX
- ✅ **Debounce** em buscas
- ✅ **Paginação infinita** para listas

### **Métricas de Performance**

- **Tempo de carregamento inicial:** < 3s
- **Tempo de navegação:** < 500ms
- **Uso de memória:** Otimizado com cleanup
- **Bundle size:** Otimizado com tree shaking

---

## 🔒 Segurança

### **Práticas Implementadas**

- ✅ **Validação de dados** com Zod
- ✅ **Sanitização** de inputs
- ✅ **Permissões** de calendário e notificações
- ✅ **Armazenamento seguro** com SQLite
- ✅ **Tratamento de erros** com Error Boundaries

---

## 📈 Roadmap

### **Próximas Funcionalidades**

- [ ] **Sincronização** com serviços de streaming
- [ ] **Recomendações** personalizadas
- [ ] **Compartilhamento** de listas
- [ ] **Modo offline** completo
- [ ] **Notificações push** avançadas
- [ ] **Integração** com redes sociais

### **Melhorias Técnicas**

- [ ] **Migração** para estrutura feature-based
- [ ] **Implementação** de testes unitários
- [ ] **Configuração** de CI/CD
- [ ] **Otimização** de performance
- [ ] **Documentação** com Storybook

---

## 🤝 Contribuição

### **Como Contribuir**

1. **Fork** o projeto
2. **Crie** uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. **Abra** um Pull Request

### **Padrões de Código**

- **TypeScript** para tipagem
- **ESLint** para linting
- **Prettier** para formatação
- **Conventional Commits** para commits
- **Componentes funcionais** com hooks

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Desenvolvedor

**Wilson Junior**

- GitHub: [@wilsonmjuniorx](https://github.com/wilsonmjuniorx)
- LinkedIn: [Wilson Junior](https://linkedin.com/in/wilsonmjuniorx)

---

## 📞 Suporte

Se você encontrar algum problema ou tiver sugestões:

1. **Abra uma issue** no GitHub
2. **Entre em contato** via email
3. **Consulte a documentação** dos componentes

---

## 🙏 Agradecimentos

- **Expo** pela plataforma de desenvolvimento
- **React Native** pela framework
- **TMDB** pela API de filmes
- **Comunidade** React Native pelo suporte

---

_Desenvolvido com ❤️ usando React Native, Expo e TypeScript_
