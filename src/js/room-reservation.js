(() => {
  const refs = {
    openModalBtn: document.querySelector("[room-reservation-open]"),
    closeModalBtn: document.querySelector("[room-reservation-close]"),
    modal: document.querySelector("[room-reservation-modal]"),
  };

  refs.openModalBtn.addEventListener("click", toggleModal);
  refs.closeModalBtn.addEventListener("click", toggleModal);

  function toggleModal() {
    refs.modal.classList.toggle("is-hidden");
  }
})();