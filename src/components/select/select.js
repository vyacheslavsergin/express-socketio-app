import M from 'materialize-css';

class Select {
  constructor(element) {
    this.el = element;
    this.instance = null;

    this.init();
  }

  init() {
    this.instance = M.FormSelect.init(this.el);
    this.el.addEventListener('change', this.onChange, false);
  }

  onChange = (event) => {
    // console.log('onChange');
    // const values = this.instance.getSelectedValues();
    // console.log('values', values);

    // console.log('instance', this.instance);
    console.log('value', event.target.value);
  }
}

export default Select