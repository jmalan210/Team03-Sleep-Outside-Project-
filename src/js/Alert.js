class Alert {
  constructor() {
    this.alerts = [];
  }

  async loadAlerts() {
    try {
      const response = await fetch('/json/alerts.json');
      this.alerts = await response.json();
      this.render();
    } catch (error) {
      console.error('Error loading alerts:', error);
    }
  }

  render() {
    if (this.alerts.length === 0) return;

    const section = document.createElement('section');
    section.className = 'alert-list';

    this.alerts.forEach((alert) => {
      const p = document.createElement('p');
      p.textContent = alert.message;
      p.style.backgroundColor = alert.background;
      p.style.color = alert.color;
      section.appendChild(p);
    });

    const main = document.querySelector('main');
    if (main) {
      main.prepend(section);
    }
  }
}

export default Alert;
