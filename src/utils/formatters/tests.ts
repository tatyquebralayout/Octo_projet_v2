/**
 * Exemplos de uso das funções de formatação e validação
 * 
 * Este arquivo não é para ser executado diretamente, mas serve como
 * documentação e exemplos para os utilitários de formatação e validação.
 * 
 * @module utils/formatters/tests
 */

import * as formatters from './index';

/**
 * Testes de formatação de strings
 */
function testStrings() {
  // Teste de normalização de strings
  console.log(formatters.normalizeString('Olá Mundo!')); // 'Ola Mundo'
  
  // Teste de capitalização
  console.log(formatters.capitalize('nome completo')); // 'Nome completo'
  
  // Teste de formatação para título
  console.log(formatters.titleCase('olá mundo')); // 'Olá Mundo'
  
  // Teste de truncamento
  console.log(formatters.truncate('Este é um texto muito longo', 10)); // 'Este é um...'
  
  // Teste de remoção de espaços extras
  console.log(formatters.removeExtraSpaces('  texto  com   espaços  ')); // 'texto com espaços'
  
  // Teste de formatação de nome para exibição
  console.log(formatters.formatDisplayName('João Silva dos Santos')); // 'João Santos'
  
  // Teste de formatação de iniciais
  console.log(formatters.formatInitials('João Silva')); // 'JS'
  
  // Teste de geração de slug
  console.log(formatters.slugify('Olá Mundo!')); // 'ola-mundo'
  
  // Teste de mascaramento de string
  console.log(formatters.maskString('email@example.com', 2, 4)); // 'em**********m.com'
}

/**
 * Testes de formatação de números
 */
function testNumbers() {
  // Teste de formatação de moeda
  console.log(formatters.formatCurrency(1234.56)); // 'R$ 1.234,56'
  console.log(formatters.formatCurrency(1234.56, { showSymbol: false })); // '1.234,56'
  
  // Teste de formatação de número
  console.log(formatters.formatNumber(1234567.89, 2)); // '1.234.567,89'
  
  // Teste de formatação de porcentagem
  console.log(formatters.formatPercent(0.1234)); // '12,34%'
  
  // Teste de arredondamento
  console.log(formatters.roundNumber(1.2345, 2)); // 1.23
  
  // Teste de conversão de moeda para número
  console.log(formatters.parseCurrency('R$ 1.234,56')); // 1234.56
  
  // Teste de conversão de string para número
  console.log(formatters.parseNumber('1.234,56')); // 1234.56
  
  // Teste de limitação de valor
  console.log(formatters.clamp(150, 0, 100)); // 100
  
  // Teste de verificação de número válido
  console.log(formatters.isValidNumber('123')); // true
  console.log(formatters.isValidNumber('abc')); // false
  
  // Teste de formatação de telefone
  console.log(formatters.formatPhone('11999887766')); // '(11) 99988-7766'
  
  // Teste de formatação de CEP
  console.log(formatters.formatCEP('12345678')); // '12345-678'
}

/**
 * Testes de formatação de datas
 */
function testDates() {
  const testDate = new Date(2023, 0, 31, 14, 30, 0);
  
  // Teste de formatação de data
  console.log(formatters.formatDate(testDate)); // '31/01/2023'
  
  // Teste de formatação de data e hora
  console.log(formatters.formatDateTime(testDate)); // '31/01/2023 14:30'
  console.log(formatters.formatDateTime(testDate, { showSeconds: true })); // '31/01/2023 14:30:00'
  
  // Teste de formatação de data relativa
  console.log(formatters.formatRelativeDate(new Date())); // 'Hoje'
  
  // Teste de conversão de string para data
  console.log(formatters.parseDate('31/01/2023')?.toISOString()); // 2023-01-31T03:00:00.000Z
  
  // Teste de adição de dias
  console.log(formatters.formatDate(formatters.addDays(testDate, 1))); // '01/02/2023'
  
  // Teste de verificação de dias iguais
  console.log(formatters.isSameDay(testDate, new Date(2023, 0, 31, 10, 0, 0))); // true
  
  // Teste de cálculo de diferença de dias
  console.log(formatters.getDaysDifference(testDate, new Date(2023, 1, 5))); // 5
  
  // Teste de formatação de duração
  console.log(formatters.formatDuration(90)); // '1h 30min'
  
  // Teste de formatação para ISO
  console.log(formatters.formatISODate(testDate)); // '2023-01-31'
  console.log(formatters.formatISODateTime(testDate)); // '2023-01-31T17:30:00.000Z'
}

