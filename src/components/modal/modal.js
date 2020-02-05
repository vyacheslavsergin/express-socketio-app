import M from 'materialize-css';

class Modal {
  constructor(element) {
    this.el = element;

    this.elems = document.querySelectorAll('.modal');
    this.modalHeadline = this.el.querySelector('[data-modal-ref="modal-headline"]');
    this.receiverName = this.el.querySelector('[data-modal-ref="receiver-name"]');
    this.nameLink = this.el.querySelector('[data-modal-ref="name-link"]');

    console.log('receiverName', this.receiverName);

    this.init();
  }

  init() {
    const modalHeadline = this.modalHeadline;

    const instances = M.Modal.init(this.elems, {
      onOpenEnd: function () {
      }
    });

    document.addEventListener('click', (event) => {
      if (event.target.getAttribute('data-target') === 'modal1') {
        modalHeadline.textContent = `@${event.target.innerHTML}`;
        this.receiverName.value = event.target.innerHTML.trim();
        this.nameLink.setAttribute('href', `/profile/${this.receiverName.value}`);
      }
    });
  }
}

export default Modal;