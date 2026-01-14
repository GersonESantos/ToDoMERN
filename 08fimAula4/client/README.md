# React + Vite

# Gerenciador de Tarefas Fullstack (MERN)

# Visão Geral
O Gerenciador de Tarefas baseado em nuvem é um aplicativo web projetado para otimizar o gerenciamento de tarefas em equipe. Construído com a pilha MERN (MongoDB, Express.js, React e Node.js), esta plataforma oferece uma interface amigável para atribuição, acompanhamento e colaboração eficientes de tarefas. O aplicativo atende tanto administradores quanto usuários comuns, oferecendo recursos abrangentes para aumentar a produtividade e a organização.

### Por que/Problema?

Em um ambiente de trabalho dinâmico, o gerenciamento eficaz de tarefas é crucial para o sucesso da equipe. Os métodos tradicionais de acompanhamento de tarefas por meio de planilhas ou sistemas manuais podem ser complexos e propensos a erros. O Gerenciador de Tarefas baseado em nuvem visa solucionar esses desafios, fornecendo uma plataforma centralizada para gerenciamento de tarefas, permitindo colaboração integrada e maior eficiência do fluxo de trabalho.

### **Contexto**:
Com o aumento do trabalho remoto e de equipes dispersas, há uma crescente necessidade de ferramentas que facilitem a comunicação eficaz e a coordenação de tarefas. O Gerenciador de Tarefas baseado em nuvem atende a essa necessidade, aproveitando tecnologias web modernas para criar uma solução de gerenciamento de tarefas intuitiva e responsiva. A pilha MERN garante escalabilidade, enquanto a integração do Redux Toolkit, Headless UI e Tailwind CSS aprimora a experiência do usuário e o desempenho.

###
## **Recursos do Administrador:**

1. **Gerenciamento de Usuários:**

- Criar contas de administrador.

- Adicionar e gerenciar membros da equipe.

2. **Atribuição de Tarefas:**

- Atribuir tarefas a um ou mais usuários.

- Atualizar detalhes e status das tarefas.

3. **Propriedades das Tarefas:**

- Marcar tarefas como a fazer, em andamento ou concluídas.

- Atribuir níveis de prioridade (alta, média, normal, baixa).

- Adicionar e gerenciar subtarefas.

4. **Gerenciamento de Recursos:**

- Fazer upload de recursos para as tarefas, como imagens.

5. **Controle de Contas de Usuário:**

- Desativar ou ativar contas de usuário.

- Excluir tarefas permanentemente ou movê-las para a lixeira.

## **Recursos do Usuário:**

1. **Interação com Tarefas:**

- Alterar o status da tarefa (em andamento ou concluída).

- Visualize informações detalhadas da tarefa.

2. **Comunicação:**

- Adicione comentários ou converse sobre as atividades da tarefa.

## **Recursos Gerais:**

1. **Autenticação e Autorização:**

- Login do usuário com autenticação segura.

- Controle de acesso baseado em funções.

2. **Gerenciamento de Perfis:**

- Atualize perfis de usuário.

3. **Gerenciamento de Senhas:**

- Altere senhas com segurança.

4. **Painel de Controle:**

- Forneça um resumo das atividades do usuário.

- Filtre tarefas em a fazer, em andamento ou concluídas.

## **Tecnologias Utilizadas:**

- **Frontend:**

- React (Vite)

- Redux Toolkit para gerenciamento de estado

- Interface Headless

- Tailwind CSS

- **Backend:**

- Node.js com Express.js

- **Banco de Dados:**

- MongoDB para armazenamento de dados eficiente e escalável.

O Gerenciador de Tarefas baseado em Nuvem é uma solução inovadora que traz eficiência e organização ao gerenciamento de tarefas em equipes. Ao aproveitar o poder da pilha MERN e tecnologias modernas de front-end, a plataforma proporciona uma experiência perfeita tanto para administradores quanto para usuários, promovendo colaboração e produtividade.

&nbsp;

## INSTRUÇÕES DE CONFIGURAÇÃO

# Configuração do Servidor

## Variáveis ​​de ambiente
Primeiro, crie o arquivo de variáveis ​​de ambiente `.env` na pasta do servidor. O arquivo `.env` contém as seguintes variáveis ​​de ambiente:

- MONGODB_URI = `sua URL do MongoDB`
- JWT_SECRET = `qualquer chave secreta - deve ser protegida`
- PORT = `8800` ou qualquer número de porta
- NODE_ENV = `development`

&nbsp;

## Configurar o MongoDB:

1. A configuração do MongoDB envolve algumas etapas:

- Acesse o site do MongoDB Atlas

- Acesse o site do MongoDB Atlas: [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas).

- Crie uma conta

- Faça login na sua conta do MongoDB Atlas.

- Crie um novo cluster

- Escolha um provedor de nuvem e uma região

- Configure as definições do cluster

- Crie o cluster

- Aguarde a implantação do cluster

- Crie um usuário do banco de dados

- Configure a lista de IPs permitidos

- Conecte-se ao cluster

- Configure sua aplicação

- Teste a conexão

2. Crie um novo banco de dados e configure o arquivo `.env` com a URL de conexão do MongoDB.

## Etapas para executar o servidor

1. Abra o projeto em qualquer editor de sua preferência.

2. Navegue até o diretório do servidor com o comando `cd server`.

3. Execute `npm i` ou `npm install` para instalar os pacotes.

4. Execute `npm start` para iniciar o servidor.

Se configurado corretamente, você deverá ver uma mensagem indicando que o servidor está em execução com sucesso e que o banco de dados está conectado.




# Configuração do Lado do Cliente

## Variáveis ​​de Ambiente
Primeiro, crie o arquivo de variáveis ​​de ambiente `.env` na pasta do cliente. O arquivo `.env` contém as seguintes variáveis ​​de ambiente:

- VITE_APP_BASE_URL = `http://localhost:8800` #Observação: Altere a porta 8800 para o número da sua porta.

- VITE_APP_FIREBASE_API_KEY = `Chave da API do Firebase`

## Etapas para executar o cliente

1. Navegue até o diretório do cliente com `cd client`.

2. Execute `npm i` ou `npm install` para instalar os pacotes.

3. Execute `npm start` para executar o aplicativo em `http://localhost:8800`.