/**
 * Testes de sanitização
 */
function testSanitization() {
  // Teste de sanitização de HTML
  console.log(formatters.sanitizeHTML('<script>alert("teste")</script>')); // 'alert("teste")'
  
  // Teste de sanitização para SQL
  console.log(formatters.sanitizeSQL("'; DROP TABLE users; --")); // ' DROP TABLE users '
  
  // Teste de sanitização para URL
  console.log(formatters.sanitizeURLParam('teste & mais')); // 'teste%20%26%20mais'
  
  // Teste de extração de dígitos
  console.log(formatters.digitsOnly('(11) 99999-9999')); // '11999999999'
  
  // Teste de remoção de caracteres especiais
  console.log(formatters.removeSpecialChars('Teste: 123!')); // 'Teste 123'
  
  // Teste de sanitização de nome
  console.log(formatters.sanitizeName('João123')); // 'João'
  
  // Teste de sanitização de atributos HTML
  console.log(formatters.sanitizeHTMLAttribute('alert("teste")')); // 'alert(&quot;teste&quot;)'
  
  // Teste de sanitização de objeto
  console.log(formatters.sanitizeObject({
    name: '<script>alert("teste")</script>',
    age: 30
  })); // { name: 'alert("teste")', age: 30 }
  
  // Teste de sanitização de array
  console.log(formatters.sanitizeArray(['<script>alert(1)</script>', 'texto normal'])); // ['alert(1)', 'texto normal']
  
  // Teste de sanitização de dados de formulário
  console.log(formatters.sanitizeFormData({
    name: '<b>Nome</b>',
    email: 'email@example.com',
    message: '<script>alert("teste")</script>'
  })); // { name: 'Nome', email: 'email@example.com', message: 'alert("teste")' }
}

/**
 * Testes de validação
 */
function testValidation() {
  // Teste de validação de email
  console.log(formatters.isValidEmail('usuario@dominio.com')); // { isValid: true }
  console.log(formatters.isValidEmail('invalid-email')); // { isValid: false, message: '...' }
  
  // Teste de validação de CPF
  console.log(formatters.isValidCPF('529.982.247-25')); // { isValid: true } (CPF fictício)
  console.log(formatters.isValidCPF('123.456.789-09')); // { isValid: false, message: '...' }
  
  // Teste de validação de CNPJ
  console.log(formatters.isValidCNPJ('63.149.992/0001-29')); // { isValid: true } (CNPJ fictício)
  console.log(formatters.isValidCNPJ('12.345.678/0001-90')); // { isValid: false, message: '...' }
  
  // Teste de validação de telefone
  console.log(formatters.isValidPhone('(11) 99999-9999')); // { isValid: true }
  console.log(formatters.isValidPhone('1234')); // { isValid: false, message: '...' }
  
  // Teste de validação de CEP
  console.log(formatters.isValidCEP('12345-678')); // { isValid: true }
  console.log(formatters.isValidCEP('123')); // { isValid: false, message: '...' }
  
  // Teste de validação de URL
  console.log(formatters.isValidURL('https://www.example.com')); // { isValid: true }
  console.log(formatters.isValidURL('invalid-url')); // { isValid: false, message: '...' }
  
  // Teste de validação de data
  console.log(formatters.isValidDate('31/12/2023')); // { isValid: true }
  console.log(formatters.isValidDate('31/02/2023')); // { isValid: false, message: '...' }
  
  // Teste de validação de faixa
  console.log(formatters.isInRange(15, 10, 20)); // { isValid: true }
  console.log(formatters.isInRange(25, 10, 20)); // { isValid: false, message: '...' }
  
  // Teste de validação de comprimento
  console.log(formatters.isLengthValid('teste', 3, 10)); // { isValid: true }
  console.log(formatters.isLengthValid('teste', 6, 10)); // { isValid: false, message: '...' }
  
  // Teste de validação de padrão
  console.log(formatters.matchesPattern('ABC123', /^[A-Z]{3}\d{3}$/)); // { isValid: true }
  console.log(formatters.matchesPattern('abc123', /^[A-Z]{3}\d{3}$/)); // { isValid: false, message: '...' }
  
  // Teste de validação de senha forte
  console.log(formatters.isStrongPassword('Abc123!@#')); // { isValid: true }
  console.log(formatters.isStrongPassword('abc123')); // { isValid: false, message: '...' }
  
  // Teste de validação de objeto
  const userValidation = {
    email: formatters.isValidEmail,
    phone: formatters.isValidPhone
  };
  
  console.log(formatters.validateObject(
    { email: 'test@example.com', phone: '(11) 99999-9999' },
    userValidation
  )); // { email: { isValid: true }, phone: { isValid: true } }
  
  // Teste de verificação de objeto válido
  console.log(formatters.isObjectValid({
    email: { isValid: true },
    phone: { isValid: true }
  })); // true
}

