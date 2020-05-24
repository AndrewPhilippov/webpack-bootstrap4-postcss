import '../styles/styles.css'
import Slider from './modules/Slider'
import Modal from './modules/Modal'

new Slider()
new Modal()

if (module.hot) {
    module.hot.accept()
}
