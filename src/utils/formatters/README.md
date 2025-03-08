# Utilitários de Formatação e Validação

Este módulo fornece um conjunto completo de utilitários para formatação, validação, sanitização e transformação de dados no frontend.

## Recursos Principais

- 🧹 **Sanitização de dados de entrada** para segurança
- 📊 **Formatação de datas, números e valores monetários**
- ✅ **Validação de formatos comuns** (email, telefone, CPF/CNPJ)
- 🔄 **Normalização de strings**
- 🧩 **Transformação de estruturas de dados** complexas
- 📝 **Funções para parsing de respostas de API**

## Instalação

Não é necessária instalação adicional, o módulo já está incluído no projeto.

## Uso

```typescript
// Importe os utilitários necessários
import { 
  formatCurrency, 
  isValidEmail, 
  sanitizeHTML, 
  prepareDataForAPI 
} from '@/utils/formatters';

// Exemplos de uso
const formattedValue = formatCurrency(1234.56); // 'R$ 1.234,56'
const emailValidation = isValidEmail('user@example.com'); // { isValid: true }
const cleanHtml = sanitizeHTML('<script>alert("teste")</script>'); // 'alert("teste")'

// Preparando dados para API
const apiData = prepareDataForAPI({
  name: 'Nome do usuário',
  date: new Date(),
  html: '<b>Texto</b>'
});
```

## Módulos

### Strings (`strings.ts`)

Funções para manipulação e formatação de strings.

| Função | Descrição | Exemplo |
|--------|-----------|---------|
| `normalizeString(text)` | Remove acentos e caracteres especiais | `normalizeString('Olá Mundo!') → 'Ola Mundo'` |
| `capitalize(text)` | Capitaliza a primeira letra | `capitalize('nome') → 'Nome'` |
| `titleCase(text)` | Formata como título | `titleCase('olá mundo') → 'Olá Mundo'` |
| `truncate(text, maxLength, suffix)` | Trunca texto | `truncate('texto longo', 5) → 'texto...'` |
| `removeExtraSpaces(text)` | Remove espaços extras | `removeExtraSpaces('  texto  ') → 'texto'` |
| `formatDisplayName(fullName)` | Formata nome para exibição | `formatDisplayName('João Silva Santos') → 'João Santos'` |
| `formatInitials(fullName)` | Obtém iniciais | `formatInitials('João Silva') → 'JS'` |
| `slugify(text)` | Gera slug para URL | `slugify('Olá Mundo!') → 'ola-mundo'` |
| `maskString(text, start, end, char)` | Mascara texto | `maskString('123456', 2, 2) → '12**56'` |

### Números (`numbers.ts`)

Funções para formatação e manipulação de números.

| Função | Descrição | Exemplo |
|--------|-----------|---------|
| `formatCurrency(value, options)` | Formata para moeda | `formatCurrency(1234.56) → 'R$ 1.234,56'` |
| `formatNumber(value, decimals)` | Formata números | `formatNumber(1234.56, 1) → '1.234,6'` |
| `formatPercent(value, decimals)` | Formata porcentagem | `formatPercent(0.25) → '25,00%'` |
| `roundNumber(value, decimals)` | Arredonda número | `roundNumber(1.2345, 2) → 1.23` |
| `parseCurrency(value)` | Converte moeda para número | `parseCurrency('R$ 1.234,56') → 1234.56` |
| `parseNumber(value)` | Converte string para número | `parseNumber('1.234,56') → 1234.56` |
| `clamp(value, min, max)` | Limita um valor | `clamp(150, 0, 100) → 100` |
| `isValidNumber(value)` | Verifica se é número válido | `isValidNumber('123') → true` |
| `formatPhone(phone)` | Formata telefone | `formatPhone('11999887766') → '(11) 99988-7766'` |
| `formatCEP(cep)` | Formata CEP | `formatCEP('12345678') → '12345-678'` |

### Datas (`dates.ts`)

Funções para formatação e manipulação de datas.

| Função | Descrição | Exemplo |
|--------|-----------|---------|
| `formatDate(date)` | Formata data (PT-BR) | `formatDate(new Date('2023-01-31')) → '31/01/2023'` |
| `formatDateTime(date, options)` | Formata data e hora | `formatDateTime(new Date('2023-01-31T14:30')) → '31/01/2023 14:30'` |
| `formatRelativeDate(date)` | Formata data relativa | `formatRelativeDate(hoje) → 'Hoje'` |
| `parseDate(dateStr)` | Converte string para Date | `parseDate('31/01/2023') → Date` |
| `addDays(date, days)` | Adiciona dias | `addDays(new Date(), 1) → amanhã` |
| `isSameDay(date1, date2)` | Verifica se é mesmo dia | `isSameDay(date1, date2) → true/false` |
| `getDaysDifference(start, end)` | Calcula diferença em dias | `getDaysDifference(date1, date2) → 5` |
| `formatDuration(minutes)` | Formata duração | `formatDuration(90) → '1h 30min'` |
| `formatISODate(date)` | Formata para ISO | `formatISODate(date) → '2023-01-31'` |
| `formatISODateTime(date)` | Formata para ISO com hora | `formatISODateTime(date) → '2023-01-31T14:30:00.000Z'` |

