const puppeteer = require('puppeteer');
const path = require('path');

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const baseDir = 'C:\\Users\\Oscar\\.gemini\\antigravity\\brain\\642d13dd-5d13-434f-bf91-8a399cfb6814\\';
const screenshotLogin = path.join(baseDir, 'screenshot_login.png');
const screenshotGameplay = path.join(baseDir, 'screenshot_gameplay.png');
const screenshotDossies = path.join(baseDir, 'screenshot_dossies.png');
const screenshotBaixas = path.join(baseDir, 'screenshot_baixas.png');
const screenshotError = path.join(baseDir, 'screenshot_error.png');

(async () => {
  console.log('🚀 Iniciando teste de usabilidade com Puppeteer...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: { width: 375, height: 812, isMobile: true, hasTouch: true }
  });

  const page = await browser.newPage();
  
  try {
    console.log('🔗 Conectando ao servidor local (http://localhost:3000)...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
    
    // Captura tela inicial de autenticação
    console.log(`📸 Salvando captura da tela inicial em: ${screenshotLogin}`);
    await page.screenshot({ path: screenshotLogin });

    console.log('🏠 Detectando se estamos na home page...');
    const startBtn = await page.$('#btn-open-terminal');
    if (startBtn) {
      console.log('⚡ Clicando no botão "Acessar Terminal Operacional" para entrar no portal de acesso...');
      await startBtn.click();
      await delay(800);
    }

    console.log('🕵️ Localizando botão de acesso anônimo...');
    const buttonSelector = 'button';
    const buttons = await page.$$(buttonSelector);
    let anonymousButton = null;
    
    for (const btn of buttons) {
      const text = await page.evaluate(el => el.textContent, btn);
      if (text.includes('Entrar Anonimamente') || text.includes('Modo Teste')) {
        anonymousButton = btn;
        break;
      }
    }
    
    if (!anonymousButton) {
      throw new Error('Botão de login anônimo não foi encontrado.');
    }
    
    console.log('🎯 Clicando no login anônimo e aguardando inicialização do jogo...');
    await anonymousButton.click();
    
    // Espera o jogo carregar
    await page.waitForSelector('.tension-header', { timeout: 10000 });
    console.log('✅ Jogo inicializado com sucesso!');
    
    // Captura tela de gameplay ativa com a nova carta
    console.log(`📸 Salvando captura do gameplay em: ${screenshotGameplay}`);
    await page.screenshot({ path: screenshotGameplay });

    const cardText = await page.$eval('.card-text', el => el.textContent);
    const cardName = await page.$eval('.card-name', el => el.textContent);
    console.log(`🎴 Carta Ativa: [${cardName}] - "${cardText}"`);
    
    console.log('👉 Simulando Swipe para a DIREITA (Concordar)...');
    const cardElement = await page.$('.game-card');
    const boundingBox = await cardElement.boundingBox();
    
    const startX = boundingBox.x + boundingBox.width / 2;
    const startY = boundingBox.y + boundingBox.height / 2;
    
    await page.mouse.move(startX, startY);
    await page.mouse.down();
    
    for (let offset = 0; offset <= 150; offset += 15) {
      await page.mouse.move(startX + offset, startY);
      await delay(20);
    }
    
    await page.mouse.up();
    console.log('✅ Swipe concluído.');
    await delay(1500);
    
    const cardTextAfter = await page.$eval('.card-text', el => el.textContent);
    const cardNameAfter = await page.$eval('.card-name', el => el.textContent);
    console.log(`🎴 Nova Carta Ativa: [${cardNameAfter}] - "${cardTextAfter}"`);
    
    console.log('📂 Abrindo o painel "Arquivos do Caso"...');
    await page.click('.btn-archives');
    await delay(500);
    
    const isDrawerOpen = await page.evaluate(() => {
      const drawer = document.querySelector('.drawer-content');
      return drawer && drawer.classList.contains('drawer-active');
    });
    
    if (isDrawerOpen) {
      console.log('✅ Painel de Arquivos abriu corretamente!');
    } else {
      console.warn('⚠️ Painel de Arquivos não abriu.');
    }

    console.log(`📸 Salvando captura dos Dossiês em: ${screenshotDossies}`);
    await page.screenshot({ path: screenshotDossies });

    console.log('📂 Fechando o painel de Arquivos...');
    await page.click('.btn-close');
    await delay(3000); // Espera fechar o drawer

    console.log('🔑 Abrindo o modal de Chaves Nassau...');
    const keysBtn = await page.$('button[title="Chaves Nassau"]');
    if (keysBtn) {
      await keysBtn.click();
      await delay(500);
      const screenshotKeys = path.join(baseDir, 'screenshot_chaves.png');
      console.log(`📸 Salvando captura das Chaves Nassau em: ${screenshotKeys}`);
      await page.screenshot({ path: screenshotKeys });

      console.log('❌ Fechando o modal de Chaves Nassau...');
      await page.click('.btn-rescue-confirm');
      await delay(500);
    } else {
      console.warn('⚠️ Botão de Chaves Nassau não encontrado.');
    }

    console.log('📂 Reabrindo o painel "Arquivos do Caso" para ir à aba de Baixas...');
    await page.click('.btn-archives');
    await delay(500);
    
    const dossierCount = await page.evaluate(() => {
      return document.querySelectorAll('.char-folder-card').length;
    });
    console.log(`👥 Total de perfis na lista de dossiês: ${dossierCount}/20`);
    
    console.log('📑 Alternando para a aba "Registro de Baixas"...');
    const tabButtons = await page.$$('.drawer-header button');
    let deathsTabBtn = null;
    for (const btn of tabButtons) {
      const text = await page.evaluate(el => el.textContent, btn);
      if (text.includes('Registro de Baixas')) {
        deathsTabBtn = btn;
        break;
      }
    }
    if (deathsTabBtn) {
      await deathsTabBtn.click();
      await delay(1000);
      console.log('✅ Aba de Baixas aberta!');
      // Tira uma foto da aba de Baixas
      await page.screenshot({ path: screenshotBaixas });
      console.log(`📸 Captura do Registro de Baixas salva em: ${screenshotBaixas}`);
    } else {
      console.warn('⚠️ Aba de Registro de Baixas não encontrada.');
    }

    await page.click('.btn-close');
    await delay(500);
    
    console.log('🎉 Teste de Usabilidade concluído com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro no teste de usabilidade:', error.message);
    console.log(`📸 Salvando captura do erro em: ${screenshotError}`);
    await page.screenshot({ path: screenshotError });
  } finally {
    await browser.close();
    console.log('🏁 Processo do navegador encerrado.');
  }
})();