/**
 * Testes de transformadores
 */
function testTransformers() {
  // Teste de preparação de dados para API
  console.log(formatters.prepareDataForAPI({
    name: 'João',
    email: '<script>alert("teste")</script>',
    date: new Date(2023, 0, 31),
    empty: ''
  })); // { name: 'João', email: 'alert("teste")', date: '2023-01-31T03:00:00.000Z', empty: null }
  
  // Teste de processamento de resposta de API
  console.log(formatters.processAPIResponse({
    user: {
      name: 'João',
      birthDate: '2023-01-31T00:00:00.000Z'
    },
    createdAt: '2023-02-01T10:30:00.000Z'
  })); // { user: { name: 'João', birthDate: Date }, createdAt: Date }
  
  // Teste de conversão para FormData
  const formData = formatters.objectToFormData({
    name: 'João',
    age: 30,
    address: {
      street: 'Rua Exemplo',
      number: 123
    }
  });
  console.log(Array.from(formData.entries())); // [['name', 'João'], ['age', '30'], ['address[street]', 'Rua Exemplo'], ['address[number]', '123']]
  
  // Teste de conversão para query string
  console.log(formatters.objectToQueryString({
    name: 'João',
    filter: ['a', 'b'],
    page: 1,
    date: new Date(2023, 0, 31)
  })); // 'name=Jo%C3%A3o&filter=a&filter=b&page=1&date=2023-01-31'
  
  // Teste de parse de query string
  console.log(formatters.parseQueryString('name=Jo%C3%A3o&filter=a&filter=b&page=1'));
  // { name: 'João', filter: ['a', 'b'], page: '1' }
  
  // Teste de formatação para tabela
  console.log(formatters.formatTableData(
    [{ id: 1, name: 'João', age: 30 }],
    { name: 'Nome', age: 'Idade' }
  )); // [{ Nome: 'João', Idade: 30 }]
  
  // Teste de agrupamento
  console.log(formatters.groupBy(
    [
      { type: 'A', value: 1 },
      { type: 'B', value: 2 },
      { type: 'A', value: 3 }
    ],
    'type'
  )); // { A: [{ type: 'A', value: 1 }, { type: 'A', value: 3 }], B: [{ type: 'B', value: 2 }] }
}

/**
 * Função principal para executar todos os testes
 */
export function runAllTests() {
  console.log('=== Testando utilitários de formatação de strings ===');
  testStrings();
  
  console.log('\n=== Testando utilitários de formatação de números ===');
  testNumbers();
  
  console.log('\n=== Testando utilitários de formatação de datas ===');
  testDates();
  
  console.log('\n=== Testando utilitários de sanitização ===');
  testSanitization();
  
  console.log('\n=== Testando utilitários de validação ===');
  testValidation();
  
  console.log('\n=== Testando utilitários de transformação ===');
  testTransformers();
}

// Não executa automaticamente os testes
// Para executar, chame runAllTests() manualmente 