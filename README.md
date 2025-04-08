# 🎮 KeyMatch

**KeyMatch** é uma aplicação moderna para **organização e gerenciamento de campeonatos**, com cadastro de times e jogadores, sorteio automático de chaves, pareamento de partidas e acompanhamento do avanço nas rodadas.

Desenvolvido com:

-   🧠 Laravel 12
-   ⚡ InertiaJS
-   ⚛️ ReactJS
-   💨 TailwindCSS
-   💡 Flowbite-React

---

## 🚀 Funcionalidades

-   Cadastro de times e jogadores
-   Criação automática de chaves de disputa
-   Avanço de times conforme os resultados
-   Edição dos placares das partidas com `useForm`
-   Interface gamificada e responsiva
-   Suporte a PWA (em desenvolvimento)

---

## 🧱 Tecnologias

| Tecnologia  | Versão |
| ----------- | ------ |
| Laravel     | 12.x   |
| InertiaJS   | latest |
| React       | 18+    |
| Vite        | ✅     |
| TailwindCSS | 3.x    |
| Flowbite    | latest |

---

## 🧰 Como rodar localmente

```bash
# Clonar o projeto
git clone https://github.com/seu-usuario/keymatch.git

cd keymatch

# Instalar dependências
composer install
npm install

# Criar .env
cp .env.example .env
php artisan key:generate

# Rodar as migrations
php artisan migrate --seed

# Iniciar o servidor
npm run dev
php artisan serve
```
