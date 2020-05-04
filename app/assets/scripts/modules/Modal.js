class Modal {
    constructor () {
        this.modal = document.querySelector('.slider-item--active .modal')
        this.btn = document.querySelector('.slider-item--active .slider-item__box-btn')

        this.prev = document.querySelector('.nav-buttons .prev')
        this.next = document.querySelector('.nav-buttons .next')
        this.dots = document.querySelector('.nav-dots')

        this.events()
    }

    events () {
        this.btn.addEventListener('click', this.toggleModal.bind(this))
        this.modal.addEventListener('click', this.closeModal.bind(this))
    }

    toggleModal () {
        this.modal.classList.toggle('open')
        this.prev.classList.toggle('hidden')
        this.next.classList.toggle('hidden')
        this.dots.classList.toggle('hidden')
        this.btn.classList.toggle('back-to-gallery')

        const activeSlide = document.querySelector('.slider-item--active')
        activeSlide.classList.toggle('show-modal')
    }

    closeModal (e) {
        if (e.target.classList.contains('close-modal-x') || e.target.classList.contains('close-modal-btn')) {
            this.toggleModal()
        }
    }

    loadModal () {
        document.body.insertAdjacentHTML('beforeend', `
        <div class="modal">
          <span class="close-modal-x"></span>
          <div class="modal-wrapper">
            <h2 class="header">Николай Храмов</h2>
            <p>На этом портрете новгородцу Николаю Храмову 24 года. Портрет был сделан в начале мая. Незадолго до этого,
              в
              марте 1942-го, он отличился в бою и был награжден медалью «За отвагу».</p>
            <figure>
              <figcaption>Из архивных документов</figcaption>
              <img  class="hidden-mobile" src="assets/img/modal/hramov-doc.jpg" alt="Архив">
              <img  class="hidden-big" src="assets/img/modal/hramov-mob.jpg" alt="Архив">
            </figure>
            <p>Именно поэтому, скорее всего, танкист привлек внимание приехавших в часть художников. При этом с него
              написали сразу два портрета. Один — который вы видите сейчас, другой — почти такой же, только черно-белый.
              Сделали их художники студии им. Грекова Анатолий Горпенко и Евгений Комаров. Обе работы в итоге попали в
              Музей Победы и находятся в его фондах до сих пор.</p>
            <blockquote>Cам Николай Храмов погиб спустя несколько месяцев, в конце августа 1942-го. Он сгорел
              вместе с машиной в бою недалеко от деревни Колодези Калужской области.
            </blockquote>
            <p>Вместе с ним погибли и два других члена экипажа — это удалось узнать из донесения о потерях. Поисковики
              подняли архивы части и обнаружили в ней другой документ — рисунок со схемой боя, благодаря которому
              удалось
              установить точное место гибели танка, в котором находился Храмов.</p>
            <p>Но информации о захоронении, которая обычно там указывается, в документах не было: могилы у Николая
              Храмова, как и у двух других членов экипажа танка, нет.</p>
            <p>Нарисовавший его Анатолий Горпенко после войны вместе со скульптором Вучетичем стал одним из авторов
              монумента советскому солдату «Воин-освободитель», установленного в Берлине.</p>
            <div class="close-modal-btn"></div>
          </div>
        </div>
        `)
    }
}

export default Modal
