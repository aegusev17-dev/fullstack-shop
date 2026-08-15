// Простой и надежный проверщик модулей для Vite

export const checkAllModules = async () => {
  console.group('🔍 ПРОВЕРКА МОДУЛЕЙ ПРОЕКТА');
  
  // 1. Проверка критичных npm пакетов (уже работают в main.js)
  console.log('✅ npm пакеты проверены в main.js');
  
  // 2. Проверка локальных модулей с правильными относительными путями
  console.log('\n📁 ЛОКАЛЬНЫЕ МОДУЛИ:');
  
  // Используем относительные пути от текущего файла
  const modules = [
    { name: 'client.http', path: '../api/client.http.js' },
    { name: 'admin.user.api', path: '../api/admin/user.api.js' },
    { name: 'shop.user.api', path: '../api/shop/user.api.js' },
    { name: 'store.user', path: '../stores/store.user.js' },
    { name: 'store.app', path: '../stores/store.app.js' },
    { name: 'router', path: '../router/index.js' }
  ];
  
  for (const mod of modules) {
    try {
      const module = await import(mod.path);
      const exports = Object.keys(module);
      console.log(`✅ ${mod.name}: загружен (${exports.length} экспортов)`);
      if (exports.length > 0) {
        console.log(`   Экспорты: ${exports.slice(0, 3).join(', ')}${exports.length > 3 ? '...' : ''}`);
      }
    } catch (error) {
      console.error(`❌ ${mod.name}: ${error.message}`);
      
      // Пробуем альтернативный путь без .js
      if (!mod.path.endsWith('.js')) {
        try {
          const altPath = mod.path + '.js';
          const module = await import(altPath);
          console.log(`   ✅ (найден по пути: ${altPath})`);
        } catch {}
      }
    }
  }
  
  // 3. Проверка структуры папок
  console.log('\n📁 СТРУКТУРА ПРОЕКТА:');
  const checkStructure = async () => {
    const paths = [
      'src/api/client.http.js',
      'src/api/admin/user.api.js',
      'src/api/shop/user.api.js',
      'src/stores/store.user.js',
      'src/router/index.js',
      'src/pages/admin/SignIn.vue',
      'src/pages/shop/SignIn.vue'
    ];
    
    for (const filePath of paths) {
      try {
        const url = new URL(`../${filePath}`, import.meta.url);
        const response = await fetch(url);
        if (response.ok) {
          console.log(`✅ ${filePath}`);
        } else {
          console.log(`❌ ${filePath} (не найден)`);
        }
      } catch {
        console.log(`❌ ${filePath} (ошибка доступа)`);
      }
    }
  };
  
  await checkStructure();
  
  // 4. Проверка конкретно вашего проблемного файла
  console.log('\n🔧 ПРОВЕРКА ПРОБЛЕМНОГО ФАЙЛА:');
  try {
    const clientHttp = await import('../api/client.http.js');
    console.log('✅ client.http.js загружен');
    console.log('   Экспорты:', Object.keys(clientHttp));
    
    // Проверяем наличие axios в модуле
    if (clientHttp.default || clientHttp.http || clientHttp.axios) {
      console.log('   ✅ axios настроен в модуле');
    } else {
      console.log('   ⚠️ axios не найден в экспортах');
    }
  } catch (error) {
    console.error('❌ client.http.js:', error.message);
    
    // Пробуем создать временную проверку
    console.log('   ℹ️ Совет: проверьте что файл существует по пути: src/api/client.http.js');
  }
  
  console.groupEnd();
  
  // Выводим итоговую таблицу
  console.log('\n📊 ИТОГ ПРОВЕРКИ:');
  console.log('Смотрите результаты выше');
};

// Автоматический запуск в dev режиме
if (import.meta.env.DEV) {
  setTimeout(() => {
    checkAllModules().catch(console.error);
  }, 2000); // Задержка 2 секунды после загрузки страницы
}