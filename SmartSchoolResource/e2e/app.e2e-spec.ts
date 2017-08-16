import { SmartSchoolResourcePage } from './app.po';

describe('smart-school-resource App', () => {
  let page: SmartSchoolResourcePage;

  beforeEach(() => {
    page = new SmartSchoolResourcePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
