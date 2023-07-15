class GooBarElement extends HTMLElement {
  static observedAttributes = ["color", "speed"];

  constructor() {
    super();

    this.canvas = document.createElement("canvas");
    this.style.position = "relative";
    this.canvas.style.width = "100%";
    this.canvas.style.height = "100%";

    this.ctx = this.canvas.getContext("2d");
    this.appendChild(this.canvas);
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
    this.blobs = [];
  }

  connectedCallback() {
    this.update();
  }

  render() {
    this.canvas.width = this.canvas.width;
    this.canvas.height = this.canvas.height;

    this.ctx.fillStyle = this.getBackground();
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.blobs.forEach((i) => {
      this.ctx.beginPath();
      this.ctx.arc(
        i.x,
        this.canvas.height - i.y,
        i.size,
        0,
        2 * Math.PI,
        false
      );
      this.ctx.fillStyle = this.getColor();
      this.ctx.fill();
    });
  }

  update() {
    this.blobs = this.blobs.map((i) => {
      const y = i.y + 1;
      const size = i.size - i.speed;

      const next = size <= 0 ? this._randomSize() : size;

      return {
        ...i,
        y: size <= 0 ? -next : y,
        size: next,
      };
    });

    this.render();

    if (this.blobs.length < this.getItems()) {
      this.blobs.push(this._createBlob());
    } else if (this.blobs.length > this.getItems()) {
      this.blobs.pop();
    }

    requestAnimationFrame(() => this.update());
  }

  _createBlob() {
    const size = this._randomSize();
    return {
      x: this._randomX(),
      y: -size,
      size,
      speed: this._randomSpeed(),
    };
  }

  _randomSpeed() {
    return Math.random() * this.getMaxSpeed() + this.getMinSpeed();
  }

  _randomX() {
    return Math.floor(Math.random() * this.canvas.width);
  }

  _randomSize() {
    return Math.floor(Math.random() * this.getMaxSize()) + this.getMinSize();
  }

  getMaxSize() {
    return this.hasAttribute("max-size")
      ? parseFloat(this.getAttribute("max-size"))
      : 0;
  }

  getMinSize() {
    return this.hasAttribute("min-size")
      ? parseFloat(this.getAttribute("min-size"))
      : 0;
  }

  getItems() {
    return this.hasAttribute("items")
      ? parseFloat(this.getAttribute("items"))
      : 0;
  }

  getMinSpeed() {
    return this.hasAttribute("min-speed")
      ? parseFloat(this.getAttribute("min-speed"))
      : 0;
  }

  getMaxSpeed() {
    return this.hasAttribute("max-speed")
      ? parseFloat(this.getAttribute("max-speed"))
      : 0;
  }

  getColor() {
    return this.hasAttribute("color") ? this.getAttribute("color") : "white";
  }

  getBackground() {
    return this.hasAttribute("background")
      ? this.getAttribute("background")
      : "transparent";
  }
}

customElements.define("goo-bar", GooBarElement);
