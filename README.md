# 🎬 FlickCrush

> **Descubra, organize e agende seus filmes favoritos**

App mobile para cinéfilos desenvolvido em React Native/Expo com integração TMDB.

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

### **Estrutura (Feature-Based)**

```
src/
├── shared/ # Código compartilhado
│ ├── components/ui/ # Sistema de design
│ ├── components/common/ # Componentes comuns
│ ├── hooks/ # Hooks compartilhados
│ └── utils/ # Utilitários globais
├── features/ # Features do app
│ ├── movies/ # Feature de filmes
│ │ ├── components/ # Componentes específicos
│ │ ├── hooks/ # Hooks específicos
│ │ ├── services/ # Serviços de API
│ │ └── database/ # Banco local (SQLite)
│ ├── search/ # Feature de busca
│ ├── discover/ # Feature de descoberta
│ ├── schedule/ # Feature de agendamento
│ └── favorites/ # Feature de favoritos
├── core/ # Funcionalidades core
│ ├── api/ # Configuração de API
│ ├── database/ # Configuração de banco
│ └── theme/ # Sistema de temas
└── assets/ # Assets estáticos
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
const { addFavorite, removeFavorite, getFavorites } = useFavoriteMovies();

// Hook para assistidos
const { markAsWatched, getWatched } = useWatchedMovies();

// Hook para agendados
const { scheduleMovie, getScheduled } = useScheduledMovies();
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

## 📱 Funcionalidades Detalhadas

### **Descoberta de Filmes**

- Lista de filmes populares com paginação
- Filmes em cartaz nos cinemas
- Próximos lançamentos
- Filtros por gênero e ano
- Busca em tempo real

### **Gerenciamento Pessoal**

- Adicionar/remover favoritos
- Marcar filmes como assistidos
- Agendar filmes para assistir
- Histórico de visualização
- Sincronização com calendário

### **Interface e UX**

- Design responsivo
- Animações suaves
- Skeleton loading
- Feedback visual
- Navegação intuitiva

---

## 🚀 Melhorias Implementadas

### **Estrutura Feature-Based**

- ✅ **Organização** - Componentes agrupados por feature
- ✅ **Manutenibilidade** - Mudanças isoladas por feature
- ✅ **Escalabilidade** - Fácil adição de novas features
- ✅ **Separação** - Schemas de API vs banco local
- ✅ **Hooks SQLite** - Organizados por funcionalidade

### **Hooks SQLite Organizados**

**Hooks Globais:**

```
core/database/hooks/
├── useDatabase.ts         # Hook base para SQLite
├── useMigrations.ts       # Hook para migrações
└── index.ts
```

**Hooks por Feature:**

```
features/movies/database/hooks/
├── useFavoriteMovies.ts   # Hooks para favoritos
├── useWatchedMovies.ts    # Hooks para assistidos
└── index.ts

features/schedule/database/hooks/
├── useScheduledMovies.ts  # Hooks para agendados
└── index.ts
```

---

## 📚 Documentação

- **`ESTRUTURA_FEATURE_BASED.md`** - Proposta de arquitetura feature-based
- **`README.md`** - Documentação principal do projeto (este arquivo)

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
