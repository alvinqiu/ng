import { MyModulePage } from './app.po';

describe('my-module App', () => {
  let page: MyModulePage;

  beforeEach(() => {
    page = new MyModulePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
