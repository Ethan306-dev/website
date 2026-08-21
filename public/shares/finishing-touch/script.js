class EmailSendHandler {
  constructor(form) {
    this.form = form;
    this.status = form.querySelector('.form-status');
    form.addEventListener('submit', (event) => this.submit(event));
  }

  async submit(event) {
    event.preventDefault();
    const provider = (this.form.dataset.emailProvider || 'mailto').trim();
    const recipient = (this.form.dataset.emailTo || '').trim();
    const endpoint = (this.form.dataset.emailEndpoint || '').trim();
    const subject = (this.form.dataset.emailSubject || 'Website enquiry').trim();
    const formData = new FormData(this.form);

    if (!recipient || !recipient.includes('@')) {
      this.setStatus('Add a recipient email in the website builder before using this form.', true);
      return;
    }

    try {
      this.setStatus('Sending...', false);
      if (provider === 'formspree' || provider === 'custom-endpoint') {
        await this.submitToEndpoint(endpoint, recipient, subject, formData);
      } else if (provider === 'netlify') {
        await this.submitToNetlify(subject, formData);
      } else {
        this.openMailDraft(recipient, subject, formData);
      }
      this.form.reset();
      this.setStatus(this.form.dataset.emailSuccess || 'Thanks. Your message has been sent.', false);
    } catch (error) {
      this.setStatus(error.message || 'The message could not be sent. Try again or email directly.', true);
    }
  }

  async submitToEndpoint(endpoint, recipient, subject, formData) {
    if (!endpoint || !/^https?:\/\//i.test(endpoint)) {
      throw new Error('Add a valid form endpoint in the website builder before using this form.');
    }

    const payload = this.payload(recipient, subject, formData);
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!response.ok) {
      throw new Error('The form service rejected the message.');
    }
  }

  async submitToNetlify(subject, formData) {
    const encoded = new URLSearchParams();
    encoded.set('form-name', this.form.getAttribute('name') || 'contact');
    encoded.set('subject', subject);
    formData.forEach((value, key) => encoded.set(key, String(value || '')));
    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encoded.toString()
    });
    if (!response.ok) {
      throw new Error('Netlify did not accept the form submission.');
    }
  }

  openMailDraft(recipient, subject, formData) {
    const body = this.lines(formData).join('\n\n') || 'New website enquiry.';
    const mailto = `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  }

  payload(recipient, subject, formData) {
    const fields = {};
    formData.forEach((value, key) => {
      fields[key] = String(value || '').trim();
    });
    return { to: recipient, subject, fields, message: this.lines(formData).join('\n\n') };
  }

  lines(formData) {
    const lines = [];
    formData.forEach((value, key) => {
      const text = String(value || '').trim();
      if (text) {
        lines.push(`${this.label(key)}: ${text}`);
      }
    });
    return lines;
  }

  label(key) {
    return String(key || 'Message')
      .replace(/[-_]+/g, ' ')
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  }

  setStatus(message, isError) {
    if (!this.status) {
      return;
    }
    this.status.textContent = message;
    this.status.dataset.state = isError ? 'error' : 'success';
  }

  static install() {
    document.querySelectorAll('form[data-email-send]').forEach((form) => new EmailSendHandler(form));
  }
}

class StaticShopCart {
  constructor() {
    this.storageKey = 'blockloom-cart';
    this.products = Array.isArray(window.BlockloomProducts) ? window.BlockloomProducts : [];
    this.buttons = document.querySelectorAll('[data-cart-add]');
    if (this.buttons.length > 0) {
      document.body.classList.add('has-shop-cart');
    }
    this.buttons.forEach((button) => button.addEventListener('click', () => this.add(button)));
    document.querySelectorAll('[data-shop-checkout]').forEach((form) => {
      form.addEventListener('submit', () => this.prepareCheckout(form), true);
    });
    this.renderUniversalProduct();
    this.renderBasket();
    this.updateCount();
  }

  add(button) {
    const product = {
      id: button.dataset.productId || '',
      name: button.dataset.productName || 'Product',
      price: button.dataset.productPrice || '',
      sku: button.dataset.productSku || '',
      checkoutURL: button.dataset.checkoutUrl || '',
      paymentProvider: button.dataset.paymentProvider || ''
    };
    const items = this.items();
    items.push(product);
    localStorage.setItem(this.storageKey, JSON.stringify(items));
    const status = button.closest('.commerce-card')?.querySelector('.cart-status');
    if (status) {
      status.textContent = `${product.name} added. ${items.length} item${items.length === 1 ? '' : 's'} in basket.`;
      status.dataset.state = 'success';
    }
    this.updateCount();
    this.renderBasket();
  }

  items() {
    try {
      const parsed = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
      return Array.isArray(parsed) ? parsed : [];
    } catch (_) {
      return [];
    }
  }

  updateCount() {
    const count = this.items().length;
    document.querySelectorAll('[data-cart-count]').forEach((element) => {
      element.textContent = String(count);
    });
  }

  renderUniversalProduct() {
    const detail = document.querySelector('[data-product-detail]');
    if (!detail || this.products.length === 0) {
      return;
    }
    const id = new URLSearchParams(window.location.search).get('id') || this.products[0].id;
    const product = this.products.find((item) => item.id === id) || this.products[0];
    const setText = (selector, value) => {
      const element = detail.querySelector(selector);
      if (element) {
        element.textContent = value || '';
      }
    };
    setText('[data-product-category]', product.category || 'Shop');
    setText('[data-product-name]', product.name || 'Product');
    setText('[data-product-description]', product.description || '');
    setText('[data-product-price]', product.price || '');
    setText('[data-product-stock]', product.stock || 'Available now');
    setText('[data-product-guarantee]', product.guarantee || 'Simple returns');
    const skuWrap = detail.querySelector('[data-product-sku-wrap]');
    if (skuWrap) {
      skuWrap.innerHTML = product.sku ? `<p class="mt-2 text-sm text-slate-500">SKU ${this.escape(product.sku)}</p>` : '';
    }
    const variantsWrap = detail.querySelector('[data-product-variants-wrap]');
    if (variantsWrap) {
      variantsWrap.innerHTML = product.variants ? `<div class="detail-card rounded-lg bg-slate-50 p-4"><strong class="text-slate-950">${this.escape(product.variants)}</strong><p class="mt-1 text-sm text-slate-600">Variants</p></div>` : '';
    }
    const image = detail.querySelector('[data-product-image]');
    const placeholder = detail.querySelector('[data-product-placeholder]');
    if (product.image && image) {
      image.src = product.image;
      image.alt = product.name || 'Product image';
    } else if (product.image && placeholder) {
      placeholder.outerHTML = `<img class="site-image split-image" data-product-image src="${product.image}" alt="${this.escape(product.name || 'Product image')}">`;
    }
    detail.querySelectorAll('[data-cart-add]').forEach((button) => {
      button.dataset.productId = product.id || '';
      button.dataset.productName = product.name || 'Product';
      button.dataset.productPrice = product.price || '';
      button.dataset.productSku = product.sku || '';
      button.dataset.checkoutUrl = product.checkoutURL || '';
      button.dataset.paymentProvider = product.paymentProvider || '';
    });
    document.title = `${product.name || 'Product'} | ${document.title.replace(/^Product \| /, '')}`;
  }

  renderBasket() {
    const items = this.items();
    document.querySelectorAll('[data-basket-items]').forEach((container) => {
      container.innerHTML = items.map((item, index) => `
        <div class="basket-row">
          <div><strong>${this.escape(item.name || 'Product')}</strong><span>${this.escape(item.sku || item.paymentProvider || '')}</span></div>
          <div><span>${this.escape(item.price || '')}</span><button type="button" data-remove-basket-item="${index}">Remove</button></div>
        </div>
      `).join('');
      container.querySelectorAll('[data-remove-basket-item]').forEach((button) => {
        button.addEventListener('click', () => this.remove(Number(button.dataset.removeBasketItem)));
      });
    });
    document.querySelectorAll('[data-basket-empty]').forEach((element) => {
      element.hidden = items.length > 0;
    });
  }

  remove(index) {
    const items = this.items();
    items.splice(index, 1);
    localStorage.setItem(this.storageKey, JSON.stringify(items));
    this.updateCount();
    this.renderBasket();
  }

  prepareCheckout(form) {
    const items = this.items();
    const basketField = form.querySelector('[data-basket-field]');
    const summary = items.map((item, index) => `${index + 1}. ${item.name || 'Product'} ${item.price || ''} ${item.sku ? `(SKU ${item.sku})` : ''}`).join('\n');
    if (basketField) {
      basketField.value = summary || 'Basket empty';
    }
    const status = form.querySelector('.form-status');
    const itemCheckout = items.find((item) => item.checkoutURL)?.checkoutURL;
    const checkoutURL = itemCheckout || form.dataset.checkoutUrl || '';
    if (checkoutURL && /^https?:\/\//i.test(checkoutURL)) {
      if (status) {
        status.textContent = 'Opening secure hosted payment...';
        status.dataset.state = 'success';
      }
      window.setTimeout(() => window.open(checkoutURL, '_blank', 'noopener'), 250);
    }
  }

  escape(value) {
    return String(value || '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;');
  }

  static install() {
    new StaticShopCart();
  }
}

const revealBlocks = document.querySelectorAll('.reveal-on-scroll');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
  revealBlocks.forEach((block) => observer.observe(block));
} else {
  revealBlocks.forEach((block) => block.classList.add('is-visible'));
}
EmailSendHandler.install();
StaticShopCart.install();