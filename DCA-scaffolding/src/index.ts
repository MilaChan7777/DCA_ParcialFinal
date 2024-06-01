import { Product } from "./types/products";
import { addProduct, getProducts } from "./utils/firebase";

const formData: Omit<Product, 'id'> = {
    title: "",
    artist: "",
    price: 0,
    stock: 0,
}

class AppContainer extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: "open"})
    }

    connectedCallback() {
        this.render()
    }

    changeTitle(e: any){
        formData.title = e.target.value;
        console.log(e.target.value);
    }

    changeArtist(e: any){
        formData.artist = e.target.value;
        console.log(e.target.value);
    }

    changePrice(e: any){
        formData.price = e.target.value;
        console.log(e.target.value);
    }

    changeStock(e: any){
        formData.stock= e.target.value;
        console.log(e.target.value);
    }

    submitForm(){
        addProduct(formData);
    }

    async render() {
        const titleAlbum = this.ownerDocument.createElement('input');
        titleAlbum.placeholder = "Nombre del álbum";
        titleAlbum.addEventListener("change", this.changeTitle.bind(this));
        this.shadowRoot?.appendChild(titleAlbum);

        const img = this.ownerDocument.createElement('img');
        this.shadowRoot?.appendChild(img);

        const artistAlbum = this.ownerDocument.createElement('input');
        artistAlbum.placeholder = "Nombre del artista";
        artistAlbum.addEventListener("change", this.changeArtist.bind(this));
        this.shadowRoot?.appendChild(artistAlbum);

        const priceAlbum = this.ownerDocument.createElement('input');
        priceAlbum.placeholder = "Precio del álbum";
        priceAlbum.addEventListener("change", this.changePrice.bind(this));
        this.shadowRoot?.appendChild(priceAlbum);

        const stockAlbum = this.ownerDocument.createElement('input');
        stockAlbum.placeholder = "Cantidad en stock";
        stockAlbum.addEventListener("change", this.changeStock.bind(this));
        this.shadowRoot?.appendChild(stockAlbum);

        const save = this.ownerDocument.createElement('button');
        save.innerHTML = "Añadir producto";
        save.addEventListener("click", this.submitForm.bind(this));
        this.shadowRoot?.appendChild(save);

        const products = await getProducts();
        products.forEach((prod: Product) => {
            const container = this.ownerDocument.createElement('section');
            const title = this.ownerDocument.createElement('h3');
            title.innerHTML = prod.title;
            container.appendChild(title);
        });
    }
}

customElements.define('app-container', AppContainer);
