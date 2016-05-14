export class ArithmetisPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('arithmetis-app h1')).getText();
  }
}
