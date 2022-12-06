(() => {
  const refs = {
    openModalBtn: document.querySelector("[room-price-open]"),
    closeModalBtn: document.querySelector("[room-price-close]"),
    modal: document.querySelector("[room-price-modal]"),
  };

  refs.openModalBtn.addEventListener("click", toggleModal);
  refs.closeModalBtn.addEventListener("click", toggleModal);

  function toggleModal() {
    refs.modal.classList.toggle("is-hidden");
  }
})();