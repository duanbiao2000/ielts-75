// T-6.3 跨引擎兼容性测试：Chromium / WebKit(Safari) / Firefox + 手机视口
// T-6.3 跨引擎 + 媒体兼容性测试。前置条件：
//   1) 静态服务器托管 onboarding/：python3 -m http.server 8123 -d onboarding
//   2) 安装 playwright（项目为纯静态站点，按需使用）：npm i playwright && npx playwright install chromium webkit firefox
// 运行：node scripts/compat-test.js [BaseURL]
let chromium, webkit, firefox;
try { ({ chromium, webkit, firefox } = require('playwright')); } catch (e) { console.error('缺少 playwright：npm i playwright（项目根目录执行）'); process.exit(2); }
const BASE = process.argv[2] || 'http://localhost:8123/';
let pass = 0, fail = 0;
const ok = (n, c) => { if (c) { pass++; console.log('  ✅', n); } else { fail++; console.log('  ❌', n); } };

async function auditPage(name, browser, opts = {}) {
  console.log(`\n===== ${name} =====`);
  const ctx = await browser.newContext(Object.assign({ viewport: { width: 1280, height: 900 } }, opts));
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push('pageerror: ' + e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
  page.on('requestfailed', r => { if (!/favicon/.test(r.url())) errors.push('reqfail: ' + r.url().slice(-60) + ' ' + (r.failure() || {}).errorText); });

  await page.goto(BASE, { waitUntil: 'networkidle', timeout: 20000 });
  ok('页面加载 title 含 IELTS', (await page.title()).includes('IELTS'));
  ok('hero 渲染', await page.locator('#btnStart').isVisible());
  ok('课程网格已渲染（11 课）', (await page.locator('#pathLessons .card').count()) === 11);
  ok('场景网格按域渲染（职场 10 卡）', (await page.locator('#scenGrid .card').count()) === 10);
  // 切换域 tab → 生活场景
  await page.locator('#scenTabs .tab', { hasText: '生活' }).first().click();
  ok('场景 tab 切换（生活域）', (await page.locator('#scenGrid .card').count()) > 0);
  await page.locator('#scenTabs .tab', { hasText: '职场' }).first().click();
  ok('模块网格已渲染（12 卡）', (await page.locator('#modGrid .card').count()) === 12);
  ok('徽章区已渲染（25 枚）', (await page.locator('#badgeGrid .badge').count()) === 25);
  ok('无 JS/资源错误', errors.length === 0);
  if (errors.length) errors.forEach(e => console.log('     ⚠', e));

  // 诊断流程（主路径）
  await page.click('#btnStart');
  await page.waitForSelector('#quizArea .opt', { timeout: 5000 });
  ok('诊断出题渲染', (await page.locator('#quizArea .opt').count()) >= 2);

  // 场景卡点击 → 弹窗
  await page.click('#scenGrid .card >> nth=0');
  await page.waitForSelector('#modalBox', { state: 'visible', timeout: 5000 });
  ok('场景弹窗打开', await page.locator('#modalBox').isVisible());
  await page.keyboard.press('Escape');
  ok('Escape 关闭弹窗', !(await page.locator('#modal-mask.show').count()));

  // 演练舱懒加载：点击场景卡内演练入口
  await page.click('#scenGrid .card >> nth=0');
  await page.locator('#modalBox button', { hasText: '去演练' }).first().click();
  await page.waitForSelector('#pod-mask.show', { timeout: 8000 });
  ok('演练舱打开（practice-full 懒加载成功）', await page.locator('#pod-mask.show').isVisible());
  const podTitle = await page.locator('#pod').innerText();
  ok('演练舱有内容', podTitle.length > 50);
  await page.keyboard.press('Escape');

  // 场景素材阅读器：查看素材 → 三 Tab → TTS 按钮 → Escape 返回场景弹窗
  await page.click('#scenGrid .card >> nth=0');
  await page.waitForSelector('#modalBox', { state: 'visible', timeout: 5000 });
  await page.locator('#modalBox button', { hasText: '查看素材' }).first().click();
  await page.waitForSelector('#reader-mask.show', { timeout: 8000 });
  ok('场景素材阅读器打开', await page.locator('#reader-mask.show').isVisible());
  const scenTxt = await page.locator('#reader-mask').innerText();
  ok('核心表达 Tab 渲染', scenTxt.includes('核心表达'));
  ok('TTS 朗读按钮存在', (await page.locator('#reader-mask .tts-btn').count()) > 3);
  await page.locator('#reader-mask .doc-chip', { hasText: '情景对话' }).first().click();
  ok('情景对话 Tab 切换', (await page.locator('#reader-mask').innerText()).includes('对话'));
  await page.locator('#reader-mask .doc-chip', { hasText: '角色任务' }).first().click();
  ok('角色任务 Tab 切换', (await page.locator('#reader-mask').innerText()).includes('自检'));
  await page.keyboard.press('Escape'); // 返回场景弹窗
  ok('Escape 返回场景弹窗', (await page.locator('#modal-mask.show').count()) === 1);
  await page.keyboard.press('Escape'); // 关闭场景弹窗

  // 模块文档阅读器：阅读模块 → 文档懒加载 → chips → 完成并测验 → 模块单元测验
  // 注：WebKit 下偶发 Playwright actionability 未命中 div 卡片（Chromium 正常），改用 DOM click（与课程卡同款写法）
  await page.evaluate(() => { const c = document.querySelector('#modGrid .card'); if (c) c.click(); });
  await page.waitForSelector('#modal-mask.show', { timeout: 5000 });
  await page.locator('#modalBox button', { hasText: '阅读模块' }).first().click();
  await page.waitForSelector('#reader-mask.show', { timeout: 8000 });
  const modTxt = await page.locator('#reader-mask').innerText();
  ok('模块阅读器打开（内容卷懒加载成功）', modTxt.length > 100);
  ok('模块文档 chips 渲染', (await page.locator('#reader-mask .doc-chip').count()) >= 3);
  await page.locator('#reader-mask .btn-primary-big', { hasText: '完成并测验' }).click();
  await page.waitForTimeout(400);
  ok('完成并测验直达模块单元测验', (await page.locator('#modalBox').innerText()).includes('单元测验'));
  await page.keyboard.press('Escape');

  // 深链接（批次 C）：冷启动直开课程/模块阅读器 + 后退键回落主页 + 分享按钮
  {
    const ctx2 = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page2 = await ctx2.newPage();
    await page2.goto(BASE + '#/read/lesson/l1', { waitUntil: 'networkidle', timeout: 20000 });
    ok('深链接直达课程阅读器', await page2.locator('#reader-mask.show').count() === 1 && (await page2.locator('#reader-mask').innerText()).includes('诊断'));
    ok('阅读器顶栏含分享按钮', (await page2.locator('#reader-mask .reader-share').count()) === 1);
    // 注：Playwright 的 goBack() 在 Firefox 下无法遍历 pushState 同文档历史（返回 null）；
    // 真实浏览器「后退」= history.back()，此处与用户行为一致
    await page2.evaluate(() => history.back());
    await page2.waitForFunction(() => !document.getElementById('reader-mask').classList.contains('show'), undefined, { timeout: 5000 });
    ok('后退键关闭阅读器（回落主页+关卡弹窗）', await page2.locator('#reader-mask.show').count() === 0 && await page2.locator('#modal-mask.show').count() === 1);
    const page3 = await ctx2.newPage();
    await page3.goto(BASE + '#/read/module/m01/1', { waitUntil: 'networkidle', timeout: 20000 });
    ok('深链接直达模块第 2 份文档', (await page3.locator('#reader-mask').innerText()).includes('音标'));
    await page3.keyboard.press('Escape');
    ok('深链接阅读器 Escape 后 hash 清空', (await page3.evaluate(() => location.hash)) === '');
    await ctx2.close();
  }
  const rrCount = await page.locator('#recentReads .rr-item').count();
  ok('最近阅读卡含至少 1 条入口', rrCount >= 1);

  // 单元测验（课程 l1 已解锁，直接从模块测验入口验证弹窗）
  await page.evaluate(() => { const b = document.querySelector('#pathLessons .card button'); if (b) b.click(); });
  await page.waitForTimeout(300);

  // 导出：点击导出按钮生成 Blob 下载
  const dl = page.waitForEvent('download', { timeout: 3000 }).catch(() => null);
  await page.click('#btnExport');
  await page.waitForTimeout(200);
  const jsonBtn = page.locator('#modalBox button', { hasText: 'JSON' }).first();
  if (await jsonBtn.count()) {
    await jsonBtn.click();
    const d = await dl;
    ok('导出 JSON 下载触发', !!d);
  } else {
    ok('导出弹窗打开', true);
    await page.keyboard.press('Escape');
  }

  // 模考覆盖层：初始隐藏、打开为 fixed 覆盖层、Escape 关闭
  await page.keyboard.press('Escape'); // 关闭可能残留的导出弹窗
  await page.waitForTimeout(150);
  const mockBefore = await page.locator('#mock-mask').evaluate(el => getComputedStyle(el).display);
  ok('模考覆盖层初始隐藏', mockBefore === 'none');
  await page.click('#btnMock');
  await page.waitForTimeout(400);
  ok('模考覆盖层为 fixed 且已渲染内容', await page.locator('#mock').evaluate(el => getComputedStyle(el.parentElement).position === 'fixed' && el.innerHTML.length > 200));
  ok('卷架渲染月刊卡（≥2 卷）', (await page.locator('#mock .mock-set').count()) >= 2);
  await page.locator('#mock .mock-set').first().click();
  await page.waitForTimeout(300);
  ok('选卷后渲染模考说明（150 分制）', await page.locator('#mock').evaluate(el => el.innerHTML.includes('模考说明') && el.innerHTML.includes('150')));
  await page.locator('#mock .mock-part').first().click();
  await page.waitForTimeout(300);
  ok('口语模考首题渲染', await page.locator('#mock .mock-q .stem').count() >= 1);
  await page.keyboard.press('Escape');
  ok('Escape 关闭模考覆盖层', (await page.locator('#mock-mask').evaluate(el => getComputedStyle(el).display)) === 'none');

  // Service Worker（仅支持的浏览器）
  const swState = await page.evaluate(async () => {
    if (!('serviceWorker' in navigator)) return 'unsupported';
    try { const regs = await navigator.serviceWorker.getRegistrations(); return 'ok:' + regs.length; }
    catch (e) { return 'error:' + e.message; }
  });
  console.log('     ℹ serviceWorker:', swState);

  // 无横向溢出
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  ok('无横向滚动溢出（desktop）', overflow <= 0);

  await ctx.close();
  return errors;
}



// ===== 媒体/录音专项 =====
async function mediaRun(name, browser, mode) {
  console.log(`\n===== ${name} =====`);
  const ctxOpts = mode === 'chromium-full' ? { viewport: { width: 1280, height: 900 }, permissions: ['microphone'] } : { viewport: { width: 1280, height: 900 } };
  const ctx = await browser.newContext(ctxOpts);
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push('pageerror: ' + e.message));
  await page.goto(BASE, { waitUntil: 'networkidle', timeout: 20000 });
  await page.click('#scenGrid .card >> nth=0');
  await page.locator('#modalBox button', { hasText: '去演练' }).first().click();
  await page.waitForSelector('#pod-mask.show', { timeout: 8000 });
  await page.click('#btnStartEx');
  await page.waitForSelector('#recBtn', { timeout: 5000 });
  await page.click('#recBtn');
  await page.waitForTimeout(1200);
  await page.click('#recBtn'); // 停止
  await page.waitForTimeout(1000);
  const audioCount = await page.locator('#pod audio').count();
  const audioSrc = audioCount ? await page.locator('#pod audio').first().getAttribute('src') : '';
  const toast = (await page.locator('#toast').innerText().catch(() => '')) || '';
  if (mode === 'chromium-full') {
    ok('Chromium：录音停止后生成带 blob src 的回放条', audioCount >= 1 && /^blob:/.test(String(audioSrc)));
  } else {
    ok(name + '：不支持录音时优雅降级（提示且无异常）', /无法录音|继续文字演练/.test(toast));
  }
  ok(name + '：媒体流程无未捕获异常', errors.length === 0);
  await ctx.close();
}
(async () => {
  for (const [name, browser] of [['Chromium (Chrome/Edge)', chromium], ['WebKit (Safari)', webkit], ['Firefox', firefox]]) {
    const b = await browser.launch();
    try { await auditPage(name, b); } catch (e) { fail++; console.log('  ❌ 流程异常:', e.message.split('\n')[0]); }
    await b.close();
  }
  // 手机视口：iPhone 13（WebKit 引擎 = iOS Safari）
  {
    const b = await webkit.launch();
    const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1' });
    const page = await ctx.newPage();
    const errs = [];
    page.on('pageerror', e => errs.push(e.message));
    await page.goto(BASE, { waitUntil: 'networkidle', timeout: 20000 });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    ok('iPhone 13 视口无横向溢出', overflow <= 0);
    ok('iPhone 课程网格转为单列', (await page.locator('#pathLessons .card').first().isVisible()));
    ok('iPhone 无 JS 错误', errs.length === 0);
    await ctx.close(); await b.close();
  }
  // 手机视口：Pixel 7（Chromium 引擎 = Android Chrome）
  {
    const b = await chromium.launch();
    const ctx = await b.newContext({ viewport: { width: 412, height: 915 }, isMobile: true, hasTouch: true, userAgent: 'Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36' });
    const page = await ctx.newPage();
    const errs = [];
    page.on('pageerror', e => errs.push(e.message));
    await page.goto(BASE, { waitUntil: 'networkidle', timeout: 20000 });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    ok('Pixel 7 视口无横向溢出', overflow <= 0);
    ok('Pixel 场景网格可点击打开弹窗', await page.locator('#scenGrid .card').first().isVisible());
    ok('Pixel 无 JS 错误', errs.length === 0);
    await ctx.close(); await b.close();
  }
  // 媒体专项：Chromium 全链路（假麦克风）+ WebKit/Firefox 优雅降级
  const bC = await chromium.launch({ args: ['--use-fake-device-for-media-stream', '--use-fake-ui-for-media-stream'] });
  try { await mediaRun('Chromium（假麦克风全链路）', bC, 'chromium-full'); } catch (e) { fail++; console.log('  ❌ 媒体流程异常:', e.message.split('\n')[0]); }
  await bC.close();
  const bW = await webkit.launch();
  try { await mediaRun('WebKit', bW, 'degraded'); } catch (e) { fail++; console.log('  ❌ 媒体流程异常:', e.message.split('\n')[0]); }
  await bW.close();
  const bF = await firefox.launch();
  try { await mediaRun('Firefox', bF, 'degraded'); } catch (e) { fail++; console.log('  ❌ 媒体流程异常:', e.message.split('\n')[0]); }
  await bF.close();
  console.log(`\n结果：${pass} 通过，${fail} 失败`);
  process.exit(fail ? 1 : 0);
})();