### Sanitização (`sanitize.ts`)

Funções para limpar e sanitizar dados de entrada.

| Função | Descrição | Exemplo |
|--------|-----------|---------|
| `sanitizeHTML(html)` | Remove HTML perigoso | `sanitizeHTML('<script>alert(1)</script>') → 'alert(1)'` |
| `sanitizeSQL(value)` | Remove caracteres SQL perigosos | `sanitizeSQL("'; DROP TABLE") → ' DROP TABLE'` |
| `sanitizeURLParam(value)` | Sanitiza para URL | `sanitizeURLParam('a & b') → 'a%20%26%20b'` |
| `digitsOnly(value)` | Remove não-dígitos | `digitsOnly('(11) 9999-9999') → '11999999999'` |
| `removeSpecialChars(value)` | Remove caracteres especiais | `removeSpecialChars('a@b!c') → 'abc'` |
| `sanitizeName(name)` | Sanitiza um nome | `sanitizeName('João123') → 'João'` |
| `sanitizeHTMLAttribute(value)` | Sanitiza para atributo HTML | `sanitizeHTMLAttribute('<>"') → '&lt;&gt;&quot;'` |
| `sanitizeObject(data)` | Sanitiza objeto completo | `sanitizeObject({name: '<script>x</script>'}) → {name: 'x'}` |
| `sanitizeArray(values)` | Sanitiza array | `sanitizeArray(['<b>a</b>']) → ['a']` |
| `sanitizeFormData(formData)` | Sanitiza dados de formulário | `sanitizeFormData({...})` |

### Validação (`validation.ts`)

Funções para validação de dados.

| Função | Descrição | Exemplo |
|--------|-----------|---------|
| `isValidEmail(email)` | Valida email | `isValidEmail('user@example.com') → {isValid: true}` |
| `isValidCPF(cpf)` | Valida CPF | `isValidCPF('123.456.789-09') → {isValid: false}` |
| `isValidCNPJ(cnpj)` | Valida CNPJ | `isValidCNPJ('12.345.678/0001-90') → {isValid: false}` |
| `isValidPhone(phone)` | Valida telefone | `isValidPhone('(11) 99999-9999') → {isValid: true}` |
| `isValidCEP(cep)` | Valida CEP | `isValidCEP('12345-678') → {isValid: true}` |
| `isValidURL(url)` | Valida URL | `isValidURL('https://example.com') → {isValid: true}` |
| `isValidDate(date)` | Valida data | `isValidDate('31/01/2023') → {isValid: true}` |
| `isInRange(value, min, max)` | Valida faixa | `isInRange(15, 10, 20) → {isValid: true}` |
| `isLengthValid(value, min, max)` | Valida comprimento | `isLengthValid('abc', 2, 5) → {isValid: true}` |
| `matchesPattern(value, pattern)` | Valida padrão | `matchesPattern('A1', /^[A-Z]\d$/) → {isValid: true}` |
| `isStrongPassword(password)` | Valida senha forte | `isStrongPassword('Abc123!@') → {isValid: true}` |
| `validateObject(data, schema)` | Valida objeto | `validateObject({...}, {...}) → {field: {isValid: true}}` |
| `isObjectValid(validationResults)` | Verifica se objeto é válido | `isObjectValid({...}) → true/false` |

### Transformadores (`transformers.ts`)

Funções para transformação de estruturas de dados.

| Função | Descrição | Exemplo |
|--------|-----------|---------|
| `prepareDataForAPI(data, options)` | Prepara dados para API | `prepareDataForAPI({...})` |
| `processAPIResponse(data)` | Processa resposta da API | `processAPIResponse({...})` |
| `objectToFormData(data)` | Converte para FormData | `objectToFormData({...})` |
| `objectToQueryString(params)` | Converte para query string | `objectToQueryString({...}) → 'a=1&b=2'` |
| `parseQueryString(queryString)` | Parseia query string | `parseQueryString('a=1&b=2') → {a: '1', b: '2'}` |
| `formatTableData(data, fields)` | Formata dados para tabela | `formatTableData([...], {...})` |
| `groupBy(array, key)` | Agrupa por campo | `groupBy([...], 'type') → {A: [...], B: [...]}` |

## Exemplos Avançados

Veja o arquivo `tests.ts` para exemplos completos de uso de cada função.

## Contribuição

Para adicionar novas funções ou melhorar as existentes:

1. Adicione a função no arquivo apropriado
2. Documente adequadamente com JSDoc
3. Utilize tipagem estrita do TypeScript
4. Inclua testes e exemplos
5. Exporte a função no arquivo `index.ts` 