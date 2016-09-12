'use babel';

import AifView from './aif-view';
import { CompositeDisposable } from 'atom';

export default {

  aifView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.aifView = new AifView(state.aifViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.aifView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'aif:toggle': () => this.toggle(),
      'aif:run': () => this.runAIF(),
      'aif:hello': () => this.hello()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.aifView.destroy();
  },

  serialize() {
    return {
      aifViewState: this.aifView.serialize()
    };
  },

  toggle() {
    console.log('Aif was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  },

  hello() {
    atom.workspace.observeTextEditors(function (editor)
      {editor.insertText("Hello world!")});
  }

};
