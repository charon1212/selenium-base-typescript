import { Builder, Capabilities, WebDriver } from 'selenium-webdriver'
const capabilities: Capabilities = Capabilities.chrome();
capabilities.set('chromeOptions', {
  args: [
    // '--headless', // ヘッドレスモード
    '--disable-gpu', // GPUを使用した高速化を無効にする
    '--window-size=1024,768' // 起動時のwindowサイズ
  ],
  w3c: false
});

export const executeSelenium = async (exec: (driver: WebDriver) => unknown | Promise<unknown>, onError?: (error: unknown) => void | Promise<void>) => {
  const driver = await new Builder().withCapabilities(capabilities).build();
  try {
    await exec(driver);
  } catch (e) {
    if (onError) await onError(e);
  } finally {
    await driver?.quit();
  }
};
