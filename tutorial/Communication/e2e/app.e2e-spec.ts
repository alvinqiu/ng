import { CommunicationPage } from './app.po';

describe('communication App', () => {
  let page: CommunicationPage;

  beforeEach(() => {
    page = new CommunicationPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
