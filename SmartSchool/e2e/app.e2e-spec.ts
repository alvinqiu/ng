import { SmartSchoolPage } from './app.po';

describe('smart-school App', () => {
  let page: SmartSchoolPage;

  beforeEach(() => {
    page = new SmartSchoolPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
