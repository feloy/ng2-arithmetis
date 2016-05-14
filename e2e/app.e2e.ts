import { ArithmetisPage } from './app.po';

describe('arithmetis App', function() {
  let page: ArithmetisPage;

  beforeEach(() => {
    page = new ArithmetisPage();
  })

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('arithmetis works!');
  });
});
