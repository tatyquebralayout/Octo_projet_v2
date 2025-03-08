/**
 * Script para compilar tokens do design system para uso com Tailwind CSS
 * 
 * Este script:
 * 1. Compila os arquivos TypeScript em JS
 * 2. Gera um arquivo combinado tailwind-tokens.js
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminhos para os diretórios
const srcTokensDir = path.resolve(__dirname, '../src/design-system/tokens');
const outputDir = path.resolve(__dirname, '..');
const tempDir = path.join(outputDir, 'temp-tokens');
const outputFile = path.join(outputDir, 'tailwind-tokens.js');

// Função para extrair e combinar tokens a partir de arquivos TypeScript
async function buildTokens() {
  try {
    console.log('🔄 Iniciando compilação de tokens do design system...');
    
    // Criar diretório temporário se não existir
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
    
    // Ler todos os arquivos de tokens disponíveis
    const tokenFiles = fs.readdirSync(srcTokensDir)
      .filter(file => file.endsWith('.ts') && !file.includes('.test.') && file !== 'index.ts');
    
    console.log(`Encontrados ${tokenFiles.length} arquivos de tokens para processamento`);
    
    // Gerar um arquivo de saída simplificado com importações diretas
    let outputContent = `/**
 * Arquivo de tokens gerado automaticamente
 * NÃO EDITE MANUALMENTE
 */

// Tokens importados diretamente dos arquivos originais
`;

    // Adicionar importações para cada arquivo de token
    tokenFiles.forEach(file => {
      const tokenName = path.basename(file, '.ts');
      // Substituir traços por underscores em nomes de variáveis
      const safeVarName = tokenName.replace(/-/g, '_');
      outputContent += `const ${safeVarName} = require('./src/design-system/tokens/${tokenName}');\n`;
    });
    
    // Adicionar exportação combinada
    outputContent += `\nmodule.exports = {\n`;
    tokenFiles.forEach(file => {
      const tokenName = path.basename(file, '.ts');
      // Usar o mesmo nome sanitizado para a exportação
      const safeVarName = tokenName.replace(/-/g, '_');
      // Usar notação de objeto para preservar o nome original do token
      outputContent += `  "${tokenName}": ${safeVarName},\n`;
    });
    outputContent += `};\n`;
    
    // Escrever o arquivo combinado
    fs.writeFileSync(outputFile, outputContent);
    console.log(`✅ Arquivo de tokens gerado: ${outputFile}`);
    
    return true;
  } catch (error) {
    console.error(`❌ Erro durante a compilação dos tokens: ${error.message}`);
    return false;
  }
}

// Executar a função principal
buildTokens(); 