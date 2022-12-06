(() => {
  const refs = {
    openModalBtn: document.querySelector("[table-reservation-open]"),
    closeModalBtn: document.querySelector("[table-reservation-close]"),
    modal: document.querySelector("[table-reservation-modal]"),
  };

  refs.openModalBtn.addEventListener("click", toggleModal);
  refs.closeModalBtn.addEventListener("click", toggleModal);

  function toggleModal() {
    refs.modal.classList.toggle("is-hidden");
  }
})();