class Example {
  constructor(el) {
    this.el = el;
    this.el.innerHTML = "<h1>It's ALIVE!</h1>"

    this.el.addEventListener("click", this.handleClick.bind(this))
  }

  handleClick() {
    this.el.children[0].innerText = "Ouch!"
  }


};

export default Example;
