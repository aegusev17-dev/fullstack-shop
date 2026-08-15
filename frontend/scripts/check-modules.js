#!/usr/bin/env node

import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { checkAllModules } from '../src/utils/moduleChecker.js';

import { checkModulesNode } from '../src/utils/moduleChecker.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔍 Модуль-чекер для проекта Shop');
console.log('═'.repeat(50));

// Запускаем проверку
checkAllModules().catch(console.error);
checkModulesNode().catch(console.error);